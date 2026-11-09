import { useState } from "react";
import OptionContainer from "./OptionContainer";
import styles from "./UserShelfList.module.css";
import UpdateButton from "./UpdateButton";

function UserShelfList({ books }) {
  const [bookEdits, setBookEdits] = useState({});
  const statusOptions = [
    { label: "Completed", value: "completed" },
    { label: "Plan to read", value: "planToRead" },
    { label: "Reading", value: "reading" },
    { label: "On-Hold", value: "onHold" },
    { label: "Dropped", value: "dropped" },
  ];
  const ratingOptions = [
    { label: "Not Rated", value: null },
    { label: "⭐ 5 - Masterpiece", value: "5" },
    { label: "⭐ 4 - Highly Recommended", value: "4" },
    { label: "⭐ 3 - Good", value: "3" },
    { label: "⭐ 2 - Average", value: "2" },
    { label: "⭐ 1 - Not for me", value: "1" },
  ];

  const handleFieldChange = (bookId, field, value) => {
    setBookEdits((prev) => ({
      ...prev,
      [bookId]: {
        ...prev[bookId],
        [field]: value,
      },
    }));
  };

  return (
    <div className={styles.userBookShelf}>
      <ul className={styles.bookList}>
        {books.map((book) => {
          const coverURL = book.cover_id
            ? `https://covers.openlibrary.org/b/id/${book.cover_id}-M.jpg`
            : "https://via.placeholder.com/50x75?text=No+Cover";

          const currentStatus =
            bookEdits[book.id]?.bookstatus ?? book.bookstatus ?? "planToRead";
          const currentScore =
            bookEdits[book.id]?.rating ?? book.rating ?? null;

          return (
            <li key={book.id}>
              <div className={styles.listItem}>
                <div className={styles.coverContainer}>
                  <img
                    src={coverURL}
                    alt={book.title}
                    className={styles.coverImg}
                  />
                </div>
                <div className={styles.bookDetails}>
                  <div className={styles.bookData}>
                    <strong className={styles.bookTitle}>{book.title}</strong>
                    <p>
                      by{" "}
                      {book.author
                        ? book.author.join(" and ")
                        : "Unknown Author"}
                    </p>
                    <p>First published in {book.publish_year || null}</p>
                  </div>
                  <div className={styles.bookAction}>
                    <p>
                      Added to shelf on{" "}
                      {new Date(book.created_at).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                    <OptionContainer
                      label="Status"
                      id={`status-${book.id}`}
                      value={currentStatus}
                      onChange={(e) =>
                        handleFieldChange(book.id, "bookstatus", e.target.value)
                      }
                      className={styles.optionContainer}
                      options={statusOptions}
                    />
                    <OptionContainer
                      label="Your Score"
                      id={`score-${book.id}`}
                      value={currentScore}
                      onChange={(e) =>
                        handleFieldChange(book.id, "rating", e.target.value)
                      }
                      className={styles.optionContainer}
                      options={ratingOptions}
                    />
                    <UpdateButton
                      bookId={book.id}
                      bookTitle={book.title}
                      updatedData={{
                        bookstatus: currentStatus,
                        rating: currentScore,
                      }}
                    />
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default UserShelfList;
