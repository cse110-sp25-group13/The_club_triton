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
    // Update slides
    slides.forEach((slide, index) => {
      slide.classList.toggle("active", index === currentSlide);
    });

    // Update buttons
    const isFirstSlide = currentSlide === 0;
    const isLastSlide = currentSlide === totalSlides - 1;

    // Previous button
    prevBtn.disabled = isFirstSlide;
    prevBtn.querySelector("img").src = isFirstSlide
      ? "../imgs/icons/left-arrow-disabled.png"
      : "../imgs/icons/left-arrow-enabled.png";

    nextBtn.disabled = isLastSlide;
    nextBtn.querySelector("img").src = isLastSlide
      ? "../imgs/icons/right-arrow-disabled.png"
      : "../imgs/icons/right-arrow-enabled.png";

    // Update counter
    slideCounter.textContent = `${currentSlide + 1}/${totalSlides}`;

    // Debug log
    console.log("Next button state:", {
      disabled: nextBtn.disabled,
      src: nextBtn.querySelector("img").src,
    });
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
