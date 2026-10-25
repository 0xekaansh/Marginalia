import express from "express";
import dotenv from "dotenv";
import pg from "pg";
import cors from "cors";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// PG CONNECTION
const db = new pg.Pool(
  process.env.DATABASE_URL
    ? {
        connectionString: process.env.DATABASE_URL,
        ssl:
          process.env.NODE_ENV === "production"
            ? { rejectUnauthorized: false }
            : false,
      }
    : {
        user: process.env.PG_USER,
        host: process.env.PG_HOST,
        database: process.env.PG_DATABASE,
        password: process.env.PG_PASSWORD,
        port: process.env.PG_PORT,
      },
);

// MIDDLEWARE
app.use(cors());
app.use(express.json());


// FETCH USER'S LIST FROM DB
app.get("/api/userBookList", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM booklist ORDER BY id DESC");
    res.status(200).json(result.rows);
  } catch (err) {
    console.error("Failed to retrieve book list", err.stack);
    res.status(500).json({ message: "Database Connection Error" });
  }
});

// ADD BOOK TO DB IN USER'S BOOK LIST 
app.post("/api/addNewEntry", async (req, res) => {
  const book = req.body;
  const OLID = book.key;
  const title = book.title;
  const author = book.author_name
    ? book.author_name.join(", ")
    : "Unknown Author";
  const coverID = book.cover_i;

  try {
    const result = await db.query(
      "INSERT INTO booklist (open_library_id, title, author, cover_id, ol_data) VALUES ($1, $2, $3, $4, $5)",
      [OLID, title, author, coverID, book],
    );
    res.status(201).json({message: "Book added to list successfully."});
  } catch (err) {
    console.error("Failed to add new entry", err.stack);
    res.status(500).json({ message: "Database Insertion Error" });
  }
});

app.listen(port, () => {
  console.log(`Marginalia server listening on Port: ${port}`);
});
