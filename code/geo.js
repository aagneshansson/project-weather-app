const navItems = document.querySelectorAll(".nav-item");

// Open menu
const toggleMenu = () => {
    menuBtn.classList.toggle("close");
    menu.classList.toggle("show");
    menuNav.classList.toggle("show");
    menuBranding.classList.toggle("show");
    navItems.forEach(item => item.classList.toggle("show"))
}

menuBtn.addEventListener("click", toggleMenu);

// The function returns a color depending on the temperature 
coloringFunction = (temp) => {
    if (temp > 30.0) {
        return "#ed743b";

    } else if (temp > 20.0) {
        return "#deb045";

    } else if (temp > 10.0) {
        return "#56d6b2";

    } else if (temp > 0.0) {
        return "#51c9b7";

    } else if (temp < 0.0) {
        return "#72c8db";

    } else {
        return "#e84a2e";
    }
};

// Geolocation weather today and forecast 
const success = (position) => {

    // Defining the variables latitude and longitude 
    let geolocation = position.coords;

    let latitude = geolocation.latitude;
    let longitude = geolocation.longitude;

    // Insert the variables and api key to url for both todays weather and forecast weather 
    const apiGeoToday = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=de78a234a90e490fde95f979d2491105`;
    const apiGeoForecast = `https:/api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=de78a234a90e490fde95f979d2491105`;

    fetch(apiGeoToday).then((response) => {
        return response.json()
    })
        .then((todaysgeo) => {
            // Giving all of my values names so it looks cleaner 
            let temp = (todaysgeo.main.temp).toFixed(0);
            let name = (todaysgeo.name);
            let weather = (todaysgeo.weather[0].description);

            // Declaring the icon
            const icon = `<img src=https://openweathermap.org/img/wn/${todaysgeo.weather[0].icon}@2x.png></img>`;
            // Assign the returned color to become background color
            document.body.style.backgroundColor = coloringFunction(temp);

            // Displaying the geolocation weather today
            todaysGeo.innerHTML = `${icon}<h2>It looks like you're in beatiful ${name} today!</h2>`
            todaysWeather.innerHTML = `The tempearute there is ${temp}&#8451; and it's gonna be ${weather}.`;
        })

    // Geolocation forecast weather
    fetch(apiGeoForecast).then((response) => {
        return response.json()
    })
        .then((geoforecast) => {
            console.log(geoforecast);
            const filteredGeoForecast = geoforecast.list.filter(item => item.dt_txt.includes('12:00'))

            console.log(filteredGeoForecast);
            filteredGeoForecast.forEach(item => {
                let temperature = (item.main.temp).toFixed(1);
                // Multiply by 1000 because the data is given to us in UNIX which is in seconds, but Javascript uses milliseconds internally, this way we get the right date. */
                let weekday = (new Date(item.dt * 1000)).toLocaleDateString("en-US", { weekday: "short" })
                // Adding icon code from API 
                let icon = `<img src=https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png></img>`;

                forecastWeather.innerHTML += `${weekday} ${temperature}&#8451;${icon}<br>`;
            })
        })

}

console.log(success);

navigator.geolocation.getCurrentPosition(success);