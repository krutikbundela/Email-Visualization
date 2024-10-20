import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "./baseURL";

const api = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});

export const fetchData = createAsyncThunk(
  "data/fetchData",
  async ({ startDate, endDate, ageGroup, gender }) => {
    console.log("startDate, endDate, ageGroup, gender:", startDate, endDate, ageGroup, gender);
    const response = await api.get("/data", {
      params: {
        startDate,
        endDate,
        ageGroup,
        gender,
      },
    });
    return response.data;
  }
);

const initialState = {
  data: [],
  isLoading: false,
  isError: false,
 
};

export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
   builder
     .addCase(fetchData.pending, (state) => {
       state.isLoading = true;
       state.isError = null;
     })
     .addCase(fetchData.fulfilled, (state, action) => {
       state.data = action.payload;
       state.isLoading = false;
     })
     .addCase(fetchData.rejected, (state, action) => {
       state.isError = action.payload;
       state.isLoading = false;
     });
  },
});

export default dataSlice.reducer;
