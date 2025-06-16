import { createAsyncThunk } from "@reduxjs/toolkit";
const apiUrl = "http://localhost:3001/api/v1/user";
// Thunk pour la connexion utilisateur (login)
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
      // Stocke le token dans le localStorage pour les requêtes futures
      localStorage.setItem("token", data.body.token);
      return { token: data.body.token, user: data.body.user };
    } catch (error) {
      // Gestion des erreurs d'authentification
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      } else {
        return rejectWithValue("An unknown error occurred");
      }
    }
  }
);
export { login };

// Thunk pour la déconnexion utilisateur (logout)
const logout = createAsyncThunk("auth/logout", async () => {
  localStorage.removeItem("token"); // Supprime le token du localStorage
  return;
});
export { logout };

// Thunk pour récupérer le profil utilisateur après connexion
const fetchUserProfile = createAsyncThunk(
  "auth/fetchUserProfile",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");
      const response = await fetch(`${apiUrl}/profile`, {
        method: "POST", // POST pour correspondre au backend
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
      // Gestion des erreurs de récupération du profil
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      } else {
        return rejectWithValue("An unknown error occurred");
      }
    }
  }
);
export { fetchUserProfile };

// Thunk pour mettre à jour le profil utilisateur (prénom/nom)
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
      // Gestion des erreurs de mise à jour du profil
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      } else {
        return rejectWithValue("An unknown error occurred");
      }
    }
  }
);
export { updateUserProfile };

// Export groupé des actions pour une importation simplifiée
export const authActions = {
  login,
  logout,
  fetchUserProfile,
  updateUserProfile,
};
