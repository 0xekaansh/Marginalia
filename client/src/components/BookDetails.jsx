import BookCover from "./BookCover";
import GlobalBookRating from "./GlobalBookRating";
import { formatAuthors } from "../utils/formatter";
import styles from "./BookDetails.module.css";

function BookDetails(props) {
  return (
    <div className={styles.bookDetails}>
      <BookCover coverId={props.cover} title={props.title} />

      <div className={styles.bookData}>
        <strong className={styles.bookTitle}>{props.title}</strong>
        <p className={styles.bookAuthor}>by {formatAuthors(props.author)}</p>
        <p>First published in {props.publishYear || "N/A"}</p>
        <GlobalBookRating bookWorkKey={props.bookWorkKey} />
      </div>
    </div>
  );
}

export default BookDetails;
