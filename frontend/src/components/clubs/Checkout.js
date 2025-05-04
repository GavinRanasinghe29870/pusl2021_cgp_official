import React from 'react';
import { useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';

const CheckoutPage = () => {
  const location = useLocation();
  const { cartItems = [], totalPrice = 0 } = location.state || {};
  const { user } = useAuthStore();


  

  const handlePurchase = async () => {
    if (!user?.address) {
      alert("Please enter your address before proceeding.");
      return;
    }
  
    try {
      const response = await fetch('http://localhost:5000/api/checkout/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cartItems, user }),
      });
  
      const data = await response.json();
  
      if (data.url) {
        await fetch(`http://localhost:5000/api/orders/user/${user._id}`, {
          method: 'DELETE',
        });
  
        window.location.href = data.url;
      } else {
        alert('Checkout session creation failed.');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Failed to initiate checkout.');
    }
  };
  
  

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg flex">
      {/* Left Side - Customer Details */}
      <div className="w-1/2 pr-4">
        <div className="mb-4 p-4 bg-yellow-200 rounded-lg">
          <h2 className="font-bold">Personal Information</h2>
          <div className="flex flex-col">
            <input type="text" placeholder="First Name" value={user?.firstName || ""} readOnly className="p-2 mt-2 bg-white" />
            <input type="text" placeholder="Username" value={user?.username || ""} readOnly className="p-2 mt-2 bg-white" />
            <input type="email" placeholder="Email" value={user?.email || ""} readOnly className="p-2 mt-2 bg-white" />
            <input type="text" placeholder="Mobile" value={user?.mobile || ""} readOnly className="p-2 mt-2 bg-white" />
          </div>
        </div>

        <div className="mb-4 p-4 bg-yellow-200 rounded-lg">
          <h2 className="font-bold">Shipping Address</h2>
          <input
            type="text"
            value={user?.address || ""}
            placeholder="Enter your address"
            className="p-2 mt-2 w-full bg-white"
          />
        </div>

       
      </div>

      {/* Right Side - Order Summary */}
      <div className="w-1/2 pl-4 border-l-2 border-blue-900">
        <div className="p-4 bg-blue-200 rounded-lg">
          <h2 className="font-bold text-center">Your Order</h2>
        </div>

        <div className="p-4 bg-yellow-200 rounded-lg mt-2 space-y-2">
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div key={item._id} className="border-b pb-2">
                <p><strong>Product:</strong> {item.productId?.pd_name || "Unnamed"}</p>
                <p><strong>Price:</strong> LKR {item.price?.toFixed(2) || "0.00"}</p>
                <p><strong>Quantity:</strong> {item.quantity}</p>
                <p><strong>Subtotal:</strong> LKR {(item.price * item.quantity)?.toFixed(2) || "0.00"}</p>
              </div>
            ))
          ) : (
            <p>No items in cart.</p>
          )}

          <div className="mt-4 font-bold text-lg">
            Total Price: LKR {totalPrice?.toFixed(2) || "0.00"}
          </div>
        </div>

        <div className="flex justify-center mt-4">
          <button className="bg-blue-400 p-3 text-white font-bold rounded" onClick={handlePurchase}>
            Purchase Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;