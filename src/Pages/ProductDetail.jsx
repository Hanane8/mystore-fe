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
        if (!product) {
            alert('Product details not available.');
            return;
        }

        try {
            const totalPrice = (product.price * quantity).toFixed(2); // Räkna totalpriset

            const payload = {
                productId: product.id,
                quantity,
                size: product.size,
                imageUrl: product.imageUrl,
                totalPrice, // Lägg till totalpriset i payload
            };

            // Hämta `userId` från localStorage
            const userId = localStorage.getItem('userId');

            if (!userId) {
                console.error('UserId not found in localStorage');
                alert('User not authenticated. Please log in again.');
                return;
            }

            payload.userId = userId; // Lägg till `userId` i payload
            console.log('Payload sent to API:', payload); // Logga payload

            // Skicka API-anropet
            const response = await api.post('/api/Cart/add-to-cart', payload);

            if (response.status === 200) {
                addToCart({
                    id: product.id,
                    name: product.name,
                    quantity,
                    size: product.size,
                    imageUrl: product.imageUrl,
                    price: product.price,
                    totalPrice, 
                });
                setCartMessage(response.data.message || 'Product added to cart!');
            }
        } catch (err) {
            console.error('Error adding product to cart:', err.response?.data || err.message);
            setCartMessage('Failed to add product to cart.');
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (!product) return <div>No product found</div>;

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="md:flex">
                    {/* Image Section */}
                    <div className="md:flex-shrink-0 md:w-1/2">
                        <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="h-full w-full object-cover md:h-[500px]"
                        />
                    </div>

                    {/* Content Section */}
                    <div className="p-8 md:w-1/2">
                        <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>

                        <p className="text-gray-600 mb-6 leading-relaxed">
                            {product.description}
                        </p>

                        <div className="space-y-4 mb-8">
                            <div className="flex items-center justify-between border-b border-gray-200 pb-2">
                                <span className="text-gray-600">Price</span>
                                <span className="text-2xl font-semibold text-gray-900">${product.price}</span>
                            </div>

                            <div className="flex items-center justify-between border-b border-gray-200 pb-2">
                                <span className="text-gray-600">Size</span>
                                <span className="font-medium text-gray-900">{product.size}</span>
                            </div>

                            <div className="pt-4">
                                <label className="block text-gray-600 mb-2">
                                    Quantity
                                </label>
                                <input
                                    type="number"
                                    value={quantity}
                                    onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
                                    min="1"
                                    className="w-20 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                            <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                                <span className="text-gray-600">Total Price</span>
                                <span className="text-2xl font-semibold text-gray-900">${(product.price * quantity).toFixed(2)}</span>
                            </div>
                        </div>

                        <button
                            onClick={handleAddToCart}
                            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
                        >
                            Add to Cart
                        </button>

                        {cartMessage && (
                            <div className="mt-4 p-4 bg-green-50 text-green-700 rounded-md text-center">
                                {cartMessage}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
