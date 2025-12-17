const express = require('express');
const router = express.Router();
const db = require('../database');

// دریافت تمام پروژه‌ها
router.get('/', (req, res) => {
    db.all('SELECT * FROM projects', [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

// اضافه کردن پروژه جدید
router.post('/', (req, res) => {
    const { name, description } = req.body;
    db.run(
        'INSERT INTO projects (name, description) VALUES (?, ?)',
        [name, description],
        function(err) {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            res.json({ 
                id: this.lastID,
                message: 'Project created successfully'
            });
        }
    );
});

module.exports = router;