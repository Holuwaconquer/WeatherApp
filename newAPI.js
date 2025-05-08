function showLoader() {
    document.getElementById('loader').classList.add('loaderShow')
}

function hideLoader() {
    document.getElementById('loader').classList.remove('loaderShow')
}



let month = document.getElementById('month')
let date = document.getElementById('date')
let weatherTemp = document.getElementById('weatherTemp')
let weatherMain = document.getElementById('weatherMain')
let weatherDescription = document.getElementById('weatherDescription')
let weatherPresure = document.getElementById('weatherPresure')
let humidity = document.getElementById('humidity')
let currentDay = new Date()
let currentDate = currentDay.getDate().toString()
let currentMonth = currentDay.getMonth()

if(currentMonth === 0){
    month.textContent = "Jan"
}
else if(currentMonth === 1){
    month.textContent = "Feb"
}
else if(currentMonth === 2){
    month.textContent = "Mar"
}
else if(currentMonth === 3){
    month.textContent = "Apr"
}
else if(currentMonth === 4){
    month.textContent = "May"
}
else if(currentMonth === 5){
    month.textContent = "Jun"
}
else if(currentMonth === 6){
    month.textContent = "Jul"
}
else if(currentMonth === 7){
    month.textContent = "Aug"
}
else if(currentMonth === 8){
    month.textContent = "Sep"
}
else if(currentMonth === 9){
    month.textContent = "Oct"
}
else if(currentMonth === 10){
    month.textContent = "Nov"
}
else{
    month.textContent = "Dec"
}

if(currentDate.length ===1){
    date.textContent = 0 + currentDate
}else{
    date.textContent = currentDate
}


// Offline detection
if (!navigator.onLine) {
    alert("You are offline. Please check your internet connection.");
}
window.addEventListener('offline', () => alert("You lost your internet connection."));
window.addEventListener('online', () => alert("You're back online!"));

let search = document.getElementById('search')
let main = document.getElementById('main')
let cityName = document.getElementById('cityName')
search.addEventListener('click', ()=>{
    let city = document.getElementById('userInput').value
    let ApiKey = "a1e4cf34c240c882b32c8a01c3b3792f"
    let newAPI = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${ApiKey}`

    if (!city) return alert("Please enter a city name.");
    if (!navigator.onLine) return alert("No internet connection.");

    let ApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${ApiKey}`
    showLoader();
        fetch(ApiUrl).then(response =>{      
            response.json().then(data =>{
                data.main.temp = Math.floor(Number(data.main.temp) - 273.15)
                weatherTemp.textContent = data.main.temp
                let weatherInfo = data.weather[0]
                weatherMain.textContent = weatherInfo.main
                weatherDescription.textContent = weatherInfo.description
                humidity.textContent = data.main.humidity + '%'
                weatherPresure.textContent = data.main.pressure + 'hPa'
                cityName.textContent = data.name + ' , ' + data.sys.country
                document.getElementById('weatherImg').src= `https://openweathermap.org/img/wn/${weatherInfo.icon}@4x.png`
            })
        }).catch(() => alert("fetching failed", error))
        .finally(hideLoader);
        fetch(newAPI).then(result =>{
            result.json().then(item =>{
                const forecastData = item.list;
                
                // Get the forecast for the current day
                const newcurrentDate = new Date();
                const currentDayForecast = forecastData.filter((forecast) => {
                    const forecastDate = new Date(forecast.dt * 1000);
                    return forecastDate.getDate() === newcurrentDate.getDate();
                    
                });
                const todayForecast = currentDayForecast;
                todayForecast.map((forecastData, index)=>{
                    const dateTime = new Date(forecastData.dt_txt);

                    const year = dateTime.getFullYear().toString();
                    const yyear = year.slice(-2)
                    const month = String(dateTime.getMonth() + 1).padStart(2, '0');
                    const day = String(dateTime.getDate()).padStart(2, '0');
                    forecastData.main.temp = Math.floor(Number(forecastData.main.temp) - 273.15)
                    let forecastDataInfo = forecastData.weather[0]
                    const options = {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true
                    };
                    const time = dateTime.toLocaleTimeString('en-US', options);
                    
                    document.getElementById('forecast').innerHTML += `
                        <div style="line-height: 1em;">
                            <h3 id="forecastdate">${time}</h3>
                            <span><img width="50px" src="https://openweathermap.org/img/wn/${forecastDataInfo.icon}@2x.png" alt=""></span>
                            <h3 id="forecastTemp">${forecastData.main.temp}<span>&deg;</span></h3>
                        </div>
                    `
        
                })
                
            })
        }).catch(() => alert("Failed to fetch forecast data."));
    
})

// let ApiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=Ogun State&appid=a1e4cf34c240c882b32c8a01c3b3792f'