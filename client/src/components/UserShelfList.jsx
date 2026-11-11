import { useState } from "react";
import styles from "./UserShelfList.module.css";
import UserBookCard from "./UserBookCard";

function UserShelfList({ books }) {
  const [bookEdits, setBookEdits] = useState({});
  const [showNotes, setShowNotes] = useState({});
  const [editingNotes, setEditingNotes] = useState({});

  const handleFieldChange = (bookId, field, value) => {
    setBookEdits((prev) => ({
      ...prev,
      [bookId]: {
        ...prev[bookId],
        [field]: value,
      },
    }));
  };

  const toggleNotes = (bookId) => {
    setShowNotes((prev) => ({
      ...prev,
      [bookId]: !prev[bookId],
    }));
  };

  const toggleEditMode = (bookId) => {
    setEditingNotes((prev) => ({
      ...prev,
      [bookId]: !prev[bookId],
    }));
  };

  return (
    <div className={styles.userBookShelf}>
      <ul className={styles.bookList}>
        {books.map((book) => (
          <UserBookCard
            key={book.id}
            book={book}
            bookEdits={bookEdits}
            handleFieldChange={handleFieldChange}
            isNoteOpen={!!showNotes[book.id]}
            toggleNote={() => toggleNotes(book.id)}
            isEditingNote={!!editingNotes[book.id]}
            toggleEdit={() => toggleEditMode(book.id)}
          />
        ))}
      </ul>
    </div>
  );
}

export default UserShelfList;
