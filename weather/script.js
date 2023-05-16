//Jag har valt att lägga till kommentarer, för jag vill komma ihåg min kod och tycker att jag lär mig koderna enklare.
const söök = document.querySelector('#söök');
const cityInput = document.querySelector('#city');
const weatherInfo = document.querySelector('#väder');
const body = document.querySelector('body');
const apiKey = 'oD4sAFlmSR9a1nGBpw-79NAnKus8lmYGv6Q4yoMlBxk';

// en eventlyssnare från en klickhändelse , som hämtar stadens namn.
söök.addEventListener('click', async(event) => {
    event.preventDefault();
    const city = cityInput.value;
    const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=9fdfaec1664c0af545db6dd6ed87ce61`;
    const unsplashApiUrl = `https://api.unsplash.com/photos/random?query=${city}&client_id=${apiKey}`;

    try {
        const weatherResponse = await fetch(weatherApiUrl);
        const weatherData = await weatherResponse.json();

        // Hämtar en bild från Unsplash API baserat på användarens stad
        const unsplashResponse = await fetch(unsplashApiUrl);
        const unsplashData = await unsplashResponse.json();

        // Hämta  data från sidan om vädret
        const { name, main, weather } = weatherData;
        const { temp, feels_like, temp_min, temp_max } = main;
        const celsius = temp - 273.15;
        const feelsLikeCelsius = feels_like - 273.15;
        const minCelsius = temp_min - 273.15;
        const maxCelsius = temp_max - 273.15;
        const icon = weather[0].icon;
        const imageUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;

        // Sätter bakgrundsbilden på sidan till en slumpad bild från Unsplash API
        body.style.backgroundImage = `url(${unsplashData.urls.regular})`;
        body.style.backgroundSize = "cover";

        //uppdaterar sidan med information om stadens väder och namn, temperatur i celsius,  en bild och  beskrivning av vädret på svenska. .

        weatherInfo.innerHTML = `
            <img src="${imageUrl}" alt="City image">
            <h2>${name}</h2>
            <p>Temperatur: ${celsius.toFixed(1)} &#8451;</p>
            <p>Känns som: ${feelsLikeCelsius.toFixed(1)} &#8451;</p>
            <p>Minsta temperatur: ${minCelsius.toFixed(1)} &#8451;</p>
            <p>Högsta temperatur: ${maxCelsius.toFixed(1)} &#8451;</p>
            <p>Väder: ${getWeatherDescription(weather[0].description)}</p>
        `;
        // Om det uppstår ett fel, får man ett felmeddelande
    } catch (error) {
        weatherInfo.innerHTML = `<p>Fel: Skriv in en stad</p>`;
    }
});
//använder här en parameter som switchar från engelsk description och retunerar en svensk beskrivning på vädret

function getWeatherDescription(description) {
    switch (description) {
        case 'clear sky':
            return 'klar himmel';
        case 'few clouds':
            return 'mestadels klart';
        case 'scattered clouds':
            return 'spridda moln';
        case 'broken clouds':
            return 'molnigt';
        case 'shower rain':
            return 'skurar';
        case 'rain':
            return 'regn';
        case 'thunderstorm':
            return 'åskväder';
        case 'snow':
            return 'snö';
        case 'mist':
            return 'dimma';
        default:
            return description;
    }
}
