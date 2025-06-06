// Types pour l'utilisateur
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  token?: string;
}

// Types pour l'état d'authentification
export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  error: string | null;
}
