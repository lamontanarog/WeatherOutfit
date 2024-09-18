"use client";
import { useEffect } from "react";
import { useProductStore } from "../../store/apiClothes.js";
import { useWeatherStore } from "../../store/apiStore.js";

export default function OutfitRecommendation() {
    const { outfit, generateOutfit, loading, error } = useProductStore();
    const { weatherData, fetchWeather } = useWeatherStore();


    // Al montar el componente, obtener clima y generar el outfit
    useEffect(() => {
        fetchWeather();

    }, [fetchWeather]);

    useEffect(() => {
        if (weatherData) {
            generateOutfit();
        }
    }, [weatherData, generateOutfit]);


    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div style={{ backgroundImage: "url('https://i.pinimg.com/736x/20/8e/81/208e81cf3de08d55af49272f6e3a6d4c.jpg')", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh" }}>
            <h1>Recomendación de Outfit según el clima</h1>
            {outfit.length > 0 ? (
                outfit.map((item, index) => (
                    <div key={index} style={{ display: "flex", justifyContent: "center", flexDirection: "row", margin: "10px" }}>

                        <img
                            src={item.thumbnail}
                            alt={item.title}
                            style={{ width: "200px", height: "200px" }}
                        />
                        <p>{item.climate}</p>
                    </div>
                ))
            ) : (
                <p>No se encontraron prendas para el outfit.</p>
            )}
        </div>
    );
}
