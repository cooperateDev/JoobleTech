import React, { useContext } from "react";
import { CityNameContext } from "../../context";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

import {
  getWeatherForecastInfoOfCity,
  getWeatherInfoOfCity,
} from "../../store/weather";

import "./style.css";

const SearchHistory: React.FC = () => {
  const dispatch = useAppDispatch();

  const { setCityName } = useContext(CityNameContext);

  const searchList = useAppSelector((state) => state.weather.searchList);

  const handleClickSearch = (_cityName: string) => {
    setCityName(_cityName);
    dispatch(getWeatherInfoOfCity(_cityName));
    dispatch(getWeatherForecastInfoOfCity(_cityName));
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
