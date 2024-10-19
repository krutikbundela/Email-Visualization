import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api/v1",
  withCredentials: true,
});

export const registerUser = createAsyncThunk(
  "user/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.post("/register", userData);
      return response.data.user;
    } catch (error) {
      return rejectWithValue(error.response.data.message || error.message);
    }
  }
);
export const loginUser = createAsyncThunk(
  "user/login",
  async (userData, { rejectWithValue }) => {
    console.log("userData:", userData);
    try {
      const response = await api.post("/login", userData);
      console.log("response:", response);
      return response.data.user;
    } catch (error) {
      return rejectWithValue(error.response.data.message || error.message);
    }
  }
);

export const loadUser = createAsyncThunk(
  "user/load",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/auth/me");
      return response.data.user;
    } catch (error) {
      return rejectWithValue(error.response.data.message || error.message);
    }
  }
);

export const logoutUser = createAsyncThunk("user/logout", async () => {
  const response = await api.post("/logout");
  return response.data;
});

const initialState = {
  user: null,
  isAuthenticated: false,
  isUserLoading: false,
  isUserError: null,
};

export const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isUserLoading = true;
        state.isUserError = null;
        state.isAuthenticated = false;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isUserLoading = false;
        state.isAuthenticated = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isUserError = action.payload;
        state.isUserLoading = false;
        state.isAuthenticated = false;
      })
      //===================================================
      .addCase(loginUser.pending, (state) => {
        state.isUserLoading = true;
        state.isUserError = null;
        state.isAuthenticated = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isUserLoading = false;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isUserError = action.payload;
        state.isUserLoading = false;
        state.isAuthenticated = false;
      })
      //===================================================

      .addCase(loadUser.pending, (state) => {
        state.isUserLoading = true;
        state.isUserError = null;
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.isUserLoading = false;
      })
      .addCase(loadUser.rejected, (state) => {
        state.user = null;
        state.isUserLoading = false;
        state.isAuthenticated = false;
      })
      //===================================================
      .addCase(logoutUser.pending, (state) => {
        state.isUserLoading = true;
        state.isUserError = null;
        state.isAuthenticated = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isUserLoading = false;
        state.isAuthenticated = false;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isUserError = action.payload;
        state.isUserLoading = false;
        state.isAuthenticated = true;
      });
  },
});

export default authSlice.reducer;
