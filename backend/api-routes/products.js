const express = require('express');
const router = express.Router();
const db = require('../db');
const authMiddleware = require('../middleware/authMiddleware');

// Ürünleri listeleme
router.get('/', (req, res) => {
    db.query('SELECT * FROM products', (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// Ürün ekleme
router.post('/', authMiddleware, (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Yetkisiz erişim' });
    }
    const { name, description, price } = req.body;

    // Eklemeden önce gelen verilerin doğruluğunu kontrol et
    if (!name || !description || price === undefined) {
        return res.status(400).json({ error: 'Tüm alanları doldurun' });
    }

    db.query('INSERT INTO products (name, description, price) VALUES (?, ?, ?)', [name, description, price], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id: results.insertId, name, description, price });
    });
});

// Ürün silme
router.delete('/:id', authMiddleware, (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Yetkisiz erişim' });
    }
    db.query('DELETE FROM products WHERE id = ?', [req.params.id], (err) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: `Ürün ${req.params.id} ID ile silindi` });
    });
});

// Ürün güncelleme
router.put('/:id', authMiddleware, (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Yetkisiz erişim' });
    }
    const { name, description, price } = req.body;


    if (!name || !description || price === undefined) {
        return res.status(400).json({ error: 'Tüm alanları doldurun' });
    }

    db.query('UPDATE products SET name = ?, description = ?, price = ? WHERE id = ?', [name, description, price, req.params.id], (err) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: `Ürün ${req.params.id} ID ile güncellendi` });
    });

});

module.exports = router;
