import React, { useState } from "react";
import validator from "validator";
import axios from "axios";

const CheckoutPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [payment, setPayment] = useState({
    cardNumber: "",
    expiry: "",
    cvv: "",
    cardholder: "",
  });

  // Example cart items
  const [cartItems, setCartItems] = useState([
    { name: "Example Product A", price: 20.0, quantity: 2 },
    { name: "Example Product B", price: 15.0, quantity: 1 },
    { name: "Example Product C", price: 10.0, quantity: 3 },
  ]);

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  const handlePurchase = async () => {
    validator.isCreditCard(payment.cardNumber)
      ? console.log("Valid Card Number")
      : alert("Invalid Card Number");

    const totalPrice = calculateTotal();

    const payload = {
      firstName,
      lastName,
      email,
      mobile,
      address,
      payment,
      cartItems,
      totalPrice,
    };

    console.log("Payload:", payload); // Debugging payload

    try {
      const response = await axios.post("http://localhost:5000/api/checkout", payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Order placed successfully:", response.data);
      alert("Order placed successfully!");
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order. Please try again.");
    }
  };

  return (
    <div className="max-w-6xl mx-auto bg-blue-100 p-6 rounded-lg shadow-md">
      <h1 className="text-xl font-bold bg-yellow-300 p-2 mb-4">Checkout</h1>

      {/* Layout Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Side: Checkout and Payment Details */}
        <div>
          {/* User Details */}
          <div className="bg-white p-4 rounded shadow">
            <h2 className="font-bold mb-4">Checkout Details</h2>
            <input
              type="text"
              placeholder="First Name"
              className="w-full p-2 bg-yellow-200 mb-2"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Last Name"
              className="w-full p-2 bg-yellow-200 mb-2"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full p-2 bg-yellow-200 mb-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="text"
              placeholder="Mobile"
              className="w-full p-2 bg-yellow-200 mb-2"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />
            <textarea
              placeholder="Address"
              className="w-full p-2 bg-yellow-200 mb-2"
              rows="4"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            ></textarea>
          </div>

          {/* Payment Details */}
          <div className="bg-white p-4 rounded shadow mt-6">
            <h2 className="font-bold mb-4">Payment Details</h2>

            {/* Card Number */}
            <input
              type="text"
              placeholder="Card Number"
              className="w-full p-2 bg-yellow-200 mb-2"
              value={payment.cardNumber}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
                const formattedValue = value
                  .replace(/(\d{4})(?=\d)/g, "$1 ") // Add a space after every 4 digits
                  .trim();
                setPayment({ ...payment, cardNumber: formattedValue });
              }}
              maxLength={19} // Maximum length for card number with spaces
            />

            {/* Expiry (MM/YY) */}
            <input
              type="text"
              placeholder="Expiry (MM/YY)"
              className="w-full p-2 bg-yellow-200 mb-2"
              value={payment.expiry}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
                const formattedValue = value
                  .replace(/^(\d{2})(\d{1,2})?$/, (_, mm, yy) => (yy ? `${mm}/${yy}` : mm)) // Format as MM/YY
                  .slice(0, 5); // Limit to 5 characters (MM/YY)
                setPayment({ ...payment, expiry: formattedValue });
              }}
              maxLength={5} // Maximum length for MM/YY format
            />

            {/* CVV */}
            <input
              type="text"
              placeholder="CVV"
              className="w-full p-2 bg-yellow-200 mb-2"
              value={payment.cvv}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
                setPayment({ ...payment, cvv: value.slice(0, 3) }); // Limit to 3 numeric characters
              }}
              maxLength={3} // Maximum length for CVV
            />

            {/* Cardholder Name */}
            <input
              type="text"
              placeholder="Cardholder Name"
              className="w-full p-2 bg-yellow-200 mb-2"
              value={payment.cardholder}
              onChange={(e) => setPayment({ ...payment, cardholder: e.target.value })}
            />
          </div>
        </div>

        {/* Right Side: Cart Items */}
        <div>
          <div className="bg-white p-4 rounded shadow">
            <h2 className="font-bold mb-4">Cart Items</h2>
            {cartItems.map((item, index) => (
              <div key={index} className="flex justify-between bg-gray-100 p-2 mb-2 rounded">
                <span>{item.name}</span>
                <span>
                  {item.quantity} x ${item.price.toFixed(2)}
                </span>
              </div>
            ))}
            <div className="pt-4 font-bold text-lg">
              Total Price: ${calculateTotal()}
            </div>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-center mt-6">
        <button
          className="bg-blue-400 p-3 text-white font-bold rounded"
          onClick={handlePurchase}
        >
          Purchase Now
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;
