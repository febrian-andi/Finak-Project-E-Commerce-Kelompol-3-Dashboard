import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// const API_URL = "https://api-auth-e-commerce-dashboard-kelompok-3.vercel.app";
const API_URL = import.meta.env.VITE_API_URL;

// Login Async Action
export const login = createAsyncThunk(
  "auth/login",
  async (data, { rejectWithValue }) => {
    try {
      const getUsers = await axios.get(`${API_URL}/users`);
      const users = getUsers.data;
      const user = users.find(
        (user) => user.email === data.email && user.password === data.password
      );

      if (user) {
        return user;
      } else {
        return rejectWithValue("Invalid email or password. Please try again.");
      }
      
    } catch (error) {
      console.log(error);
      return rejectWithValue(
        error.response?.data.message || "Failed to login. Please try again."
      );
    }
  }
);

// Register Async Action
export const register = createAsyncThunk(
  "auth/register",
  async (data, { rejectWithValue }) => {
    try {
      const getUsers = await axios.get(`${API_URL}/users`);
      const users = getUsers.data;
      const user = users.find((user) => user.email === data.email);

      if (user) {
        return rejectWithValue(
          "Email already exists. Please use another email."
        );
      }

      const response = await axios.post(`${API_URL}/users`, {
        name: data.fullName,
        email: data.email,
        password: data.password,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data.message || "Failed to register. Please try again."
      );
    }
  }
);

const initialState = {
  user: null,
  isLoggedIn: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setErrorNull: (state) => {
      state.error = null;
    },
    logout: (state) => {
      state.user = null;
      state.isLoggedIn = false;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handling login lifecycle actions
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        console.log(action.payload);
        state.user = action.payload;
        if (action.payload !== undefined) {
          state.isLoggedIn = true;
        }
        state.loading = false;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to login";
      })

      // Handling register lifecycle actions
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
        state.loading = false;
        state.error = null;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to register";
      });
  },
});

export const { setErrorNull, logout } = authSlice.actions;

export default authSlice.reducer;
