import { useState } from "react";
import styles from "./BookCover.module.css";

function BookCover({ coverId, title }) {
  const [imgError, setImgError] = useState(false);

  const coverURL =
    coverId && !imgError
      ? `${import.meta.env.VITE_OL_COVER_URL}/${coverId}-M.jpg`
      : null;

  return (
    <div className={styles.coverContainer}>
      {coverURL ? (
        <img
          src={coverURL}
          alt={title}
          className={styles.coverImg}
          loading="lazy"
          onError={() => setImgError(true)}
        />
      ) : (
        <div className={styles.fallbackCover}>
          <span>{title || "No Cover"}</span>
        </div>
      )}
    </div>
  );
}

export default BookCover;