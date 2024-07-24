import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';

const API_KEY = 'b07f4db17b7f7b1dd6eeeb010dcb28c0';

function CitySelector({ setWeather }) {
    const [inputValue, setInputValue] = useState('');
    const [options, setOptions] = useState([]);
    const [selectedCity, setSelectedCity] = useState(null);

    useEffect(() => {
        if (inputValue.length > 2) {
            axios.get(`https://api.openweathermap.org/data/2.5/find?q=${inputValue}&type=like&appid=${API_KEY}&limit=10`)
                .then(response => {
                    const cities = response.data.list.map(city => ({
                        value: city.name,
                        label: `${city.name}, ${city.sys.country}`
                    }));
                    setOptions(cities);
                })
                .catch(error => console.error('Error fetching city data:', error));
        } else {
            setOptions([]);
        }
    }, [inputValue]);

    const handleChange = (selectedOption) => {
        setSelectedCity(selectedOption);
        fetchWeather(selectedOption.value);
    };

    const fetchWeather = async (city) => {
        try {
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
            setWeather(response.data);
        } catch (error) {
            console.error("Error fetching the weather data", error);
        }
    };

    return (
        <div>
            <Select
                value={selectedCity}
                onChange={handleChange}
                onInputChange={setInputValue}
                options={options}
                placeholder="Type city name..."
                isClearable
                onClear={() => {
                    setSelectedCity(null);
                    setWeather(null);
                }}
            />
        </div>
    );
}

export default CitySelector;