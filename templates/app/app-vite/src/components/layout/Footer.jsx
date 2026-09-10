import styles from "./Footer.module.css";
import logo from "../../assets/event Logo.png";

export default function Footer() {
  return (
    <footer className={styles["app-footer"]}>
      <div className={styles["footer-inner"]}>
        <div className={styles["brand-block"]}>
          <img
            src={logo}
            alt="MyEvents logo"
            className={styles["brand-logo"]}
          />
          <div className={styles["brand-copy"]}>
            <p className={styles["brand-name"]}>MyEvents</p>
            <p className={styles["brand-tagline"]}>
              Discover events worth showing up for.
            </p>
          </div>
        </div>

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
            <h3>Connect</h3>
            <ul>
              <li>Instagram</li>
              <li>LinkedIn</li>
              <li>Contact support</li>
            </ul>
          </section>

          <section className={styles["footer-column"]}>
            <h3>Plan</h3>
            <ul>
              <li>Create event</li>
              <li>Pricing</li>
              <li>Venue tips</li>
            </ul>
          </section>

          <section className={styles["footer-column"]}>
            <h3>Manage</h3>
            <ul>
              <li>Dashboard</li>
              <li>Attendee list</li>
              <li>Ticket check-in</li>
            </ul>
          </section>
        </div>
      </div>

      <div className={styles["footer-bottom"]}>
        <p>Copyright © 2026 HackYourFuture Denmark</p>
      </div>
    </footer>
  );
}
