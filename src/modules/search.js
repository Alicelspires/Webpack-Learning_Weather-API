import data from "./data.js";
import {displayMainForecast} from "./home.js"
import {sidebar} from "./sidebar.js"

export default function search(){
    const inputSearch = document.querySelector('#search');
    const inputSearchIcon = document.querySelector('#search-icon');
    
    if(!inputSearch || !inputSearchIcon) return;

    const handleSearch = async () => {
        const location = inputSearch.value.trim();
        if(!location) return;

        try {
            const weatherData = await data(location);

            displayMainForecast(weatherData)
            sidebar(weatherData)
            console.log(weatherData)
            
        } catch(e) {
            console.log("ERRO!", e);
        }
    };

    inputSearchIcon.addEventListener('click', handleSearch);
    inputSearch.addEventListener('keypress', (e) => {
        if(e.key === 'Enter') {
            handleSearch();
        }
    });
}