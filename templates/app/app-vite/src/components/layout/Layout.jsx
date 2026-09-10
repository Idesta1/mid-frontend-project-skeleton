import styles from "./Layout.module.css";
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";
import { Outlet } from "react-router-dom";

export default function Layout({ children }) {
  return (
    <div className={styles.layout}>
      <Navbar />

      <main>{children ? children : <Outlet />}</main>

      <Footer />
    </div>
  );
}
