import styles from "./UserBookCard.module.css";
import BookCover from "./BookCover";
import StatusOptions from "./StatusOptions";
import RatingOptions from "./RatingOptions";
import UpdateButton from "./UpdateButton";
import { formatAuthors } from "../utils/formatter";
import NotesOutlinedIcon from "@mui/icons-material/NotesOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import EditOffOutlinedIcon from "@mui/icons-material/EditOffOutlined";

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
          <div className={styles.noteSection}>
            <div className={styles.noteHeader}>
              <label>Your Notes & Review:</label>

              {isEditingNote ? (
                <button className={`${styles.editNoteBtn} ${styles.editOff}`} onClick={toggleEdit}>
                  <EditOffOutlinedIcon fontSize="medium" />{" "}
                </button>
              ) : (
                <button className={styles.editNoteBtn} onClick={toggleEdit}>
                  {" "}
                  <EditOutlinedIcon fontSize="medium" />{" "}
                </button>
              )}
            </div>

            {isEditingNote ? (
              <textarea
                id={`notes-${book.id}`}
                value={currentNotes}
                onChange={(e) =>
                  handleFieldChange(book.id, "notes", e.target.value)
                }
                placeholder="Leave notes in the margins of your reading life..."
                rows={4}
                className={styles.noteTextarea}
              />
            ) : (
              <p className={styles.noteDisplay}>
                {currentNotes ||
                  "No notes added yet. Click 'Edit / Add' to write your notes."}
              </p>
            )}
          </div>
        )}
      </div>
    </li>
  );
}

export default UserBookCard;
