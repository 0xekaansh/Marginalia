import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import Search from "./Search";
import styles from "./Header.module.css";
import SearchIcon from "@mui/icons-material/Search";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";

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
          <Link to="/search" className={styles.mobileSearch}>
            <SearchIcon fontSize="medium"/>
          </Link>
          {user ? (
            <div className={styles.dropDown}>
              <button
                type="button"
                className={styles.dropDownToggle}
                aria-expanded="false"
              >
                <div className={styles.dropDownToggleContent}>
                  <span>{user.username}</span>
                  <span className={styles.arrowIcon}>&#9662;</span>
                </div>
                <div className={styles.mobileDropDownToggleContent}>
                  <MenuOutlinedIcon fontSize="medium" />
                </div>
              </button>
              <div className={styles.dropDownMenu}>
                <Link to="/list" className={styles.navLink}>
                  My Shelf
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  className={`${styles.logoutBtn} ${styles.navLink}`}
                >
                  Logout
                </button>
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

              <div className={`${styles.dropDown} ${styles.mobileMenu}`}>
                <button
                  type="button"
                  className={styles.dropDownToggle}
                  aria-expanded="false"
                >
                  <MenuOutlinedIcon fontSize="medium"/>
                </button>
                <div className={styles.dropDownMenu}>
                  <Link
                    to="/register"
                    className={`${styles.register} ${styles.navLink}`}
                  >
                    Register
                  </Link>
                  <Link
                    to="/login"
                    className={`${styles.login} ${styles.navLink}`}
                  >
                    Login
                  </Link>
                </div>
              </div>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
