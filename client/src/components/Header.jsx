import HubIcon from "@mui/icons-material/Hub";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import Button from "@mui/material/Button";

function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header>
      <h1>
        <Link to="/">
          <HubIcon /> Marginalia
        </Link>
      </h1>
      <nav>
        <Link to="/search">Search Books</Link>
        {user ? (
          <>
            <Link to="/list">My Shelf (List)</Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>{" "}
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;
