import './App.css';
import React, { useState } from "react";

function App() {
    const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);

  const getWeather = async () => {
    if (!city) return;

    const apiKey = "b6aa2be33b7d48373064b49377f59ce2"; // replace with your key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    const res = await fetch(url);
    const data = await res.json();
    console.log(data);
    setWeather(data);
  };
  return (
 <div className="app">
          <h2>Weather App</h2>

          <input
            type="text"
            placeholder="Enter city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <br/>

          <button onClick={getWeather}>Get Weather</button>

          {weather && weather.main && (
            <div className="weather">
              <h3>{weather.name}</h3>
              <p>Temperature: {weather.main.temp} °C</p>
              <p>Condition: {weather.weather[0].main}</p>
            </div>
          )
          }
        </div>
      );
}

export default App;
