import React, { useState, useEffect } from "react";
import api from "../Services/api";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const response = await api.get(`/api/Order/user/${userId}`);
        setOrders(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <p className="text-center">Loading...</p>;

  const getOrderStatus = (status) => {
    switch (status) {
      case "Pending":
        return "Pending";
      case "Processing":
        return "Processing";
      case "Shipped":
        return "Shipped";
      case "Delivered":
        return "Delivered";
      default:
        return "Unknown";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Orders</h1>

        {orders.length === 0 ? (
          <p className="text-gray-600 text-lg text-center">You have no orders yet.</p>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="bg-white rounded-lg shadow p-6 border border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Order ID: {order.id}</h2>
                <p className="text-gray-600">Date: {new Date(order.orderDate).toLocaleDateString()}</p>
                <p className="text-gray-600">Total: ${order.totalAmount.toFixed(2)}</p>
                <p className="text-gray-600">Status: {getOrderStatus(order.status)}</p>
                <h3 className="text-md font-semibold mt-4">Items:</h3>
                <ul className="text-gray-600 space-y-2">
                  {order.items && order.items.length > 0 ? (
                    order.items.map((item) => (
                      <li key={item.id} className="flex items-center space-x-4">
                        <img
                          src={item.imageUrl} 
                          alt={item.productName} 
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div>
                          <p className="font-semibold">{item.productName}</p>
                          <p>Size: {item.size}</p>
                          <p>Price: ${item.price.toFixed(2)}</p>
                        </div>
                      </li>
                    ))
                  ) : (
                    <li>No items available</li>
                  )}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
