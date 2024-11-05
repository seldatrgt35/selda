const express = require('express');
const router = express.Router();
const db = require('./db');

router.get('/products', (req, res) => {
    const query = 'SELECT * FROM products';

    db.query(query, (error, results) => {
        if (error) {
            return res.status(500).json({ message: 'Ürünler alınırken bir hata oluştu', error });
        }
        res.json(results);
    });
});

module.exports = router;
