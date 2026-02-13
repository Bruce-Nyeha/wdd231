
export function initNavigationAndDarkMode() {
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('main-nav');
  const darkToggle = document.getElementById('dark-mode-toggle');

  if (hamburger && nav) {
    hamburger.addEventListener('click', () => {
      nav.classList.toggle('show');
      const isExpanded = nav.classList.contains('show');
      hamburger.setAttribute('aria-expanded', isExpanded);
      nav.setAttribute('aria-hidden', !isExpanded);
    });
  }

  if (darkToggle) {
    // Load saved preference
    if (localStorage.getItem('darkMode') === 'enabled') {
      document.body.classList.add('dark');
    }

    darkToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark');
      if (document.body.classList.contains('dark')) {
        localStorage.setItem('darkMode', 'enabled');
      } else {
        localStorage.setItem('darkMode', 'disabled');
      }
    });
  }
}