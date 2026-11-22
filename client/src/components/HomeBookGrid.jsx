import AddEntryButton from "./AddEntry";
import BookCover from "./BookCover";
import styles from "./HomeBookGrid.module.css"

function HomeBookGrid({ books }) {
  return (
    <div className={styles.grid}>
      {books.map((book) => {
        const coverId = book.cover_id || book.cover_i;

        const authorName = book.authors && book.authors.length > 0
          ? book.authors[0].name
          : (book.author_name ? book.author_name[0] : "Unknown Author");

        // Normalized book object for the add button
        const authorList = book.authors || [];
        const authorNames = authorList.map(author => author.name);
        const authorKeys = authorList.map(author =>author.key.replace('/authors/', ''));
        const normalizedBook = {
          key: book.key,
          cover_edition_key: book.cover_edition_key,
          title: book.title,
          author_name: authorNames,
          author_key: authorKeys,
          cover_i: coverId || null,
          first_publish_year: book.first_publish_year || null
        };

        return (
          <div key={book.key} className={styles.card}>
            <div className={styles.hoverDetails}>
              <strong>{book.title}</strong>
              <p>{authorName}</p>
            </div>

            <div className={styles.imageContainer}>
              <BookCover coverId={coverId} title={book.title} />
            </div>

            <div className={styles.actionContainer}>
              <AddEntryButton book={normalizedBook} status="planToRead" className={styles.homepageAddBtn}/>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default HomeBookGrid;