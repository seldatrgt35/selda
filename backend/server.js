const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./api-routes/users');
const productRoutes = require('./api-routes/products');

const app = express();
const PORT = process.env.PORT || 3000;


app.use(bodyParser.json());


app.use('/api-routes/users', userRoutes);
app.use('/api-routes/products', productRoutes);
app.get('/', (req, res) => {
    res.send('API çalışıyor!');
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
