import express from "express";
import dotenv from "dotenv";
import pg from "pg";
import cors from "cors";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

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
app.use(express.urlencoded({ extended: true }));

// CUSTOM JWT VERIFICATION MIDDLEWARE
function verifyToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access Denied. Log in to continue." });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decodedUser) => {
    if (err) {
      return res.status(403).json({ message: "Invalid or expired token." });
    }
    req.user = decodedUser;
    next();
  });
}

// REGISTRATION ROUTE
app.post("/api/register", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const result = await db.query(
      "INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING  id, username, email",
      [username, email, hashedPassword],
    );
    const user = result.rows[0];

    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );

    res.status(201).json({ token, user });
  } catch (err) {
    if (err.code === "23505") {
      return res
        .status(400)
        .json({ message: "Username or email is already taken." });
    }
    console.error("Registration error: ", err);
    res.status(500).json({ message: "Registration failed." });
  }
});

// LOGIN ROUTE
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (result.rows.length === 0) {
      return res.status(401).json({ message: "Invalid email or password " });
    }

    const user = result.rows[0];
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password " });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );

    res.json({
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("Login error: ", err);
    res.status(500).json({ message: "Login Failed" });
  }
});

// FETCH LOOGED USER'S BOOKS LIST FROM DB
app.get("/api/userBookList", verifyToken, async (req, res) => {
  try {
    const userID = req.user.id;
    const result = await db.query(
      "SELECT * FROM booklist WHERE user_id = $1 ORDER BY id DESC",
      [userID],
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Failed to retrieve book list", err);
    res.status(500).json({ message: "Database Connection Error" });
  }
});

// ADD BOOK IN LOGGED USER'S BOOKS LIST
app.post("/api/addNewEntry",verifyToken, async (req, res) => {
  const userID = req.user.id;
  const book = req.body;
  const OLID = book.key;
  const title = book.title;
  const author = book.author_name 
    ? JSON.stringify(Array.isArray(book.author_name) ? book.author_name : [book.author_name]) 
    : JSON.stringify(["Unknown Author"]);
    const authorKey = book.author_key 
    ? JSON.stringify(Array.isArray(book.author_key) ? book.author_key : [book.author_key]) 
    : JSON.stringify([]);
  const coverID = book.cover_i || null;
  const publish_year = book.first_publish_year || null;

  try {
    const result = await db.query(
      "INSERT INTO booklist (user_id, open_library_id, title, author, author_key, cover_id, publish_year) VALUES ($1, $2, $3, $4, $5, $6, $7)",
      [userID, OLID, title, author, authorKey, coverID, publish_year],
    );
    res.status(201).json({ message: "Book added to list successfully." });
  } catch (err) {
    console.error("Failed to add new entry", err.stack);
    res.status(500).json({ message: "Database Insertion Error" });
  }
});

app.listen(port, () => {
  console.log(`Marginalia server listening on Port: ${port}`);
});
