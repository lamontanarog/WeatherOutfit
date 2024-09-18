"use client";
import { create } from "zustand";

export const useWeatherStore = create((set) => ({
    weatherData: null,
    warnings: [],
    isLoading: false,
    error: null,

    categorizeTemperature: (temp) => {
        if (temp > 25) return "caluroso";
        if (temp >= 18 && temp <= 24) return "soleado";
        if (temp >= 9 && temp <= 15) return "templado";
        if (temp >= 0 && temp < 9) return "frio";
        return "mucho frio";
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
            const maxTemp = data.daily.temperature_2m_max[0];
            const minTemp = data.daily.temperature_2m_min[0];
            const warnings = [];
            const currentHour = new Date().getHours();


            if (currentTemp < maxTemp && currentHour < 19) {
                warnings.push(`La temperatura actual es ${currentTemp}°C, pero puede subir hasta ${maxTemp}°C hoy. Quizás debas aplicar un protector solar.`)
            }
            if (currentTemp > minTemp && currentHour > 6) {
                warnings.push(`La temperatura actual es ${currentTemp}°C, pero puede bajar hasta ${minTemp}°C hoy. Quizás debas llevar un abrigo.`)
            }

            set({
                weatherData: {
                    ...data.current_weather,
                    currentCategory
                },
                warnings: warnings,
                isLoading: false,
            });

            console.log('currentCategory', currentCategory);

        } catch (error) {
            set({ error: error.message, isLoading: false });
        }
    }
    ,
}));
