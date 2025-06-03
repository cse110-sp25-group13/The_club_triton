/**
 * @file script.js
 * @description Core logic for UCSD College Card Compare game.
 * Implements card drawing, comparison, and round resolution.
 * Dependencies: IndexedDB module in card-system.js
 */

let roundInProgress = false;
import "../card/triton-card.js";
import { initDB, getAllCards } from "./card-system.js";
const CARDBACK_PATH = "src/card/card-back.png";
const MAX_CARDS = 5;

let deck = [];
let playerHand = [];
let aiHand = [];
let playerScore = { Structure: 0, Living: 0, Dining: 0 };
let aiScore = { Structure: 0, Living: 0, Dining: 0 };
const MAX_TIME = 60;

const typeBeats = {
  Living: "Dining",
  Dining: "Structure",
  Structure: "Living",
};

// UI elements
const playerDeckEl = Array.from(
  document.querySelectorAll(".student-deck .student-cards td"),
);
const aiDeckEl = Array.from(
  document.querySelectorAll(".prof-deck .prof-cards td"),
);

const playerWonSlots = document.querySelector(".student-won-cards");
const aiWonSlots = document.querySelector(".prof-won-cards");

const chosenPlayerSlot = document.querySelector(".chosen-student-card");
const chosenAiSlot = document.querySelector(".chosen-prof-card");

const timerEl = document.querySelector(".timer");

/**
 * Initializes the game, loads cards, deals initial hands.
 */
async function initGame() {
  await initDB();
  deck = await getAllCards();

  // grab 5 student and AI cells once
  const studentSlots = Array.from(
    document.querySelectorAll(".student-deck .student-cards td"),
  );
  const aiSlots = Array.from(
    document.querySelectorAll(".prof-deck .prof-cards td"),
  );

  // clear out their placeholder text
  studentSlots.forEach((td) => (td.textContent = ""));
  aiSlots.forEach((td) => (td.textContent = ""));

  playerHand = drawCards(MAX_CARDS, false);
  aiHand = drawCards(MAX_CARDS, true);
  resetTimer();
}

/**
 * Draw a number of random cards from the deck. Give a new card from library to the ai and player, if the ai =true, change card img to a back of card img to hide the AI card
 * @param {number} count - Number of cards to draw
 * @param {boolean} ai - are we trying to draw card for ai
 * @returns {Array<Object>} Array of card objects
 */

function drawCards(count, ai) {
  const hand = [];
  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * deck.length);
    const cardObj = deck[randomIndex];
    hand.push(cardObj);
    //remove index from deck so can't be drawn again
    deck.splice(randomIndex, 1);
    //create triton card el
    const tritonCard = document.createElement("triton-card");
    tritonCard.id = `tritonCard-${cardObj.id}`;
    //tritonCard.back_image = cardObj.back_image_placeholder;
    tritonCard.name = cardObj.name;
    tritonCard.rank = cardObj.ranking;
    tritonCard.type = cardObj.type;
    tritonCard.description = cardObj.description;
    tritonCard.rarity = cardObj.rarity;

    if (ai) {
      let targetSlot = aiDeckEl[i];
      if (targetSlot.querySelector("triton-card")) {
        targetSlot = aiDeckEl.find(
          (slot) => !slot.querySelector("triton-card"),
        );
      }
      if (targetSlot) {
        //can you make it not show any info on the cards? supposed to be unknown to player?
        tritonCard.front_image = cardObj.front_image_placeholder;
        targetSlot.appendChild(tritonCard);
      }
    } else {
      tritonCard.addEventListener("click", () => {
        playRound(cardObj.id);
      });
      let targetSlot = playerDeckEl[i];

      if (targetSlot.querySelector("triton-card")) {
        targetSlot = playerDeckEl.find(
          (slot) => !slot.querySelector("triton-card"),
        );
      }
      if (targetSlot) {
        // uncomment whenever the img path works
        tritonCard.front_image = cardObj.front_image_placeholder;
        targetSlot.appendChild(tritonCard);
      }
    }
  }
  return hand;
}

/**
 * Handles card selection by player and executes round logic.
 * @param {string} playerCardId - ID of the selected card in playerHand
 */
