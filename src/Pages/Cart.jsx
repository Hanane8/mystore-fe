import React from 'react';

const Cart = ({ cartItems }) => {
  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
      <div className="grid grid-cols-1 gap-4">
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          cartItems.map(item => (
            <div key={item.id} className="flex justify-between items-center border p-4 rounded">
              <div>
                <h2 className="text-xl font-semibold">{item.name}</h2>
                <p>Size: {item.size}</p>
                <p>Quantity: {item.quantity}</p>
              </div>
              <div className="text-lg font-bold">${item.price * item.quantity}</div>
            </div>
          ))
        )}
      </div>
      {cartItems.length > 0 && (
        <div className="mt-8 text-right">
          <h2 className="text-2xl font-bold">Total: ${total}</h2>
          <button className="mt-2 bg-blue-500 text-white py-2 px-4 rounded">Checkout</button>
        </div>
      )}
    </div>
  );
};

export default Cart;