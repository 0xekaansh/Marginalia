import styles from "./BookCover.module.css";

function BookCover({ coverId, title }) {
  const coverURL = coverId
    ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`
    : "https://via.placeholder.com/50x75?text=No+Cover";

  return (
    <div className={styles.coverContainer}>
      <img src={coverURL} alt={title} className={styles.coverImg} />
    </div>
  );
}

export default BookCover;
