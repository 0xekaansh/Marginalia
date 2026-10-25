import { useEffect, useState } from "react";
import axios from "axios";

function UserBookList() {
  const [loading, setLoading] = useState(false);
  const [booksList, setBooksList] = useState([]);

  useEffect(() => {
    const fetchBookList = async () => {
      setLoading(true);

      try {
        const result = await axios.get("http://localhost:5000/api/userBookList");
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

  return (
    <div>
      <h2>My BookShelf</h2>
      {loading && <p>Loading, Just a moment</p>}
      {!loading && booksList.length === 0 && (
        <p>No books saved to your shelf yet.</p>
      )}

      <ul>
        {booksList.map((book, index) => {
          const coverURL = book.cover_id
            ? `https://covers.openlibrary.org/b/id/${book.cover_id}-M.jpg`
            : "https://via.placeholder.com/50x75?text=No+Cover";

          return (
            <li key={index}>
              <img src={coverURL} alt={book.title} />
              <div>
                <strong>{book.title}</strong>
                <p>
                  {book.author ? book.author : "Unknown Author"}{" "}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default UserBookList;
