import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaBolt } from "react-icons/fa";
import { motion } from "framer-motion";

export default function SingleProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [mainImage, setMainImage] = useState("");
  const [orderStatus, setOrderStatus] = useState({ message: "", type: "" });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (!id) {
          console.error("Product ID is missing!");
          return;
        }

        const response = await fetch(`http://localhost:5000/api/products/id/${id}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch product: ${response.status}`);
        }

        const data = await response.json();
        console.log("Fetched product:", data);
        setProduct(data);

        if (data.pd_colors && data.pd_colors.length > 0) {
          setSelectedColor(data.pd_colors[0]);
        }

        if (data.pd_size && data.pd_size.length > 0) {
          setSelectedSize(data.pd_size[0]);
        }

        if (data.pd_image) {
          setMainImage(`/uploads/${data.pd_image}`);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  const createOrder = async (navigateTo) => {
    // For testing, hardcode a userId if needed
    // Change this based on your actual authentication implementation
    const userId = localStorage.getItem("userId") || "64a55a910c5a04d61c0b6e48"; // Temporarily hardcoded for testing
    
    if (!product || !product.pd_price) {
      setOrderStatus({
        message: "Product information is missing",
        type: "error"
      });
      return;
    }
    
    console.log("Order Details:", {
      userId,
      productId: id,
      quantity,
      selectedColor,
      selectedSize,
      price: product.pd_price
    });
    
    if (!userId) {
      // If user is not logged in, redirect to login page
      setOrderStatus({
        message: "Please log in to place an order",
        type: "error"
      });
      navigate("/login", { state: { from: `/product/${id}` } });
      return;
    }

    if (!selectedColor || !selectedSize) {
      setOrderStatus({
        message: "Please select color and size",
        type: "error"
      });
      return;
    }

    try {
      console.log("Sending order to API...");
      const orderData = {
        userId,
        productId: id,
        quantity,
        selectedColor,
        selectedSize,
        price: product.pd_price // Add the unit price
      };
      
      console.log("Order payload:", orderData);
      
      const response = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData)
      });

      const responseText = await response.text();
      console.log("Raw API response:", responseText);
      
      if (!response.ok) {
        throw new Error(`Failed to create order: ${response.status} - ${responseText}`);
      }

      let data;
      try {
        data = JSON.parse(responseText);
        console.log("Order created successfully:", data);
      } catch (e) {
        console.warn("Could not parse response as JSON:", e);
      }
      
      setOrderStatus({
        message: "Order placed successfully!",
        type: "success"
      });

      // Navigate after successful order creation
      setTimeout(() => {
        if (navigateTo) {
          navigate(navigateTo);
        }
      }, 1500); // Give user time to see success message
    } catch (error) {
      console.error("Error creating order:", error);
      setOrderStatus({
        message: `Failed to place order: ${error.message}`,
        type: "error"
      });
    }
  };

  const handleAddToCart = async () => {
    await createOrder('/cart');
  };

  const handleBuyNow = async () => {
    await createOrder('/checkout');
  };

  if (!product) {
    return <p className="text-center text-gray-500">Loading product...</p>;
  }

  return (
    <div className="container mx-auto p-6 max-w-screen-2xl bg-blue-50 rounded-2xl shadow-xl font-body">
      <h1 className="text-header-02 font-header text-center text-primary mb-8">{product.pd_name}</h1>

      {orderStatus.message && (
        <div className={`mb-4 p-3 rounded-md text-center ${orderStatus.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
          {orderStatus.message}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Product Images */}
        <div className="flex flex-col items-center">
          <motion.img
            src={mainImage}
            alt={product.pd_name}
            className="w-full h-96 object-cover rounded-xl shadow-lg hover:scale-105 transition-transform duration-300"
          />
          <div className="flex justify-center gap-4 mt-4">
            {product.pd_side_images?.map((img, index) => {
              const fullUrl = `/uploads/${img}`;
              return (
                <motion.img
                  key={index}
                  src={fullUrl}
                  alt={`Side view ${index + 1}`}
                  className="w-20 h-20 object-cover rounded-xl shadow-md cursor-pointer hover:scale-110 transition-transform duration-200"
                  onClick={() => setMainImage(fullUrl)}
                />
              );
            })}
          </div>
        </div>

        {/* Product Details */}
        <div className="flex flex-col justify-between space-y-6">
          <div className="bg-primary-light p-6 rounded-xl shadow-md">
            <h3 className="text-header-04 font-semibold text-primary mb-3">Description</h3>
            <p className="text-gray-800">{product.pd_description}</p>
          </div>

          <div className="bg-secondary-light p-4 rounded-xl shadow-md">
            <h3 className="text-header-04 font-semibold text-primary mb-3">Category</h3>
            <p className="text-gray-800">{product.pd_category}</p>
          </div>

          {/* Color Selection */}
          {product.pd_colors && (
            <div className="flex items-center gap-4">
              <h3 className="text-header-05 font-semibold text-primary">Choose Color:</h3>
              <div className="flex gap-3">
                {product.pd_colors.map((color, index) => (
                  <button
                    key={index}
                    className={`w-8 h-8 rounded-full border-2 transition-transform duration-200 ${
                      selectedColor === color ? "border-primary scale-110" : "border-gray-300"
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() => setSelectedColor(color)}
                    aria-label={`Select ${color} color`}
                  ></button>
                ))}
              </div>
            </div>
          )}

          {/* Sizes - Updated to make selectable */}
          {product.pd_size && (
            <div className="flex flex-col gap-3">
              <h3 className="text-header-05 font-semibold text-primary">Select Size:</h3>
              <div className="flex gap-2 flex-wrap">
                {product.pd_size.map((size, idx) => (
                  <button
                    key={idx}
                    className={`px-3 py-1 border rounded-md text-sm font-medium transition-all duration-200 ${
                      selectedSize === size 
                        ? "bg-primary text-white border-primary" 
                        : "bg-gray-50 border-gray-300 hover:bg-gray-100"
                    }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div className="flex items-center gap-6">
            <h3 className="text-header-05 font-semibold text-primary">Quantity:</h3>
            <button
              className="w-10 h-10 flex items-center justify-center bg-gray-300 rounded-full hover:bg-gray-400 transition"
              onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
            >
              -
            </button>
            <span className="text-header-05 font-semibold">{quantity}</span>
            <button
              className="w-10 h-10 flex items-center justify-center bg-primary text-white rounded-full hover:bg-blue-800 transition"
              onClick={() => setQuantity((prev) => prev + 1)}
            >
              +
            </button>
          </div>

          {/* Price */}
          <p className="text-header-05 font-semibold text-primary">
            Price: <span className="text-blue-700 font-bold">LKR {product.pd_price.toFixed(2)}</span>
          </p>

          {/* Selected Options Summary */}
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h3 className="text-header-05 font-semibold text-primary mb-2">Your Selection</h3>
            <div className="flex gap-4 flex-wrap text-sm">
              <p><span className="font-medium">Color:</span> {selectedColor || "Not selected"}</p>
              <p><span className="font-medium">Size:</span> {selectedSize || "Not selected"}</p>
              <p><span className="font-medium">Quantity:</span> {quantity}</p>
              <p><span className="font-medium">Total:</span> LKR {(product.pd_price * quantity).toFixed(2)}</p>
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-4 flex gap-4">
            <button 
              className="flex items-center gap-2 bg-secondary text-gray-900 px-5 py-3 rounded-xl font-semibold hover:bg-yellow-400 transition"
              onClick={handleBuyNow}
            >
              <FaBolt /> Buy Now
            </button>
            <button 
              className="flex items-center gap-2 bg-primary text-white px-5 py-3 rounded-xl font-semibold hover:bg-blue-800 transition"
              onClick={handleAddToCart}
            >
              <FaShoppingCart /> Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}