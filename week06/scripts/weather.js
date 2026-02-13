export async function loadWeather() {
  const loading = document.getElementById('weather-loading');
  const info = document.getElementById('weather-info');
  const tempEl = document.getElementById('temp');
  const condEl = document.getElementById('condition');
  const humEl = document.getElementById('humidity');
  const iconEl = document.getElementById('weather-icon');

  if (!loading || !info || !iconEl) {
    console.log('Weather elements missing on this page.');
    return;
  }

  const apiKey = '77f642ab9fa479ec7bb8cecd2b09280c';
  const lat = 5.6037;
  const lon = -0.1870;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  loading.textContent = 'Fetching Accra weather...';

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();

    tempEl.textContent = `Temperature: ${Math.round(data.main.temp)}°C (feels like ${Math.round(data.main.feels_like)}°C)`;
    condEl.textContent = `Condition: ${data.weather[0].description}`;
    humEl.textContent = `Humidity: ${data.main.humidity}%`;

  
const iconCode = data.weather[0].icon || '01d'; 
const iconEl = document.getElementById('weather-icon');
iconEl.src = `https://openweathermap.org/img/wn/${iconCode}@4x.png`; 
iconEl.alt = `${data.weather[0].description} icon`;
iconEl.style.opacity = '0';
iconEl.style.transition = 'opacity 0.8s ease';
setTimeout(() => { iconEl.style.opacity = '1'; }, 200); 


    // Fade-in animation
    info.style.opacity = '0';
    info.style.transition = 'opacity 1s ease';
    setTimeout(() => { info.style.opacity = '1'; }, 100);
  } catch (error) {
    console.error('Weather fetch failed:', error);
    loading.textContent = 'Sorry, weather data unavailable. Try refreshing.';
  }
}