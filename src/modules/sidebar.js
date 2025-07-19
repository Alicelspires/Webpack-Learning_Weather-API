import '../styles/sidebar.css'

export function sidebar(data){
    let sectionSide = document.querySelector('#sidebar-infos')
    sectionSide.innerHTML = '';

    sectionSide.innerHTML += `
        <div class="forecast-section">
            <h3 class="section-title">7 Days Forecast</h3>
            ${forecastDays(data)}
        </div>

        <div class="forecast-section">
            <h3 class="section-title">Per period of the day</h3>
            <div class="day-period">
                ${dayPeriods(data)}
            </div>
        </div>

        <div class="forecast-section">
            <h3 class="section-title">Day Infos</h3>
            <div class="day-info">
                ${dayInfos(data)}
            </div>
        </div>
    `
}
function getWeatherIcon(icon) {
    const icons = {
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
    return icons[icon];
}

function timeFormat(datetime){
    let [hour] = datetime.split(":")
    let hourInt = parseInt(hour, 10);

    return hourInt
}

function forecastDays(data){
    return data.days.slice(1, 8).map((dd) => {
        // console.log(dd)
        let date = new Date(dd.datetime);
        let week = date.toLocaleString('en-US', { weekday: 'long' })
        let day = date.getUTCDate();
        let monthSet = date.toLocaleString('en-US', { month: 'short' });
        let month = monthSet.charAt(0).toUpperCase() + monthSet.slice(1);

        return `
            <div class="forecast-day">
                <span>${week}</span>
                <span>
                    <span>${month}, ${day}</span>
                    <span>${parseInt(dd.temp, 10)}°C</span>
                    <i class='bx ${getWeatherIcon(dd.icon)}'></i>
                </span>
            </div>
        `
    }).join('')
}

function dayPeriods(data){
    let combine = [];

    for(let i = 0; i < 2; i++){
        let hourPerDate = data.days[i].hours.filter(( _ , index) => index % 3 == 0);
        combine.push(...hourPerDate);
    }

    return combine.slice(2, 10).map( h => {
        return `<span>
            <div>${parseInt(h.temp, 10)}°C</div>
            <i class='bx ${getWeatherIcon(h.icon)}'></i>
            <div>${timeFormat(h.datetime)}h</div>
        </span>
        `
    }).join('')
}

function dayInfos(data){
    let details = [
        { label: "Precipitation", icon: "bx-cloud-drizzle", value: `${data.currentConditions.precipprob}%` },
        { label: "Humidity", icon: "bx-water-drop-alt" , value: `${Math.round(data.currentConditions.humidity)}%` },
        { label: "Sunset", icon: "bx-sun-set", value: `${timeFormat(data.currentConditions.sunset)}h` },
        { label: "Wind", icon: "bx-wind", value: `${Math.round(data.currentConditions.windspeed)}km/h` },
    ]

    return details.map((detail) => {
        return `
            <span>
                <div>${detail.value}</div>
                <i class='bx ${detail.icon}'></i>
                <p>${detail.label}</p>
            </span>
        `
    }).join('')

}

export function toggleSidebar() {
    let sidebar = document.getElementById('sidebar');
    let btnSideBar = document.querySelector(".sidebar-toggle");
    let btnX = document.querySelector(".bx-x")

    if(!btnSideBar) return;

    let close = () => {
        sidebar.classList.toggle('open');
    }

    btnX.addEventListener('click', () => {
        close()
    })
    btnSideBar.addEventListener('click', () => {
        close()
    })
}
