import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const OrderSummary = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const order = location.state?.order; 

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-700">No Order Found</h1>
          <button
            onClick={() => navigate("/")}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Order Summary</h1>

        {/* Orderdetaljer */}
        <div className="space-y-6">
          {order.cartItems.map((item) => (
            <div key={item.productId} className="flex justify-between items-center border-b pb-3">
              <div className="flex items-center">
                <img src={item.imageUrl} alt={item.productName} className="w-16 h-16 rounded-lg object-cover" />
                <div className="ml-4">
                  <h2 className="text-lg font-semibold text-gray-900">{item.productName}</h2>
                  <p className="text-gray-500">Size: {item.size}</p>
                  <p className="text-gray-500">Quantity: {item.quantity}</p>
                </div>
              </div>
              <p className="text-lg font-medium text-gray-900">
                ${Number(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          ))}
        </div>

        {/* Totalbelopp */}
        <div className="mt-8 border-t pt-4">
          <h2 className="text-xl font-semibold text-gray-900">
            Total: ${Number(order.total || 0).toFixed(2)}
          </h2>
        </div>

        {/* Leveransinformation */}
        <div className="mt-6 bg-gray-100 p-4 rounded-lg">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Shipping Information</h2>
          <p className="text-gray-700"><strong>Name:</strong> {order.fullName}</p>
          <p className="text-gray-700"><strong>Address:</strong> {order.address}</p>
          <p className="text-gray-700"><strong>Mobile:</strong> {order.mobile}</p>
        </div>

        <button
          onClick={() => navigate("/")}
          className="mt-6 w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition duration-200 font-medium"
        >
          Shopping
        </button>
      </div>
    </div>
  );
};

export default OrderSummary;
