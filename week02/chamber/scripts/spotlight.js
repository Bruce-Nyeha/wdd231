// scripts/spotlight.js

async function loadSpotlights() {
  try {
    const response = await fetch('data/members.json');
    if (!response.ok) throw new Error('Failed to load members');
    const members = await response.json();

    // Filter only Gold (3) and Silver (2) members
    const qualified = members.filter(m => m.membership === 'Gold' || m.membership === 'Silver');

    // Shuffle and take 2–3
    qualified.sort(() => Math.random() - 0.5);
    const selected = qualified.slice(0, Math.floor(Math.random() * 2) + 2); // 2 or 3

    displaySpotlights(selected);
  } catch (error) {
    console.error('Error loading spotlights:', error);
    document.getElementById('spotlight-container').innerHTML = '<p>Spotlights unavailable</p>';
  }
}

function displaySpotlights(members) {
  const container = document.getElementById('spotlight-container');
  container.innerHTML = '';

  members.forEach(member => {
    const card = document.createElement('div');
    card.classList.add('spotlight-card');
    card.innerHTML = `
      <img src="images/${member.image}" alt="${member.name}" loading="lazy">
      <h3>${member.name}</h3>
      <p>${member.address}</p>
      <p>${member.phone}</p>
      <a href="${member.website}" target="_blank">Visit Website</a>
      <p><strong>Membership:</strong> ${member.membership}</p>
    `;
    container.appendChild(card);
  });
}


menuBtn.addEventListener('click', () => navMenu.classList.toggle('show'));

// Run when page loads
loadSpotlights();