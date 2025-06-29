function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

/* -------------------------------------------------- WAVE EMOJI -------------------------------------------------- */

window.onload = () => {
  const waveEmoji = document.querySelector(".wave");

  let waving = false;

  const startWaving = () => {
    waveEmoji.style.animation = "waveAnimation 1.5s ease-in-out infinite";
    waving = true;
  };

  const stopWaving = () => {
    waveEmoji.style.animation = "none";
    waving = false;
  };

  // Desktop hover
  waveEmoji.addEventListener("mouseenter", startWaving);
  waveEmoji.addEventListener("mouseleave", stopWaving);

  // Mobile tap toggle
  waveEmoji.addEventListener("click", () => {
    if (waving) {
      stopWaving();
    } else {
      startWaving();
    }
  });
};