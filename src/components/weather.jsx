"use client";
import { useWeatherStore } from "../store/apiStore.js";
import { useEffect } from "react";

export default function Home() {
    const { weatherData, warnings, isLoading, error, fetchWeather } = useWeatherStore();

    useEffect(() => {
        fetchWeather();
    }, [fetchWeather]);

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h1>Weather in Tucumán, Argentina</h1>
            {weatherData && (
                <div>
                    <p>Current Temperature: {weatherData.temperature}°C</p>
                    <p>Category: {weatherData.category}</p>
                </div>
            )}

            {warnings.length > 0 && (
                <div style={{ backgroundColor: 'yellow', color: 'black', padding: '10px', margin: '10px 0' }}>
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
