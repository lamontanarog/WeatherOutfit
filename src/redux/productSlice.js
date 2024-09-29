"use client";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { selectCurrentCategory, selectWarnings, selectWeatherData } from "./slices/weatherSlice";
import { useSelector } from "react-redux";


const initialState = {
    outfit: [],
    loading: false,
    error: null,
    products: [],
    categoria: selectCurrentCategory,
}

export const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
    const response = await fetch('http://localhost:3000/clothes.json')
    const data = await response.json();
    return data.products;
});

export const generateOutfit = createAsyncThunk("products/generateOutfit", async (_, { getState }) => {

    const weatherData = useSelector(selectWeatherData);
    const warnings = useSelector(selectWarnings);
    const { products } = getState().products;

    const outfit = [];

    const getProductByCategoryAndClimate = (state, category) => {
        const filteredProducts = state.products.filter((product) => {
            return product.category === category && product.climate === state.api.weatherData.categoria;
        })
        return filteredProducts[Math.floor(Math.random() * filteredProducts.length)];
    }
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

    return outfit;
});

const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.products = action.payload;
            state.loading = false;
            state.error = null;
        })

        builder.addCase(generateOutfit.fulfilled, (state, action) => {
            state.outfit = action.payload;
            state.loading = false;
            state.error = null;
        })

        builder.addCase(fetchProducts.pending, (state) => {
            state.loading = true;
            state.error = null;
        })

        builder.addCase(fetchProducts.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
    }
})
export const selectProducts = (state) => state.products;
export const selectOutfit = (state) => state.products.outfit;
export const selectLoading = (state) => state.products.loading;
export const selectError = (state) => state.products.error;

export default productSlice.reducer;


