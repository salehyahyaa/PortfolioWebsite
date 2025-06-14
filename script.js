function toggleMenu() {
  const menu = document.querySelector(".menu-links"); /*targetting this element*/ 
  const icon = document.querySelector(".hamburger-icon"); /*and targetting this element*/ 
  menu.classList.toggle("open"); /*so we can add or remove this class (open)*/ 
  icon.classList.toggle("open"); /*so we can add or remove this class (open)*/ 
}