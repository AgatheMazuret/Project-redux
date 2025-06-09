import { createSlice } from "@reduxjs/toolkit";
import { login } from "./auth-actions";
import { User } from "../types";

// Définition de l’état initial (initialState) :
//   - Informations utilisateur (user, token, etc.)
//   - Statut de connexion (isLoggedIn, loading, error, etc.)

// Création du slice d’authentification avec createSlice :
//   - Définition du nom du slice
//   - Définition de l’état initial
//   - Définition des reducers synchrones (ex : logoutUser)
//   - Définition des extraReducers pour gérer les actions asynchrones (login, fetchUserProfile, etc.)

// Export des actions et du reducer pour utilisation dans le store
