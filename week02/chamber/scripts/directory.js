// chamber/scripts/directory.js

async function loadMembers() {
  try {
    const response = await fetch('week02/chamber/data/members.json');
    if (!response.ok) throw new Error(`Failed to load members: ${response.status}`);
    const members = await response.json();
    displayMembers(members);
  } catch (error) {
    console.error('Error loading members:', error);
    document.getElementById('members').innerHTML = '<p style="color:red; text-align:center; padding:2rem;">Error loading members. Please try again later.</p>';
  }
}

function displayMembers(members) {
  const container = document.getElementById('members');
  container.innerHTML = '';

  members.forEach(member => {
    const card = document.createElement('div');
    card.classList.add('member-card');
    card.innerHTML = `
      <img src="images/${member.images}" alt="${member.name} business logo" loading="lazy">
      <h3>${member.name}</h3>
      <p><strong>Address:</strong> ${member.address}</p>
      <p><strong>Phone:</strong> ${member.phone}</p>
      <p><strong>Membership:</strong> ${member.membership}</p>
      <a href="${member.website}" target="_blank" rel="noopener noreferrer">Visit Website</a>
    `;
    container.appendChild(card);
  });
}

// Toggle grid/list view
const gridBtn = document.getElementById('gridBtn');
const listBtn = document.getElementById('listBtn');
const memberContainer = document.getElementById('members');

gridBtn.addEventListener('click', () => {
  memberContainer.classList.remove('list-view');
  gridBtn.classList.add('active');
  listBtn.classList.remove('active');
  gridBtn.setAttribute('aria-pressed', 'true');
  listBtn.setAttribute('aria-pressed', 'false');
});

listBtn.addEventListener('click', () => {
  memberContainer.classList.add('list-view');
  listBtn.classList.add('active');
  gridBtn.classList.remove('active');
  listBtn.setAttribute('aria-pressed', 'true');
  gridBtn.setAttribute('aria-pressed', 'false');
});

// Hamburger menu toggle (for mobile)
const menuBtn = document.getElementById('menuBtn');
const navMenu = document.getElementById('navMenu');
menuBtn.addEventListener('click', () => {
  navMenu.classList.toggle('show');
});

// Load members on page start
loadMembers();

// Dynamic footer dates
document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;