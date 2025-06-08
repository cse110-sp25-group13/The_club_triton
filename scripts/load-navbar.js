document.addEventListener("DOMContentLoaded", () => {
  const navbarContainer = document.getElementById("navbar-container");

  fetch("../pages/navbar.html")
    .then((res) => res.text())
    .then((html) => {
      navbarContainer.innerHTML = html;
      // Dispatch event so collection-page knows navbar is ready
      document.dispatchEvent(new Event("navbar-loaded"));
    })
    .catch((err) => {
      console.error("Navbar failed to load:", err);
    });
});
