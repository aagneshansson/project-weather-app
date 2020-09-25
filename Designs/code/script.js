/*const menuBtn = document.getElementById("menuBtn");
const closeBtn = document.getElementsByClassName("show");
const menu = document.getElementById("menu");
const menuNav = document.getElementById("menuNav");
const menuBranding = document.getElementById("menuBranding");*/
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
/*const toggleMenu = () => {
    menuBtn.classList.toggle("close");
    menu.classList.add("show");
    menuNav.classList.add("show");
    menuBranding.classList.add("show");
    navItems.forEach(item => item.classList.add("show"))
  }
  
  // Close menu
  
  const closeMenu = () => {
    menuBtn.classList.toggle("close");
    menu.classList.remove("show");
    menuNav.classListList.remove("show");
    menuBranding.class.remove("show");
    navItems.forEach(item => item.classList.remove("show"))
  }*/
  
  //const outsideClick = (click) => {
  
  //}
  
  // Open or close menu by clicking or touching
  
  menuBtn.addEventListener("click", toggleMenu);
  //menuBtn.addEventListener("touchstart",toggleMenu);
  
  //menu.addEventListener("click", closeMenu);
  //menu.addEventListener("touchstart", closeMenu);

/*
//Todays weather api
const apiLysekilToday = "https://api.openweathermap.org/data/2.5/weather?q=Lysekil,Sweden&units=metric&APPID=de78a234a90e490fde95f979d2491105";
console.log(apiLysekilToday);

//Forecast api
const apiLysekilForecast = "https://api.openweathermap.org/data/2.5/forecast?q=Lysekil,Sweden&units=metric&appid=de78a234a90e490fde95f979d2491105";
console.log(apiLysekilForecast);


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

    // Displaying the geolocation weather today
    todaysGeo.innerHTML = `<h2>It looks like you're in beatiful ${name} today!</h2>`
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
        let weekday = (new Date(item.dt * 1000)).toLocaleDateString("en-US", { weekday: "short" })

    forecastWeather.innerHTML += `${weekday} ${temperature}&#8451;<br>`;
    })
})

}

console.log(success);

 navigator.geolocation.getCurrentPosition(success);

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

weatherMessage = (temp) => {
    if (temp > 30.0) {
        return "Don't forget sunprotection and glasses to";

    } else if (temp > 20.0) {
        return "It's gonna be warm in";

    } else if (temp > 10.0) {
        return "You better bring a jacket to";

    } else if (temp > 0.0) {
        return "Get properly dressed in";

    } else if (temp < 0.0) {
        return "Brr the winter is here in";

    } else {
        return "You will be on fire in";
    }
};

const todaysLysekil = document.getElementById('todaysLysekil');

//Todays weather api  
fetch(apiLysekilToday).then((response) => {
    return response.json()
}).then((json) => {
    console.log(json)

    // Delaring the icon
    const icon = `<img src=http://openweathermap.org/img/wn/${json.weather[0].icon}@2x.png></img>`;
    // Removes decimals from todays temperature 
    json.main.temp = json.main.temp.toFixed(0)

    // Displays the main text of todays weather 
    todaysLysekil.innerHTML = `${icon}<h2>${weatherMessage(json.main.temp)} ${json.name}, it will be ${json.main.temp}° and ${json.weather[0].description} today.</h2>`;

    // Displays time for sunrise and sunset and changing it to english timings
    let sunrise = (new Date(json.sys.sunrise * 1000).toLocaleTimeString("en-US", { timeStyle: "short" }));
    let sunset = (new Date(json.sys.sunset * 1000).toLocaleString("en-US", { timeStyle: "short" }));

    daytime.innerHTML = `Sunrise ${sunrise} - Sunset ${sunset}`;

    // Assign the returned color to become background color
    document.body.style.backgroundColor = coloringFunction(json.main.temp);
})

//Forecast api
fetch(apiLysekilForecast).then((response) => {
    return response.json()
})
    .then((forecast) => {
        console.log(forecast)
        const filteredForecast = forecast.list.filter(item => item.dt_txt.includes('12:00'))

        console.log(filteredForecast)
        filteredForecast.forEach(item => {
            let temperature = (item.main.temp).toFixed(1);
            //* Multiply by 1000 because the data is given to us in UNIX which is in seconds, but Javascript uses milliseconds internally, this way we get the right date. */
       //     let weekday = (new Date(item.dt * 1000)).toLocaleDateString("en-US", { weekday: "short" })
            // Adding icon code from API 
       //     let icon = `<img src=http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png></img>`;

            // let figure = backgroundColor(icon);
      //      forecastLysekil.innerHTML += `<p>${weekday} ${temperature}&#8451;</p> ${icon} `;

//        });
  //  });