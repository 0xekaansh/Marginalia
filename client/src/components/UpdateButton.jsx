import styles from "./UpdateButton.module.css";
import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import CloudDownloadOutlinedIcon from "@mui/icons-material/CloudDownloadOutlined";
import toast from "react-hot-toast";

function UpdateButton({ bookId, updatedData, bookTitle, className }) {
  const [updating, setUpdating] = useState(false);

  const handleUpdate = async () => {
    const token = Cookies.get("token");
    if (!token) {
      toast.error("Session expired. Please log in again.");
      return;
    }

    setUpdating(true);
    try {
      await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/updateBook/${bookId}`,
        updatedData,
        { headers: { Authorization: `Bearer ${token}` } },
      );
      toast.success(`"${bookTitle}" updated successfully!`);
    } catch (error) {
      console.error("Error updating book", error);
      toast.error("Failed to update book, try again later.");
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
      {updating ? (
        "Syncing..."
      ) : (
        <>
          <CloudDownloadOutlinedIcon fontSize="medium"/> Sync
        </>
      )}
    </button>
  );
}

export default UpdateButton;
