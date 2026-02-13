import { initNavigationAndDarkMode } from './nav.js';
import { loadProducts, setupProductEvents } from './products.js';
import { setupModal } from './modal.js';
import { setupForm } from './form.js';

document.addEventListener('DOMContentLoaded', () => {
  initNavigationAndDarkMode();

  
  if (document.getElementById('products-container')) {
    loadProducts();
    setupProductEvents(); 
  }


  setupModal();

  // Setup form if on tips page
  if (document.getElementById('contact-form')) {
    setupForm();
  }

  // Display submitted data on thankyou page
  if (window.location.pathname.includes('thankyou.html')) {
    displaySubmittedData();
  }

  console.log('All modules initialized!');
});

import { loadWeather } from './weather.js';
// ...
if (document.querySelector('.weather-widget')) {
  loadWeather();
}