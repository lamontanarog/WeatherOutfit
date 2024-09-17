"use client";
import { create } from "zustand";
import { useWeatherStore } from "../store/apiStore.js";

export const useProductStore = create((set) => ({
    outfit: [],  // Estado inicial para el outfit
    loading: false,
    error: null,

    // Seleccionar un producto aleatorio por categoría
    getRandomProductByCategory: (products, category) => {
        const categorizedProducts = products.filter(product => product.category === category);
        return categorizedProducts.length > 0 ? categorizedProducts[Math.floor(Math.random() * categorizedProducts.length)] : null;
    },

    // Formar el outfit según el clima y posibles advertencias
    generateOutfit: async () => {
        set({ loading: true, error: null });
        try {
            const response = await fetch('http://localhost:3000/clothes.json');
            const data = await response.json();
            const products = data.products;
            let outfit = [];

            // Obtener estado del clima
            const { weatherData, warnings } = useWeatherStore.getState();

            // Parte de arriba
            const top = useProductStore.getState().getRandomProductByCategory(products, "womens-tops");
            if (top) outfit.push(top);

            // Parte de abajo o vestido
            const bottomOrDress = useProductStore.getState().getRandomProductByCategory(products, "womens-skirts") || useProductStore.getState().getRandomProductByCategory(products, "womens-dresses");
            if (bottomOrDress) outfit.push(bottomOrDress);

            // Zapatos
            const shoes = useProductStore.getState().getRandomProductByCategory(products, "womens-shoes");
            if (shoes) outfit.push(shoes);

            // Accesorios
            const accessories = useProductStore.getState().getRandomProductByCategory(products, "womens-accessories");
            if (accessories) outfit.push(accessories);

            // Si hay advertencias de baja temperatura, agregar abrigo
            if (warnings.length > 0) {
                const coat = useProductStore.getState().getRandomProductByCategory(products, "womens-coats");
                if (coat) outfit.push(coat);
            }

            set({ outfit, loading: false, error: null });
        } catch (error) {
            console.error(error);
            set({ error: "Error generating outfit", loading: false });
        }
    },
}));
