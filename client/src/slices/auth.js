import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  token: localStorage.getItem("token"),
  status: "idle",
  error: null,
  users: [], // Initialize empty array for users
};

export const signup = createAsyncThunk("auth/signup", async (userData) => {
  const response = await axios.post(
    "http://localhost:8000/api/auth/signup",
    userData
  );
  return response.data;
});

export const login = createAsyncThunk("auth/login", async (userData) => {
  try {
    const response = await axios.post(
      "http://localhost:8000/api/auth/login",
      userData
    );
    return response.data; // Assuming this returns { user, token }
  } catch (error) {
    console.log(error);
  }
});

export const setUser = (user, token) => (dispatch) => {
  dispatch({ type: "auth/setUser", payload: { user, token } });
  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem("token", token);
};

export const fetchUsers = createAsyncThunk("auth/fetchUsers", async () => {
  const response = await axios.get("http://localhost:8000/api/auth/all-users");
  return response.data;
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
    error: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem("user", JSON.stringify(action.payload.user));
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(signup.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(login.pending, (state) => {
        state.status = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = null; // Clear any previous errors
        localStorage.setItem("user", JSON.stringify(action.payload.user));
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = action.payload; // Update users array in state
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { logout, error } = authSlice.actions;

// Selector to get all users from state
export const selectAllUsers = (state) => state.auth.users;

export default authSlice.reducer;
