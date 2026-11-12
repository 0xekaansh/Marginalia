import styles from "./BookNotes.module.css";
import NotesOutlinedIcon from "@mui/icons-material/NotesOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import EditOffOutlinedIcon from "@mui/icons-material/EditOffOutlined";

function BookNotes({
  bookId,
  currentNotes,
  isNoteOpen,
  isEditingNote,
  toggleEdit,
  handleFieldChange,
}) {
  return (
    <>
      {isNoteOpen && (
        <div className={styles.noteSection}>
          <div className={styles.noteHeader}>
            <label>Your Notes & Review:</label>
            {isEditingNote ? (
              <button
                className={`${styles.editNoteBtn} ${styles.editOff}`}
                onClick={toggleEdit}
                title="Cancel Edit"
              >
                <EditOffOutlinedIcon fontSize="small" />
              </button>
            ) : (
              <button
                className={styles.editNoteBtn}
                onClick={toggleEdit}
                title="Edit Notes"
              >
                <EditOutlinedIcon fontSize="small" />
              </button>
            )}
          </div>

          {isEditingNote ? (
            <textarea
              id={`notes-${bookId}`}
              value={currentNotes}
              onChange={(e) => handleFieldChange(bookId, "notes", e.target.value)}
              placeholder="Leave notes in the margins of your reading life..."
              rows={4}
              className={styles.noteTextarea}
            />
          ) : (
            <p className={styles.noteDisplay}>
              {currentNotes || "No notes added yet. Click the edit icon to write your notes."}
            </p>
          )}
        </div>
      )}
    </>
  );
}

export default BookNotes;