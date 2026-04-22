import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

/* ================= TYPES ================= */
interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

interface AuthResponse {
  user: User;
  token: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
}

/* ================= THUNK ================= */
export const loginUser = createAsyncThunk<
  AuthResponse, // return type
  { email: string; password: string } // arg type
>(
  "auth/loginUser",
  async ({ email, password }, thunkAPI) => {
    const response = await fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (!response.ok) {
      return thunkAPI.rejectWithValue(data.message || "Login failed");
    }

    return data;
  }
);

/* ================= SLICE ================= */
const initialState: AuthState = {
  user: null,
  token: null,
  isLoading: false,
  error: null
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          (action.payload as string) ||
          action.error.message ||
          "Login failed";
      });
  }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;