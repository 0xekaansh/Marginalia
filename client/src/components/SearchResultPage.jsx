import { useLocation } from "react-router-dom";
import SearchResultList from "./SearchResultList";
import styles from "./SearchResultsPage.module.css";
import Search from "./Search";
import OptionContainer from "./OptionContainer";
import { useState } from "react";

function SearchResultsPage() {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [sortOrder, setSortOrder] = useState("trending");
  const { books = [], query = "" } = location.state || {};

  return (
    <div className={styles.searchContainer}>
      <div className={styles.searchHeading}>
        <h1>Search Books</h1>
      </div>
      <div className={styles.searchResult}>
        <div className={styles.searchBar}>
          <Search className={styles.pageSearch} query={query} />
          <OptionContainer
            label="Sort By"
            loading={loading}
            sortOrder={sortOrder}
            handleChange={(e) => setSortOrder(e.target.value)}
            options={[
              { value: "trending", label: "Trending" },
              { value: "new", label: "Latest" },
              { value: "rating", label: "Top Rated" },
            ]}
          />
        </div>
        {books.length === 0 ? (
          <p>No books found. Try searching for another title or author.</p>
        ) : (
          <SearchResultList books={books} />
        )}
      </div>
    </div>
  );
}

export default SearchResultsPage;
