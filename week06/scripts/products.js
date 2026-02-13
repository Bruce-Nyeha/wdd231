
// scripts/products.js
let allProducts = []; // Store data globally for filtering

export async function loadProducts() {
  const container = document.getElementById('products-container');
  if (!container) return;

  container.innerHTML = '<p>Loading solar gadgets...</p>';

  try {
    const response = await fetch('data/solar-gadget.json');
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    allProducts = data; // Save for filtering

    renderProducts(data, container);
  } catch (error) {
    console.error('Error loading products:', error);
    container.innerHTML = '<p style="color: red;">Failed to load products. Check your JSON file or network.</p>';
  }
}

function renderProducts(products, container) {
  // Use map + template literals to create cards (meets array method & template req)
  const html = products.map(item => `
    <article class="card" data-id="${item.id}" tabindex="0" role="button">
      <img src="${item.image}" alt="${item.name} solar gadget" loading="lazy" width="400" height="250">
      <div class="card-content">
        <h3>${item.name}</h3>
        <p><strong>Price:</strong> GH₵${item.price}</p>
        <p>${item.description}</p>
        <p>Rating: ${item.rating} ★</p>
      </div>
    </article>
  `).join('');

  container.innerHTML = html;
}

export function setupProductEvents() {
  const container = document.getElementById('products-container');
  if (!container) return;

  // Card click or Enter key → open modal
  container.addEventListener('click', (e) => {
    const card = e.target.closest('.card');
    if (card) {
      const id = parseInt(card.dataset.id);
      const product = allProducts.find(p => p.id === id);
      if (product) openModal(product); // Call modal function from modal.js
    }
  });

  // Keyboard accessibility for cards
  container.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const card = e.target.closest('.card');
      if (card) card.click();
    }
  });

  // Filter buttons (example: meets another array method use)
  const filterFansBtn = document.getElementById('filter-fans');
  const filterAllBtn = document.getElementById('filter-all');

  if (filterFansBtn) {
    filterFansBtn.addEventListener('click', () => {
      const filtered = allProducts.filter(p => p.category === 'fan');
      renderProducts(filtered, document.getElementById('products-container'));
    });
  }

  if (filterAllBtn) {
    filterAllBtn.addEventListener('click', () => {
      renderProducts(allProducts, document.getElementById('products-container'));
    });
  }
}