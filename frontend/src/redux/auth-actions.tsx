import { createAsyncThunk } from "@reduxjs/toolkit";

// Définition des actions asynchrones (thunks) pour l’authentification:
//   - login : envoie les identifiants à l’API, récupère le token, gère les erreurs
const login = createAsyncThunk(
  "auth/login",
  async (
    Credentials: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await fetch("http://localhost:3001/api/v1/user/login", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          accept: "application.json",
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
      // Stockage du token dans le localStorage
      localStorage.setItem("token", data.body.token);
      return data.body;
    } catch (error) {
      // Gestion des erreurs
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      } else {
        return rejectWithValue("An unknown error occurred");
      }
    }
  }
);
export { login };

//   - logout : efface le token, réinitialise l’état utilisateur

const logout = createAsyncThunk("auth/logout", async () => {
  // Efface le token du localStorage
  localStorage.removeItem("token");
  // Retourne une valeur vide pour indiquer la réussite de l'action
  return;
});
export { logout };

//   - fetchUserProfile : récupère les infos utilisateur après connexion

const fetchUserProfile = createAsyncThunk(
  "auth/fetchUserProfile",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");
      const response = await fetch(
        "http://localhost:3001/api/v1/user/profile",
        {
          method: "GET",
          headers: {
            "content-type": "application/json",
            accept: "application/json",
            authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch user profile");
      }
      const data = await response.json();
      return data.body;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      } else {
        return rejectWithValue("An unknown error occurred");
      }
    }
  }
);
export { fetchUserProfile };

//   - updateUserProfile : met à jour les infos utilisateur

const updateUserProfile = createAsyncThunk(
  "auth/updateUserProfile",
  async (
    userData: { firstName: string; lastname: string },
    { rejectWithValue }
  ) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");
      const response = await fetch(
        "http://localhost:3001/api/v1/user/profile",
        {
          method: "PUT",
          headers: {
            "content-type": "application/json",
            accept: "application/json",
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            firstName: userData.firstName,
            lastName: userData.lastname,
          }),
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update user profile");
      }
      const data = await response.json();
      return data.body;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      } else {
        return rejectWithValue("An unknown error occurred");
      }
    }
  }
);
export { updateUserProfile };

// Export des actions pour utilisation dans les composants ou reducers
export const authActions = {
  login,
  logout,
  fetchUserProfile,
  updateUserProfile,
};
