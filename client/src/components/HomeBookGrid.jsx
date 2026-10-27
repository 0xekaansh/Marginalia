import AddEntryButton from "./AddEntry";

function HomeBookGrid({ books }) {
  return (
    <div className="book-grid">
      {books.map((book) => {
        const coverId = book.cover_id || book.cover_i;
        const coverURL = coverId
          ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`
          : "https://via.placeholder.com/120x180?text=No+Cover";

        const authorName = book.authors
          ? book.authors[0].name
          : (book.author_name ? book.author_name[0] : "Unknown Author");

        // Normalized book object for the add button
        const normalizedBook = {
          title: book.title,
          author_name: [authorName],
          cover_i: coverId,
          key: book.key
        };

        return (
          <div key={book.key}>
            <div>
              <img src={coverURL} alt={book.title} />
              <strong>{book.title}</strong>
              <p>{authorName}</p>
            </div>
            <AddEntryButton book={normalizedBook} />
          </div>
        );
      })}
    </div>
  );
}

export default HomeBookGrid;