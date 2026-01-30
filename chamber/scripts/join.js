document.addEventListener('DOMContentLoaded', () => {
  // Timestamp hidden field
  document.getElementById('timestamp').value = new Date().toISOString();

  // Card fade-in animation on load
  const cards = document.querySelectorAll('.membership-cards .card');
  cards.forEach((card, index) => {
    card.style.opacity = 0;
    card.style.transform = 'translateY(20px)';
    setTimeout(() => {
      card.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
      card.style.opacity = 1;
      card.style.transform = 'translateY(0)';
    }, index * 200);
  });

  // Modal open/close
  document.querySelectorAll('.modal-link').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const modalId = link.getAttribute('href').substring(1);
      document.getElementById(modalId).showModal();
    });
  });
});