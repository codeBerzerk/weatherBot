import React from 'react';

function WeatherDisplay({ weather }) {
    return (
        <div>
            <h2>Weather in {weather.name}</h2>
            <p>Temperature: {weather.main.temp}°C</p>
            <p>Humidity: {weather.main.humidity}%</p>
            <p>Wind Speed: {weather.wind.speed} m/s</p>
            <p>Description: {weather.weather[0].description}</p>
        </div>
    );
}

export default WeatherDisplay;
