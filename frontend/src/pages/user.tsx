import "../index.css";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import { logoutUser, selectAuthLoading } from "../redux/auth-reducer";
import { authActions } from "../redux/auth-actions";

const UserHomePage = () => {
  // Contrôle l'ouverture du menu déroulant utilisateur
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  // Contrôle l'affichage du formulaire d'édition du nom
  const [isEditing, setIsEditing] = useState(false);
  // Récupère les infos utilisateur depuis le store Redux
  const user = useSelector((state: RootState) => state.auth.user);
  const firstName = user?.firstName || "";
  const lastName = user?.lastName || "";
  const email = user?.email || "";
  // États locaux pour l'édition du nom
  const [editFirstName, setEditFirstName] = useState(firstName);
  const [editLastName, setEditLastName] = useState(lastName);
  // Référence pour détecter les clics hors du menu déroulant
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  // Vérifie si l'utilisateur est connecté
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const loading = useSelector(selectAuthLoading);

  // Redirige vers la page de connexion si l'utilisateur n'est pas connecté, sinon récupère le profil
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/sign-in");
    } else {
      dispatch(authActions.fetchUserProfile());
    }
  }, [isLoggedIn, navigate, dispatch]);

  // Déconnecte l'utilisateur et redirige
  const handleSignOut = () => {
    dispatch(logoutUser());
    navigate("/sign-in");
  };

  // Soumission du formulaire d'édition du nom utilisateur
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editFirstName.trim() || !editLastName.trim()) return;
    try {
      await dispatch(
        authActions.updateUserProfile({
          firstName: editFirstName.trim(),
          lastName: editLastName.trim(),
        })
      ).unwrap();
      setIsEditing(false);
    } catch {
      alert("Erreur lors de la mise à jour du profil");
    }
  };

  // Ferme le menu déroulant si clic en dehors
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
        <div>
          <div
            className="main-nav-item user-dropdown"
            onClick={() => setIsDropdownOpen((open) => !open)}
            ref={dropdownRef}
          >
            <i className="fa fa-user-circle"></i>
            {firstName}
            {isDropdownOpen && (
              <div className="dropdown-menu">
                <p>
                  <strong>Nom:</strong> {lastName}
                </p>
                <p>
                  <strong>Prénom:</strong> {firstName}
                </p>
                <p>
                  <strong>Email:</strong> {email}
                </p>
              </div>
            )}
          </div>
          <button className="sign-out-button" onClick={handleSignOut}>
            <i className="fa fa-sign-out"></i> Sign out
          </button>
        </div>
      </nav>

      <main className="main bg-dark">
        <div className="header">
          <h1>
            Welcome back
            <br />
            {firstName} {lastName}!
          </h1>
          {loading && (
            <div
              className="loader"
              style={{ textAlign: "center", margin: "1em 0" }}
            >
              Chargement...
            </div>
          )}
          {isEditing ? (
            // Formulaire d'édition du nom et prénom utilisateur
            <form onSubmit={handleSubmit} className="edit-form">
              <input
                name="firstName"
                type="text"
                placeholder="John"
                value={editFirstName}
                onChange={(e) => setEditFirstName(e.target.value)}
                autoFocus
              />
              <input
                name="lastName"
                type="text"
                placeholder="Doe"
                value={editLastName}
                onChange={(e) => setEditLastName(e.target.value)}
              />
              <button className="save-name-button" type="submit">
                Save
              </button>
              <button
                className="cancel-name-button"
                type="button"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </form>
          ) : (
            // Affiche le bouton pour passer en mode édition
            <button
              type="button"
              className="edit-button"
              onClick={() => {
                setIsEditing(true);
                setEditFirstName(firstName);
                setEditLastName(lastName);
              }}
            >
              Edit Name
            </button>
          )}
        </div>

        <h2 className="sr-only">Accounts</h2>

        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Checking (x8349)</h3>
            <p className="account-amount">$2,082.79</p>
            <p className="account-amount-description">Available Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>

        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Savings (x6712)</h3>
            <p className="account-amount">$10,928.42</p>
            <p className="account-amount-description">Available Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>

        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
            <p className="account-amount">$184.30</p>
            <p className="account-amount-description">Current Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p className="footer-text">Copyright 2020 Argent Bank</p>
      </footer>
    </div>
  );
};

export default UserHomePage;
