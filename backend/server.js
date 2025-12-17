const express = require("express");
const cors = require("cors");
const Database = require("better-sqlite3");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// SQLite database
const db = new Database("tasks.db");

// Create table
db.prepare(`
  CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    status TEXT NOT NULL
  )
`).run();

// GET all tasks
app.get("/tasks", (req, res) => {
  const tasks = db.prepare("SELECT * FROM tasks").all();
  res.json(tasks);
});

// ADD task
app.post("/tasks", (req, res) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ error: "Title required" });

  const result = db
    .prepare("INSERT INTO tasks (title, status) VALUES (?, ?)")
    .run(title, "todo");

  const task = db
    .prepare("SELECT * FROM tasks WHERE id = ?")
    .get(result.lastInsertRowid);

  res.json(task);
});

// UPDATE task
app.put("/tasks/:id", (req, res) => {
  const { status } = req.body;
  const { id } = req.params;

  db.prepare("UPDATE tasks SET status = ? WHERE id = ?").run(status, id);
  res.json({ success: true });
});

// DELETE task
app.delete("/tasks/:id", (req, res) => {
  const { id } = req.params;
  db.prepare("DELETE FROM tasks WHERE id = ?").run(id);
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});






