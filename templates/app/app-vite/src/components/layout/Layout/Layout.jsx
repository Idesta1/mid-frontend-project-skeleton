import { Link, NavLink, Outlet } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../../context/AuthContext.jsx";
import "./Layout.css";
import { useCart } from "../../../context/CartContext.jsx";

export default function Layout() {
  const { user, logout } = useAuth();
  const { cartItems } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="app-header-inner">
          <a
            href="https://www.hackyourfuture.dk/"
            target="_blank"
            className="brand"
          >
            <span className="brand-title">MyEvents</span>
          </a>

          <button
            className="hamburger-btn"
            onClick={toggleMobileMenu}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>

          <nav
            className={`main-nav ${mobileMenuOpen ? "mobile-open" : ""}`}
            aria-label="Main navigation"
          >
            <NavLink to="/" end onClick={closeMobileMenu}>
              Home
            </NavLink>
            <NavLink to="/events" onClick={closeMobileMenu}>
              Find Events
            </NavLink>
            <NavLink to="/" end onClick={closeMobileMenu}>
              Create Events
            </NavLink>
            <NavLink to="/" end onClick={closeMobileMenu}>
              Tickets
            </NavLink>
            <NavLink to="/" end onClick={closeMobileMenu}>
              Help
            </NavLink>
          </nav>
          <div className="auth-status">
            <Link to="/cart" className="cart-badge">
              🛒
              {cartItems.reduce((sum, item) => sum + item.quantity, 0) > 0 && (
                <span className="badge-count">
                  {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              )}
            </Link>

            {user ? (
              <>
                <Link to="/account">My Account</Link>
                <Link to="/account" className="user-email">
                  <span className="user-email">{user.email}</span>
                </Link>
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
