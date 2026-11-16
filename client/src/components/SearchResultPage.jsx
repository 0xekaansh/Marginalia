import { useLocation } from "react-router-dom";
import SearchResultList from "./SearchResultList";
import styles from "./SearchResultsPage.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import PageSearch from "./PageSearch";
import SortContainer from "./SortContainer";

function SearchResultsPage() {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [books, setBooks] = useState(location.state?.books || []);
  const [query, setQuery] = useState(location.state?.query || "");
  const [sortOrder, setSortOrder] = useState("rating");

  useEffect(() => {
    if (location.state?.books) {
      setBooks(location.state.books);
    }
    if (location.state?.query) {
      setQuery(location.state.query);
    }
  }, [location.state]);

  const fetchBooks = async (newQuery) => {
    if (!newQuery.trim()) return;

    setQuery(newQuery);
    setLoading(true);

    try {
      const result = await axios.get(
        `${import.meta.env.VITE_OL_SEARCH_URL}?q=${encodeURIComponent(newQuery)}&sort=${sortOrder}`,
      );
      let fetchedBooks = result.data.docs.slice(0, 10);
      setBooks(fetchedBooks);
    } catch (err) {
      console.error("Error fetching data from Open Library API", err);
    } finally {
      setLoading(false);
    }
  };

  const handleNewSearch = (newQuery) => {
    setQuery(newQuery);
    fetchBooks(newQuery, sortOrder);
  };

  const handleSortChange = (e) => {
    const newSort = e.target.value;
    setSortOrder(newSort);
    fetchBooks(query, newSort);
  };

  return (
    <div className={styles.searchContainer}>
      <div className={styles.searchHeading}>
        <h1>Search Books</h1>
      </div>
      <div className={styles.searchResult}>
        <div>
          <PageSearch
            initialQuery={query}
            onSearch={handleNewSearch}
            loading={loading}
          />
          <SortContainer
            label="Sort By"
            loading={loading}
            sortOrder={sortOrder}
            handleChange={handleSortChange}
            options={[
              { value: "old", label: "Old" },
              { value: "new", label: "Latest" },
              { value: "rating", label: "Top Rated" },
              { value: "title", label: "Title" },
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
