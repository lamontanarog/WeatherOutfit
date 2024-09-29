"use client";
import { configureStore } from "@reduxjs/toolkit";
// import   productReducer  from "../redux/productSlice";
// import   apiReducer  from "../redux/weatherSlice";
import  climateReducer  from "../redux/slices/climb.js"
import weatherReducer from "./slices/weatherSlice.js";

export const store = configureStore({
    reducer: {
        // products: productReducer,
        climate: climateReducer,
        weather: weatherReducer,
    }
})