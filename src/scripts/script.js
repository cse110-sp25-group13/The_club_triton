/**
 * @file script.js
 * @description Core logic for UCSD College Card Compare game.
 * Implements card drawing, comparison, and round resolution.
 * Dependencies: IndexedDB module in card-system.js
 */


import { initDB, getAllCards } from './card-system.js';
const CARDBACK_PATH = "src\card\card-back.png";
const MAX_CARDS = 5;
const TIMER_LIMIT = 60000; // 60 seconds


let deck = [];
let playerHand = [];
let aiHand = [];
let playerScore = { monument: 0, dining: 0, structure: 0 };
let aiScore = { monument: 0, dining: 0, structure: 0 };
let timer = null;


const typeBeats = {
  monument: 'dining',
  dining: 'structure',
  structure: 'monument'
};


// UI elements
const playerDeckEl = document.querySelector('.player-cards');
const aiDeckEl = document.querySelector('.ai-card'); // For if we want to animate ai hand to table
const playerWonSlots = document.querySelector('.player-won-cards');
const aiWonSlots = document.querySelector('.ai-won-cards');
const chosenPlayerSlot = document.querySelector('.chosen-player-card');
const chosenAiSlot = document.querySelector('.chosen-ai-card');
const timerEl = document.getElementById('timer');


/**
 * Initializes the game, loads cards, deals initial hands.
 */
async function initGame() {
  await initDB();
  deck = await getAllCards();
  playerHand = drawCards(MAX_CARDS);
  aiHand = drawCards(MAX_CARDS);
  renderHands();
  resetTimer();
}


/**
 * Draw a number of random cards from the deck. Give a new card from library to the ai and player, if the ai =true, change card img to a back of card img to hide the AI card
 * @param {number} count - Number of cards to draw
 * @param {boolean} ai - are we trying to draw card for ai 
 * @returns {Array<Object>} Array of card objects
 */

function drawCards(count,ai) {
  const hand = [];
  for (let i = 0; i < count; i++) {
     
        const randomIndex = Math.floor(Math.random()*deck.length);
        const cardObj = deck[randomIndex];
        const tritonCard = document.createElement('triton-card');
        tritonCard.cardData = cardObj;
       
        if(ai){
            tritonCard.src = CARDBACK_PATH;
            aiDeckEl.appendChild(tritonCard);
        }else{
            playerDeckEl.appendChild(tritonCard);
        }
  }
  return hand;
}




/**
 * Renders player hand cards to the DOM.
 */
function renderHands() {
  playerDeckEl.innerHTML = '';
  playerHand.forEach((tritonCard) => {
    const cardEl = createElement('triton-card');
    cardEl.addEventListener('click', () => playRound(tritonCard.id)); // Use ID
    playerDeckEl.appendChild(cardEl);
  });
}






/**
 * Handles card selection by player and executes round logic.
 * @param {string} playerCardId - ID of the selected card in playerHand
 */
async function playRound(playerCardId) {
  clearTimeout(timer);


  // Find and remove card from hand
  const playerIdx = playerHand.findIndex(tritonCard => tritonCard.id === playerCardId);
  const playerCard = playerHand.splice(playerIdx, 1)[0];


  const aiIdx = Math.floor(Math.random() * aiHand.length);
  const aiCard = aiHand.splice(aiIdx, 1)[0];


  const playerCardEl = document.getElementById(`tritonCard-${playerCard.id}`);
  await animateCardMove(playerCardEl, chosenPlayerSlot);


  chosenAiSlot.innerHTML = createCardElement(aiCard).outerHTML;


  const winner = determineWinner(playerCard, aiCard);
  updateScore(winner, playerCard, aiCard);


  // Draw replacement cards
  playerHand.push(...drawCards(1, false));
  aiHand.push(...drawCards(1, true));


  renderHands();
  resetTimer();
}


/**
 * Determines the winner between two cards.
 * @param {Object} playerCard
 * @param {Object} aiCard
 * @returns {"player"|"ai"|"tie"}
 */
function determineWinner(playerCard, aiCard) {
  if (playerCard.type === aiCard.type) {
    if (playerCard.ranking > aiCard.ranking) return 'player';
    if (aiCard.ranking > playerCard.ranking) return 'ai';
    return 'tie';
  }
  return typeBeats[playerCard.type] === aiCard.type ? 'player' : 'ai';
}


