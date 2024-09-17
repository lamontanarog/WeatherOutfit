"use client";
import { create } from "zustand";

export const useWeatherStore = create((set) => ({
    weatherData: null,
    warnings: [],
    isLoading: false,
    error: null,

    categorizeTemperature: (temp) => {
        if (temp > 25) return "Caluroso";
        if (temp >= 15 && temp <= 24) return "Soleado";
        if (temp >= 9 && temp < 15) return "Templado";
        if (temp >= 0 && temp < 9) return "Frío";
        return "Mucho frío";
    },

    fetchWeather: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await fetch(
                `https://api.open-meteo.com/v1/forecast?latitude=-26.8167&longitude=-65.2167&current_weather=true&daily=temperature_2m_max,temperature_2m_min&timezone=America/Argentina/Tucuman`
            );
            const data = await response.json();

            if (!response.ok) {
                throw new Error("Failed to fetch weather data");
            }

            const currentTemp = data.current_weather.temperature;
            const currentCategory = useWeatherStore.getState().categorizeTemperature(currentTemp);

            set({
                weatherData: {
                    ...data.current_weather,
                    category: currentCategory,
                },
                isLoading: false,
            });
        } catch (error) {
            set({ error: error.message, isLoading: false });
        }
    },
}));
