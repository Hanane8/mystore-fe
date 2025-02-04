import api from './api';

// Lägg till i kundvagnen
export const addToCart = async (cartItem) => {
    try {
        const response = await api.post('/api/Cart/add-to-cart', cartItem);
        return response.data;
    } catch (error) {
        console.error('Error adding to cart:', error);
        throw error.response?.data || 'Failed to add to cart';
    }
};

export const updateCart = async (cartItem) => {
    try {
        console.log("🔄 Sending to API (updateCart):", JSON.stringify(cartItem, null, 2)); // 🛠 Logga payload
        const response = await api.post('/api/Cart/update-cart', cartItem);
        return response.data;
    } catch (error) {
        console.error("❌ Error updating cart:", error);
        throw error.response?.data || "Failed to update cart";
    }
};


export const getCart = async (userId) => {
    try {
        const response = await api.get(`/api/Cart/user/${userId}`);
        console.log("Cart API response:", response.data); // 🛠 Logga hela svaret
       
        if (response.data.isSuccessfull) { // Kontrollera om operationen lyckades
            return response.data.data; // Returnera endast `data`
        } else {
            throw new Error(response.data.message || "Failed to fetch cart");
        }
    } catch (error) {
        console.error('Error fetching cart:', error);
        throw error.response?.data || 'Failed to fetch cart';
    }
};


// Ta bort en kundvagnsartikel från kundvagnen
export const removeCartItem = async (cartItemId) => {
    try {
        const response = await api.delete(`/api/Cart/remove-cart-item/${cartItemId}`);
        return response.data;
    } catch (error) {
        console.error('Error removing cart item:', error);
        throw error.response?.data || 'Failed to remove cart item';
    }
};

