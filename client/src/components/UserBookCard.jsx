import styles from "./UserBookCard.module.css";
import BookCover from "./BookCover";
import StatusOptions from "./StatusOptions";
import RatingOptions from "./RatingOptions";
import UpdateButton from "./UpdateButton";
import { formatAuthors } from "../utils/formatter";
import NotesOutlinedIcon from "@mui/icons-material/NotesOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import EditOffOutlinedIcon from "@mui/icons-material/EditOffOutlined";
import BookNotes from "./BookNotes";

function UserBookCard({
  book,
  bookEdits,
  handleFieldChange,
  isNoteOpen,
  toggleNote,
  isEditingNote,
  toggleEdit,
}) {
  const currentStatus =
    bookEdits[book.id]?.bookstatus ?? book.bookstatus ?? "planToRead";
  const currentScore = bookEdits[book.id]?.rating ?? book.rating ?? "";
  const currentNotes = bookEdits[book.id]?.notes ?? book.notes ?? "";

  return (
    <li>
      <div className={styles.listItem}>
        <div className={styles.cardMain}>
          <BookCover coverId={book.cover_id} title={book.title} />
          <div className={styles.bookDetails}>
            <div className={styles.bookData}>
              <strong className={styles.bookTitle}>{book.title}</strong>
              <p>by {formatAuthors(book.author)}</p>
              <p>First published in {book.publish_year || null}</p>
            </div>
            <div className={styles.bookAction}>
              <p>
                Added to shelf on{" "}
                <strong>
                  {new Date(book.created_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </strong>
              </p>
              <StatusOptions
                label="Status"
                id={`status-${book.id}`}
                value={currentStatus}
                onChange={(e) =>
                  handleFieldChange(book.id, "bookstatus", e.target.value)
                }
                className={styles.optionContainer}
              />
              <RatingOptions
                label="Your Score"
                id={`score-${book.id}`}
                value={currentScore}
                onChange={(e) =>
                  handleFieldChange(book.id, "rating", e.target.value)
                }
                className={styles.optionContainer}
              />
              <button className={styles.noteToggleBtn} onClick={toggleNote}>
                <NotesOutlinedIcon /> {isNoteOpen ? "Hide Notes" : "Show Notes"}
              </button>
              <UpdateButton
                bookId={book.id}
                bookTitle={book.title}
                updatedData={{
                  bookstatus: currentStatus,
                  rating: currentScore,
                  notes: currentNotes,
                }}
                className={styles.updateBtn}
              />
            </div>
          </div>
        </div>

        {isNoteOpen && (
          <BookNotes
            bookId={book.id}
            currentNotes={currentNotes}
            isNoteOpen={isNoteOpen}
            isEditingNote={isEditingNote}
            toggleEdit={toggleEdit}
            handleFieldChange={handleFieldChange}
          />
        )}
      </div>
    </li>
  );
}

export default UserBookCard;
