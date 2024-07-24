import React, { useState } from 'react';
import CitySelector from './Components/CitySelector/CitySelector.jsx';
import WeatherDisplay from './Components/WeatherDisplay/WeatherDisplay.jsx';

function App() {
    const [setCity] = useState('');
    const [weather, setWeather] = useState(null);

    return (
        <div className="App">
            <h1>Telegram Weather App</h1>
            <CitySelector setCity={setCity} setWeather={setWeather} />
            {weather && <WeatherDisplay weather={weather} />}
        </div>
    );
}

export default App;
