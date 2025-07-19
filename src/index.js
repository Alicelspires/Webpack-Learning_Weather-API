import "./styles/style.css";
import {sidebar, toggleSidebar} from "./modules/sidebar.js"
import search from "./modules/search.js";
import {displayMainForecast} from "./modules/home.js";
import {defaultWeatherData} from "./modules/defaultData.js";

// Default
displayMainForecast(defaultWeatherData)
sidebar(defaultWeatherData)
toggleSidebar()
search()