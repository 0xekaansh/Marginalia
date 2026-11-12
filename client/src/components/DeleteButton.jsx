import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import LoadingSpinner from "../assets/LoadingSpinner";
import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import styles from "./DeleteButton.module.css";

function DeleteButton({ bookId, bookTitle, onDelete, className }) {
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    const token = Cookies.get("token");
    if (!token) {
      alert("Session expired. Please log in again.");
      return;
    }

    setDeleting(true);
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/deleteBook/${bookId}`,
        { headers: { Authorization: `Bearer ${token}` } },
      );
      if (onDelete) {
        onDelete(bookId);
      }
    } catch (err) {
      console.error("Error deleting book", err);
      alert("Failed to delete book, try again later.");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <button
      className={`${styles.deleteBtn} ${className || ""}`}
      onClick={handleDelete}
      disabled={deleting}
      title="Delete book"
    ><DeleteOutlinedIcon /> Delete
    </button>
  );
}

export default DeleteButton;
