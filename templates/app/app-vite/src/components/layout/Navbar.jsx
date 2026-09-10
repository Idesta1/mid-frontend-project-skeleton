import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import { useCart } from "../../context/CartContext.jsx";
import styles from "./Navbar.module.css";
import image from "../../assets/event Logo.png";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { cartItems } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className={styles["app-header"]}>
      <div className={styles["app-header-inner"]}>
        <a
          href="https://www.hackyourfuture.dk/"
          target="_blank"
          rel="noreferrer"
          className={styles.brand}
        >
          <img
            src={image}
            alt="MyEvents Logo"
            className={styles["brand-logo"]}
          />
          <span className={styles["brand-title"]}>MyEvents</span>
        </a>

        <button
          className={styles["hamburger-btn"]}
          onClick={toggleMobileMenu}
          aria-label="Toggle navigation menu"
          aria-expanded={mobileMenuOpen}
        >
          <span className={styles["hamburger-line"]}></span>
          <span className={styles["hamburger-line"]}></span>
          <span className={styles["hamburger-line"]}></span>
        </button>

        <nav
          className={`${styles["main-nav"]} ${mobileMenuOpen ? styles["mobile-open"] : ""}`}
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
            Help
          </NavLink>
        </nav>

        <div className={styles["auth-status"]}>
          <Link to="/cart" className={styles["cart-badge"]}>
            🛒
            {cartItems.reduce((sum, item) => sum + item.quantity, 0) > 0 && (
              <span className={styles["badge-count"]}>
                {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            )}
          </Link>

          {user ? (
            <>
              <Link to="/account">My Account</Link>
              <Link to="/account" className={styles["user-email"]}>
                <span className={styles["user-email"]}>{user.email}</span>
              </Link>
              <button className={styles["signout-btn"]} onClick={logout}>
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
  );
}
