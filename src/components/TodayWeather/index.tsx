import React from "react";
import { useAppSelector } from "../../store/hooks";

import "./style.css";

const TodayWeather: React.FC = () => {
  const weatherInfo = useAppSelector((state) => state.weather.weatherInfo);
  const loading = useAppSelector((state) => state.weather.loading);

  const capitalize = (text: string) => {
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  return (
    <div className="today-container">
      {loading ? (
        <span>loading...</span>
      ) : (
        weatherInfo && (
          <>
            <p className="today-degree">
              {`${weatherInfo.name}, ${weatherInfo.sys.country} (Today):  ${(
                weatherInfo.main.temp - 273.15
              ).toFixed(1)}°C`}
            </p>

            <p>{`Feels like ${(weatherInfo.main.feels_like - 273.15).toFixed(
              1
            )}°C, ${capitalize(weatherInfo.weather[0].description)}`}</p>

            <p className="today-weather-info">
              Humidity: {weatherInfo.main.humidity}
            </p>
            <p className="today-weather-info">
              Visibility: {`${(weatherInfo.visibility / 1000).toFixed(1)} km`}
            </p>
          </>
        )
      )}
    </div>
  );
};

export default TodayWeather;
