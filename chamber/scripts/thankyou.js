document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);

  document.getElementById('displayFirst').textContent = params.get('firstName') || 'N/A';
  document.getElementById('displayLast').textContent = params.get('lastName') || 'N/A';
  document.getElementById('displayEmail').textContent = params.get('email') || 'N/A';
  document.getElementById('displayPhone').textContent = params.get('phone') || 'N/A';
  document.getElementById('displayOrg').textContent = params.get('orgName') || 'N/A';
  document.getElementById('displayTimestamp').textContent = params.get('timestamp') || 'N/A';
});