import React, { useState } from 'react';
import axios from 'axios';

const API_KEY = 'b07f4db17b7f7b1dd6eeeb010dcb28c0';

function CitySelector({ setCity, setWeather }) {
    const [inputCity, setInputCity] = useState('');

    const fetchWeather = async (city) => {
        try {
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
            setWeather(response.data);
        } catch (error) {
            console.error("Error fetching the weather data", error);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setCity(inputCity);
        fetchWeather(inputCity);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={inputCity}
                onChange={(e) => setInputCity(e.target.value)}
                placeholder="Enter city"
            />
            <button type="submit">Get Weather</button>
        </form>
    );
}

export default CitySelector;
