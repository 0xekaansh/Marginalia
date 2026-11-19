import AddEntryButton from "./AddEntry";
import BookCover from "./BookCover";
import { formatAuthors } from "../utils/formatter";
import styles from "./SearchResultList.module.css";
import StatusOptions from "./StatusOptions";
import RatingOptions from "./RatingOptions";
import DeleteButton from "./DeleteButton";
import UpdateButton from "./UpdateButton";
import GlobalBookRating from "./GlobalBookRating";
import { useState } from "react";

function SearchResultList({ books, userBookList = [], onShelfChange }) {
  const [bookEdits, setBookEdits] = useState({});
  const [newBookStatuses, setNewBookStatuses] = useState({});

  const handleFieldChange = (bookId, field, value) => {
    setBookEdits((prev) => ({
      ...prev,
      [bookId]: {
        ...prev[bookId],
        [field]: value,
      },
    }));
  };

  const handleNewStatusChange = (bookKey, status) => {
    setNewBookStatuses((prev) => ({
      ...prev,
      [bookKey]: status,
    }));
  };

  return (
    <ul className={styles.list}>
      {books.map((book, index) => {
        const bookKey = book.key || index;
        const selectedNewStatus = newBookStatuses[bookKey] ?? "planToRead";
        const existingEntry = userBookList.find(
          (item) => item.ol_work_key === book.key,
        );

        const currentStatus =
          existingEntry &&
          (bookEdits[existingEntry.id]?.bookstatus ??
            existingEntry.bookstatus ??
            "planToRead");
        const currentScore =
          existingEntry &&
          (bookEdits[existingEntry.id]?.rating ?? existingEntry.rating ?? "");

        return (
          <li key={book.key || index} className={styles.listItem}>
            <BookCover coverId={book.cover_i} title={book.title} />

            <div className={styles.bookData}>
              <strong className={styles.bookTitle}>{book.title}</strong>
              <p>by {formatAuthors(book.author_name)}</p>
              <p>First published in {book.first_publish_year || "N/A"}</p>
              <GlobalBookRating bookWorkKey={book.key} />
            </div>

            <div className={styles.actionButtons}>
              {existingEntry ? (
                <div className={styles.userControls}>
                  <span className={styles.shelfDate}>
                    Added on{" "}
                    {new Date(existingEntry.created_at).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      },
                    )}
                  </span>
                  <StatusOptions
                    label="Status"
                    id={`status-${existingEntry.id}`}
                    value={currentStatus}
                    onChange={(e) =>
                      handleFieldChange(
                        existingEntry.id,
                        "bookstatus",
                        e.target.value,
                      )
                    }
                    className={styles.optionContainer}
                  />
                  <RatingOptions
                    label="Your Score"
                    id={`score-${existingEntry.id}`}
                    value={currentScore}
                    onChange={(e) =>
                      handleFieldChange(
                        existingEntry.id,
                        "rating",
                        e.target.value,
                      )
                    }
                    className={styles.optionContainer}
                  />
                  <div className={styles.buttonGroup}>
                    <UpdateButton
                      bookId={existingEntry.id}
                      bookTitle={existingEntry.title}
                      updatedData={{
                        bookstatus: currentStatus,
                        rating: currentScore,
                      }}
                    />
                    <DeleteButton
                      bookId={existingEntry.id}
                      onSuccess={onShelfChange}
                    />
                  </div>
                </div>
              ) : (
                <div className={styles.userControls}>
                  <StatusOptions
                    label="Status"
                    id={`new-status-${bookKey}`}
                    value={selectedNewStatus}
                    onChange={(e) =>
                      handleNewStatusChange(bookKey, e.target.value)
                    }
                    className={`${styles.optionContainer} ${styles.newBook}`}
                  />
                  <AddEntryButton
                    book={book}
                    status={selectedNewStatus}
                    className={styles.addBtn}
                    onSuccess={onShelfChange}
                  />
                </div>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export default SearchResultList;
