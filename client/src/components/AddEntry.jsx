import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

function AddEntryButton({ book }) {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleEntry = async (e) => {
    const token = Cookies.get("token");
    if (!token) {
      alert("Please log in to add books to your shelf.");
      navigate("/login");
      return;
    }

    setLoading(true);
    try {
      const result = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/addNewEntry`,
        book,
        { headers: { Authorization: `Bearer ${token}` } },
      );
      alert(`${book.title} added to your shelf!`);
    } catch (err) {
      console.error("Error saving book", err);
      alert("Failed to add book to shelf, Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={handleEntry} disabled={loading}>
      {loading ? "Adding" : "+ Add to shelf"}
    </button>
  );
}

export default AddEntryButton;
