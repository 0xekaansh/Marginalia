import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import HomeBookGrid from "./HomeBookGrid";
import styles from "./HomePage.module.css";
import { useAuth } from "../context/authContext";
import SortContainer from "./SortContainer";

function HomePage() {
  const [books, setBooks] = useState([]);
  const [genre, setGenre] = useState("science_fiction");
  const [sortOrder, setSortOrder] = useState("trending");
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const GENRES = [
    { label: "Sci-Fi", value: "science_fiction", coverId: 9705237},
    { label: "Romance", value: "romance", coverId: 14617366 },
    { label: "Mystery", value: "mystery", coverId: 12836855 },
    { label: "History", value: "history", coverId: 15253569 },
    { label: "Horror", value: "horror", coverId: 12684825 },
    { label: "Fantasy", value: "fantasy", coverId: 12003171 },
    { label: "Crime", value: "crime", coverId: 15144476 },
    { label: "Biography", value: "biography", coverId: 12680694 },
    { label: "Drama", value: "drama", coverId: 12621719 },
    { label: "Thriller", value: "thriller", coverId: 12002974 },
    { label: "Kids", value: "kids", coverId: 15159585 },
  ];

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const genresRef = useRef(null);

  const updateScrollButtons = () => {
    const el = genresRef.current;
    if (!el) return;

    setCanScrollLeft(el.scrollLeft > 1);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  };

  useEffect(() => {
    updateScrollButtons();
    window.addEventListener("resize", updateScrollButtons);
    return () => window.removeEventListener("resize", updateScrollButtons);
  }, []);

  const scrollGenres = (direction) => {
    if (!genresRef.current) return;
    genresRef.current.scrollBy({
      left: direction * 280,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const fetchBooksByGenre = async () => {
      setLoading(true);

      try {
        const result = await axios.get(
          `${import.meta.env.VITE_OL_SUBJECTS_URL}/${genre}.json?sort=${sortOrder}&limit=18`,
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
    <div>
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
        <div className={styles.carouselWrapper}>
          {canScrollLeft && (
            <button
              type="button"
              className={`${styles.scrollBtn} ${styles.scrollBtnLeft}`}
              onClick={() => scrollGenres(-1)}
              aria-label="Scroll genres left"
            >
              <ChevronLeftIcon />
            </button>
          )}

          <div
            className={styles.genres}
            ref={genresRef}
            onScroll={updateScrollButtons}
          >
            {GENRES.map((g) => {
              const isActive = g.value === genre;
              const thumbUrl = `${import.meta.env.VITE_OL_COVER_URL}/${g.coverId}-M.jpg`;
              return (
                <button
                  key={g.value}
                  type="button"
                  onClick={() => setGenre(g.value)}
                  className={`${styles.genreTile} ${isActive ? styles.genreTileActive : ""}`}
                >
                  <img
                    src={thumbUrl}
                    alt=""
                    aria-hidden="true"
                    className={styles.genreThumb}
                    loading="lazy"
                  />
                  <span className={styles.genreLabel}>{g.label}</span>
                </button>
              );
            })}
          </div>

          {canScrollRight && (
            <button
              type="button"
              className={`${styles.scrollBtn} ${styles.scrollBtnRight}`}
              onClick={() => scrollGenres(1)}
              aria-label="Scroll genres right"
            >
              <ChevronRightIcon />
            </button>
          )}
        </div>
      </div>

      <div className={styles.grid}>
        <SortContainer
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

        <HomeBookGrid books={books} />
      </div>
    </div>
  );
}

export default HomePage;
