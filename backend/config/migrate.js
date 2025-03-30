const sqlite3 = require("sqlite3").verbose();
const path = require("path");
require("dotenv").config();

const dbPath = path.resolve(__dirname, `../${process.env.DB_FILE}`);

const db = new sqlite3.Database(dbPath);

db.serialize(() => {
  console.log("Running migration...");
  // Users Table
  db.run(
    `
	CREATE TABLE IF NOT EXISTS users (
	  id INTEGER PRIMARY KEY AUTOINCREMENT,
	  first_name VARCHAR(255),
	  last_name VARCHAR(255),
	  email VARCHAR(255) UNIQUE NOT NULL,
	  password VARCHAR(500) NOT NULL,
	  phone VARCHAR(20),
	  dob DATETIME,
	  gender TEXT CHECK (gender IN ('m', 'f', 'o')),
	  address VARCHAR(255),
	  role TEXT CHECK (role IN ('super_admin', 'artist_manager', 'artist')),
	  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
	  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
	)
  `,
    (err) => {
      if (err) {
        console.error("Error creating user table:", err);
      } else {
        console.log("User table created successfully");
      }
    }
  );

  // Create artist table
  db.run(
    `
	CREATE TABLE IF NOT EXISTS artists (
	  id INTEGER PRIMARY KEY AUTOINCREMENT,
	  name VARCHAR(255) NOT NULL,
	  dob DATETIME,
	  gender TEXT CHECK (gender IN ('m', 'f', 'o')),
	  address VARCHAR(255),
	  first_release_year YEAR,
	  no_of_albums_released INT,
	  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
	  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
	)
  `,
    (err) => {
      if (err) {
        console.error("Error creating artist table:", err);
      } else {
        console.log("Artist table created successfully");
      }
    }
  );

  // Create song/music table
  db.run(
    `
	CREATE TABLE IF NOT EXISTS songs (
	  id INTEGER PRIMARY KEY AUTOINCREMENT,
	  artist_id INTEGER,
	  title VARCHAR(255) NOT NULL,
	  album_name VARCHAR(255),
	  genre TEXT CHECK (genre IN ('rnb', 'country', 'classic', 'rock', 'jazz')),
	  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
	  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
	  FOREIGN KEY (artist_id) REFERENCES artist(id) ON DELETE CASCADE
	)
  `,
    (err) => {
      if (err) {
        console.error("Error creating song table:", err);
      } else {
        console.log("Song table created successfully");
      }
    }
  );

  console.log("Migrations completed.");
});
