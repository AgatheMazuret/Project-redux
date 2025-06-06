// Adresse de l'API
const API_URL = "http://localhost:3001/api/v1";

import { Dispatch } from "redux";

// Connexion de l'user à l'API (Thunk Redux)
export const loginThunk =
  (email: string, password: string) => async (dispatch: Dispatch) => {
    dispatch({ type: "LOGIN_REQUEST" });
    const response = await fetch(`${API_URL}/user/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) {
      dispatch({ type: "LOGIN_ERROR", error: "Erreur lors de la connexion" });
      throw new Error("Erreur lors de la connexion");
    }
    const data = await response.json();
    dispatch({ type: "LOGIN_SUCCESS", payload: data });
    return data;
  };

// Récupération des données de l'utilisateur (Thunk Redux)
export const getUserProfileThunk =
  (token: string) => async (dispatch: Dispatch) => {
    const response = await fetch(`${API_URL}/user/profile`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({}),
    });
    if (!response.ok) {
      dispatch({
        type: "PROFILE_ERROR",
        error: "Erreur lors de la récupération du profil",
      });
      throw new Error("Erreur lors de la récupération du profil");
    }
    const data = await response.json();
    dispatch({ type: "PROFILE_SUCCESS", payload: data });
    return data;
  };

// Mettre à jour le profil de l'utilisateur (Thunk Redux)
export const updateUserProfileThunk =
  (
    token: string,
    firstName: string,
    lastName: string,
    email: string
  ) => async (dispatch: Dispatch) => {
    const response = await fetch(`${API_URL}/user/profile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ firstName, lastName, email }),
    });
    if (!response.ok) {
      dispatch({
        type: "UPDATE_PROFILE_ERROR",
        error: "Erreur lors de la mise à jour du profil",
      });
      throw new Error("Erreur lors de la mise à jour du profil");
    }
    const data = await response.json();
    dispatch({ type: "UPDATE_PROFILE_SUCCESS", payload: data });
    return data;
  };
