const jwt = require('jsonwebtoken');

function checkAdmin(req, res, next) {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).json({ error: 'Token gereklidir' });
    }

    jwt.verify(token, 'secret_key', (err, decoded) => {
        if (err) {
            return res.status(403).json({ error: 'Geçersiz token' });
        }

        // Eğer kullanıcı adminse, bir sonraki middleware'e geç
        if (decoded.role !== 'admin') {
            return res.status(403).json({ error: 'Yetersiz yetki' });
        }

        next();
    });
}

module.exports = checkAdmin;
