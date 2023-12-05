import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getData = createAsyncThunk("student/getData", async () => {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}`);
    return response.data;
});

const studentSlice = createSlice({
    name: "student",
    initialState: {
        isLoading: false,
        data: [],
        isError: false,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getData.pending, (state) => {
                state.isLoading = true;
            })

            .addCase(getData.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })

            .addCase(getData.rejected, (state, action) => {
                console.log("Error", action.payload);
                state.isError = true;
            })
    }
})

export default studentSlice.reducer