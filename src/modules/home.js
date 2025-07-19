import bg01 from '../assets/img/img-snow.jpg';
import bg02 from '../assets/img/img-rainy.jpg';
import bg03 from '../assets/img/img-foggy.jpg';
import bg04 from '../assets/img/img-wind.jpg';
import bg05 from '../assets/img/img-cloudy.jpg';
import bg06 from '../assets/img/img-partly-cloudy-day.jpg';
import bg07 from '../assets/img/img-partly-cloudy-night.jpg';
import bg08 from '../assets/img/img-clear-day.jpg';
import bg09 from '../assets/img/img-clear-night.jpg';

export function displayMainForecast(data){
    let mainForecast = document.querySelector('#main-forecast');

    if(!data) return 
    
    bgImg(data)
    mainForecastInfo(data, mainForecast)
    weatherDate(data, mainForecast)
    weatherConditions(data)
}

function mainForecastInfo(data, main){
    let mainForecastTemp = main.querySelector('h1');
    let mainForecastCity = main.querySelector('span > h2')

    mainForecastTemp.innerText = `${parseInt(data.days[0].temp, 10)}°C`
    mainForecastCity.innerText = `${data.resolvedAddress.split(',')[0].trim()}`;
}

function weatherDate(data, main){
    let mainForecastDay = main.querySelector('span > #day');
    let date = new Date(data.days[0].datetime);

    let week = date.toLocaleString('en-US', { weekday: 'long' })
    let day = date.getUTCDate();
    let monthSet = date.toLocaleString('en-US', { month: 'short' });
    let month = monthSet.charAt(0).toUpperCase() + monthSet.slice(1);
    let year = date.getFullYear();

    mainForecastDay.innerText = `${week}, ${day} ${month} ${year}`
}

function weatherConditions(data){
    let condition = document.querySelector('.info-forecast-icon');
    let textCondition = condition.querySelector('p#condition');

    let weatherIcons = {
        "snow": "bx-snowflake",
        "rain": "bx-cloud-rain",
        "fog": "bx-cloud",
        "wind": "bx-wind",
        "cloudy": "bx-cloud",
        "partly-cloudy-day": "bx-cloud-sun",
        "partly-cloudy-night": "bx-cloud-moon",
        "clear-day": "bx-sun",
        "clear-night": "bx-moon"
    };

    let iconClass = weatherIcons[data.currentConditions.icon] || "bx-cloud";

    condition.innerHTML = `<i id="icon-condition" class='bx ${iconClass}'></i>`;

    textCondition.innerText = data.currentConditions.conditions
    condition.appendChild(textCondition)
}

function bgImg(data){
    let body = document.querySelector('body');
    let condition = data.currentConditions.icon

    let bgImgs = {
        "snow" : bg01,
        "rain": bg02,
        "fog": bg03,
        "wind": bg04,
        "cloudy": bg05,
        "partly-cloudy-day": bg06,
        "partly-cloudy-night": bg07,
        "clear-day": bg08,
        "clear-night":bg09
    }


    body.style.backgroundImage = `url(${bgImgs[condition]})`;
}