import HubIcon from "@mui/icons-material/Hub";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header>
      <h1>
        <Link to="/">
          <HubIcon /> Marginalia
        </Link>
      </h1>
      <nav>
        <Link to="/search">Search Books</Link>
        <Link to="/list">My Shelf (List)</Link>
      </nav>
    </header>
  );
}

export default Header;
