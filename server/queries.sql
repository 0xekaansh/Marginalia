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
  open_library_id VARCHAR(50) NOT NULL,
  title VARCHAR(255) NOT NULL,
  author JSONB NOT NULL,
  author_key JSONB NOT NULL,
  cover_id INT,
  publish_year INT,
  review TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);