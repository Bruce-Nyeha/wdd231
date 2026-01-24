async function loadSpotlights() {
  try {
    const response = await fetch('week02/chamber/data/members.json');
    if (!response.ok) throw new Error('Failed to load members');
    const members = await response.json();

    const qualified = members.filter(m => m.membership === 'Gold' || m.membership === 'Silver');
    qualified.sort(() => Math.random() - 0.5);
    const selected = qualified.slice(0, Math.floor(Math.random() * 2) + 2);

    displaySpotlights(selected);
  } catch (error) {
    console.error('Spotlight error:', error);
    document.getElementById('spotlight-container').innerHTML = '<p>Spotlights unavailable</p>';
  }
}

function displaySpotlights(members) {
  const container = document.getElementById('spotlight-container');
  container.innerHTML = '';

  members.forEach(member => {
    const card = document.createElement('div');
    card.classList.add('spotlight-card');
    const imageSrc = member.images ? `images/${member.images}` : 'images/placeholder.jpg';
    card.innerHTML = `
      <img src="${imageSrc}" alt="${member.name || 'Member'}" loading="lazy">
      <h3>${member.name || 'Unnamed Member'}</h3>
      <p>${member.address || 'No address'}</p>
      <p>${member.phone || 'No phone'}</p>
      <a href="${member.website || '#'}" target="_blank">Visit Website</a>
      <p><strong>Membership:</strong> ${member.membership || 'N/A'}</p>
    `;
    container.appendChild(card);
  });
}

loadSpotlights();