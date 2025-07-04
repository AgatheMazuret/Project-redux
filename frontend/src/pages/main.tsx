import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { logoutUser } from "../redux/auth-reducer";

const Main = () => {
  // Récupère l'état de connexion de l'utilisateur depuis le store Redux
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Déclenche la déconnexion et redirige vers la page de connexion
  const handleSignOut = () => {
    dispatch(logoutUser());
    navigate("/sign-in");
  };

  return (
    <div>
      <header className="main-nav">
        <Link className="main-nav-logo" to="/">
          <img
            className="main-nav-logo-image"
            src="./src/assets/argentBankLogo.png"
            alt="Argent Bank Logo"
            width="200"
            height="50"
          />

          <h1 className="sr-only">Argent Bank</h1>
        </Link>

        <div>
          {isLoggedIn ? (
            // Affiche le bouton de déconnexion si l'utilisateur est connecté
            <Link className="main-nav-item" to="/" onClick={handleSignOut}>
              <i className="fa fa-user-circle"></i>
              Sign Out
            </Link>
          ) : (
            // Affiche le bouton de connexion si l'utilisateur n'est pas connecté
            <Link className="main-nav-item" to="/sign-in">
              <i className="fa fa-user-circle"></i>
              Sign In
            </Link>
          )}
        </div>
      </header>

      <main>
        <div className="hero">
          <section className="hero-content">
            <h2 className="sr-only">Promoted Content</h2>

            <p className="subtitle">No fees.</p>
            <p className="subtitle">No minimum deposit.</p>
            <p className="subtitle">High interest rates.</p>
            <p className="text">
              Open a savings account with Argent Bank today!
            </p>
          </section>
        </div>

        <section className="features">
          <h2 className="sr-only">Features</h2>

          <div className="feature-item">
            <img
              src="./src/assets/icon-chat.png"
              alt="Chat Icon"
              className="feature-icon"
            />
            <h3 className="feature-item-title">You are our #1 priority</h3>
            <p>
              Need to talk to a representative? You can get in touch through our
              24/7 chat or through a phone call in less than 5 minutes.
            </p>
          </div>

          <div className="feature-item">
            <img
              src="./src/assets/icon-money.png"
              alt="Chat Icon"
              className="feature-icon"
            />
            <h3 className="feature-item-title">
              More savings means higher rates
            </h3>
            <p>
              The more you save with us, the higher your interest rate will be!
            </p>
          </div>

          <div className="feature-item">
            <img
              src="./src/assets/icon-security.png"
              alt="Chat Icon"
              className="feature-icon"
            />
            <h3 className="feature-item-title">Security you can trust</h3>
            <p>
              We use top of the line encryption to make sure your data and money
              is always safe.
            </p>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p className="footer-text">Copyright 2020 Argent Bank</p>
      </footer>
    </div>
  );
};

export default Main;
