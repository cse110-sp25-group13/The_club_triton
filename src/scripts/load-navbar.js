document.addEventListener("DOMContentLoaded", () => {
  const navbarContainer = document.getElementById("navbar-container");

  fetch("../pages/navbar.html")
    .then((res) => res.text())
    .then((html) => {
      navbarContainer.innerHTML = html;
    })
    .catch((err) => {
      console.error("Navbar failed to load:", err);
    });
});
