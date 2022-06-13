import React, { useContext, useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  getWeatherForecastInfoOfCity,
  getWeatherInfoOfCity,
  setError,
} from "../../store/weather";
import { CityNameContext } from "../../context";

import "./style.css";

const SearchBox: React.FC = () => {
  const dispatch = useAppDispatch();

  // global state
  const error = useAppSelector((state) => state.weather.error);
  const { cityName, setCityName } = useContext(CityNameContext);

  const handleClickSearch = () => {
    if (!cityName) {
      dispatch(setError("Please input city name"));
    } else {
      dispatch(setError(""));
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
    <>
      <div className="search">
        <input
          type="text"
          className="search-input"
          placeholder="Search city"
          value={cityName}
          onChange={(e) => setCityName(e.target.value)}
        />

        <button className="search-button" onClick={handleClickSearch}>
          Search
        </button>
      </div>

      {error && <p className="search-error">{error}</p>}
    </>
  );
};

export default SearchBox;
