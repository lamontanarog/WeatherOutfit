"use client";
import { create } from "zustand";
import { useWeatherStore } from "../store/apiStore.js";

export const useProductStore = create((set) => ({
    outfit: [],  // Estado inicial para el outfit
    loading: false,
    error: null,

    // Filtra productos por categoría (parte superior, parte inferior, zapatos, etc.)
    categorizeProducts: (products, category) => {
        const { weatherData } = useWeatherStore();

        // Filtro basado en el clima
        const filteredProducts = products.filter(p => p.category === category && p.climate === weatherData.category);
        return filteredProducts.length > 0 ? filteredProducts : null;
    },

    // Seleccionar un producto aleatorio por categoría
    getRandomProductByCategory: (products, category) => {
        const categorizedProducts = products.filter(product => product.category === category);
        return categorizedProducts[Math.floor(Math.random() * categorizedProducts.length)];
    },

    // Formar el outfit según el clima y posibles advertencias
    generateOutfit: async () => {
        set({ loading: true, error: null });
        try {
            const response = await fetch('http://localhost:3000/clothes.json');
            const data = await response.json();
            const products = data.products;
            let outfit = [];

            // Parte de arriba
            const top = getRandomProductByCategory(products, "womens-tops");
            if (top) outfit.push(top);

            // Parte de abajo o vestido
            const bottomOrDress = getRandomProductByCategory(products, "womens-skirts") || getRandomProductByCategory(products, "womens-dresses");
            if (bottomOrDress) outfit.push(bottomOrDress);

            // Zapatos
            const shoes = getRandomProductByCategory(products, "womens-shoes");
            if (shoes) outfit.push(shoes);

            // Accesorios
            const accessories = getRandomProductByCategory(products, "womens-accessories");
            if (accessories) outfit.push(accessories);

            // Si hay advertencias de baja temperatura, agregar abrigo
            const { warnings } = useWeatherStore.getState();
            if (warnings.length > 0) {
                const coat = getRandomProductByCategory(products, "womens-coats");
                if (coat) outfit.push(coat);
            }

            set({ outfit, loading: false, error: null });
        } catch (error) {
            console.error(error);
            set({ error: "Error generating outfit", loading: false });
        }
    },
}));
