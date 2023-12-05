import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const addStudent = createAsyncThunk('student/addStudent', async (data) => {
    const response = await axios.post('http://localhost:8081/students', {
        rollno: data.rollno,
        name: data.name,
        course: data.course,
        address: data.address,
        contact: data.contact,
        email: data.email
    })
    return response.data
})

const createStudentSlice = createSlice({
    name: "createStudent",
    initialState: {
        isLoading: false,
        data: [],
        error: ''
    },
    extraReducers: (builder) => {
        builder
            .addCase(addStudent.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addStudent.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data.push(action.payload);
            })
            .addCase(addStudent.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
    }
})

export default createStudentSlice.reducer