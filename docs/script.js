function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

/* WAVE EMOJI - FORCE ANIMATION ON ANY TAP */
window.onload = () => {
  const waveEmoji = document.querySelector(".wave");

const startWaving = () => {
  waveEmoji.style.animation = "waveAnimation 1.5s ease-in-out infinite";
  setTimeout(() => {
    waveEmoji.style.animation = "none";
  }, 3000); // waves for 3 sec
};

  // Always start on click or touch
  waveEmoji.addEventListener("click", startWaving);
  waveEmoji.addEventListener("touchstart", (e) => {
    e.preventDefault();
    startWaving();
  }, { passive: false });
};

