// scripts/main.js
document.addEventListener("DOMContentLoaded", function () {
  // Current year
  document.getElementById("year").textContent = new Date().getFullYear();

  // Last Modified
  const lastMod = document.getElementById("lastModified");
  if (lastMod) {
    lastMod.textContent = document.lastModified;
  }
});