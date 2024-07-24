import React, { useEffect, useState } from 'react';
import CitySelector from './Components/CitySelector/CitySelector.jsx';
import WeatherDisplay from './Components/WeatherDisplay/WeatherDisplay.jsx';

function App() {
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState(null);

    useEffect(() => {
        const tg = window.Telegram.WebApp;
        tg.ready();

        // Налаштування теми
        tg.MainButton.setParams({ text: "Send to Telegram" });
        tg.MainButton.onClick(() => handleSendToTelegram());

        return () => {
            tg.MainButton.offClick();
        };
    }, [weather]);

    const handleSendToTelegram = () => {
        const message = `
      Weather in ${weather.name}:
      Temperature: ${weather.main.temp}°C
      Humidity: ${weather.main.humidity}%
      Wind Speed: ${weather.wind.speed} m/s
      Description: ${weather.weather[0].description}
    `;

        window.Telegram.WebApp.sendData(message);
    };

    return (
        <div className="App">
            <h1>Telegram Weather App</h1>
            <CitySelector setCity={setCity} setWeather={setWeather} />
            {weather && <WeatherDisplay weather={weather} />}
        </div>
    );
}

export default App;
