import { useState } from "react";
import axios from "axios";
import styles from "./Search.module.css";
import SearchIcon from "@mui/icons-material/Search";
import LoadingSpinner from "../assets/LoadingSpinner";
import { useNavigate } from "react-router-dom";

function Search() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const bookSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    try {
      const result = await axios.get(
        `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`,
      );
      const books = result.data.docs.slice(0, 10);
      navigate("/search-results", { state: { books, query } });
    } catch (err) {
      console.error("Error fetching data from Open Library API", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.search}>
      {/* Book Search Form */}
      <form className={styles.searchForm} onSubmit={bookSearch}>
        <input
          className={styles.searchInput}
          type="text"
          name="Search"
          placeholder="Search by book title or author"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
        />

        {loading ? (
          <LoadingSpinner className={styles.smallSpinner} />
        ) : (
          <button className={styles.searchBtn} type="submit">
            <SearchIcon />
          </button>
        )}
      </form>
    </div>
  );
}

export default Search;
