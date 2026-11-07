import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import styles from "./AddEntry.module.css";

function AddEntryButton({ book, className }) {
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
      if (err.response && err.response.status === 400) {
        alert("You already have this book on your shelf!");
      } else {
        console.error("Error adding book", err);
        alert("Failed to add book to shelf, Try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleEntry}
      disabled={loading}
      className={`${styles.addBtn} ${className || ""}`}
    >
      {loading ? "Adding" : "+ Add To Shelf"}
    </button>
  );
}

export default AddEntryButton;
