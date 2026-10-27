function UserShelfList({ books }) {
  return (
    <ul>
      {books.map((book) => {
        const coverURL = book.cover_id
          ? `https://covers.openlibrary.org/b/id/${book.cover_id}-M.jpg`
          : "https://via.placeholder.com/50x75?text=No+Cover";

        return (
          <li key={book.id}>
            <img src={coverURL} alt={book.title} />
            <div>
              <strong>{book.title}</strong>
              <p>{book.author || "Unknown Author"}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export default UserShelfList;
