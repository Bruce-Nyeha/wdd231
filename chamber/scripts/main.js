// main.js - Common functionality for all pages

document.addEventListener('DOMContentLoaded', () => {
  // Footer dates
  const yearSpan = document.getElementById("year");
  const lastModifiedSpan = document.getElementById("lastModified");
  
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
  
  if (lastModifiedSpan) {
    lastModifiedSpan.textContent = document.lastModified;
  }

  // Hamburger menu toggle
  const menuBtn = document.getElementById('menuBtn');
  const navMenu = document.querySelector('navMenu');

  if (menuBtn && navMenu) {
    menuBtn.addEventListener('click', () => {
      navMenu.classList.toggle('show');
      
      // Change hamburger icon to X when open
      if (navMenu.classList.contains('show')) {
        menuBtn.textContent = '✕';
        menuBtn.setAttribute('aria-label', 'Close navigation menu');
      } else {
        menuBtn.textContent = '☰';
        menuBtn.setAttribute('aria-label', 'Toggle navigation menu');
      }
    });
  }
});