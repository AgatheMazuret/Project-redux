// Importation des fonctions nécessaires de Redux Toolkit et des actions personnalisées
import { createSlice } from "@reduxjs/toolkit";
import { login, fetchUserProfile, updateUserProfile } from "./auth-actions";
import { User } from "../types";

// Définition du type de l'état d'authentification
export type AuthState = {
  user: User | null;
  token: string | null;
  isLoggedIn: boolean;
  loading: boolean; // Indique si une requête est en cours
  error: string | null; // Message d'erreur éventuel
};

// État initial de l'authentification
const initialState: AuthState = {
  user: null,
  token: null,
  isLoggedIn: false,
  loading: false,
  error: null,
};

// Création du slice d'authentification avec reducers synchrones et asynchrones
export const authSlice = createSlice({
  name: "auth", // Nom du slice
  initialState, // État initial
  reducers: {
    // Action synchrone pour déconnecter l'utilisateur
    logoutUser: (state) => {
      state.user = null;
      state.token = null;
      state.isLoggedIn = false;
      state.loading = false;
      state.error = null;
    },
  },
  // Gestion des actions asynchrones (extraReducers)
  extraReducers: (builder) => {
    builder
      // Gestion de l'état lors de la tentative de connexion
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // Gestion de l'état lors d'une connexion réussie
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        state.loading = false;
      })
      // Gestion de l'état lors d'un échec de connexion
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Gestion de l'état lors de la récupération du profil utilisateur
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Gestion de l'état lors de la mise à jour du profil utilisateur
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.user = { ...state.user, ...action.payload };
        state.loading = false;
        state.error = null;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// Export des actions pour pouvoir les utiliser dans les composants
export const { logoutUser } = authSlice.actions;

// Export du reducer pour l'intégrer dans le store Redux
export default authSlice.reducer;

// Sélecteurs pour accéder facilement à l'état d'authentification
export const selectAuth = (state: { auth: AuthState }) => state.auth;
export const selectIsLoggedIn = (state: { auth: AuthState }) => state.auth.isLoggedIn;
export const selectAuthUser = (state: { auth: AuthState }) => state.auth.user;
export const selectAuthError = (state: { auth: AuthState }) => state.auth.error;
export const selectAuthLoading = (state: { auth: AuthState }) => state.auth.loading;
