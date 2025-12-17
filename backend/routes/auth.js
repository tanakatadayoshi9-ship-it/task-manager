// backend/routes/auth.js
const jwt = require('jsonwebtoken');

const users = [
    { id: 1, username: 'admin', password: 'admin123' }
];

router.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
        const token = jwt.sign({ id: user.id }, 'your-secret-key', { expiresIn: '1h' });
        res.json({ token });
    } else {
        res.status(401).json({ error: 'Invalid credentials' });
    }
});