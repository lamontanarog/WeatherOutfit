"use client";
import { useWeatherStore } from "../store/apiStore";
import { useEffect } from "react";

function Weather() {
    const { weatherData, warnings, isLoading, error, fetchWeather } =
        useWeatherStore();

    useEffect(() => {
        fetchWeather();
    }, [fetchWeather]);

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

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
                <div
                    style={{
                        backgroundColor: "yellow",
                        color: "black",
                        padding: "10px",
                        margin: "10px 0",
                    }}
                >
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

export default Weather;
