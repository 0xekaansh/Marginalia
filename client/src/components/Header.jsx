import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import Search from "./Search";
import styles from "./Header.module.css";

function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <section className={styles.logo}>
          <Link to="/">
            <DashboardOutlinedIcon /> Marginalia
          </Link>
        </section>
        <nav className={styles.navbar}>
          <Search className={styles.searchBar} />
          {user ? (
            <div className={styles.dropDown}>
              <button
                type="button"
                className={styles.dropDownToggle}
                aria-expanded="false"
              >
                <span>{user.username}</span>
                <span className={styles.arrowIcon}>&#9662;</span>
              </button>
              <div className={styles.dropDownMenu}>
                <Link to="/list" className={styles.navLink}>
                  My Shelf
                </Link>
                <Link
                  onClick={handleLogout}
                  className={`${styles.logoutBtn} ${styles.navLink}`}
                >
                  Logout
                </Link>
              </div>
            </div>
          ) : (
            <>
              <Link to="/login" className={`${styles.login} ${styles.navLink}`}>
                Login
              </Link>
              <Link
                to="/register"
                className={`${styles.register} ${styles.navLink}`}
              >
                Register
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
