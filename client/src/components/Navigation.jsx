import { Link } from "react-router-dom";

function Navigation() {
  return (
    <nav>
      <Link to="/">Search Books</Link>
      <Link to="/list">My Shelf (List)</Link>
    </nav>
  );
}

export default Navigation;
