import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../index.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import { login } from "../redux/auth-actions";
import { selectAuthLoading } from "../redux/auth-reducer";

const SignInPage = () => {
  // États contrôlant les champs du formulaire de connexion
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  // Permet de dispatcher des actions Redux typées
  const dispatch = useDispatch<AppDispatch>();
  // Permet de naviguer entre les pages
  const navigate = useNavigate();
  // Récupère l'état de connexion de l'utilisateur depuis le store
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const loading = useSelector(selectAuthLoading);

  // Si l'utilisateur est déjà connecté, il est redirigé automatiquement vers la page utilisateur
  React.useEffect(() => {
    if (isLoggedIn) {
      navigate("/user");
    }
  }, [isLoggedIn, navigate]);

  // Soumission du formulaire de connexion : tente de se connecter et gère les erreurs éventuelles
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    try {
      await dispatch(login({ email, password })).unwrap();
      // La redirection est gérée dans le useEffect ci-dessus
    } catch (error) {
      setErrorMessage(
        (error as Error)?.message || "Erreur lors de la connexion"
      );
    }
  };

  return (
    <div>
      <nav className="main-nav">
        <Link className="main-nav-logo" to="/">
          <img
            className="main-nav-logo-image"
            src="./src/assets/argentBankLogo.png"
            alt="Argent Bank Logo"
          />
          <h1 className="sr-only">Argent Bank</h1>
        </Link>
      </nav>

      <main className="main bg-dark">
        <section className="sign-in-content">
          <i className="fa fa-user-circle sign-in-icon"></i>
          <h1>Sign In</h1>
          {loading && (
            <div
              className="loader"
              style={{ textAlign: "center", margin: "1em 0" }}
            >
              Chargement...
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="input-wrapper">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input-wrapper">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="input-remember">
              <input
                type="checkbox"
                id="remember-me"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
              <label htmlFor="remember-me">Remember me</label>
            </div>
            {errorMessage && (
              <p className="error-message" style={{ color: "red" }}>
                {errorMessage}
              </p>
            )}
            <button type="submit" className="sign-in-button">
              Sign In
            </button>
          </form>
        </section>
      </main>
    </div>
  );
};

export default SignInPage;
