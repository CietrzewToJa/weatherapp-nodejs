export const getWeatherByCity = city => {

    return fetch(`https://www.metaweather.com/api/location/search/?query=${city}`)
        .then(res => res.json())
        .then(data => {
            const woeid = data[0].woeid;
            return fetch(`https://www.metaweather.com/api/location/${woeid}/`)
                .then(res => res.json())
                .then(data => data);
        });
}