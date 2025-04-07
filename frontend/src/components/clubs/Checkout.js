import React from 'react';

const CheckoutPage = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg flex">
      {/* Left Side - Customer Details */}
      <div className="w-1/2 pr-4">
        {/* Personal Information */}
        <div className="mb-4 p-4 bg-yellow-200 rounded-lg">
          <h2 className="font-bold">Personal Information</h2>
          <div className="flex flex-col">
            <input type="text" placeholder="First Name" className="p-2 mt-2 bg-white" />
            <input type="text" placeholder="Last Name" className="p-2 mt-2 bg-white" />
            <input type="email" placeholder="Email" className="p-2 mt-2 bg-white" />
            <input type="text" placeholder="Mobile" className="p-2 mt-2 bg-white" />
          </div>
        </div>

        {/* Shipping Address */}
        <div className="mb-4 p-4 bg-yellow-200 rounded-lg">
          <h2 className="font-bold">Shipping Address</h2>
          <input type="text" placeholder="Enter your address" className="p-2 mt-2 w-full bg-white" />
        </div>

        {/* Payment Method */}
        <div className="p-4 bg-yellow-200 rounded-lg">
          <h2 className="font-bold">Payment Method</h2>
          <button className="p-2 mt-2 w-full bg-white flex justify-between">
            Add Card <span className="ml-2">💳</span>
          </button>
        </div>
      </div>

      {/* Right Side - Order Summary */}
      <div className="w-1/2 pl-4 border-l-2 border-blue-900">
        <div className="p-4 bg-blue-200 rounded-lg">
          <h2 className="font-bold text-center">Your Order</h2>
        </div>
        <div className="p-4 bg-yellow-200 rounded-lg mt-2">
          <p><strong>Product Name:</strong> Example Product</p>
          <p><strong>Price of Item:</strong> $20.00</p>
          <p><strong>Item Count:</strong> 2</p>
          <p><strong>Total Price:</strong> $40.00</p>
        </div>
        <div className="flex justify-center mt-4">
          <button className="bg-blue-400 p-3 text-white font-bold rounded">Purchase Now</button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;