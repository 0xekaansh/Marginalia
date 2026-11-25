import SearchIcon from "@mui/icons-material/Search";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import Search from "./Search";
import styles from "./Header.module.css";
import DropdownMenu from "./Dropdown";
import useDropdown from "../hooks/useDropDown";

function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { isOpen: menuOpen, menuRef, toggle: handleToggle, close: closeMenu } = useDropdown();

  const handleLogout = () => {
    closeMenu();
    logout();
    navigate("/");
  };

  const userTrigger = (
    <>
      <div className={styles.dropDownToggleContent}>
        <span>{user?.username}</span>
        <span
          className={`${styles.arrowIcon} ${menuOpen ? styles.arrowIconOpen : ""}`}
        >
          &#9662;
        </span>
      </div>
      <div className={styles.mobileDropDownToggleContent}>
        <MenuOutlinedIcon fontSize="medium" />
      </div>
    </>
  );

  const userItems = [
    { label: "My Shelf", to: "/list" },
    { label: "Logout", onClick: handleLogout, className: styles.logoutBtn },
  ];

  const guestItems = [
    { label: "Register", to: "/register", className: styles.register },
    { label: "Login", to: "/login", className: styles.login },
  ];

  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <section className={styles.logo}>
          <Link to="/" onClick={closeMenu}>
            <img src="/favicon.svg" alt="" className={styles.icon} />arginalia
          </Link>
        </section>

        <nav className={styles.navbar}>
          <Search className={styles.searchBar} />
          <Link
            to="/search"
            className={styles.mobileSearch}
            onClick={closeMenu}
            aria-label="Search books"
          >
            <SearchIcon fontSize="medium" />
          </Link>

          {user ? (
            <DropdownMenu
              isOpen={menuOpen}
              onToggle={handleToggle}
              onClose={closeMenu}
              triggerContent={userTrigger}
              items={userItems}
              menuRef={menuRef}
            />
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
              <DropdownMenu
                isOpen={menuOpen}
                onToggle={handleToggle}
                onClose={closeMenu}
                triggerContent={<MenuOutlinedIcon fontSize="medium" />}
                items={guestItems}
                extraClassName={styles.mobileMenu}
                menuRef={menuRef}
              />
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;