async function playRound(playerCardId) {
  console.log(
    "[playRound] called with",
    playerCardId,
    "roundInProgress=",
    roundInProgress,
  );
  if (roundInProgress) return;
  roundInProgress = true;
  console.log("%c[playRound] start", "color: blue", {
    playerCardId,
    playerHand,
    aiHand,
  });

  // Find and remove card from hand
  const playerIdx = playerHand.findIndex((tc) => tc.id === playerCardId);
  console.log("[playRound] playerIdx =", playerIdx);
  const playerCard = playerHand.splice(playerIdx, 1)[0];
  console.log(
    "[playRound] drew playerCard =",
    playerCard,
    "remaining hand:",
    playerHand,
  );

  // Pick and remove AI card
  const aiIdx = Math.floor(Math.random() * aiHand.length);
  console.log("[playRound] aiIdx =", aiIdx);
  const aiCard = aiHand.splice(aiIdx, 1)[0];
  console.log("[playRound] drew aiCard =", aiCard, "remaining aiHand:", aiHand);

  // Animate player card moving
  const playerCardEl = document.getElementById(`tritonCard-${playerCard.id}`);
  console.log(
    "[playRound] animate player from",
    playerCardEl,
    "to",
    chosenPlayerSlot,
  );
  try {
    await animateCardMove(playerCardEl, chosenPlayerSlot);
    console.log("[playRound] player animation done");
  } catch (err) {
    console.error("[playRound] player animation error", err);
  }
  // Removes the player card from hand to replenish
  //removeCardFromSlot(playerCard.id, playerDeckEl);

  // Animate AI card moving
  const aiCardEl = document.getElementById(`tritonCard-${aiCard.id}`);
  console.log("[playRound] animate AI from", aiCardEl, "to", chosenAiSlot);
  try {
    await animateCardMove(aiCardEl, chosenAiSlot);
    console.log("[playRound] AI animation done");
  } catch (err) {
    console.error("[playRound] AI animation error", err);
  }
  // Removes the ai card from hand to replenish
  //removeCardFromSlot(aiCard.id, aiDeckEl);

  // Reveal AI card front
  console.log("[playRound] reveal AI front image");
  //aiCardEl.front_image = aiCard.front_image_placeholder;

  // Determine winner
  const winner = determineWinner(playerCard, aiCard);
  console.log("[playRound] winner is", winner);

  // Update score
  updateScore(winner, playerCard, aiCard);
  console.log("[playRound] scores updated", { playerScore, aiScore });

  // Draw replacement cards
  console.log("[playRound] drawing replacements");
  const newPlayer = drawCards(1, false);
  console.log("[playRound] newPlayer cards:", newPlayer);
  playerHand.push(...newPlayer);
  const newAi = drawCards(1, true);
  console.log("[playRound] newAi cards:", newAi);
  aiHand.push(...newAi);

  // Reset timer
  console.log("[playRound] resetting timer");
  resetTimer();
  console.log("%c[playRound] end", "color: blue");
  roundInProgress = false;
}

/**
 * Actually removes the card from the hand
 * @param {*} cardId
 * @param {*} deckEl
 */
function removeCardFromSlot(cardId, deckEl) {
  deckEl.forEach((slot) => {
    const card = slot.querySelector(`#tritonCard-${cardId}`);
    if (card) card.remove();
  });
}

/**
 * Determines the winner between two cards.
 * @param {Object} playerCard
 * @param {Object} aiCard
 * @returns {"player"|"ai"|"tie"}
 */
function determineWinner(playerCard, aiCard) {
  if (playerCard.type === aiCard.type) {
    if (playerCard.ranking > aiCard.ranking) return "player";
    if (aiCard.ranking > playerCard.ranking) return "ai";
    return "tie";
  }
  return typeBeats[playerCard.type] === aiCard.type ? "player" : "ai";
}

//* sliding animation
function animateCardMove(card, targetEl) {
  console.log("[animateCardMove] called", { card, targetEl });

  return new Promise((res) => {
    if (!card) {
      console.error("[animateCardMove] ⚠️ card is null!");
      return res();
    }
    if (!targetEl) {
      console.error("[animateCardMove] ⚠️ targetEl is null!");
      return res();
    }

    // capture start/end positions
    const start = card.getBoundingClientRect();
    const end = targetEl.getBoundingClientRect();
    console.log("[animateCardMove] start/end rects", { start, end });

    // clone & style the ghost
    const ghost = card.cloneNode(true);
    Object.assign(ghost.style, {
      position: "fixed",
      top: `${start.top}px`,
      left: `${start.left}px`,
      width: `${start.width}px`,
      height: `${start.height}px`,
      transition: "transform 0.4s ease-out",
      zIndex: "1000",
    });
    document.body.appendChild(ghost);
    console.log("[animateCardMove] ghost appended");

    // hide original
    card.style.visibility = "hidden";

    // Force a reflow so the browser "sees" the starting position
    // before we change transform
    // (sometimes necessary to kick off the transition)
    // eslint-disable-next-line no-unused-expressions
    ghost.getBoundingClientRect();

    // apply the transform on the next frame
    requestAnimationFrame(() => {
      const dx = end.left - start.left;
      const dy = end.top - start.top;
      console.log("[animateCardMove] applying transform", { dx, dy });
      ghost.style.transform = `translate(${dx}px, ${dy}px)`;
    });

    // when the transition ends, move the real card into place
    const cleanup = () => {
      if (card.dataset.front) {
        // This line invokes the triton-card’s own setter, which lives in Shadow DOM
        card.front_image = card.dataset.front;
      }
      console.log("[animateCardMove] transitionend → cleaning up");
      const existingCard = targetEl.querySelector("triton-card");
      //make sure the card is non empty as well as not the card we are trying to animat
      // then remove old card
      if (existingCard && existingCard !== card) existingCard.remove();
      targetEl.appendChild(card);
      card.style.visibility = "visible";
      ghost.remove();
      res();
    };

    ghost.addEventListener("transitionend", cleanup, { once: true });

    // fallback in case transitionend never fires
    setTimeout(() => {
      if (document.body.contains(ghost)) {
        console.warn("[animateCardMove] ⚠️ fallback timeout, forcing cleanup");
        cleanup();
      }
    }, 1000);
  });
}
//*/

