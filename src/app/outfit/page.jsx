"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, generateOutfit, selectError, selectLoading, selectOutfit } from "../../redux/productSlice";
import { selectWeatherData, setError, setLoading, setWeatherData } from "@/redux/weatherSlice";

export default function OutfitRecommendation() {
    const dispatch = useDispatch();
    const weatherData = useSelector(setWeatherData);
    const outfit = useSelector(selectOutfit);
    const loading = useSelector(setLoading);
    const error = useSelector(setError);

    // Al montar el componente, obtener clima y generar el outfit
    useEffect(() => {
        dispatch(fetchProducts());

    }, [dispatch]);

    useEffect(() => {
        if (weatherData) {
            dispatch(generateOutfit());
        }
    }, [weatherData, dispatch]);


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
