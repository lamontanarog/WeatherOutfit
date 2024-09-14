import { create } from "zustand";

// Estado en Zustand
export const useProductStore = create((set) => ({
    product: {},  // Estado inicial vacío para el producto
    loading: false, // Indicador de carga
    error: null, // Para manejar errores


    fetchRandomProduct: async (category) => {
        set({ loading: true, error: null }); // Iniciar la carga
        try {
            const response = await fetch('http://localhost:3000/clothes.json');
            const data = await response.json();
            const products = data.products;
            
            console.log('products',products);

            const filteredProducts = products.filter(product => product.category === category);
            console.log('filteredProducts',filteredProducts);

            if (filteredProducts && filteredProducts.length > 0) {
                const randomProduct = filteredProducts[Math.floor(Math.random() * filteredProducts.length)];
                console.log('randomProduct',randomProduct);
                set({ product: randomProduct, loading: false, error: null });
            } else {
                set({ error: "No products found", loading: false });
            }
        } catch (error) {
            console.error(error);
            set({ error: "Error fetching product", loading: false });
        }
    },

}))