/**
 * Updates score and UI based on winner.
 * @param {string} winner - "player" or "ai"
 * @param {Object} playerCard
 * @param {Object} aiCard
 */
function updateScore(winner, playerCard, aiCard) {
  const winCard = winner === "player" ? playerCard : aiCard;
  if (winner !== "tie") {
    // Update JS score
    if (winner === "player") {
      playerScore[winCard.type]++;
    } else {
      aiScore[winCard.type]++;
    }

    // Update DOM
    updateScoreDisplay();

    // Check for win condition
    checkWinCondition();
  }
}

/**
 * Updates DOM for game page score display
 */
function updateScoreDisplay() {
  const typeToId = {
    Structure: {
      player: "student-structure-card",
      ai: "prof-structure-card",
    },
    Living: {
      player: "student-living-card",
      ai: "prof-living-card",
    },
    Dining: {
      player: "student-dining-hall-card",
      ai: "prof-dining-hall-card",
    },
  };

  for (const type in typeToId) {
    const playerEl = document.getElementById(typeToId[type].player);
    const aiEl = document.getElementById(typeToId[type].ai);

    if (playerEl) {
      playerEl.textContent = playerScore[type];
    }
    if (aiEl) {
      aiEl.textContent = aiScore[type];
    }
  }
}

/**
 * Check if the user has won 3 times with same card type or 3 times each with different card type
 * @returns {"player" | "ai" | undefined}
 */
function checkWinCondition() {
  // playerScore and aiScore are objects like:
  // { living: <n>, dining: <n>, structure: <n> }
  const playerCounts = Object.values(playerScore);
  const aiCounts = Object.values(aiScore);

  // Case 1: player has at least one win of every type, check if every element in the array has count >=1
  const playerHasOneEach = playerCounts.every((count) => count >= 1);
  const aiHasOneEach = aiCounts.every((count) => count >= 1);

  // Case 2: player has three wins of the same type for any types, check if any element in the array has count >=3
  const playerHasThreeSame = playerCounts.some((count) => count >= 3);
  const aiHasThreeSame = aiCounts.some((count) => count >= 3);

  // If either condition is met, that side wins the game
  if (playerHasOneEach || playerHasThreeSame) {
    return endGame("player");
  }
  if (aiHasOneEach || aiHasThreeSame) {
    return endGame("ai");
  }
}

/**
 * Alert when winning condition is met
 * @param {string} winner - "player" or "ai"
 */
function endGame(winner) {
  clearInterval(countdownInterval);
  clearTimeout(autoPlayTimeout);
  alert(`${winner === "player" ? "You win!" : "AI wins!"} Game over.`);
  location.reload();
}

/**
 * Starts or resets the round timer.
 */
let countdownInterval = null;
let autoPlayTimeout = null;
function resetTimer() {
  console.log("[resetTimer] scheduling autoPlay in", MAX_TIME, "sec");
  // 1) clear both previous timers
  clearInterval(countdownInterval);
  clearTimeout(autoPlayTimeout);

  // 2) reset the display
  let timeLeft = MAX_TIME;
  timerEl.textContent = timeLeft;

  // 3) start the countdown interval
  countdownInterval = setInterval(() => {
    timeLeft--;
    timerEl.textContent = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(countdownInterval);
    }
    const percentage = ((60 - timeLeft) / 60) * 100;
    timerEl.style.setProperty("--percentage", `${percentage}%`);
  }, 1000);

  // 4) schedule the auto-play fallback in 60s
  autoPlayTimeout = setTimeout(() => {
    clearInterval(countdownInterval);
    // pick a random card if the player never moved
    const randIdx = Math.floor(Math.random() * playerHand.length);
    const randCardId = playerHand[randIdx].id;
    playRound(randCardId);
  }, MAX_TIME * 1000);
}

window.addEventListener("DOMContentLoaded", initGame);
export {
  determineWinner,
  updateScore,
  playerScore,
  aiScore,
  typeBeats,
  drawCards,
  deck,
  playerDeckEl,
  aiDeckEl,
  CARDBACK_PATH,
};

// exit button
function exitGame() {
  if (confirm("Return to Home Page?")) {
    window.location.href = "home-page.html";
  }
}
