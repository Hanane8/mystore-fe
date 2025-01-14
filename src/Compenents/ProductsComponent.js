import React, { useEffect, useState } from 'react';
import api from '../api'; 

const ProductsComponent = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        api.get('/api/Products/GetAll')
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setError('Error fetching data');
            });
    }, []);

    const addProduct = (product) => {
        api.post('/api/Products/add', product)
            .then(response => {
                console.log(response.data);
                setProducts([...products, response.data]);
            })
            .catch(error => {
                console.error('Error adding product:', error);
                setError('Error adding product');
            });
    };

    const updateProduct = (id, product) => {
        api.put(`/api/Products/Update/${id}`, product)
            .then(response => {
                console.log(response.data);
                setProducts(products.map(p => (p.id === id ? response.data : p)));
            })
            .catch(error => {
                console.error('Error updating product:', error);
                setError('Error updating product');
            });
    };

    const deleteProduct = (id) => {
        api.delete(`/api/Products/Delete/${id}`)
            .then(response => {
                console.log(response.data);
                setProducts(products.filter(p => p.id !== id));
            })
            .catch(error => {
                console.error('Error deleting product:', error);
                setError('Error deleting product');
            });
    };

    return (
        <div>
            {error && <div>{error}</div>}
            <ul>
                {products.map(product => (
                    <li key={product.id}>
                        {product.name}
                        <button onClick={() => deleteProduct(product.id)}>Delete</button>
                    </li>
                ))}
            </ul>
            {/* Add forms and buttons here to add and update products */}
        </div>
    );
};

export default ProductsComponent;