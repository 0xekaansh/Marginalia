import AddEntryButton from "./AddEntry";
import BookCover from "./BookCover";
import { formatAuthors } from "../utils/formatter";
import styles from "./SearchResultList.module.css";

function SearchResultList({ books }) {
  return (
    <ul className={styles.list}>
      {books.map((book, index) => {
        return (
          <li key={book.key || index} className={styles.listItem}>
            <BookCover coverId={book.cover_i} title={book.title} />

            <div className={styles.bookData}>
              <strong className={styles.bookTitle}>{book.title}</strong>
              <p>by {formatAuthors(book.author_name)}</p>
              <p>First published in {book.first_publish_year || null}</p>
            </div>
            <AddEntryButton book={book} />
          </li>
        );
      })}
    </ul>
  );
}

export default SearchResultList;
