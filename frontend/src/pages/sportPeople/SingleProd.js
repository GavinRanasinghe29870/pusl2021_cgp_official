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
  const [mainImage, setMainImage] = useState("");

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

        if (data.pd_image) {
          setMainImage(`/uploads/${data.pd_image}`);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    // You can add logic here to store the product in cart state/context or localStorage
    // before navigating to the cart page
    navigate('/cart');
  };

  if (!product) {
    return <p className="text-center text-gray-500">Loading product...</p>;
  }

  return (
    <div className="container mx-auto p-6 max-w-screen-2xl bg-blue-50 rounded-2xl shadow-xl font-body">
      <h1 className="text-header-02 font-header text-center text-primary mb-8">{product.pd_name}</h1>

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
                  ></button>
                ))}
              </div>
            </div>
          )}

          {/* Sizes */}
          {product.pd_size && (
            <div className="flex items-center gap-4">
              <h3 className="text-header-05 font-semibold text-primary">Available Sizes:</h3>
              <div className="flex gap-2 flex-wrap">
                {product.pd_size.map((size, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 border border-gray-300 rounded-md text-sm bg-gray-50 font-medium"
                  >
                    {size}
                  </span>
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

          {/* Buttons */}
          <div className="mt-4 flex gap-4">
            <button className="flex items-center gap-2 bg-secondary text-gray-900 px-5 py-3 rounded-xl font-semibold hover:bg-yellow-400 transition">
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