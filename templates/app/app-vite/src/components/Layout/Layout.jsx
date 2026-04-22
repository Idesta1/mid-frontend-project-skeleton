import { Link, NavLink, Outlet } from "react-router-dom";
import hyfLogo from "../../assets/hyf.svg";
import { useAuth } from "../../context/AuthContext.jsx";
import "./Layout.css";

export default function Layout() {
  const { user, logout } = useAuth();

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="app-header-inner">
          <a
            href="https://www.hackyourfuture.dk/"
            target="_blank"
            className="brand"
          >
            <img
              src={hyfLogo}
              alt="HackYourFuture logo"
              className="brand-logo"
            />
            <span className="brand-title">MyEvents</span>
          </a>

          <nav className="main-nav" aria-label="Main navigation">
            <NavLink to="/" end>
              Home
            </NavLink>
            <NavLink to="/events">Find Events</NavLink>
            <NavLink to="/" end>
              Create Events
            </NavLink>
            <NavLink to="/" end>
              Tickets
            </NavLink>
            <NavLink to="/" end>
              Help
            </NavLink>{" "}
          </nav>
          <div className="auth-status">
            {user ? (
              <>
                <span className="user-email">{user.email}</span>
                <button className="signout-btn" onClick={logout}>
                  Sign out
                </button>
              </>
            ) : (
              <>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
              </>
            )}
          </div>
        </div>
      </header>

      <main className="app-main">
        <Outlet />
      </main>

      <footer className="app-footer">
        <p>Copyright © 2026 HackYourFuture</p>
      </footer>
    </div>
  );
}
