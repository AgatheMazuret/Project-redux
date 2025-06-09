import { createAsyncThunk } from "@reduxjs/toolkit";

// Définition des actions asynchrones (thunks) pour l’authentification :
//   - login : envoie les identifiants à l’API, récupère le token, gère les erreurs
//   - logout : efface le token, réinitialise l’état utilisateur
//   - fetchUserProfile : récupère les infos utilisateur après connexion
//   - updateUserProfile : met à jour les infos utilisateur

// Export des actions pour utilisation dans les composants ou reducers
