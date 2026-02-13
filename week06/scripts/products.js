// scripts/products.js - Enhanced with loading animations
let allProducts = []; 

export async function loadProducts() {
  const container = document.getElementById('products-container');
  if (!container) return;

  // Show animated loading state
  container.innerHTML = `
    <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 2rem;">
      <div class="loading" style="display: inline-block; width: 50px; height: 50px; border-width: 5px; margin-bottom: 1rem;"></div>
      <p style="color: var(--text-light); font-size: 1.1rem; animation: pulse 1.5s ease infinite;">Loading solar gadgets...</p>
    </div>
  `;

  try {
    const response = await fetch('data/solar-gadget.json');
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    allProducts = data; // Save for filtering

    // Slight delay to show loading animation
    setTimeout(() => {
      renderProducts(data, container);
    }, 500);
  } catch (error) {
    console.error('Error loading products:', error);
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 3rem 2rem; animation: fadeIn 0.5s ease;">
        <p style="color: #d32f2f; font-size: 1.2rem; margin-bottom: 1rem;">⚠️ Failed to load products</p>
        <p style="color: var(--text-light);">Please check your connection or try again later.</p>
        <button onclick="location.reload()" style="margin-top: 1.5rem; padding: 0.8rem 1.6rem; background: var(--primary); color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 1rem;">
          Retry
        </button>
      </div>
    `;
  }
}

function renderProducts(products, container) {
  // Use map + template literals to create cards (meets array method & template req)
  const html = products.map((item, index) => `
    <article class="card" data-id="${item.id}" tabindex="0" role="button" 
             style="animation-delay: ${index * 0.1}s" 
             aria-label="View details for ${item.name}">
      <img src="${item.image}" alt="${item.name} solar gadget" loading="lazy" width="400" height="250">
      <div class="card-content">
        <h3>${item.name}</h3>
        <p><strong>Price:</strong> GH₵${item.price}</p>
        <p>${item.description}</p>
        <p style="color: var(--secondary); font-weight: 600;">
          ${'★'.repeat(Math.floor(item.rating))}${'☆'.repeat(5 - Math.floor(item.rating))} 
          ${item.rating}
        </p>
      </div>
    </article>
  `).join('');

  // Fade out old content, then fade in new
  container.style.opacity = '0';
  container.style.transform = 'translateY(20px)';
  
  setTimeout(() => {
    container.innerHTML = html;
    container.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    container.style.opacity = '1';
    container.style.transform = 'translateY(0)';
  }, 200);
}

export function setupProductEvents() {
  const container = document.getElementById('products-container');
  if (!container) return;

  // Card click or Enter key → open modal
  container.addEventListener('click', (e) => {
    const card = e.target.closest('.card');
    if (card) {
      // Add click animation
      card.style.transform = 'scale(0.98)';
      setTimeout(() => {
        card.style.transform = '';
      }, 150);

      const id = parseInt(card.dataset.id);
      const product = allProducts.find(p => p.id === id);
      if (product) {
        // Assuming openModal is available globally from modal.js
        if (typeof window.openModal === 'function') {
          window.openModal(product);
        }
      }
    }
  });

  // Keyboard accessibility for cards
  container.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      const card = e.target.closest('.card');
      if (card) card.click();
    }
  });

  // Filter buttons with animation
  const filterFansBtn = document.getElementById('filter-fans');
  const filterAllBtn = document.getElementById('filter-all');

  if (filterFansBtn) {
    filterFansBtn.addEventListener('click', () => {
      // Add active state
      filterFansBtn.style.background = '#004d2c';
      filterAllBtn.style.background = 'var(--primary)';

      const filtered = allProducts.filter(p => p.category === 'fan');
      
      if (filtered.length === 0) {
        container.innerHTML = `
          <div style="grid-column: 1 / -1; text-align: center; padding: 3rem 2rem; animation: fadeIn 0.5s ease;">
            <p style="font-size: 1.2rem; color: var(--text-light);">No fans found in the catalog</p>
          </div>
        `;
      } else {
        renderProducts(filtered, container);
      }
    });
  }

  if (filterAllBtn) {
    filterAllBtn.addEventListener('click', () => {
      // Add active state
      filterAllBtn.style.background = '#004d2c';
      filterFansBtn.style.background = 'var(--primary)';

      renderProducts(allProducts, container);
    });
  }
}