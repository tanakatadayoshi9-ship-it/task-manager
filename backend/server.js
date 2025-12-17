const express = require("express");
const cors = require("cors");
const db = require("./database");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

/* =====================
   GET all tasks
===================== */
app.get("/tasks", (req, res) => {
  db.all("SELECT * FROM tasks", [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

/* =====================
   ADD new task
===================== */
app.post("/tasks", (req, res) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ error: "Title is required" });
  }

  const sql = "INSERT INTO tasks (title, status) VALUES (?, ?)";
  db.run(sql, [title, "todo"], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.json({
      id: this.lastID,
      title,
      status: "todo",
    });
  });
});

/* =====================
   UPDATE task status
===================== */
app.put("/tasks/:id", (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const sql = "UPDATE tasks SET status = ? WHERE id = ?";
  db.run(sql, [status, id], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.json({ id, status });
  });
});

/* =====================
   DELETE task
===================== */
app.delete("/tasks/:id", (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM tasks WHERE id = ?";
  db.run(sql, [id], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.json({ success: true });
  });
});

/* =====================
   START SERVER
===================== */
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});





