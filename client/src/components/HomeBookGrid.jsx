import AddEntryButton from "./AddEntry";

function HomeBookGrid({ books }) {
  return (
    <div className="book-grid">
      {books.map((book) => {
        const coverId = book.cover_id || book.cover_i;
        const coverURL = coverId
          ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`
          : "https://via.placeholder.com/120x180?text=No+Cover";

        const authorName = book.authors && book.authors.length > 0
          ? book.authors[0].name
          : (book.author_name ? book.author_name[0] : "Unknown Author");

        // Normalized book object for the add button
        const authorList = book.authors || [];
        const authorNames = authorList.map(author => author.name);
        const authorKeys = authorList.map(author =>author.key.replace('/authors/', ''));
        const normalizedBook = {
          key: book.key,
          title: book.title,
          author_name: authorNames,
          author_key: authorKeys,
          cover_i: coverId || null,
          first_publish_year: book.first_publish_year || null
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