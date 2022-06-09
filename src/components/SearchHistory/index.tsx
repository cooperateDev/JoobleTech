import React from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

import {
  getWeatherForecastInfoOfCity,
  getWeatherInfoOfCity,
} from "../../store/weather";

import "./style.css";

interface Props {
  handleChange: (cityName: string) => void;
}

const SearchHistory: React.FC<Props> = ({ handleChange }) => {
  const dispatch = useAppDispatch();

  const searchList = useAppSelector((state) => state.weather.searchList);

  const handleClickSearch = (cityName: string) => {
    handleChange(cityName);
    dispatch(getWeatherInfoOfCity(cityName));
    dispatch(getWeatherForecastInfoOfCity(cityName));
  };

  return (
    <div className="search-history-container">
      {searchList &&
        searchList.map((list: string, key: number) => (
          <p
            className="search-list-item"
            key={key}
            onClick={() => handleClickSearch(list)}
          >
            {list}
          </p>
        ))}
    </div>
  );
};

export default SearchHistory;
