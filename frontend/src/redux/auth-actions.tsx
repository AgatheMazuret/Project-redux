import { createAsyncThunk } from "@reduxjs/toolkit";
const apiUrl = "http://localhost:3001/api/v1/user";

// Thunk asynchrone pour la connexion utilisateur
const login = createAsyncThunk(
  "auth/login",
  async (
    Credentials: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await fetch(`${apiUrl}/login`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify({
          email: Credentials.email,
          password: Credentials.password,
        }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed");
      }
      const data = await response.json();
      // Stocke le token JWT dans le localStorage pour authentifier les requêtes futures
      localStorage.setItem("token", data.body.token);
      return { token: data.body.token, user: data.body.user };
    } catch (error) {
      // Retourne le message d'erreur
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      } else {
        return rejectWithValue("An unknown error occurred");
      }
    }
  }
);
export { login };

// Thunk asynchrone pour la déconnexion utilisateur
const logout = createAsyncThunk("auth/logout", async () => {
  localStorage.removeItem("token");
  return;
});
export { logout };

// Thunk pour récupérer le profil utilisateur authentifié
const fetchUserProfile = createAsyncThunk(
  "auth/fetchUserProfile",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");
      const response = await fetch(`${apiUrl}/profile`, {
        method: "POST", // L'API attend un POST pour le profil
        headers: {
          "content-type": "application/json",
          accept: "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({}),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch user profile");
      }
      const data = await response.json();
      return data.body;
    } catch (error) {
      // Retourne le message d'erreur
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      } else {
        return rejectWithValue("An unknown error occurred");
      }
    }
  }
);
export { fetchUserProfile };

// Thunk pour mettre à jour le prénom/nom utilisateur
const updateUserProfile = createAsyncThunk(
  "auth/updateUserProfile",
  async (
    userData: { firstName: string; lastName: string },
    { rejectWithValue }
  ) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");
      const response = await fetch(`${apiUrl}/profile`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
          accept: "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          firstName: userData.firstName,
          lastName: userData.lastName,
        }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update user profile");
      }
      const data = await response.json();
      return data.body;
    } catch (error) {
      // Retourne le message d'erreur
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      } else {
        return rejectWithValue("An unknown error occurred");
      }
    }
  }
);
export { updateUserProfile };

// Regroupement des actions pour import simplifié dans les composants
export const authActions = {
  login,
  logout,
  fetchUserProfile,
  updateUserProfile,
};
