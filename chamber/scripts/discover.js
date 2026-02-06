import { discoverItems } from '../data/discover-items.mjs';

// 1. Visit message with localStorage
const visitMsg = document.getElementById('visit-message');
const lastVisit = localStorage.getItem('lastVisit');
const now = Date.now();

if (!lastVisit) {
  visitMsg.textContent = 'Welcome! Let us know if you have any questions.';
} else {
  const daysDiff = Math.floor((now - lastVisit) / (1000 * 60 * 60 * 24));
  if (daysDiff < 1) {
    visitMsg.textContent = 'Back so soon! Awesome!';
  } else {
    visitMsg.textContent = `You last visited ${daysDiff} ${daysDiff === 1 ? 'day' : 'days'} ago.`;
  }
}
localStorage.setItem('lastVisit', now);

// 2. Generate cards
const grid = document.querySelector('.discover-grid');

discoverItems.forEach(item => {
  const card = document.createElement('div');
  card.className = 'discover-card';
  card.innerHTML = `
    <h2>${item.name}</h2>
    <figure>
      <img src="${item.image}" alt="${item.name}" loading="lazy" width="300" height="200">
      <figcaption>${item.address}</figcaption>
    </figure>
    <p>${item.description}</p>
    <button>Learn More</button>
  `;
  grid.appendChild(card);
});