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
        <div className="footer-grid">
          <section className="footer-column">
            <h3>About Us</h3>
            <ul>
              <li>Our Mission</li>
              <li>Team</li>
              <li>Careers</li>
            </ul>
          </section>

          <section className="footer-column">
            <h3>Connect With Us</h3>
            <ul>
              <li>Instagram</li>
              <li>LinkedIn</li>
              <li>Contact support</li>
            </ul>
          </section>

          <section className="footer-column">
            <h3>Plan Events</h3>
            <ul>
              <li>Create event</li>
              <li>Pricing</li>
              <li>Venue tips</li>
            </ul>
          </section>

          <section className="footer-column">
            <h3>Manage Event</h3>
            <ul>
              <li>Dashboard</li>
              <li>Attendee list</li>
              <li>Ticket check-in</li>
            </ul>
          </section>
        </div>
        <p className="footer-copy">Copyright © 2026 HackYourFuture Denmark</p>
      </footer>
    </div>
  );
}
