import { create } from 'zustand';

export const useWeatherStore = create((set) => ({
    weatherData: null,
    dailyForecast: null,
    warnings: [],
    isLoading: false,
    error: null,

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
            const maxTemp = data.daily.temperature_2m_max[0]; // Máxima del día
            const minTemp = data.daily.temperature_2m_min[0]; // Mínima del día
            const warnings = [];
            const time = data.daily.timezone;

            // Genera una advertencia si la temperatura sube significativamente
            if (currentTemp < maxTemp) {
                warnings.push(`La temperatura puede subir de ${currentTemp}°C a un pico de ${maxTemp}°C. Quizas debas aplicar un protector solar`);
            }
            // Genera una advertencia si la temperatura bajará significativamente
            if (currentTemp > minTemp) {
                warnings.push(`La temperatura puede caer de ${currentTemp}°C a ${minTemp}°C en la noche. Quizas debas llevar un abrigo`);
            }


            set({
                weatherData: data.current_weather,
                dailyForecast: data.daily,
                warnings,
                isLoading: false,
            });
        } catch (error) {
            set({ error: error.message, isLoading: false });
        }
    },
}));
