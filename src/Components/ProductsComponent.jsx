import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../Services/api';

const ProductsComponent = ({ categoryId, clothingTypeId }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        let response;
        if (clothingTypeId) {          
          response = await api.get(`/api/Products/by-clothing-type/${clothingTypeId}`);
        } else if (categoryId) {
          response = await api.get(`/api/Products/category/${categoryId}`);
        }
        setProducts(response?.data || []);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to fetch products.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryId, clothingTypeId]);

  const handleProductClick = (productId) => {
    navigate(`/products/${productId}`);
  };

  
  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center p-4">{error}</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((product) => (
        <div key={product.id} onClick={() => handleProductClick(product.id)} className="bg-white p-4 rounded shadow">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-[400px] object-cover transition-transform duration-300 group-hover:scale-105"
                
          />
          <h3 className="text-lg font-semibold">{product.name}</h3>
          <p className="text-gray6700 font-bold">${product.price}</p>
          
        </div>
      ))}
    </div>
  );
};

export default ProductsComponent;