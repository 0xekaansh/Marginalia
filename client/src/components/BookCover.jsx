import styles from "./BookCover.module.css";

function BookCover({ coverId, title }) {
  const coverURL = coverId
    ? `${import.meta.env.VITE_OL_COVER_URL}/${coverId}-M.jpg`
    : `${import.meta.env.VITE_PLACEHOLDER_URL}/100x150?text=Cover+Not+Found`;

  return (
    <div className={styles.coverContainer}>
      <img src={coverURL} alt={title} className={styles.coverImg} />
    </div>
  );
}

export default BookCover;
