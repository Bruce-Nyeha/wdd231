export async function loadWeather() {
  console.log('loadWeather started');

  const loading = document.getElementById('weather-loading');
  const info = document.getElementById('weather-info');
  const tempEl = document.getElementById('temp');
  const condEl = document.getElementById('condition');
  const humEl = document.getElementById('humidity');
  const iconEl = document.getElementById('weather-icon');

  console.log('Elements:', { loading, info, tempEl, condEl, humEl, iconEl });

  if (!loading || !info) {
    console.error('Weather elements not found!');
    return;
  }

  const apiKey = '77f642ab9fa479ec7bb8cecd2b09280c';
  const lat = 5.6037;
  const lon = -0.1870;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  console.log('Fetching URL:', url);

  loading.textContent = 'Fetching Accra weather...';

  try {
    console.log('Fetch starting...');
    const response = await fetch(url);
    console.log('Response status:', response.status, response.ok);

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Data received:', data);

    tempEl.textContent = `Temperature: ${Math.round(data.main.temp)}°C (feels like ${Math.round(data.main.feels_like)}°C)`;
    condEl.textContent = `Condition: ${data.weather[0].description}`;
    humEl.textContent = `Humidity: ${data.main.humidity}%`;

    // Icon
    const iconCode = data.weather[0].icon || '01d';
    if (iconEl) {
    iconEl.src = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;  
    iconEl.style.width = '100px';   
    iconEl.style.height = '100px';
      iconEl.alt = `${data.weather[0].description} icon`;
    }

    loading.style.display = 'none';
    info.style.display = 'block';

    console.log('Weather displayed successfully!');
  } catch (error) {
    console.error('Weather fetch failed:', error);
    loading.textContent = 'Failed to load weather. Check console.';
  }
}