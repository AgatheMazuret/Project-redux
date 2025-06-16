import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../index.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import { login } from "../redux/auth-actions";

const SignInPage = () => {
  // États pour le formulaire de connexion
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  // Redirige l'utilisateur connecté vers la page utilisateur
  React.useEffect(() => {
    if (isLoggedIn) {
      navigate("/user");
    }
  }, [isLoggedIn, navigate]);

  // Gère la soumission du formulaire de connexion
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    try {
      await dispatch(login({ email, password })).unwrap();
      // Si la connexion réussit, la redirection est gérée par useEffect
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
            {/* Affiche un message d'erreur en cas d'échec de connexion */}
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
