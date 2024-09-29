import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    temperature: null,
    isLoading: false,
    error: null,
};

export const fetchTemperature = createAsyncThunk(
    "weather/fetchTemperature", async () => {
        const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=-26.8167&longitude=-65.2167&current_weather=true&daily=temperature_2m_max,temperature_2m_min&timezone=America/Argentina/Tucuman'
        );
        const data = await response.json();
        return data.current_weather.temperature;
    }
);

const weatherSlice = createSlice({
    name: 'weather',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchTemperature.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        })
        builder.addCase(fetchTemperature.fulfilled, (state, action) => {
            state.isLoading = false;
            state.temperature = action.payload;
            state.error = null;
        })
        builder.addCase(fetchTemperature.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        })
    }
}
);

export const selectTemperature = (state) => state.weather.temperature;
export const selectIsLoading = (state) => state.weather.isLoading;
export const selectError = (state) => state.weather.error;


export default weatherSlice.reducer;