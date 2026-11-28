import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import styles from "./AddEntry.module.css";
import toast from "react-hot-toast";
import ControlPointOutlinedIcon from '@mui/icons-material/ControlPointOutlined';

function AddEntryButton({ book, status, className, onSuccess }) {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleEntry = async (e) => {
    const token = Cookies.get("token");
    if (!token) {
      toast.error("Please log in to add books to your shelf.");
      navigate("/login");
      return;
    }

    setLoading(true);
    try {
      const result = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/addNewEntry`,
        { book, status },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      onSuccess?.();
      toast.success(`"${book.title}" added to your shelf!`);
    } catch (err) {
      if (err.response && err.response.status === 400) {
        toast.error("You already have this book on your shelf!");
      } else {
        console.error("Error adding book", err);
        toast.error("Failed to add book to shelf, Try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleEntry}
      disabled={loading}
      className={`${styles.addBtn} ${className || ""}`}
    >
      {loading ? "Adding..." : <><ControlPointOutlinedIcon fontSize="medium" />  Add To Shelf</>}
    </button>
  );
}

export default AddEntryButton;
