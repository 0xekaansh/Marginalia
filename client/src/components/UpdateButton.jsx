import styles from "./UpdateButton.module.css";
import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import CloudDownloadOutlinedIcon from '@mui/icons-material/CloudDownloadOutlined';

function UpdateButton({ bookId, updatedData, bookTitle, className }) {
  const [updating, setUpdating] = useState(false);

  const handleUpdate = async () => {
    const token = Cookies.get("token");
    if (!token) {
      alert("Session expired. Please log in again.");
      return;
    }

    setUpdating(true);
    try {
      await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/updateBook/${bookId}`,
        updatedData,
        { headers: { Authorization: `Bearer ${token}` } },
      );
      alert(`"${bookTitle}" updated successfully!`);
    } catch (error) {
      console.error("Error updating book", error);
      alert("Failed to update book, try again later.");
    } finally {
      setUpdating(false);
    }
  };

  return (
    <button
      className={`${styles.editBtn} ${className || ""}`}
      onClick={handleUpdate}
      disabled={updating}
      title="Update book"
    >
      {updating ? ("Syncing...") : (
        <span className={styles.btnContent}>
        <CloudDownloadOutlinedIcon/>  Sync
        </span>
      )}
    </button>
  );
}

export default UpdateButton;
