const express = require('express');
const router = express.Router();
const db = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secretKey = 'your_secret_key';


router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    db.query('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        if (results.length === 0) {
            return res.status(401).json({ error: 'Kullanıcı bulunamadı' });
        }

        const user = results[0];
        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            return res.status(401).json({ error: 'Geçersiz şifre' });
        }

        const token = jwt.sign({ id: user.id, role: user.role }, secretKey, { expiresIn: '1h' });
        res.json({ token, role: user.role });
    });
});


router.post('/register', async (req, res) => {
    const { username, password, role } = req.body;


    const hashedPassword = await bcrypt.hash(password, 10);

    db.query('INSERT INTO users (username, password, role) VALUES (?, ?, ?)', [username, hashedPassword, role], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id: results.insertId, username, role });
    });
});

module.exports = router;
