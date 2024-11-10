import React, { useState } from "react";
import "./styles.css";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const getWeather = async () => {
    if (!city.trim()) return setError("Enter a city name");

    try {
      const res = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.4050&current_weather=true`
      );
      const data = await res.json();
      data.current_weather
        ? setWeather(data.current_weather)
        : setError("No data found");
    } catch {
      setError("Failed to fetch data");
    }
  };

  return (
    <div className="App">
      <h1>Weather Now</h1>
      <input
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="City"
      />
      <button onClick={getWeather}>Get Weather</button>
      {error && <p>{error}</p>}
      {weather && (
        <div>
          <p>Temp: {weather.temperature}°C</p>
          <p>Wind: {weather.windspeed} km/h</p>
        </div>
      )}
    </div>
  );
}

export default App;
