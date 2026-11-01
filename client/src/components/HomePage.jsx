import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import HomeBookGrid from "./HomeBookGrid";
import styles from "./HomePage.module.css";
import { useAuth } from "../context/authContext";

function HomePage() {
  const [books, setBooks] = useState([]);
  const [genre, setGenre] = useState("science_fiction");
  const [sortOrder, setSortOrder] = useState("trending");
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

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
          `${import.meta.env.VITE_OL_SUBJECTS_URL}${genre}.json?sort=${sortOrder}&limit=12`,
        );
        setBooks(result.data.works || []);
      } catch (err) {
        console.error("Error fetching books by genre", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBooksByGenre();
  }, [genre, sortOrder]);

  return (
    <div className={styles.container}>
      <div className={styles.heroBanner}>
        <div className={styles.heroHeading}>
          <h1>For the notes you leave in the margins of your reading life.</h1>
          <p>Discover, track, and organize your personal reading bookshelf.</p>
        </div>
        <div className={styles.heroLinks}>
          {user ? (
            <div className={styles.welcomeText}>
              <p>
                Welcome Back! <strong>{user.username}</strong>
              </p>
              <Link to="/search" className={styles.searchLink}>
                Search Books
              </Link>
            </div>
          ) : (
            <Link to="/register" className={styles.joinLink}>
              Join The Club Now
            </Link>
          )}
        </div>
      </div>

      <div className={styles.categories}>
        <h3>Browse Categories</h3>
        <div className={styles.genres}>
          {genres.map((g) => {
            const isActive = g.value === genre;
            return (
              <button
                key={g.value}
                onClick={() => setGenre(g.value)}
                className={`${styles.genreButton} ${isActive ? styles.genreButtonActive : ""}`}
              >
                {g.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className={styles.grid}>
        <div className={styles.gridHeader}>
          <div className={styles.loadingWrapper}>
            {loading && <p>Loading books...</p>}
          </div>
          <div className={styles.sortContainer}>
            <label htmlFor="sort">Sort by: </label>
            <select
              id="sortSelect"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className={styles.sortSelect}
            >
              <option value="trending">Trending</option>
              <option value="new">Newest</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>
        <HomeBookGrid books={books} />
      </div>
    </div>
  );
}

export default HomePage;
