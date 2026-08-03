const API_KEY = '74233443bb81c8644fc925ddeaa69e4c'

const input = document.querySelector('#cityInput')
const btnSearch = document.querySelector('#searchBtn')
const cityName = document.querySelector('#cityName')
const weather_icon = document.querySelector('#weatherIcon')
const tempNormal = document.querySelector('#temperature')
const desc_weather = document.querySelector('#weatherDescription')
const hum = document.querySelector('#humidity')
const windSpeed = document.querySelector('#windSpeed')
const feels_Like = document.querySelector('#feelsLike')


const date = document.querySelector('#currentDate')
function data(){
    let now = new Date()
    const options = {day: 'numeric', month: 'long'}
    date.textContent = now.toLocaleString('ru-RU', options)
}
data()

async function weather(city) {
    const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    let resolve = await fetch(API_URL)
    try {
        if(!resolve.ok){
        throw new Error('Город не найден!')
        } 
        let result = await resolve.json()
        console.log(result)
        let temperatur = Math.round(result.main.temp)
        let feelsLike  = Math.round(result.main.feels_like)
        cityName.innerHTML = `${result.name}`
        tempNormal.innerHTML = `${temperatur}°C`
        weather_icon.src = `https://openweathermap.org/img/wn/${result.weather[0].icon}@2x.png`
        hum.innerHTML = `${result.main.humidity}%`
        windSpeed.innerHTML = `${result.wind.speed}м/с`
        feels_Like.innerHTML = `${feelsLike}°C`
        desc_weather.textContent = result.weather[0].description

    } catch(error){
        console.log(error)
    }

}

btnSearch.addEventListener('click', () => {
    weather(input.value)
})