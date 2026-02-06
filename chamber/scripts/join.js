// join.js - Handle form submission and modals

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('joinForm');
  const timestampField = document.getElementById('timestamp');

  // Set timestamp when form is submitted
  if (form) {
    form.addEventListener('submit', (e) => {
      const now = new Date();
      timestampField.value = now.toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
    });
  }

  // Handle modal links
  const modalLinks = document.querySelectorAll('.modal-link');
  modalLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const modalId = link.getAttribute('href').substring(1);
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.showModal();
      }
    });
  });

  // Close modals when clicking close button
  const closeButtons = document.querySelectorAll('.close-modal');
  closeButtons.forEach(button => {
    button.addEventListener('click', () => {
      const modalId = button.getAttribute('data-modal');
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.close();
      }
    });
  });

  // Close modals when clicking backdrop
  const modals = document.querySelectorAll('dialog');
  modals.forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.close();
      }
    });
  });
});