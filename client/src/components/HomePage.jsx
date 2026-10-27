import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import HomeBookGrid from "./HomeBookGrid";

function HomePage() {
  const [books, setBooks] = useState([]);
  const [genre, setGenre] = useState("science_fiction");
  const [loading, setLoading] = useState(false);

  const genres = [
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
          `https://openlibrary.org/subjects/${genre}.json?sort=trending&limit=10`,
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

      {loading && <p>Loading books...</p>}

      <HomeBookGrid books={books} />
    </div>
  );
}

export default HomePage;
