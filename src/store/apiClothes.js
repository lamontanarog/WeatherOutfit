"use client";
import { create } from "zustand";
import { useWeatherStore } from "../store/apiStore.js";

export const useProductStore = create((set) => ({
    outfit: [],  // Estado inicial para el outfit
    loading: false,
    error: null,
    products: [],

    getProducts: async () => {
        set({ loading: true, error: null });
        try {
            const response = await fetch('http://localhost:3000/clothes.json');
            const data = await response.json();
            const products = data.products;
            set({ products, loading: false });

        } catch (error) {
            console.error(error);
            set({ error: "Error generating outfit", loading: false });
        };
    },

    getProductByCategoryAndClimate: (products, category) => {
        const filteredProducts = products.filter((product) => {
            return product.category === category && product.climate === climate;
        })

        return filteredProducts[Math.floor(Math.random() * filteredProducts.length)];
    },

    // Formar el outfit según el clima y posibles advertencias
    generateOutfit: async () => {
        let outfit = [];

        // Obtener estado del clima
        const { weatherData, warnings } = useWeatherStore.getState();
        const { products } = useProductStore.getState();
        const clima = weatherData.currentCategory;

        // console.log('currentClim', weatherData?.currentCategory);
        // console.log('productClimate', products?.climate);
        // Accesorios
        const accessories = useProductStore.getState().getProductByCategoryAndClimate(products, "womens-accessories");

        if (accessories) outfit.push(accessories);
        // Parte de arriba
        const top = useProductStore.getState().getProductByCategoryAndClimate(products, "womens-tops");
        if (top) outfit.push(top);

        // Parte de abajo o vestido
        const bottomOrDress = useProductStore.getState().getProductByCategoryAndClimate(products, "womens-skirts") || useProductStore.getState().getProductByCategoryAndClimate(products, "womens-dresses");
        if (bottomOrDress) outfit.push(bottomOrDress);

        // Zapatos
        const shoes = useProductStore.getState().getProductByCategoryAndClimate(products, "womens-shoes");
        if (shoes) outfit.push(shoes);


        // Si hay advertencias de baja temperatura, agregar abrigo
        if (warnings.length > 0 && weatherData && weatherData.temperature < 13) {
            const coat = useProductStore.getState().getProductByCategoryAndClimate(products, "womens-coats") || useProductStore.getState().getProductByCategoryAndClimate(products, "womens-jackets");
            if (coat) outfit.push(coat);
        }
        set({ outfit, loading: false, error: null })
        console.log('outfit', outfit);;

    }
}));

