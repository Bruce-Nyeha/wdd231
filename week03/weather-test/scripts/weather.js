

const lon = 6.64;
const lat = 49.75;
const apiKey = '77f642ab9fa479ec7bb8cecd2b09280c';
const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;

const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption');


async function apiFetch() {
    try {
        const response = await fetch(url);
        if (response.ok){
            const data = await response.json();
            console.log(data);
            displayResults(data);
        } else{
            throw Error(await response.text());
        }

    } catch(error){
        console.log(error);
        captionDesc.textContent = 'Error loading weather data';
  }
    }

    function displayResults(data) {
        currentTemp.innerHTML = `${Math.round(data.main.temp)}&deg;F`
    

    const iconsrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    const desc = data.weather[0].description;

    weatherIcon.setAttribute('src', iconsrc);
  weatherIcon.setAttribute('alt', desc);
  captionDesc.textContent = desc.charAt(0).toUpperCase() + desc.slice(1);
    }
  apiFetch();