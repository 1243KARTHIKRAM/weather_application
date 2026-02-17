import './App.css';
import React, { useState, useEffect } from "react";

function App() {
    const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
    const [history, setHistory] = useState(() => {
      try {
        const raw = localStorage.getItem("weatherHistory");
        return raw ? JSON.parse(raw) : [];
      } catch (e) {
        return [];
      }
    });

  const getWeather = async () => {
    if (!city) return;

    const apiKey = "b6aa2be33b7d48373064b49377f59ce2"; // replace with your key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    const res = await fetch(url);
    const data = await res.json();
    console.log(data);
    setWeather(data);
    if (data && data.main && data.name) {
      const entry = {
        id: Date.now(),
        name: data.name,
        temp: data.main.temp,
        condition: data.weather && data.weather[0] ? data.weather[0].main : "",
        time: new Date().toLocaleString(),
      };
      setHistory((prev) => {
        const next = [entry, ...prev].slice(0, 10); // keep last 10
        try { localStorage.setItem("weatherHistory", JSON.stringify(next)); } catch (e) {}
        return next;
      });
    }
  };

  useEffect(() => {
    try {
      const raw = localStorage.getItem("weatherHistory");
      if (raw) setHistory(JSON.parse(raw));
    } catch (e) {}
  }, []);

  const clearHistory = () => {
    localStorage.removeItem("weatherHistory");
    setHistory([]);
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
          {history && history.length > 0 && (
            <div className="history">
              <h4>History (past searches)</h4>
              <button onClick={clearHistory}>Clear History</button>
              <ul>
                {history.map((h) => (
                  <li key={h.id}>
                    <strong>{h.name}</strong> — {h.temp}°C, {h.condition} <em>({h.time})</em>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      );
}

export default App;
