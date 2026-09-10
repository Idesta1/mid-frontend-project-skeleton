import styles from "./Layout.module.css";
import Navbar from "./Navbar.jsx";
import { Outlet } from "react-router-dom";

export default function Layout({ children }) {
  return (
    <div className={styles.layout}>
      <Navbar />

      <main>{children ? children : <Outlet />}</main>

      <footer className={styles["app-footer"]}>
        <div className={styles["footer-grid"]}>
          <section className={styles["footer-column"]}>
            <h3>About Us</h3>
            <ul>
              <li>Our Mission</li>
              <li>Team</li>
              <li>Careers</li>
            </ul>
          </section>

          <section className={styles["footer-column"]}>
            <h3>Connect With Us</h3>
            <ul>
              <li>Instagram</li>
              <li>LinkedIn</li>
              <li>Contact support</li>
            </ul>
          </section>

          <section className={styles["footer-column"]}>
            <h3>Plan Events</h3>
            <ul>
              <li>Create event</li>
              <li>Pricing</li>
              <li>Venue tips</li>
            </ul>
          </section>

          <section className={styles["footer-column"]}>
            <h3>Manage Event</h3>
            <ul>
              <li>Dashboard</li>
              <li>Attendee list</li>
              <li>Ticket check-in</li>
            </ul>
          </section>
        </div>
        <p className={styles["footer-copy"]}>
          Copyright © 2026 HackYourFuture Denmark
        </p>
      </footer>
    </div>
  );
}
