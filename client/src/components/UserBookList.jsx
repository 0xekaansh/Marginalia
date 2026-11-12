import { useEffect, useState } from "react";
import axios from "axios";
import UserShelfList from "./UserShelfList";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import styles from "./UserBookList.module.css";
import SortContainer from "./SortContainer";

function UserBookList() {
  const [loading, setLoading] = useState(false);
  const [booksList, setBooksList] = useState([]);
  const [sortOrder, setSortOrder] = useState("trending");
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("token");

    if (!token) {
      navigate("/login");
      return;
    }

    const fetchBookList = async () => {
      setLoading(true);

      try {
        const result = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/userBookList`,
          { headers: { Authorization: `Bearer ${token}` } },
        );
        setBooksList(result.data);
      } catch (err) {
        console.error("Error getting Book list", err);
        alert("Failed to load Book list, Try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookList();
  }, []);

  const sortedBooks = [...booksList].sort((a, b) => {
    if (sortOrder === "aZ") {
      return a.title.localeCompare(b.title);
    }
    if (sortOrder === "zA") {
      return b.title.localeCompare(a.title);
    }
    if (sortOrder === "firstPublished") {
      return (b.publish_year || 0) - (a.publish_year || 0);
    }
    if (sortOrder === "lastUpdated" || sortOrder === "trending") {
      return new Date(b.created_at) - new Date(a.created_at);
    }
    if (sortOrder === "rating") {
      return (b.rating || 0) - (a.rating || 0);
    }
    return 0;
  });

  const handleRemoveBook = (deletedBookId) => {
    setBooksList((prevBooks) =>
      prevBooks.filter((book) => book.id !== deletedBookId),
    );
  };

  return (
    <div className={styles.bookShelf}>
      <section className={styles.shelfHeader}>
        <h2>My Bookshelf</h2>
      </section>

      <div className={styles.shelfContainer}>
        <SortContainer
          label="Sort By"
          loading={loading}
          sortOrder={sortOrder}
          handleChange={(e) => setSortOrder(e.target.value)}
          options={[
            { value: "aZ", label: "Book Title (A-Z)" },
            { value: "zA", label: "Book Title (Z-A)" },
            { value: "firstPublished", label: "First Published" },
            { value: "lastUpdated", label: "Last Updated" },
            { value: "ratingDesc", label: "Rating Highest" },
            { value: "ratingAsc", label: "Rating Lowest" },
          ]}
        />
        {!loading && booksList.length === 0 && (
          <p>No books saved to your shelf yet.</p>
        )}

        <UserShelfList books={sortedBooks} onDeleteBook={handleRemoveBook} />
      </div>
    </div>
  );
}

export default UserBookList;
