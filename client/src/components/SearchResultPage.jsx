import { useLocation } from "react-router-dom";
import SearchResultList from "./SearchResultList";
import styles from "./SearchResultsPage.module.css";
import Search from "./Search";

function SearchResultsPage() {
  const location = useLocation();
  const { books = [], query = "" } = location.state || {};

  return (
    <div className={styles.container}>
      <Search />
      <h2>Search Results for "{query}"</h2>
      {books.length === 0 ? (
        <p>No books found. Try searching for another title or author.</p>
      ) : (
        <SearchResultList books={books} />
      )}
    </div>
  );
}

export default SearchResultsPage;