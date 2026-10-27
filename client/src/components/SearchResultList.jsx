import AddEntryButton from "./AddEntry";

function SearchResultList({ books }) {
  return (
    <ul>
      {books.map((book, index) => {
        const coverURL = book.cover_i
          ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
          : "https://via.placeholder.com/50x75?text=No+Cover";

        return (
          <li key={book.key || index}>
            <img src={coverURL} alt={book.title} />
            <div>
              <strong>{book.title}</strong>
              <p>
                {book.author_name ? book.author_name.join(", ") : "Unknown Author"}{" "}
                {book.first_publish_year || "N/A"}
              </p>
            </div>
            <AddEntryButton book={book} />
          </li>
        );
      })}
    </ul>
  );
}

export default SearchResultList;