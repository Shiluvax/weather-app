import "./styles.css";
import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});
  const apiKey = "97c2f6a3b34509ac62090edc5d18d949 ";

  const search = async (e) => {
    if (e.key === "Enter") {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&appid=${apiKey}`
        );
        setWeather(response.data);
        setQuery("");
      } catch (error) {
        console.error("Error fetching the weather data", error);
      }
    }
  };

  return (
    <div className="app">
      <main>
        <h1>weather app</h1>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={search}
          />
        </div>
        {weather.main && (
          <div className="weather-box">
            <div className="location">
              {weather.name}, {weather.sys.country}
            </div>
            <div className="temperature">{Math.round(weather.main.temp)}°C</div>
            <div className="weather">{weather.weather[0].description}</div>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
