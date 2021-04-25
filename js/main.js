const getData = async (city) => {
    let response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=029f84240b76719f270b26552323e1a2`)
  
    console.log(response.data) 
    return response.data
}


// Create A Constant to hold DOM Element Reference
const DOM_Elements = {
    weather_data: 'weather-data',
}


// Grab Form Data From Submit Event (city name search)
const form = document.querySelector('#weatherDataForm')
console.log(form)


// by default, a page will reload after a form is submitted
// the event.preventDefault prevents the auto-reload
form.addEventListener('submit', ( event ) => {
    event.preventDefault();
})

// Remove the city name from the search box after search button is clicked
document.addEventListener('submit', (event) => {
    form.reset()
})


// Create City variable and function to insert into HTML table
const createName = ( name, country ) => {
    const html = `${name}, ${country}`;
    document.getElementById("location").insertAdjacentHTML('beforeend', html)
}


// Create Current Temp variable and function to insert into HTML table
const createCurrentTemp = ( temp ) => {
    const html = `${temp}`;
    document.getElementById("current_temp").insertAdjacentHTML('beforeend', html)
}


// Create High temp variable and function to insert into HTML table
const createHighTemp = ( temp_max ) => {
    const html = `${temp_max}`;
    document.getElementById("high_temp").insertAdjacentHTML('beforeend', html)
}


// Create Low temp variable and function to insert into HTML table
const createLowTemp = ( temp_min ) => {
    const html = `${temp_min}`;
    document.getElementById("low_temp").insertAdjacentHTML('beforeend', html)
}


// Create forecast variable and function to insert into HTML table
const createForecast = ( description ) => {
    const html = `${description}`;
    document.getElementById("forecast").insertAdjacentHTML('beforeend', html)
}


// Create humidity variable and function to insert into HTML table
const createHumidity = ( humidity ) => {
    const html = `${humidity}`;
    document.getElementById("humidity").insertAdjacentHTML('beforeend', html)
}

// const createIcon = () => {
//     let locationIcon = document.querySelector('.weather-icon');
//     const html = weather[0].`${icon}`;
//     console.log({icon})
//     locationIcon.innerHTML = `<img src="images/icons/${icon}.png"></img>`
// }


// Create icon variable and function to insert into HTML table
// const createIcon = ( weather ) => {

    // const html = `<img src="https://openweathermap.org/img/wn/${
        // weather[0]['icon']}@2x.png" alt="current conditions icon">`

  

// Function to Load the API Data and Display to HTML
const load_data = async () => {
    // Clear previous search results before loading next search results
    clearTable()

    let city_name = document.getElementById('city').value
    const user_city = await getData(city_name);


    console.log(user_city)
    console.log(user_city.main['temp'])
    console.log(user_city.main)


    // Call on create functions to populate data in HTML table
    createName(user_city.name, user_city.sys['country'])
    createCurrentTemp(Math.round(user_city.main['temp'])+ '&#8457')
    createHighTemp(Math.round(user_city.main['temp_max'])+ '&#8457')
    createLowTemp(Math.round(user_city.main['temp_min'])+ '&#8457')
    createForecast(user_city.weather[0]['description'])
    createHumidity(user_city.main['humidity']+'%')
    // createIcon(user_city.weather[0]['icon'])
}


// Function to Clear the API Data from the HTML
const clearTable = () => {
    document.getElementById("location").innerHTML = '';
    document.getElementById("current_temp").innerHTML = '';
    document.getElementById("high_temp").innerHTML = '';
    document.getElementById("low_temp").innerHTML = '';
    document.getElementById("forecast").innerHTML = '';
    document.getElementById("humidity").innerHTML = '';
}