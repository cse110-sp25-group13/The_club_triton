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
  