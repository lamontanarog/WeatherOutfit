"use client";
import { useWeatherStore } from "../store/apiStore.js";
import { useEffect } from "react";

export default function Home() {
    const { weatherData, warnings, isLoading, error, fetchWeather, currentCategory } = useWeatherStore();


    useEffect(() => {
        fetchWeather();
    }, [fetchWeather]);

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div style={{
            background: "linear-gradient(234deg, #f9f9f9 34%, #e5e5e5 100%)",
            color: "black",
            padding: "2em",
            borderRadius: "1em",
            boxShadow: "0 0 10px rgba(0,0,0,0.2)"
        }}>
            <h1 style={{ textAlign: "center" }}>Weather in Chile</h1>
            {weatherData && (
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <p>Current Temperature: {weatherData.temperature}°C</p>
                    <p>Category: {weatherData.currentCategory}</p>
                </div>
            )}

            {warnings.length > 0 && (
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "1em" }}>
                    <h2>Temperature Warnings</h2>
                    <ul style={{ listStyleType: "none", padding: 0 }}>
                        {warnings.map((warning, index) => (
                            <li key={index} style={{ marginTop: "0.5em" }}>{warning}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}


