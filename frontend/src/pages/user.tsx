import "../index.css";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import { logoutUser } from "../redux/auth-reducer";
import { authActions } from "../redux/auth-actions";

const UserHomePage = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const user = useSelector((state: RootState) => state.auth.user);
  const firstName = user?.firstName || "";
  const lastName = user?.lastName || "";
  const email = user?.email || "";
  const [editFirstName, setEditFirstName] = useState(firstName);
  const [editLastName, setEditLastName] = useState(lastName);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/sign-in");
    } else {
      dispatch(authActions.fetchUserProfile());
    }
  }, [isLoggedIn, navigate, dispatch]);

  useEffect(() => {
    if (isEditing) {
      setEditFirstName(firstName);
      setEditLastName(lastName);
    }
  }, [isEditing, firstName, lastName]);

  const handleSignOut = () => {
    dispatch(logoutUser());
    navigate("/sign-in");
  };

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
          {isEditing ? (
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
            <button className="edit-button" onClick={() => setIsEditing(true)}>
              Edit Name
            </button>
          )}
        </div>

        <h2 className="sr-only">Accounts</h2>
        {[
          {
            title: "Argent Bank Checking (x8349)",
            amount: "$2,082.79",
            desc: "Available Balance",
          },
          {
            title: "Argent Bank Savings (x6712)",
            amount: "$10,928.42",
            desc: "Available Balance",
          },
          {
            title: "Argent Bank Credit Card (x8349)",
            amount: "$184.30",
            desc: "Current Balance",
          },
        ].map((acc, idx) => (
          <section className="account" key={idx}>
            <div className="account-content-wrapper">
              <h3 className="account-title">{acc.title}</h3>
              <p className="account-amount">{acc.amount}</p>
              <p className="account-amount-description">{acc.desc}</p>
            </div>
            <div className="account-content-wrapper cta">
              <button className="transaction-button">View transactions</button>
            </div>
          </section>
        ))}
      </main>

      <footer className="footer">
        <p className="footer-text">Copyright 2020 Argent Bank</p>
      </footer>
    </div>
  );
};

export default UserHomePage;
