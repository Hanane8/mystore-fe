import React, { useEffect, useState } from 'react';
import api from '../Services/api';

const ProductsComponent = ({ category }) => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (category) {
      fetchProductsByCategory(category);
    } else {
      fetchAllProducts();
    }
  }, [category]);

  const fetchAllProducts = async () => {
    setLoading(true);
    try {
      const response = await api.get('/api/Products/GetAll');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching all products:', error);
      setError('Error fetching all products.');
    } finally {
      setLoading(false);
    }
  };

  const fetchProductsByCategory = async (categoryName) => {
    setLoading(true);
    try {
      const response = await api.get(
        `/api/Products/by-category-name?categoryName=${categoryName}`
      );
      setProducts(response.data.data || []);
    } catch (error) {
      console.error(`Error fetching products for category ${categoryName}:`, error);
      setError('Error fetching products by category.');
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await api.delete(`/api/Products/Delete/${id}`);
      setProducts((prevProducts) => prevProducts.filter((p) => p.id !== id));
    } catch (error) {
      console.error('Error deleting product:', error);
      setError('Error deleting product.');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">
        {category ? `${category} Products` : 'All Products'}
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <div key={product.id} className="bg-white p-4 rounded shadow">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="h-32 w-full object-cover mb-2"
            />
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p className="text-gray-500">{product.description}</p>
            <p className="text-gray-700 font-bold">${product.price}</p>
            <button
              className="text-red-500"
              onClick={() => deleteProduct(product.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export const getProductsByCategoryName = async (categoryName) => {
    try {
      const response = await api.get(`/api/Products/by-category-name?categoryName=${categoryName}`);
      return response.data.data || [];
    } catch (error) {
      console.error(`Error fetching products for category ${categoryName}:`, error);
      throw new Error('Error fetching products by category.');
    }
  };

export default ProductsComponent;
