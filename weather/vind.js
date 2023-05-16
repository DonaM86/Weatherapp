//en iframe på en karta,

window.onload = function() {
    var iframe = document.createElement("iframe");
    iframe.setAttribute("width", "1050");
    iframe.setAttribute("height", "550");
    iframe.setAttribute("src", "https://embed.windy.com/embed2.html?lat=55.529&lon=12.305&detailLat=57.706&detailLon=11.967&width=650&height=450&zoom=5&level=surface&overlay=wind&product=ecmwf&menu=&message=true&marker=true&calendar=12&pressure=&type=map&location=coordinates&detail=true&metricWind=km%2Fh&metricTemp=%C2%B0C&radarRange=-1");
    iframe.setAttribute("frameborder", "0");

    var container = document.getElementById("iframe-container");
    container.appendChild(iframe);
}

//unsplash bakgrund som bytes var 15nde sekund.
const API_KEY = 'oD4sAFlmSR9a1nGBpw-79NAnKus8lmYGv6Q4yoMlBxk';
const API_URL = `https://api.unsplash.com/photos/random?query=sky&client_id=${API_KEY}`;

const background = document.querySelector('body');
//hämtar en bild bakgrund från unsplash, på himmlen
function updateBackground() {
    fetch(API_URL)
        .then(response => response.json())
        .then(data => {
            const imageUrl = data.urls.regular;
            background.style.backgroundImage = `url(${imageUrl})`;
        })
        .catch(error => console.log(error));
}

setInterval(updateBackground, 15000);
