import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import api from "../../services/weather.service";
import { WeatherInitialState } from "../../type/weather";

const initialState: WeatherInitialState = {
  weatherInfo: null,
  forecastInfo: null,
  loading: false,
  forecastLoading: false,
  error: "",
  searchList: [],
};

export const getWeatherInfoOfCity = createAsyncThunk(
  "weather/getWeatherInfoOfCity",
  async (cityName: string) => {
    try {
      const response = await api.getWeatherInfoOfCity(cityName);

      return response.data;
    } catch (err: any) {
      console.log(err);
      if (err.response.status === 404) {
        return err.response.data;
      } else {
        return err.message;
      }
    }
  }
);

export const getWeatherForecastInfoOfCity = createAsyncThunk(
  "weather/getWeatherForecastInfoOfCity",
  async (cityName: string) => {
    try {
      const response = await api.getWeatherForecastInfoOfCity(cityName);

      return response.data;
    } catch (err: any) {
      console.log(err);

      if (err.response.status === 404) {
        return err.response.data;
      } else {
        return err.message;
      }
    }
  }
);

export const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    setError: (state: WeatherInitialState, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getWeatherInfoOfCity.pending, (state: WeatherInitialState) => {
        state.loading = true;
      })
      .addCase(
        getWeatherInfoOfCity.fulfilled,
        (state: WeatherInitialState, action) => {
          state.loading = false;

          if (action.payload.cod === 200) {
            state.weatherInfo = { ...action.payload };
            state.error = "";

            // add city name to search list
            if (state.searchList.length === 10) {
              if (!state.searchList.includes(action.payload.name))
                state.searchList = [
                  ...state.searchList.slice(1, 10),
                  action.payload.name,
                ];
            } else {
              if (!state.searchList.includes(action.payload.name))
                state.searchList = [...state.searchList, action.payload.name];
            }
          } else if (action.payload.cod === "404") {
            state.error = action.payload.message;
          }
        }
      )
      .addCase(
        getWeatherInfoOfCity.rejected,
        (state: WeatherInitialState, action) => {
          state.loading = false;
        }
      )
      .addCase(
        getWeatherForecastInfoOfCity.pending,
        (state: WeatherInitialState) => {
          state.forecastLoading = true;
        }
      )
      .addCase(
        getWeatherForecastInfoOfCity.fulfilled,
        (state: WeatherInitialState, action) => {
          state.forecastLoading = false;

          if (action.payload.cod === "200") {
            const _forecastInfo = action.payload.list.filter((item: any) =>
              item.dt_txt.includes("00:00:00")
            );

            state.forecastInfo = [..._forecastInfo];
          } else if (action.payload.cod === "404") {
            state.error = action.payload.message;
          }
        }
      )
      .addCase(
        getWeatherForecastInfoOfCity.rejected,
        (state: WeatherInitialState, action) => {
          state.forecastLoading = false;
        }
      );
  },
});

export const { setError } = weatherSlice.actions;

export default weatherSlice.reducer;
