import { useEffect, useState } from "react";
import axios from "axios";
import UserShelfList from "./UserShelfList";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

function UserBookList() {
  const [loading, setLoading] = useState(false);
  const [booksList, setBooksList] = useState([]);
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
          { headers: { Authorization: `Bearer ${token}` }},
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

  return (
    <div>
      <h2>My BookShelf</h2>
      {loading && <p>Loading, Just a moment</p>}
      {!loading && booksList.length === 0 && (
        <p>No books saved to your shelf yet.</p>
      )}

      <UserShelfList books={booksList} />
    </div>
  );
}

export default UserBookList;
