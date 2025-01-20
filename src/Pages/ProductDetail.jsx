import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../Services/api';

const ProductDetail = ({ addToCart }) => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [cartMessage, setCartMessage] = useState('');

  useEffect(() => {
    const fetchProductDetails = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await api.get(`/api/Products/GetById/${productId}`);
        setProduct(response.data); // Hämta produkten och dess egenskaper
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
    if (!product) {
      alert('Product details not available.');
      return;
    }

    try {
      const response = await api.post('/api/Cart/add-to-cart', {
        productId: product.id,
        quantity,
        size: product.size, // Hämta storleken från produktsvaret
      });

      if (response.status === 200) {
        addToCart({
          id: product.id,
          name: product.name,
          quantity,
          size: product.size, // Lägg till storleken från produkten
          price: product.price,
        });
        setCartMessage(response.data.message || 'Product added to cart!');
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
      <p>Size: {product.size}</p> {/* Visa storleken direkt */}

      <div>
        <label>
          Quantity:
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
            min="1"
          />
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
