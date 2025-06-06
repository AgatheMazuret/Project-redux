import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginThunk } from "../api/api";

export const login = createAsyncThunk(
  "auth/login",
  async (
    {
      email,
      password,
    }: { email: string; password: string; rememberMe?: boolean },
    { rejectWithValue }
  ) => {
    try {
      const data = await loginThunk(email, password);
      return data;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("Erreur lors de la connexion");
    }
  }
);
