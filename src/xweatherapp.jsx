import React, { useState } from "react";
import "./weathercards.css";

const Xweatherapp = () => {
  const [city, setcity] = useState("");
  const [weatherdata, setweatherdata] = useState(null);
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState("");
  const handlesearch = async () => {
    if (!city.trim()) return alert("Please enter a city name");
    setloading(true);
    seterror("");
    setweatherdata(null);
    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=23b0caaafa3a48b4a35102255250501&q=${city}`
      );
      if (!response.ok) throw new Error("Failed to fetch weather data");
      const data = await response.json();
      setweatherdata(data);
    } catch (error) {
      alert("Failed to fetch weather data");
    } finally {
      setloading(false);
    }
  };
  return (
    <div>
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setcity(e.target.value)}
      />
      <button onClick={handlesearch}>Search</button>
      {loading && <p>Loading data...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {weatherdata && (
        <div className="weather-cards">
          <div className="weather-card">
            <h3>Temperature</h3>
            <p>{weatherdata.current.temp_c}°C</p>
          </div>
          <div className="weather-card">
            <h3>Humidity</h3>
            <p>{weatherdata.current.humidity}%</p>
          </div>
          <div className="weather-card">
            <h3>Condition</h3>
            <p>{weatherdata.current.condition.text}</p>
          </div>
          <div className="weather-card">
            <h3>Wind Speed</h3>
            <p>{weatherdata.current.wind_kph} kph</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Xweatherapp;
