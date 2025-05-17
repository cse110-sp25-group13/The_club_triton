import { cardLibrary } from './cards.js';
const aiDeck=document.querySelector('#ai_deck');
const playerDeck = document.querySelector('#player_deck')
const CARDBACK_PATH = "./img/card_back.jpg";
const MAXCARD = 5;
const pull_button = document.getElementById("pull_card");
 //get a copy of the card library
const deck=[...cardLibrary];
const play_button = document.getElementById('play');
/*

When the player click a card, the AI will randomly pick one card from their deck
When the player click a card from their deck box or "hand", that card will be move 
to the table and compare values with AI's Card 
When the player click a card, it should disappear
 (since it move to the table) from their deck box,
  and a new random card will be refilled from the player inventory deck
*/ 

/*
Init the state of the game including 
1. give player 5 cards
2. give the AI 5 cards
3. start the point counter
*/

function init(){
// init 5 player cards
// init 5 ai cards
// init_counter of score
localStorage.setItem('ai_counter');
localStorage.setItem('player-counter');

//get placeholder for the turned down image
getPlayerCard();
getAiCard();
}
/*
Get player 5 cards from card library
*/
function getPlayerCard(){
    for(let i=0; i< 5; i++){
       refillCard();  
    }
}
/*
get 5 random ai card, just randomly draw 5 card in library, same logic for refill card for ai
*/
function getAiCard(){
    for(let i=0; i<5;i++){
        const card = document.createElement('play-card');
        card.src  = CARDBACK_PATH;
        card.class = 'card';
        aiDeck.appendChild(card);
        
    }
}
/* show the card been picked by player and ai
move the card to desired place on the screen
remove card from the player hand and append the card to new target element
*/
function animateCardMove(){
//some animation and get resusult 
    return new Promise((res)=>{
        const start = card.getBoundingClientRect();
        const end = targetEl.getBoundingClientRect();
        const ghost = card.cloneNode(true);
        ghost.style.position='fixed';
        ghost.style.top=start.top+'px';
        ghost.style.left=start.left+'px';
        ghost.style.width=start.width+'px';
        ghost.style.transition='transform .4 ease-out';
        document.body.appendChild(ghost);

        card.syle.visibility='hidden';
        requestAnimationFrame(()=>{
            ghost.style.transform='translate( ${end.left-start.left}px, ${end.top-start.top}px)';
        });
        ghost.addEventListener("transitioned",()=>{
            targetEl.innerHTML="";
            targetEl.appendChild(card);
            card.style.visibility='visible';
            ghost.remove();
            res();
        },{once: true}
        );
    });
}
function delay(ms) {
  return new Promise((res) => setTimeout(res, ms));
}

/*
give a new card from library to the ai and player
*/
function refillCard(){
    //basically pull card()
    if(player_deck.children<MAXCARD){
    //random one card in the library, we agreed during meeting it gonna be 15
    const index = Math.floor(Math.random()*deck.lenth);
    // splice index,1 give us a 2d array [ [type,rank,img] ], so[0]pick first element
    const {type, rank, img} = deck.splice(index,1)[0];

    const card = document.createElement('play-card');
    //assume the card obj has the following fields: img, type: mounuments, dining, living, 
    // rank: internal rank of each type, className, id 
    card.src = img;
    card.type =type;
    card.value = rank;
    card.className = "card player-card";
    card.id='player_card_'+i;
    card.addEventListener('click', ()=>getResult(card));
    player_deck.appendChild(card);
    }

}

