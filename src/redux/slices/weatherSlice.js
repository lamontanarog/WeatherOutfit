"use client";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    weatherData: null,
    warnings: [],
    isLoading: false,
    error: null,
};

export const fetchWeather = createAsyncThunk(
    "weather/fetchWeather",
    async () => {
        const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=-26.8167&longitude=-65.2167&current_weather=true&daily=temperature_2m_max,temperature_2m_min&timezone=America/Argentina/Tucuman');

        if (!response.ok) {
            throw new Error("Failed to fetch weather data");
        }

        const data = await response.json();

        const currentTemp = data.current_weather.temperature;
        const currentCategory = categorizeTemperature(currentTemp);
        const maxTemp = data.daily.temperature_2m_max[0];
        const minTemp = data.daily.temperature_2m_min[0];
        const warnings = [];
        const currentHour = new Date().getHours();

        if (currentTemp > maxTemp && currentHour < 19) {
            warnings.push(
                `La temperatura actual es ${currentTemp}°C, pero puede subir hasta ${maxTemp}°C hoy. Quizás debas aplicar un protector solar.`
            );
        }
        if (currentTemp < minTemp && currentHour > 6) {
            warnings.push(
                `La temperatura actual es ${currentTemp}°C, pero puede bajar hasta ${minTemp}°C hoy. Quizás debas llevar un abrigo.`
            );
        }

        return {
            weatherData: {
                ...data.current_weather,
                currentCategory,
            },
            warnings,
        };
    }
);

const categorizeTemperature = (temp) => {
    if (temp > 25) return "caluroso";
    if (temp >= 18 && temp <= 24) return "soleado";
    if (temp >= 9 && temp <= 15) return "templado";
    if (temp >= 0 && temp < 9) return "frio";
    return "mucho frio";
};

const weatherSlice = createSlice({
    name: "weatherSlice",
    initialState,
    reducers: {
        setFetchData: (state, action) => {
            state.weatherData = action.payload;
        },
        setCurrentCategory: (state, action) => {
            state.currentCategory = action.payload;
        },
        setWarnings: (state, action) => {
            state.warnings = action.payload;
        },
        setWeatherData: (state, action) => {
            state.weatherData = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        reset: () => initialState,
    }})


    export const {
        setFetchData,
        setCurrentCategory,
        setWarnings,
        setWeatherData,
        setError,
        setLoading,
        reset} = weatherSlice.actions


    export default weatherSlice.reducer;
    // extraReducers: (builder) => {
    //     builder.addCase(fetchWeather.pending, (state) => {
    //         state.isLoading = true;
    //         state.error = null;
    //     });
    //     builder.addCase(fetchWeather.fulfilled, (state, action) => {
    //         state.isLoading = false;
    //         state.currentCategory = action.payload.weatherData.currentCategory;
    //         state.weatherData = action.payload.weatherData;
    //         state.warnings = action.payload.warnings;
    //         state.error = null;
    //     });
    //     builder.addCase(fetchWeather.rejected, (state, action) => {
    //         state.isLoading = false;
    //         state.error = action.error.message;
    //     });
    // },
});

// export const {
//     setCurrentCategory,
//     setWarnings,
//     setWeatherData,
//     setError,
//     setLoading,
//     reset,
// } = weatherSlice.actions;

// export const selectWeatherData = (state) => state.weatherSlice?.weatherData;
// export const selectCurrentCategory = (state) => state.weatherSlice?.currentCategory;
// export const selectWarnings = (state) => state.weatherSlice?.warnings;
// export const selectIsLoading = (state) => state.weatherSlice?.isLoading;
// export const selectError = (state) => state.weatherSlice?.error;




