import { useState } from "react";
import axios from "axios";
import SearchResultList from "./SearchResultList";

function Search() {
  const [query, setQuery] = useState("");
  const [booksList, setBooksList] = useState([]);
  const [loading, setLoading] = useState(false);

  const bookSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    try {
      const result = await axios.get(
        `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`,
      );
      setBooksList(result.data.docs.slice(0, 10));
    } catch (err) {
      console.error("Error fetching data from Open Library API", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Book Search Form */}
      <form id="searchForm" onSubmit={bookSearch}>
        <input
          type="text"
          name="Search"
          placeholder="Search by book title or author"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
        />
        <button type="submit">{loading ? "Searching" : "Search"}</button>
      </form>

      {/* Book list */}
      <SearchResultList books={booksList}/>
    </div>
  );
}

export default Search;
