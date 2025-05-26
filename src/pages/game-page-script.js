function startTimer(duration) {
const timerElement = document.querySelector(".timer");
let timeLeft = duration;
let timerInterval;

function updateTimer() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerElement.textContent = `${seconds}`;

    // Update the red/green percentage
    const percentage = 100 - (timeLeft / duration) * 100;
    timerElement.style.setProperty("--percentage", `${percentage}%`);

    if (timeLeft <= 0) {
    clearInterval(timerInterval);
    timerElement.textContent = "0";
    // Add any end-of-game logic here
    }
    timeLeft--;
}

// Initial call
updateTimer();
// Set interval for countdown
timerInterval = setInterval(updateTimer, 1000);
}

// Start 60-second timer when page loads
window.addEventListener("DOMContentLoaded", () => {
startTimer(60);
});
document.getElementById("exit-btn")
.addEventListener("click", function () {
    if (confirm("Are you sure you want to exit to the lobby?")) {
    window.location.href = "home-page.html";
    }
    // If "No" is clicked, nothing happens (game continues)
});


document.addEventListener('DOMContentLoaded', () => {
// Get all student cards
const studentCards = document.querySelectorAll('.student-cards .card');

studentCards.forEach(card => {
    card.addEventListener('click', handleCardSelection);
});

function handleCardSelection(e) {
    const selectedCard = e.currentTarget;
    
    // Disable further clicks during animation
    studentCards.forEach(card => {
    card.style.pointerEvents = 'none';
    });

    // Get corresponding professor card (same index)
    const cardIndex = selectedCard.id.split('-')[2];
    const profCard = document.getElementById(`prof-card-${cardIndex}`);
    
    // Animate both cards to comparison slots
    animateCardToSlot(selectedCard, '.chosen-student-card');
    animateCardToSlot(profCard, '.chosen-prof-card', true);
}

function animateCardToSlot(card, slotSelector, shouldFlip = false) {
    const slot = document.querySelector(slotSelector);
    const cardRect = card.getBoundingClientRect();
    const slotRect = slot.getBoundingClientRect();
    
    // Create a moving clone of the card
    const movingCard = card.cloneNode(true);
    movingCard.classList.add('moving');
    movingCard.style.left = `${cardRect.left}px`;
    movingCard.style.top = `${cardRect.top}px`;
    movingCard.style.width = `${cardRect.width}px`;
    movingCard.style.height = `${cardRect.height}px`;
    
    document.body.appendChild(movingCard);
    
    // Animate to slot
    setTimeout(() => {
    movingCard.style.left = `${slotRect.left}px`;
    movingCard.style.top = `${slotRect.top}px`;
    movingCard.style.width = `${slotRect.width}px`;
    movingCard.style.height = `${slotRect.height}px`;
    
    if (shouldFlip) {
        setTimeout(() => {
        movingCard.querySelector('.card').classList.add('flipped');
        }, 250);
    }
    
    // Clean up after animation
    setTimeout(() => {
        slot.innerHTML = '';
        slot.appendChild(movingCard.querySelector('.card'));
        movingCard.remove();
    }, 500);
    }, 10);
}
});