import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";

import "./SearchBox.css";

function SearchBox({ updateInfo }) {
  let [city, setCity] = useState("");
  let [error, setError] = useState(false);
  const API_URL = "https://api.openweathermap.org/data/2.5/weather";
  const API_KEY = "ea2f1c206c192deb43662011823d4a1a";

  let getWeatherInfo = async () => {
    try {
      let response = await fetch(
        `${API_URL}?q=${city}&appid=${API_KEY}&units=metric`
      );

      let jsonResponse = await response.json();

      if (!response.ok) {
        throw new Error(jsonResponse.message || "City not found");
      }

      let result = {
        city: city,
        temp: jsonResponse.main.temp,
        tempMin: jsonResponse.main.temp_min,
        tempMax: jsonResponse.main.temp_max,
        humidity: jsonResponse.main.humidity,
        feelsLike: jsonResponse.main.feels_like,
        weather: jsonResponse.weather[0].description,
      };

      setError(false);
      console.log(result);
      return result;
    } catch (err) {
      setError(true);
      return null;
    }
  };

  let handleChange = (evt) => {
    setCity(evt.target.value);
    setError(false);
  };

  let handleSubmit = async (evt) => {
    evt.preventDefault();
    console.log(city);

    let newInfo = await getWeatherInfo();
    if (newInfo) {
      updateInfo(newInfo);
    }
    setCity("");
  };

  return (
    <div className="SearchBox">
      <form onSubmit={handleSubmit}>
        <TextField
          id="city"
          label="City Name"
          variant="outlined"
          required
          value={city}
          onChange={handleChange}
        />
        <br></br>
        <br></br>
        <Button variant="contained" type="submit" endIcon={<SearchIcon />}>
          Search
        </Button>
        {error && (
          <p>
            <b>No such place in our API!</b>
          </p>
        )}
      </form>
    </div>
  );
}

export default SearchBox;
