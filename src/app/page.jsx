"use client"
import { useWeatherStore } from "../store/apiStore.js";
import { useEffect } from "react";

export default function Home() {
  const { weatherData, warnings, isLoading, error, fetchWeather } = useWeatherStore();

  useEffect(() => {
    fetchWeather();
  }, [fetchWeather]);

  return (
    <div>
      <h1>Weather in Tucumán, Argentina</h1>

      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}

      {weatherData && (
        <div>
          <p>Temperature: {weatherData.temperature}°C</p>
        </div>
      )}

      {/* Mostrar advertencias sobre cambios significativos de temperatura */}
      {warnings.length > 0 && (
        <div style={{ backgroundColor: 'yellow',color: 'black', padding: '10px', margin: '10px 0' }}>
          <h2>Temperature Warnings</h2>
          <ul>
            {warnings.map((warning, index) => (
              <li key={index}>{warning}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}