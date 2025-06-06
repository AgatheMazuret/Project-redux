import { createSlice } from "@reduxjs/toolkit";
import { login } from "./auth-actions";

export interface AuthState {
  isLoggedIn: boolean;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: AuthState = {
  isLoggedIn: false,
  status: "idle",
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logoutUser(state) {
      state.isLoggedIn = false;
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(login.fulfilled, (state) => {
        state.isLoggedIn = true;
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error =
          (action.payload as string) ?? "Erreur lors de la connexion";
      });
  },
});

export const { logoutUser } = authSlice.actions;
export default authSlice.reducer;
