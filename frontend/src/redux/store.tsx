import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-reducer";

// Création du store Redux avec configureStore:
//   - Ajout du ou des reducers (ex: authReducer)

const store = configureStore({
  reducer: {
    auth: authReducer, // Reducer d'authentification
  },
});

// Définition et export des types RootState et AppDispatch pour l’utilisation avec TypeScript

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Export du store pour l’utiliser dans le Provider de l’application
export default store;
