import React, { useState } from "react";
import SeacrchBox from "./SeacrchBox";
import InfoBox from "./InfoBox";

export default function WeatherApp() {
  const [weatherInfo, setWeatherInfo] = useState({
    city: "Bengaluru",
    feelsLike: 26.47,
    humidity: 30,
    temp: 27.08,
    tempMax: 28.05,
    tempMin: 25.75,
    weather: "clear sky",
  });
  let updateInfo = (newInfo) => {
    setWeatherInfo(newInfo);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Weather App</h1>
      <SeacrchBox updateInfo={updateInfo} />
      <InfoBox info={weatherInfo} />
    </div>
  );
}
