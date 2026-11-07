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

  const handleFieldChange = (bookId, field, value) => {
    setBookEdits((prev) => ({
      ...prev,
      [bookId]: {
        ...(prev[bookId] || books.find((b) => b.id === bookId)),
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
            bookEdits[book.id]?.bookstatus || book.bookstatus || "planToRead";
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
                      options={statusOptions}
                      value={currentStatus}
                      handleChange={(e) =>
                        handleFieldChange(book.id, "bookstatus", e.target.value)
                      }
                      className={styles.optionContainer}
                    />
                    <UpdateButton
                      bookId={book.id}
                      updatedData={
                        bookEdits[book.id] || {
                          bookstatus: currentStatus,
                          rating: book.rating,
                          review: book.review,
                        }
                      }
                      bookTitle={book.title}
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
