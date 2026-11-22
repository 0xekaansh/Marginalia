import { useEffect, useState } from "react";
import styles from "./Search.module.css";
import SearchIcon from "@mui/icons-material/Search";
import LoadingSpinner from "../assets/LoadingSpinner";

function PageSearch({ initialQuery, onSearch, loading }) {
  const [query, setQuery] = useState(initialQuery || "");

  useEffect(() => {
    setQuery(initialQuery || "");
  }, [initialQuery]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    onSearch(query);
  };

  return (
    <div className={styles.pageSearch}>
      <form className={styles.searchForm} onSubmit={handleSubmit}>
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
          <button className={styles.searchBtn} type="submit" aria-label="Search">
            <SearchIcon />
          </button>
        )}
      </form>
    </div>
  );
}

export default PageSearch;
