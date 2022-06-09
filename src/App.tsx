import React, { useEffect, useState } from "react";

import SearchBox from "./components/SearchBox";
import TodayWeather from "./components/TodayWeather";

import { useAppDispatch } from "./store/hooks";
import {
  getWeatherInfoOfCity,
  getWeatherForecastInfoOfCity,
} from "./store/weather";

import "./App.css";
import Forecast from "./components/Forecast";
import SearchHistory from "./components/SearchHistory";

const App: React.FC = () => {
  const dispatch = useAppDispatch();

  // local state
  const [cityName, setCityName] = useState("");
  const [error, setError] = useState("");

  // event

  const handleChange = (cityName: string) => {
    setCityName(cityName);
  };

  const handleClickSearch = () => {
    if (!cityName) {
      setError("Please input city name");
    } else {
      setError("");
      dispatch(getWeatherInfoOfCity(cityName));
      dispatch(getWeatherForecastInfoOfCity(cityName));
    }
  };

  useEffect(() => {
    setCityName("Kyiv");
    dispatch(getWeatherInfoOfCity("Kyiv"));
    dispatch(getWeatherForecastInfoOfCity("Kyiv"));
  }, []);

  return (
    <div className="container">
      <h2 className="page-title">Weather Forecast</h2>

      <SearchBox
        value={cityName}
        error={error}
        onChange={handleChange}
        handleClickSearch={handleClickSearch}
      />

      <div className="weather-info-container">
        <div>
          <TodayWeather />

          <SearchHistory handleChange={handleChange} />
        </div>

        <Forecast />
      </div>
    </div>
  );
};

export default App;
