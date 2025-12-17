const sqlite3 = require("sqlite3").verbose();
const path = require("path");

// Create database file
const dbPath = path.join(__dirname, "tasks.db");

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Database error:", err.message);
  } else {
    console.log("Connected to SQLite database");
  }
});

// Create table if not exists
db.run(`
  CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    status TEXT NOT NULL
  )
`);

module.exports = db;
