import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Package, Truck, Calendar, CreditCard, CheckCircle, 
  MapPin, Phone, User, ArrowLeft, Printer, Share2, Download
} from 'lucide-react';

const OrderSummary = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { order } = location.state || {};

  if (!order) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-4xl shadow-soft p-8 text-center max-w-md">
          <Package className="w-16 h-16 text-secondary-400 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-secondary-900 mb-4">Order Not Found</h2>
          <p className="text-secondary-600 mb-6">We couldn't find the order details you're looking for.</p>
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  const formatDate = (date) => {
    return new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatPrice = (price) => {
    return Number(price).toFixed(2);
  };

  const estimatedDelivery = new Date();
  estimatedDelivery.setDate(estimatedDelivery.getDate() + 3);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 py-12 px-4 sm:px-6 lg:px-8 animate-fade-in">
      <div className="max-w-4xl mx-auto">
        {/* Order Status Banner */}
        <div className="bg-green-500 text-white p-6 rounded-4xl shadow-soft mb-8 flex items-center gap-4">
          <div className="p-3 bg-white/20 rounded-xl">
            <CheckCircle className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-bold mb-1">Order Confirmed!</h1>
            <p className="text-green-100">Thank you for your purchase. Your order has been received.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Order Information */}
            <div className="bg-white rounded-4xl shadow-soft p-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-secondary-900 mb-2">Order Information</h2>
                  <p className="text-secondary-600">Order placed on {formatDate(new Date())}</p>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 text-secondary-600 hover:bg-secondary-50 rounded-xl transition-colors">
                    <Printer className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-secondary-600 hover:bg-secondary-50 rounded-xl transition-colors">
                    <Download className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-secondary-600 hover:bg-secondary-50 rounded-xl transition-colors">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="p-4 bg-secondary-50 rounded-xl">
                  <div className="flex items-center gap-3 text-secondary-600 mb-2">
                    <Calendar className="w-5 h-5" />
                    <span className="font-medium">Estimated Delivery</span>
                  </div>
                  <p className="text-secondary-900 font-semibold ml-8">
                    {formatDate(estimatedDelivery)}
                  </p>
                </div>
                <div className="p-4 bg-secondary-50 rounded-xl">
                  <div className="flex items-center gap-3 text-secondary-600 mb-2">
                    <CreditCard className="w-5 h-5" />
                    <span className="font-medium">Payment Method</span>
                  </div>
                  <p className="text-secondary-900 font-semibold ml-8">
                    Credit Card
                  </p>
                </div>
              </div>

              {/* Order Items */}
              <div className="space-y-4">
                {order.cartItems.map((item) => (
                  <div 
                    key={item.productId}
                    className="flex items-center gap-4 p-4 bg-secondary-50 rounded-xl"
                  >
                    <div className="w-20 h-20 bg-white rounded-lg overflow-hidden">
                      <img
                        src={item.imageUrl}
                        alt={item.productName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-secondary-900">{item.productName}</h3>
                      <div className="flex flex-wrap gap-4 text-sm text-secondary-600 mt-1">
                        <span>Size: {item.size}</span>
                        <span>Quantity: {item.quantity}</span>
                        <span>Price: {formatPrice(item.price)} kr</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-secondary-900">
                        {formatPrice(item.price * item.quantity)} kr
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Shipping Progress */}
            <div className="bg-white rounded-4xl shadow-soft p-8">
              <h2 className="text-xl font-semibold text-secondary-900 mb-6">Shipping Status</h2>
              <div className="relative">
                <div className="absolute left-8 top-0 bottom-0 w-px bg-primary-100"></div>
                <div className="space-y-8">
                  <div className="relative flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center z-10">
                      <Package className="w-8 h-8 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-secondary-900">Order Confirmed</h3>
                      <p className="text-sm text-secondary-600">Your order has been received</p>
                    </div>
                    <div className="ml-auto text-sm text-secondary-600">
                      {formatDate(new Date())}
                    </div>
                  </div>
                  <div className="relative flex items-center gap-4 opacity-50">
                    <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center z-10">
                      <Truck className="w-8 h-8 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-secondary-900">In Transit</h3>
                      <p className="text-sm text-secondary-600">Your order is on its way</p>
                    </div>
                    <div className="ml-auto text-sm text-secondary-600">
                      Pending
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-8">
            {/* Customer Information */}
            <div className="bg-white rounded-4xl shadow-soft p-6">
              <h2 className="text-xl font-semibold text-secondary-900 mb-6">Customer Details</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-secondary-400" />
                  <div>
                    <p className="text-sm text-secondary-600">Name</p>
                    <p className="font-medium text-secondary-900">{order.fullName}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-secondary-400" />
                  <div>
                    <p className="text-sm text-secondary-600">Delivery Address</p>
                    <p className="font-medium text-secondary-900">{order.address}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-secondary-400" />
                  <div>
                    <p className="text-sm text-secondary-600">Phone</p>
                    <p className="font-medium text-secondary-900">{order.mobile}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-white rounded-4xl shadow-soft p-6">
              <h2 className="text-xl font-semibold text-secondary-900 mb-6">Order Summary</h2>
              <div className="space-y-4">
                <div className="flex justify-between text-secondary-600">
                  <span>Subtotal</span>
                  <span>{formatPrice(order.total)} kr</span>
                </div>
                <div className="flex justify-between text-secondary-600">
                  <span>Shipping</span>
                  <span className="text-green-600">Free</span>
                </div>
                <div className="h-px bg-secondary-100"></div>
                <div className="flex justify-between text-lg font-semibold text-secondary-900">
                  <span>Total</span>
                  <span>{formatPrice(order.total)} kr</span>
                </div>
              </div>
            </div>

            {/* Need Help? */}
            <div className="bg-secondary-50 rounded-4xl p-6">
              <h3 className="font-medium text-secondary-900 mb-2">Need Help?</h3>
              <p className="text-sm text-secondary-600 mb-4">
                If you have any questions about your order, please contact our support team.
              </p>
              <button className="w-full py-2 px-4 bg-white text-primary-600 rounded-xl hover:bg-primary-50 transition-colors">
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;