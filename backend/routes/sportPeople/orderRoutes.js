import React, { useState, useEffect } from "react";
import { FaTrash, FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();
  const { user } = useAuthStore();

  const hardcodedUserId = user._id;

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/orders/user/${hardcodedUserId}`);
        if (!response.ok) throw new Error("Failed to fetch cart items");

        const data = await response.json();
        setCartItems(data);
        calculateTotalPrice(data);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchCartItems();
  }, [hardcodedUserId]);

  const calculateTotalPrice = (items) => {
    const total = items.reduce((acc, item) => acc + (item.price || 0) * (item.quantity || 1), 0);
    setTotalPrice(total);
  };

  const handleQuantityChange = async (itemId, newQuantity) => {
    if (newQuantity < 1) return;

    try {
      const response = await fetch(`http://localhost:5000/api/orders/${itemId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity: newQuantity }),
      });

      if (!response.ok) throw new Error("Failed to update quantity");

      const updatedCart = cartItems.map((item) =>
        item._id === itemId ? { ...item, quantity: newQuantity } : item
      );
      setCartItems(updatedCart);
      calculateTotalPrice(updatedCart);
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const handleRemoveItem = async (itemId) => {
    const confirmRemove = window.confirm("Are you sure you want to remove this item?");
    if (!confirmRemove) return;

    try {
      const response = await fetch(`http://localhost:5000/api/orders/${itemId}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete item");

      const updatedCart = cartItems.filter((item) => item._id !== itemId);
      setCartItems(updatedCart);
      calculateTotalPrice(updatedCart);
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  const handleCheckout = () => {
    navigate("/checkout", { state: { cartItems, totalPrice } });
  };

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <h1 className="text-3xl font-bold text-center mb-8">Your Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.productId?.pd_image || "/placeholder.jpg"}
                    alt={item.productId?.pd_name || "Product"}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div>
                    <h3 className="text-lg font-semibold">{item.productId?.pd_name || "Unnamed Product"}</h3>
                    <p className="text-gray-600">Color: {item.selectedColor || "N/A"}</p>
                    <p className="text-gray-600">Size: {item.selectedSize || "N/A"}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    className="w-8 h-8 bg-gray-300 rounded-full"
                    onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
                  >-</button>
                  <span className="text-lg font-semibold">{item.quantity}</span>
                  <button
                    className="w-8 h-8 bg-blue-500 text-white rounded-full"
                    onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
                  >+</button>
                </div>

                <div className="text-lg font-semibold text-gray-700">
                  LKR {(item.price && item.quantity) ? (item.price * item.quantity).toFixed(2) : "0.00"}
                </div>

                <button onClick={() => handleRemoveItem(item._id)} className="text-red-600 hover:text-red-800">
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Cart Summary</h3>
            <div className="flex justify-between mb-4">
              <p className="text-lg">Total:</p>
              <p className="text-lg font-bold text-blue-500">LKR {totalPrice.toFixed(2)}</p>
            </div>
            <button
              className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              onClick={handleCheckout}
            >
              <FaShoppingCart className="inline mr-2" /> Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
