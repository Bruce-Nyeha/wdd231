document.addEventListener('DOMContentLoaded', () => {
  const membersSection = document.getElementById('members');
  const gridBtn = document.getElementById('gridBtn');
  const listBtn = document.getElementById('listBtn');

  if (gridBtn && listBtn && membersSection) {
    gridBtn.addEventListener('click', () => {
      membersSection.classList.remove('list-view');
      gridBtn.classList.add('active');
      listBtn.classList.remove('active');
      gridBtn.setAttribute('aria-pressed', 'true');
      listBtn.setAttribute('aria-pressed', 'false');
    });

    listBtn.addEventListener('click', () => {
      membersSection.classList.add('list-view');
      listBtn.classList.add('active');
      gridBtn.classList.remove('active');
      listBtn.setAttribute('aria-pressed', 'true');
      gridBtn.setAttribute('aria-pressed', 'false');
    });
  }

  async function loadMembers() {
    try {
      const response = await fetch('week02/chamber/data/members.json');
      if (!response.ok) throw new Error('Failed to load members');
      const members = await response.json();
      displayMembers(members);
    } catch (error) {
      console.error('Members error:', error);
      membersSection.innerHTML = '<p>Members unavailable</p>';
    }
  }

  function displayMembers(members) {
    membersSection.innerHTML = '';
    members.forEach(member => {
      const card = document.createElement('div');
      card.classList.add('member-card');
      card.innerHTML = `
        <img src="images/${member.images}" alt="${member.name}" loading="lazy">
        <h3>${member.name}</h3>
        <p>${member.address}</p>
        <p>${member.phone}</p>
        <a href="${member.website}" target="_blank">Visit Website</a>
        <p><strong>Membership:</strong> ${member.membership}</p>
      `;
      membersSection.appendChild(card);
    });
  }

  loadMembers();
});