import React, { useState } from 'react';
import axios from 'axios';

const AddProduct = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api-routes/products', {
                name,
                description,
                price,
            });
            alert('Ürün başarıyla eklendi!');
        } catch (error) {
            console.error('Ürün eklenirken hata:', error);
            alert('Bir hata oluştu, lütfen tekrar deneyin.');
        }
    };

    return (
        <div>
            <h2>Ürün Ekle</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Ürün Adı:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Tanım:</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Fiyat:</label>
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Ekle</button>
            </form>
        </div>
    );
};

export default AddProduct;
