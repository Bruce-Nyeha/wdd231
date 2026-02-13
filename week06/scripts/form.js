
export function setupForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    // No preventDefault - we want GET navigation
    // Optional: add client-side validation if needed
  });
}

// Called from main.js on thankyou.html
export function displaySubmittedData() {
  const output = document.getElementById('submitted-data');
  if (!output) return;

  const params = new URLSearchParams(window.location.search);

  const name = params.get('name') || 'Not provided';
  const phone = params.get('phone') || 'Not provided';
  const needs = params.get('needs') || 'Not provided';
  const budget = params.get('budget') || 'Not provided';

  output.innerHTML = `
    <ul>
      <li><strong>Name:</strong> ${name}</li>
      <li><strong>Phone/WhatsApp:</strong> ${phone}</li>
      <li><strong>Needs:</strong> ${needs}</li>
      <li><strong>Budget:</strong> GH₵${budget}</li>
    </ul>
    <p>We'll contact you soon for personalized solar advice!</p>
  `;
}