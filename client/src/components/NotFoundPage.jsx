import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <main style={{ padding: "3rem 1.5rem", textAlign: "center" }}>
      <h1>Page not found</h1>
      <p>The page you are looking for does not exist.</p>
      <Link to="/">Back to Marginalia</Link>
    </main>
  );
}

export default NotFoundPage;