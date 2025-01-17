import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../Services/api';

const ProductDetail = ({ addToCart }) => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState('');
  const [cartMessage, setCartMessage] = useState('');

  useEffect(() => {
    const fetchProductDetails = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await api.get(`/api/Products/GetById/${productId}`);
        setProduct(response.data);
      } catch (err) {
        console.error('Error fetching product details:', err);
        setError('Failed to fetch product details.');
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [productId]);

  const handleAddToCart = async () => {
    try {
      const response = await api.post('/api/Cart/add-to-cart', {
        productId: product.id,
        quantity: quantity,
        size: size
      });
      if (response.status === 200) {
        addToCart({ id: product.id, name: product.name, quantity, size, price: product.price });
        setCartMessage(response.data.message);
      }
    } catch (err) {
      console.error('Error adding product to cart:', err);
      setCartMessage('Failed to add product to cart.');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!product) return <div>No product found</div>;

  return (
    <div>
      <h1>{product.name}</h1>
      <img src={product.imageUrl} alt={product.name} />
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      
      <div>
        <label>
          Quantity:
          <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} min="1" />
        </label>
      </div>
      
      <div>
        <label>
          Size:
          <input type="text" value={size} onChange={(e) => setSize(e.target.value)} />
        </label>
      </div>
      
      <button onClick={handleAddToCart} className="mt-2 bg-blue-500 text-white py-1 px-4 rounded">
        Add to Cart
      </button>

      {cartMessage && <div>{cartMessage}</div>}
    </div>
  );
};

export default ProductDetail;