/**
 * Animates a card moving from its current position to a target element.
 * @param {HTMLElement} card - The actual card element in the player's hand.
 * @param {HTMLElement} targetEl - The destination element (e.g., comparison slot).
 * @returns {Promise<void>} Resolves when animation completes.
 */
function animateCardMove(card, targetEl) {
  return new Promise((res) => {
    const start = card.getBoundingClientRect();
    const end = targetEl.getBoundingClientRect();


    const ghost = card.cloneNode(true);
    ghost.style.position = 'fixed';
    ghost.style.top = `${start.top}px`;
    ghost.style.left = `${start.left}px`;
    ghost.style.width = `${start.width}px`;
    ghost.style.height = `${start.height}px`;
    ghost.style.transition = 'transform 0.4s ease-out';
    ghost.style.zIndex = '1000';
    document.body.appendChild(ghost);


    card.style.visibility = 'hidden';


    requestAnimationFrame(() => {
      const dx = end.left - start.left;
      const dy = end.top - start.top;
      ghost.style.transform = `translate(${dx}px, ${dy}px)`;
    });


    ghost.addEventListener('transitionend', () => {
      targetEl.innerHTML = '';
      targetEl.appendChild(card);
      card.style.visibility = 'visible';
      ghost.remove();
      res();
    }, { once: true });
  });
}


/**
 * Updates score and UI based on winner.
 * @param {string} winner - "player" or "ai"
 * @param {Object} playerCard
 * @param {Object} aiCard
 */
function updateScore(winner, playerCard, aiCard) {
  const winCard = winner === 'player' ? playerCard : aiCard;
  const container = winner === 'player' ? playerWonSlots : aiWonSlots;


  if (winner !== 'tie') {
    // Update DOM score
    const slot = container.querySelector(`#${winCard.type}-card`);
    const countSpan = slot.querySelector('span');
    const current = parseInt(countSpan.dataset.count || '0', 10);
    countSpan.dataset.count = current + 1;
    countSpan.textContent = `${winCard.type}: ${current + 1}`;


    // Update JS score
    if (winner === 'player') {
      playerScore[winCard.type]++;
    } else {
      aiScore[winCard.type]++;
    }


    // Check for win condition
    checkWinCondition();
  }
}

/**
 * Check if the user has won 3 times with same card type or 3 times each with different card type
 */
function checkWinCondition() {
  // Assume playerScore and aiScore are objects like:
  // { monument: <n>, dining: <n>, structure: <n> }
  const playerCounts = Object.values(playerScore);
  const aiCounts = Object.values(aiScore);

  // Case 1: player has at least one win of every type, check if every element in the array has count >=1
  const playerHasOneEach = playerCounts.every( (count) => count >= 1);
  const aiHasOneEach = aiCounts.every( (count)=> count >= 1);

  // Case 2: player has three wins of the same type for any types, check if any element in the array has count >=3
  const playerHasThreeSame = playerCounts.some( (count) => count >= 3);
  const aiHasThreeSame = aiCounts.some((count) => count >= 3);

  // If either condition is met, that side wins the game
  if (playerHasOneEach || playerHasThreeSame) {
    return endGame('player');
  }
  if (aiHasOneEach || aiHasThreeSame) {
    return endGame('ai');
  }
}


/**
 * Alert when winning condition is met
 */
function endGame(winner) {
  clearTimeout(timer);
  alert(`${winner === 'player' ? 'You win!' : 'AI wins!'} Game over.`);
 
  // Optionally disable further interaction
  const cards = document.querySelectorAll('.player-card');
  cards.forEach(card => card.replaceWith(card.cloneNode(true))); // removes event listeners


  // Or reload the page to restart:
  // location.reload();
}


/**
 * Starts or resets the round timer.
 */
function resetTimer() {
  clearTimeout(timer);
  timerEl.textContent = '60';
  let timeLeft = 60;


  const countdown = setInterval(() => {
    timeLeft--;
    timerEl.textContent = timeLeft;
    if (timeLeft <= 0) clearInterval(countdown);
  }, 1000);


  timer = setTimeout(() => {
    const randIdx = Math.floor(Math.random() * playerHand.length);
    const randCardId = playerHand[randIdx].id;
    playRound(randCardId);
  }, TIMER_LIMIT);
}


window.addEventListener('DOMContentLoaded', initGame);