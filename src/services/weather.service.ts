import axios from "axios";

import { API_KEY, API_URL, FORECAST_API_URL } from "../config/constants";

const api = {
  // @Get temperature information of selected city
  // @params cityName string
  getWeatherInfoOfCity: (cityName: string) =>
    axios.get(`${API_URL}?q=${cityName}&appid=${API_KEY}`),

  // @Get weather forecast information of selected city
  // @params cityName string
  getWeatherForecastInfoOfCity: (cityName: string) =>
    axios.get(`${FORECAST_API_URL}?q=${cityName}&appid=${API_KEY}`),
};

export default api;
