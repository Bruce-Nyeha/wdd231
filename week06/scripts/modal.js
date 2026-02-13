const modal = document.getElementById('product-modal');
const closeBtn = document.getElementById('close-modal');
const titleEl = document.getElementById('modal-title');
const imageEl = document.getElementById('modal-image');
const descEl = document.getElementById('modal-description');
const priceEl = document.getElementById('modal-price');
const featuresEl = document.getElementById('modal-features');

export function setupModal() {
  if (!modal) return;

  
  closeBtn.addEventListener('click', closeModal);

  
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.open) closeModal();
  });
}

export function openModal(product) {
  if (!product) return;

  titleEl.textContent = product.name;
  imageEl.src = product.image;
  imageEl.alt = `${product.name} - ${product.description}`;
  descEl.textContent = product.description;
  priceEl.textContent = product.price;
  featuresEl.textContent = `Key features: ${product.features}`;

  modal.showModal();
  // Focus trap (basic)
  modal.focus();
}

function closeModal() {
  modal.close();
}