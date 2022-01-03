import {mapListToDOMElements} from './DOMActions.js';
import {getWeatherByCity} from './apiService.js';

class WeatherApp {

    constructor() {
        this.viewElems = {};
        this.initializeApp();
    }

    initializeApp = () => {
        this.connectDOMElements();
        this.setupListeners();
    }

    connectDOMElements = () => {
        const listOfIds = Array.from(document.querySelectorAll('[id]')).map(elem => elem.id);
        this.viewElems = mapListToDOMElements(listOfIds);
    }

    setupListeners = () => {
        this.viewElems.searchInput.addEventListener('keydown', this.handleSubmit);
        this.viewElems.searchButton.addEventListener('click', this.handleSubmit);
        this.viewElems.returnToSearchBtn.addEventListener('click', this.returnToSearch);
    }

    handleSubmit = () => {
        if(event.type === 'click' || event.key === 'Enter') {
            this.fadeInOut()
            let query = this.viewElems.searchInput.value;
            getWeatherByCity(query)
                .then(data => {
                    this.displayWeatherData(data)
                });
        }
    }

    fadeInOut = () => {
        if(this.viewElems.mainContainer.style.opacity === '1' || this.viewElems.mainContainer.style.opacity === '') {
            this.viewElems.mainContainer.style.opacity = '0';
        } else {
            this.viewElems.mainContainer.style.opacity = '1';
        }
    }

    switchView = () => {
        if(this.viewElems.weatherSearchView.style.display !== 'none') {
            this.viewElems.weatherSearchView.style.display = 'none'
            this.viewElems.weatherForecastView.style.display = 'block'
        } else {
            this.viewElems.weatherForecastView.style.display = 'none'
            this.viewElems.weatherSearchView.style.display = 'flex'
        }
    }

    returnToSearch = () => {
        this.fadeInOut()
        setTimeout(() => {
            this.switchView();
            this.fadeInOut()
        }, 500)
    }

    displayWeatherData = data => {
        this.switchView()
        this.fadeInOut()

        const weather = data.consolidated_weather[0];

        this.viewElems.weatherCity.innerText = data.title;
        this.viewElems.weatherIcon.src = `https://www.metaweather.com/static/img/weather/${weather.weather_state_abbr}.svg`;
        this.viewElems.weatherIcon.alt = weather.weather_state_alt;

        const currentTemp = weather.the_temp.toFixed(2);
        const maxTemp = weather.min_temp.toFixed(2);
        const minTemp = weather.max_temp.toFixed(2);

        this.viewElems.weatherCurrentTemp.innerText = `Current temperature: ${currentTemp} °C`
        this.viewElems.weatherMinTemp.innerText = `Min temperature: ${minTemp} °C`
        this.viewElems.weatherMaxTemp.innerText = `Max temperature: ${maxTemp} °C`
    }
}

// const viewElems = {};

// const getDOMElem = id => {
//     return document.getElementById(id);
// }

// const connectHTMLElems = () => {
//     viewElems.mainContainer = getDOMElem('mainContainer');
//     viewElems.weatherSearchView = getDOMElem('weatherSearchView');
//     viewElems.weatherForecastView = getDOMElem('weatherForecastView');
//
//     viewElems.searchInput = getDOMElem('searchInput');
//     viewElems.searchButton = getDOMElem('searchButton');
//     viewElems.weatherCityContainer = getDOMElem('weatherCityContainer');
//
//     viewElems.weatherCity = getDOMElem('weatherCity');
//     viewElems.weatherIcon = getDOMElem('weatherIcon');
//
//     viewElems.weatherCurrentTemp = getDOMElem('weatherCurrentTemp');
//     viewElems.weatherMinTemp = getDOMElem('weatherMinTemp');
//     viewElems.weatherMaxTemp = getDOMElem('weatherMaxTemp');
//
//     viewElems.returnToSearchButton = getDOMElem('returnToSearchBtn');
// }

// const setupListeners = () => {
//     viewElems.searchInput.addEventListener('keydown', onEnterSubmit);
//     viewElems.searchButton.addEventListener('click', onClickSubmit);
//     viewElems.returnToSearchButton.addEventListener('click', returnToSearch);
// }

// const initializeApp = () => {
//     connectHTMLElems();
//     setupListeners();
// }

// const onClickSubmit = () => {
//         fadeInOut()
//         let query = viewElems.searchInput.value;
//         getWeatherByCity(query)
//             .then(data => {
//                 displayWeatherData(data)
//             });
// }

// const onEnterSubmit = event => {
//     if(event.key === 'Enter') {
//         fadeInOut();
//         let query = viewElems.searchInput.value;
//         getWeatherByCity(query)
//             .then(data => {
//                 displayWeatherData(data)
//             });
//     }
// }

// const displayWeatherData = data => {
//     switchView()
//     fadeInOut()
//
//     const weather = data.consolidated_weather[0];
//
//     viewElems.weatherCity.innerText = data.title;
//     viewElems.weatherIcon.src = `https://www.metaweather.com/static/img/weather/${weather.weather_state_abbr}.svg`;
//     viewElems.weatherIcon.alt = weather.weather_state_alt;
//
//     const currentTemp = weather.the_temp.toFixed(2);
//     const maxTemp = weather.min_temp.toFixed(2);
//     const minTemp = weather.max_temp.toFixed(2);
//
//     viewElems.weatherCurrentTemp.innerText = `Current temperature: ${currentTemp} °C`
//     viewElems.weatherMinTemp.innerText = `Min temperature: ${minTemp} °C`
//     viewElems.weatherMaxTemp.innerText = `Max temperature: ${maxTemp} °C`
// }

// const fadeInOut = () => {
//     if(viewElems.mainContainer.style.opacity === '1' || viewElems.mainContainer.style.opacity === '') {
//         viewElems.mainContainer.style.opacity = '0';
//     } else {
//         viewElems.mainContainer.style.opacity = '1';
//     }
// }

// const switchView = () => {
//     if(viewElems.weatherSearchView.style.display !== 'none') {
//         viewElems.weatherSearchView.style.display = 'none'
//         viewElems.weatherForecastView.style.display = 'block'
//     } else {
//         viewElems.weatherForecastView.style.display = 'none'
//         viewElems.weatherSearchView.style.display = 'flex'
//     }
// }

// const returnToSearch = () => {
//     fadeInOut()
//     setTimeout(() => {
//         switchView();
//         fadeInOut()
//     }, 500)
// }

document.addEventListener('DOMContentLoaded', new WeatherApp())