// window.addEventListener("DOMContentLoaded", () => {
//   const projector = document.getElementById("projector");
//   const screen = document.getElementById("projector-screen");

//   projector.addEventListener("click", () => {
//     screen.classList.add("show");
//   });
//   const projectorScreen = document.getElementById('projector-screen');

//   projectorScreen.addEventListener('click', () => {
//     projector.classList.remove('show');
//   });
// });
document.addEventListener("DOMContentLoaded", function () {
  // Get elements
  const screen = document.getElementById("projector-screen");
  const screenHandle = document.querySelector(".screen-handle");
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");
  const slides = document.querySelectorAll(".slide");
  const slideCounter = document.querySelector(".slide-counter");
  // State
  let currentSlide = 0;
  const totalSlides = slides.length;
  // Make screen clickable and stop event propagation
  screen.addEventListener("click", function (e) {
    e.stopPropagation(); // Prevent clicks from going through
  });

  // Handle click - toggle screen
  screenHandle.addEventListener("click", function (e) {
    e.stopPropagation();
    screen.classList.toggle("show");

    // Reset to first slide when opening
    if (screen.classList.contains("show")) {
      currentSlide = 0;
      updateSlide();
    }
  });
  // Update slide and counter
  function updateSlide() {
    // Update slides visibility
    slides.forEach((slide, index) => {
      slide.classList.toggle("active", index === currentSlide);
    });

    // Update buttons state
    prevBtn.disabled = currentSlide === 0;
    nextBtn.disabled = currentSlide === totalSlides - 1;

    // Update counter - Add these lines
    if (slideCounter) {
      slideCounter.textContent = `${currentSlide + 1}/${totalSlides}`;
    }
  }
  function nextSlide(e) {
    e.stopPropagation();
    if (currentSlide < totalSlides - 1) {
      currentSlide++;
      updateSlide();
    }
  }

  function prevSlide(e) {
    e.stopPropagation();
    if (currentSlide > 0) {
      currentSlide--;
      updateSlide();
    }
  }

  // Button events
  prevBtn.addEventListener("click", prevSlide);
  nextBtn.addEventListener("click", nextSlide);

  // Initialize
  updateSlide();
});
