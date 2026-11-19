import { useLocation, useSearchParams } from "react-router-dom";
import SearchResultList from "./SearchResultList";
import styles from "./SearchResultsPage.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import PageSearch from "./PageSearch";
import SortContainer from "./SortContainer";
import Cookies from "js-cookie";

function SearchResultsPage() {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const urlQuery = searchParams.get("q") || "";
  const urlSort = searchParams.get("sort") || "rating";
  const [books, setBooks] = useState(location.state?.books || []);
  const [query, setQuery] = useState(location.state?.query || "");
  const [sortOrder, setSortOrder] = useState(urlSort);
  const [userBookList, setUserBookList] = useState([]);

  const fetchUserBooks = async () => {
    const token = Cookies.get("token");
    if (!token) {
      setUserBookList([]);
      return;
    }
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/userBookList`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      setUserBookList(res.data);
    } catch (err) {
      console.error("Failed to fetch user book list", err);
    }
  };

  useEffect(() => {
    fetchUserBooks();
  }, []);

  useEffect(() => {
    if (location.state?.books) {
      setBooks(location.state.books);
    }
    if (location.state?.query) {
      setQuery(location.state.query);
    }
  }, [location.state]);

  useEffect(() => {
    if (urlQuery && !location.state?.books) {
      setQuery(urlQuery);
      setSortOrder(urlSort);
      fetchBooks(urlQuery, urlSort);
    }
  }, []);

  const fetchBooks = async (searchQuery, currentSort) => {
    const trimmed = searchQuery.trim();
    if (!trimmed) return;

    setSearchParams({ q: trimmed, sort: currentSort }, { replace: true });
    setLoading(true);

    try {
      const result = await axios.get(
        `${import.meta.env.VITE_OL_SEARCH_URL}?q=${encodeURIComponent(trimmed)}&sort=${currentSort}`,
      );
      setBooks(result.data.docs.slice(0, 10));
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
              { value: "rating", label: "Top Rated" },
              { value: "editions", label: "Most Editions" },
              { value: "old", label: "First Published" },
              { value: "new", label: "Most Recent" },
              { value: "random", label: "Random" },
            ]}
          />
        </div>
        {books.length === 0 ? (
          <p>No books found. Try searching for another title or author.</p>
        ) : (
          <SearchResultList
            books={books}
            userBookList={userBookList}
            onShelfChange={fetchUserBooks}
          />
        )}
      </div>
    </div>
  );
}

export default SearchResultsPage;
