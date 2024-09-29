"use client";
import { useDispatch, useSelector } from "react-redux";
import {
    setFetchData,
    setCurrentCategory,
    setWarnings,
    setWeatherData,
    setError,
    setLoading,
} from "../redux/slices/weatherSlice";
// import { setClimate, setError, isLoading } from "@/redux/slices/climb";
import { useEffect } from "react";

export default function Home() {

    const dispatch = useDispatch();
    const weatherData = useSelector((state) => state.weatherSlice.weatherData);
    const warning = useSelector((state) => state.weatherSlice.warnings);
    const loading = useSelector((state) => state.weatherSlice.loading);
    const error = useSelector((state) => state.weatherSlice.error);
    const currentCategory = useSelector((state) => state.weatherSlice.currentCategory);

    // const hola = useSelector(setClimate.name);

    console.log('data', weatherData);

    useEffect(() => {
        dispatch(setFetchData());
    }, [dispatch]);

    if (loading) return <p>Loading...</p>;
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
                    <p>Category: {currentCategory}</p>
                </div>
            )}

            {warning?.length > 0 && (
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "1em" }}>
                    <h2>Temperature Warnings</h2>
                    <ul style={{ listStyleType: "none", padding: 0 }}>
                        {warning.map((warning, index) => (
                            <li key={index} style={{ marginTop: "0.5em" }}>{warning}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}


