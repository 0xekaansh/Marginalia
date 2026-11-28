import styles from "./UserBookCard.module.css";
import BookCover from "./BookCover";
import StatusOptions from "./StatusOptions";
import RatingOptions from "./RatingOptions";
import UpdateButton from "./UpdateButton";
import { formatAuthors } from "../utils/formatter";
import NotesOutlinedIcon from "@mui/icons-material/NotesOutlined";
import BookNotes from "./BookNotes";
import DeleteButton from "./DeleteButton";
import BookDetails from "./BookDetails";

function UserBookCard({
  book,
  bookEdits,
  handleFieldChange,
  isNoteOpen,
  toggleNote,
  isEditingNote,
  toggleEdit,
  onDelete,
}) {
  const currentStatus =
    bookEdits[book.id]?.bookstatus ?? book.bookstatus ?? "planToRead";
  const currentScore = bookEdits[book.id]?.rating ?? book.rating ?? "";
  const currentNotes = bookEdits[book.id]?.notes ?? book.notes ?? "";

  return (
    <li>
      <div className={styles.listItem}>
        <div className={styles.cardMain}>
          <BookDetails
            cover={book.cover_id}
            title={book.title}
            author={book.author}
            publishYear={book.publish_year}
            bookWorkKey={book.ol_work_key}
          />
          <div className={styles.bookAction}>
            <span className={styles.shelfDate}>
              Added on{" "}
              {new Date(book.created_at).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </span>
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
            <button
              type="button"
              className={styles.noteToggleBtn}
              onClick={toggleNote}
            >
              <NotesOutlinedIcon /> {isNoteOpen ? "Hide Notes" : "Show Notes"}
            </button>
            <div className={styles.actionBtnContainer}>
              <UpdateButton
                type="button"
                bookId={book.id}
                bookTitle={book.title}
                updatedData={{
                  bookstatus: currentStatus,
                  rating: currentScore,
                  notes: currentNotes,
                }}
                className={styles.updateBtn}
              />
              <DeleteButton
                bookId={book.id}
                bookTitle={book.title}
                onDelete={onDelete}
                className={styles.deleteBtn}
              />
            </div>
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
    </li>
  );
}

export default UserBookCard;
