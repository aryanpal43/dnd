import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Helper function to save the user and token in localStorage
const saveUserAndTokenToLocalStorage = (user, token) => {
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user)); // Save user as JSON
};

// Load token and user from localStorage when the app loads
const token = localStorage.getItem("token");
const user = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

const initialState = {
  user: user || null, // Restore user from localStorage or set to null
  token: token || null, // Restore token from localStorage
  isAuthenticated: !!token, // Set to true if a token exists
  loading: false,
  error: null,
};

// Async thunk for signup
export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_BACKEND_BASEURL}/api/auth/signup`,
        { email, password },
        { withCredentials: true } // Ensure cookies are sent and received
      );
      const { user, token } = response.data;

      // Save both user and token in localStorage
      saveUserAndTokenToLocalStorage(user, token);

      return { user, token };
    } catch (error) {
      return rejectWithValue(error.response.data.message || "Signup failed");
    }
  }
);

// Async thunk for login
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_BACKEND_BASEURL}/api/auth/login`,
        { email, password },
        { withCredentials: true } // Ensure cookies are sent and received
      );
      const { user, token } = response.data;

      // Save both user and token in localStorage
      saveUserAndTokenToLocalStorage(user, token);

      return { user, token };
    } catch (error) {
      return rejectWithValue(error.response.data.message || "Login failed");
    }
  }
);

// Async thunk for logging out (calls backend API to clear cookies)
export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      // Call the backend logout API
      await axios.post(
        `${import.meta.env.VITE_APP_BACKEND_BASEURL}/api/auth/logout`,
        {},
        { withCredentials: true } // Send cookies with the request
      );
    } catch (error) {
      return rejectWithValue(error.response.data.message || "Logout failed");
    }
  }
);

// Slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem("token");
      localStorage.removeItem("user"); // Clear user from localStorage
    },
  },
  extraReducers: (builder) => {
    // Signup
    builder
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Login
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      }),
      //Logout
      builder
        .addCase(logoutUser.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(logoutUser.fulfilled, (state) => {
          state.loading = false;
          state.user = null;
          state.token = null;
          state.isAuthenticated = false;
          localStorage.removeItem("token");
          localStorage.removeItem("user"); // Clear localStorage
        })
        .addCase(logoutUser.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
