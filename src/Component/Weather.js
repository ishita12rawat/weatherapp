import React, { useState, useEffect } from 'react';

function Weather() {
    const [value, setValue] = useState("");
    const [search, setSearch] = useState("");
    const [temperature, setTemperature] = useState(null);
    const [humidity, setHumidity] = useState(null);
    const [cityName, setCityName] = useState("");

    const API_KEY = "6d83156e4e40ca97d0c6924b832fe00c";

    const fetchWeather = async () => {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${API_KEY}&units=metric`;

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("City not found");
            }
            const data = await response.json();
            setTemperature(data.main.temp);
            setCityName(data.name);
            setHumidity(data.main.humidity);
        } catch (error) {
            console.error("Error fetching weather data:", error);
            setTemperature(null);
            setHumidity(null);
            setCityName("");
        }
    };

    useEffect(() => {
        if (search) {
            fetchWeather();
        }
    }, [search]);

    const handleSearch = () => {
        setSearch(value);
        setValue("");
    };

    return (
        <div className="w-full min-h-screen bg-gray-800 flex flex-col items-center justify-center p-4">
            <div className="flex  items-center gap-4 mb-6">
                <input
                    type="text"
                    className="p-3 rounded-lg w-50 max-w-md text-gray-900"
                    placeholder="Enter city"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
                <button
                    onClick={handleSearch}
                    className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition"
                >
                    Search
                </button>
            </div>
            <div className="bg-gray-700 text-white p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-semibold">Temperature: {temperature !== null ? `${temperature} °C` : "N/A"}</h2>
                <h2 className="text-xl font-semibold">City: {cityName || "N/A"}</h2>
                <h2 className="text-xl font-semibold">Humidity: {humidity !== null ? `${humidity} %` : "N/A"}</h2>
            </div>
        </div>
    );
}

export default Weather;

