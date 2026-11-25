import AddEntryButton from "./AddEntry";
import BookCover from "./BookCover";
import styles from "./HomeBookGrid.module.css";
import { useState } from "react";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import CloseIcon from "@mui/icons-material/Close";

function HomeBookGrid({ books }) {
  const [activeBookKey, setActiveBookKey] = useState(null);

  const toggleDetails = (bookKey) => {
    setActiveBookKey((prev) => (prev === bookKey ? null : bookKey));
  };
  return (
    <div className={styles.grid}>
      {books.map((book) => {
        const coverId = book.cover_id || book.cover_i;
        const isDetailsOpen = activeBookKey === book.key;

        const authorName =
          book.authors && book.authors.length > 0
            ? book.authors[0].name
            : book.author_name
              ? book.author_name[0]
              : "Unknown Author";

        // Normalized book object for the add button
        const authorList = book.authors || [];
        const authorNames = authorList.map((author) => author.name);
        const authorKeys = authorList.map((author) =>
          author.key ? author.key.replace("/authors/", "") : "",
        );
        const normalizedBook = {
          key: book.key,
          cover_edition_key: book.cover_edition_key,
          title: book.title,
          author_name: authorNames,
          author_key: authorKeys,
          cover_i: coverId || null,
          first_publish_year: book.first_publish_year || null,
        };

        return (
          <div key={book.key} className={styles.card}>
            <div
              className={`${styles.hoverDetails} ${isDetailsOpen ? styles.detailsVisible : ""}`}
            >
              <strong>{book.title}</strong>
              <p>{authorName}</p>
            </div>

            <div className={styles.imageContainer}>
              <button
                type="button"
                className={styles.mobileInfoBtn}
                onClick={() => toggleDetails(book.key)}
                aria-expanded={isDetailsOpen}
                aria-label={
                  isDetailsOpen ? "Hide book details" : "Show book details"
                }
              >
                {isDetailsOpen ? (
                  <CloseIcon fontSize="small" />
                ) : (
                  <InfoOutlinedIcon fontSize="small" />
                )}
              </button>

              <BookCover coverId={coverId} title={book.title} />
            </div>

            <div className={styles.actionContainer}>
              <AddEntryButton
                book={normalizedBook}
                status="planToRead"
                className={styles.homepageAddBtn}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default HomeBookGrid;
