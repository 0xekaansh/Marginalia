CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  bio TEXT,
  instagram TEXT,
  x TEXT,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE booklist (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id) ON DELETE CASCADE,
  ol_work_key VARCHAR(50) NOT NULL,
  ol_cover_edition_key VARCHAR(50),
  title VARCHAR(255) NOT NULL,
  author JSONB NOT NULL,
  author_key JSONB NOT NULL,
  cover_id INT,
  publish_year INT,
  bookstatus VARCHAR(50),
  notes TEXT,
  rating INT,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT unique_user_work UNIQUE (user_id, ol_work_key)
);