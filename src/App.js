import React, { useEffect, useState, useCallback } from 'react';
import CitySelector from './Components/CitySelector/CitySelector';
import WeatherDisplay from './Components/WeatherDisplay/WeatherDisplay';

function App() {
    const [setCity] = useState('');
    const [weather, setWeather] = useState(null);

    useEffect(() => {
        const tg = window.Telegram.WebApp;
        tg.ready();

        tg.MainButton.setParams({ text: "Send to Telegram" });
        tg.MainButton.onClick(handleSendToTelegram);

        return () => {
            tg.MainButton.offClick(handleSendToTelegram);
        };
    }, [weather]);

    const handleSendToTelegram = useCallback(() => {
        if (weather) {
            const message = `
        Weather in ${weather.name}:
        Temperature: ${weather.main.temp}°C
        Humidity: ${weather.main.humidity}%
        Wind Speed: ${weather.wind.speed} m/s
        Description: ${weather.weather[0].description}
      `;

            window.Telegram.WebApp.sendData(message);
        }
    }, [weather]);

    return (
        <div className="App">
            <h1>Telegram Weather App</h1>
            <CitySelector setCity={setCity} setWeather={setWeather} />
            {weather && <WeatherDisplay weather={weather} />}
        </div>
    );
}

export default App;
