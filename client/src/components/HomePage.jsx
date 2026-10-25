import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AddEntryButton from "./AddEntry";

function HomePage() {
  const [books, setBooks] = useState([]);
  const [genre, setGenre] = useState("featured");
  const [loading, setLoading] = useState(false);

  const genres = [
    { label: "Featured", value: "featured" },
    { label: "Sci-Fi", value: "science_fiction" },
    { label: "Romance", value: "romance" },
    { label: "Mystery", value: "mystery" },
    { label: "History", value: "history" },
    { label: "Horror", value: "horror" },
    { label: "Fantasy", value: "fantasy" },
    { label: "Crime", value: "crime" },
    { label: "Biography", value: "biography" },
    { label: "Drama", value: "drama" },
    { label: "Thriller", value: "thriller" },
    { label: "Kids", value: "kids" },
  ];

  useEffect(() => {
    const fetchBooksByGenre = async () => {
      setLoading(true);

      try {
        const result = await axios.get(
          `https://openlibrary.org/subjects/${genre}.json?limit=10`,
        );
        setBooks(result.data.works || []);
      } catch (err) {
        console.error("Error fetching books by genre", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBooksByGenre();
  }, [genre]);

  return (
    <div>
      <div className="hero-banner">
        <h1>For the notes you leave in the margins of your reading life.</h1>
        <p>Discover, track, and organize your personal reading bookshelf.</p>
        <Link to="/search">Search Books</Link>
      </div>

      <div className="categories">
        <h3>Explore Categories</h3>
        <div className="genres">
          {genres.map((g) => (
            <button key={g.value} onClick={() => setGenre(g.value)}>
              {g.label}
            </button>
          ))}
        </div>
      </div>

      <h3>
        {genre === "featured"
          ? "Trending Now"
          : `${genre.replace("_", " ")} Books`}
      </h3>

      {loading && <p>Loading books...</p>}

      <div className="book-grid">
        {!loading &&
          books.map((book) => {
            const coverURL = book.cover_id
              ? `https://covers.openlibrary.org/b/id/${book.cover_id}-M.jpg`
              : "https://via.placeholder.com/120x180?text=No+Cover";

            return (
              <div key={book.key}>
                <div>
                  <img src={coverURL} alt={book.title} />
                  <strong>{book.title}</strong>
                  <p>
                    {book.authors ? book.authors[0].name : "Unknown Author"}
                  </p>
                </div>
                <AddEntryButton book={book} />
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default HomePage;
