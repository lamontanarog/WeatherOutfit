"use client";
import { useEffect } from "react";
import { useProductStore } from "../store/apiClothes.js";
import { useWeatherStore } from "../store/apiStore.js";

export default function OutfitRecommendation() {
    const { outfit, generateOutfit, loading, error } = useProductStore();
    const { weatherData, fetchWeather } = useWeatherStore();

    // Al montar el componente, obtener clima y generar el outfit
    useEffect(() => {
        fetchWeather();
    }, []);

    useEffect(() => {
        if (weatherData) {
            generateOutfit();
        }
    }, [weatherData]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h1>Recomendación de Outfit según el clima</h1>
            {outfit.length > 0 && outfit.map((item, index) => (
                <div key={index} style={{ marginTop: "20px" }}>
                    <h2>{item.title}</h2>
                    <img
                        src={item.thumbnail}
                        alt={item.title}
                        style={{ width: "150px", height: "200px" }}
                    />
                    <p>{item.description}</p>
                </div>
            ))}
        </div>
    );
}
