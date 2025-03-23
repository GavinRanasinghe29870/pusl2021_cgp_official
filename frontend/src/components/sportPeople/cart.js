import React, { useState } from "react";
import { FaTrash } from "react-icons/fa";

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Badminton Racket",
      image: "Badminton.jpg",
      size: "M",
      color: "Grey",
      price: 20.0,
      quantity: 2,
    },
    {
      id: 2,
      name: "Basket Ball",
      image: "basketball.jpeg",
      size: "L",
      color: "Red",
      price: 25.0,
      quantity: 1,
    },
    {
      id: 3,
      name: "Cricket Ball and Bat",
      image: "Cricket.png",
      size: "L",
      color: "Black",
      price: 30.0,
      quantity: 3,
    },
  ]);

  const increaseQuantity = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const getTotalPrice = () =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-blue-50 min-h-screen">
      <h2 className="text-3xl text-center font-semibold mb-6 text-blue-900">Shopping Cart</h2>
      <div className="bg-white p-6 shadow-md rounded-lg">
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between border-b pb-4 mb-4"
            >
              <img
                src={item.image || "default.jpg"} // Fallback image
                alt={item.name}
                className="w-16 h-16 object-cover rounded-lg"
              />
              <div className="flex-1 ml-4">
                <h3 className="font-semibold text-blue-900">{item.name}</h3>
                <p className="text-gray-500">
                  Size: {item.size} | Color:{" "}
                  <span className="font-semibold text-blue-900">{item.color}</span>
                </p>
                <p className="text-gray-700">Price per Item: Rs.{item.price.toFixed(2)}</p>
              </div>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => decreaseQuantity(item.id)}
                  className="text-red-500 font-bold text-lg px-2 hover:text-red-600"
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <span className="text-lg font-semibold text-gray-700">{item.quantity}</span>
                <button
                  onClick={() => increaseQuantity(item.id)}
                  className="text-green-500 font-bold text-lg px-2 hover:text-green-600"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
              <p className="font-bold text-lg text-blue-900">
                Rs.{(item.price * item.quantity).toFixed(2)}
              </p>
              <button
                onClick={() => removeItem(item.id)}
                className="text-red-500 text-xl hover:text-red-600"
                aria-label="Remove item"
              >
                <FaTrash />
              </button>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">Your cart is empty. Add some items to proceed!</p>
        )}

        <div className="mt-6 flex justify-between font-semibold text-lg">
          <span className="text-blue-900">Total:</span>
          <span className="text-blue-900 font-bold">Rs.{getTotalPrice()}</span>
        </div>

        <button className="w-full mt-4 py-3 bg-blue-900 text-white font-semibold rounded-md hover:bg-blue-600">
          Proceed to Pay
        </button>
      </div>
    </div>
  );
};

export default Cart;
