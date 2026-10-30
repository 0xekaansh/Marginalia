import HubIcon from "@mui/icons-material/Hub";
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
      <h1>
        <Link to="/" className={styles.logo}>
          <HubIcon /> Marginalia
        </Link>
      </h1>
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
                My Shelf (List)
              </Link>
              <Link onClick={handleLogout} className={`${styles.logoutBtn} ${styles.navLink}`}>
                Logout
              </Link>
            </div>
          </div>
        ) : (
          <>
            <Link to="/register" className={styles.navLink}>
              Register
            </Link>
            <Link to="/login" className={styles.navLink}>
              Login
            </Link>{" "}
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;
