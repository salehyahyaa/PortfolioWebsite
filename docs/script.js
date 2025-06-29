function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

/* -------------------------------------------------- WAVE EMOJI -------------------------------------------------- */

window.onload = () => {
  const waveEmoji = document.querySelector(".wave");

  waveEmoji.addEventListener("mouseenter", () => {
    console.log("hover detected");
    waveEmoji.style.animation = "waveAnimation 1.5s ease-in-out infinite";
  });

  waveEmoji.addEventListener("mouseleave", () => {
    waveEmoji.style.animation = "none";
  });
};