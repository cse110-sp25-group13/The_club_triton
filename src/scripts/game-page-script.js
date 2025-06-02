// This script handles the game page functionality, including the timer and projector screen interactions.
function startTimer(duration) {
  const timerElement = document.querySelector('.timer');
  let timeLeft = duration;
  let timerInterval;
  
  function updateTimer() {
      const seconds = timeLeft % 60;
      timerElement.textContent = `${seconds}`;
      
      // Update the red/green percentage
      const percentage = 100 - (timeLeft / duration * 100);
      timerElement.style.setProperty('--percentage', `${percentage}%`);
      
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

window.addEventListener("DOMContentLoaded", () => {
    const hitbox = document.getElementById("projector-hitbox");
    const screen = document.getElementById("projector-screen");
  
    hitbox.addEventListener("mouseenter", () => {
      screen.classList.add("show");
    });
  
    hitbox.addEventListener("mouseleave", () => {
      screen.classList.remove("show");
    });
  });
  