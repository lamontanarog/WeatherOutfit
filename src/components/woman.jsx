"use client";
import { useProductStore } from "../store/apiClothes.js";
import { useWeatherStore } from "../store/apiStore.js"; // Importamos el store del clima
import { useEffect } from "react";

function WomanClothes() {
    const { product, fetchRandomProduct, loading, error } = useProductStore();
    const { weatherData, fetchWeather } = useWeatherStore(); // Obtenemos el estado del clima

    // Al montar el componente, obtenemos el clima y productos automáticamente
    useEffect(() => {
        fetchWeather(); // Llama a la API para obtener el clima actual
    }, []);

    // Cuando el clima se actualiza, obtenemos productos aleatorios según el clima
    useEffect(() => {
        if (weatherData) {
            fetchRandomProduct(); // Filtra productos y selecciona uno aleatorio
        }
    }, [weatherData]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h1>Recomendación de producto según el clima</h1>
            {product && (
                <div style={{ marginTop: "20px" }}>
                    <h2>{product.title}</h2>
                    <img
                        src={product.thumbnail}
                        alt={product.title}
                        style={{ width: "150px", height: "200px" }}
                    />
                    <p>{product.description}</p>
                    <p>{product.price} USD</p>
                </div>
            )}
        </div>
    );
}

export default WomanClothes;
