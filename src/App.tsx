import React from "react";

import SearchBox from "./components/SearchBox";
import TodayWeather from "./components/TodayWeather";
import Forecast from "./components/Forecast";
import SearchHistory from "./components/SearchHistory";

import "./App.css";

const App: React.FC = () => {
  return (
    <div className="container">
      <h2 className="page-title">Weather Forecast</h2>

      <SearchBox />

      <div className="weather-info-container">
        <div>
          <TodayWeather />

          <SearchHistory />
        </div>

        <Forecast />
      </div>
    </div>
  );
};

export default App;
