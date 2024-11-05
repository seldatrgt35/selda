const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    const { username, password } = req.body;


    if (username === 'admin' && password === 'admin123') {
        return res.json({ role: 'admin' });
    } else {
        return res.status(401).json({ error: 'Geçersiz kullanıcı adı veya şifre' });
    }
});

module.exports = router;
