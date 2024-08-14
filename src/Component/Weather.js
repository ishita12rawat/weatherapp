import React, { useState } from 'react';

function Weather() {
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState(null);


    const fetchWeather = async () => {
        const API_KEY = "6d83156e4e40ca97d0c6924b832fe00c";
        const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

        try {
            let response = await fetch(API_URL);

            if (!response.ok) {
                throw new Error('City not found');
            }

            let data = await response.json();
            setWeather(data);
        
        } catch (err) {
           console.log(err)
            setWeather(null);
        }
    };

    return (
        <div className="text-gray-800 bg-slate-800 w-full min-h-screen">
            <div className="container">
                <h1 className="text-3xl font-bold text-center text-white">Weather App</h1>
            </div>
            <div className="flex justify-center mb-6">
                <input
                    type="text"
                    placeholder="Enter city..."
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="border border-gray-300 rounded-lg py-2 px-4 w-1/2"
                />
                <button
                    onClick={fetchWeather}
                    className="ml-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                >
                    Get Weather
                </button>
            </div>
            <div className="flex flex-col items-center">
             
                {weather && (
                    <div className="text-white text-lg">
                        <h2 className="text-2xl font-bold">{weather.name}</h2>
                        <p>Temperature: {weather.main.temp} °C</p>
                        <p>Weather: {weather.weather[0].description}</p>
                        <p>Humidity: {weather.main.humidity}%</p>
                        <p>Wind Speed: {weather.wind.speed} m/s</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Weather;

