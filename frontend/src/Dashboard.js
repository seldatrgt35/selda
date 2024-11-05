import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState({ name: '', description: '', price: '' });
    const [updateProduct, setUpdateProduct] = useState(null);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api-routes/products');
            setProducts(response.data);
        } catch (error) {
            console.error('Ürünler alınırken bir hata oluştu:', error);
        }
    };

    const handleAddProduct = async () => {
        try {

            await axios.post('http://localhost:3000/api-routes/products', newProduct);
            fetchProducts();
            setNewProduct({ name: '', description: '', price: '' });
        } catch (error) {
            console.error('Ürün eklenirken bir hata oluştu:', error);
        }
    };
    const handleUpdateProduct = async () => {
        try {

            await axios.put(`http://localhost:3000/api-routes/products/${updateProduct.id}`, updateProduct);
            fetchProducts();
            setUpdateProduct(null);
        } catch (error) {
            console.error('Ürün güncellenirken bir hata oluştu:', error);
        }
    };

    const handleDeleteProduct = async (id) => {
        try {

            await axios.delete(`http://localhost:3000/api-routes/products/${id}`);
            fetchProducts();
        } catch (error) {
            console.error('Ürün silinirken bir hata oluştu:', error);
        }
    };

    return (
        <div>
            <h2>Dashboard</h2>
            <h3>Ürün Ekle</h3>
            <input
                type="text"
                placeholder="Ürün Adı"
                value={newProduct.name}
                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            />
            <input
                type="text"
                placeholder="Açıklama"
                value={newProduct.description}
                onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
            />
            <input
                type="number"
                placeholder="Fiyat"
                value={newProduct.price}
                onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
            />
            <button onClick={handleAddProduct}>Ürün Ekle</button>

            {updateProduct && (
                <div>
                    <h3>Ürün Güncelle</h3>
                    <input
                        type="text"
                        placeholder="Ürün Adı"
                        value={updateProduct.name}
                        onChange={(e) => setUpdateProduct({ ...updateProduct, name: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Açıklama"
                        value={updateProduct.description}
                        onChange={(e) => setUpdateProduct({ ...updateProduct, description: e.target.value })}
                    />
                    <input
                        type="number"
                        placeholder="Fiyat"
                        value={updateProduct.price}
                        onChange={(e) => setUpdateProduct({ ...updateProduct, price: e.target.value })}
                    />
                    <button onClick={handleUpdateProduct}>Güncelle</button>
                </div>
            )}

            <h3>Ürün Listesi</h3>
            <ul>
                {products.map((product) => (
                    <li key={product.id}>
                        {product.name} - {product.description} - {product.price} TL
                        <button onClick={() => setUpdateProduct(product)}>Düzenle</button>
                        <button onClick={() => handleDeleteProduct(product.id)}>Sil</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Dashboard;
