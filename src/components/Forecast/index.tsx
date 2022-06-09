import React from "react";
import { useAppSelector } from "../../store/hooks";

import "./style.css";

const Forecast: React.FC = () => {
  const forecastLists = useAppSelector((state) => state.weather.forecastInfo);
  const loading = useAppSelector((state) => state.weather.forecastLoading);

  const day = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const month = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return (
    <div className="forecast-container">
      <h3 style={{ margin: "0px" }}>5-day forecast</h3>

      {loading ? (
        <span>loading...</span>
      ) : (
        forecastLists && (
          <ul className="day-list">
            {forecastLists.map((item: any, key: number) => {
              const date = new Date(item.dt * 1000);

              return (
                <li key={key}>
                  <span>{`${day[date.getDay() - 1]}, ${
                    month[date.getMonth()]
                  } ${date.getDate()}`}</span>

                  <div className="day-list-values">
                    <span>{(item.main.temp - 273.15).toFixed(1)}°C</span>
                    <span>{item.weather[0].description}</span>
                  </div>
                </li>
              );
            })}
          </ul>
        )
      )}
    </div>
  );
};

export default Forecast;
