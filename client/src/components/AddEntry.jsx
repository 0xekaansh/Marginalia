import axios from "axios";
import { useState } from "react";

function AddEntryButton({ book }) {
  const [loading, setLoading] = useState(false);

  const handleEntry = async (e) => {
    setLoading(true);
    try {
      const result = await axios.post(
        "http://localhost:5000/api/addNewEntry",
        book,
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
    <button onClick={handleEntry}>
      {loading ? "Adding" : "+ Add to shelf"}
    </button>
  );
}

export default AddEntryButton;
