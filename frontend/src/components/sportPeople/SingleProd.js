import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaShoppingCart, FaBolt } from "react-icons/fa";
import { motion } from "framer-motion";

export default function SingleProduct() {
  const { id } = useParams();
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
          setSelectedColor(data.pd_colors[0]); // Default to first color
        }

        if (data.pd_image) {
          setMainImage(data.pd_image);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <p className="text-center text-gray-500">Loading product...</p>;
  }

  return (
    <div className="container mx-auto p-6 max-w-5xl bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">{product.pd_name}</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Images Section */}
        <div className="flex flex-col items-center">
          {/* Main Image */}
          <motion.img
            src={mainImage}
            alt={product.pd_name}
            className="w-full h-96 object-cover rounded-lg shadow-md hover:scale-105 transition-transform"
          />

          {/* Side Images */}
          <div className="flex justify-center gap-4 mt-4">
            {product.pd_side_images?.map((img, index) => (
              <motion.img
                key={index}
                src={img}
                alt={`Side view ${index + 1}`}
                className="w-20 h-20 object-cover rounded-lg shadow-md cursor-pointer hover:scale-110 transition"
                onClick={() => setMainImage(img)}
              />
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="flex flex-col justify-between h-full space-y-6">
          <div className="bg-gray-50 p-6 rounded-md shadow-md">
            <h3 className="text-lg font-semibold mb-3">Description</h3>
            <p className="text-gray-700">{product.pd_description}</p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-3">Category</h3>
            <p className="text-gray-600">{product.pd_category}</p>
          </div>

          {/* Color Selection */}
          {product.pd_colors && (
            <div className="flex items-center gap-4">
              <h3 className="text-lg font-semibold">Choose Color:</h3>
              <div className="flex gap-3">
                {product.pd_colors.map((color, index) => (
                  <button
                    key={index}
                    className={`w-8 h-8 rounded-full border-2 ${
                      selectedColor === color ? "border-blue-500 scale-110" : "border-gray-300"
                    } transition`}
                    style={{ backgroundColor: color }}
                    onClick={() => setSelectedColor(color)}
                  ></button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity Selector */}
          <div className="flex items-center gap-6">
            <h3 className="text-lg font-semibold">Quantity:</h3>
            <button
              className="w-10 h-10 flex items-center justify-center bg-gray-300 rounded-full hover:bg-gray-400 transition"
              onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
            >
              -
            </button>
            <span className="text-lg font-semibold">{quantity}</span>
            <button
              className="w-10 h-10 flex items-center justify-center bg-blue-500 text-white rounded-full hover:bg-blue-600 transition"
              onClick={() => setQuantity((prev) => prev + 1)}
            >
              +
            </button>
          </div>

          {/* Price */}
          <p className="text-lg font-semibold text-gray-700">
            Price: <span className="text-blue-500">LKR {product.pd_price.toFixed(2)}</span>
          </p>

          {/* Buttons */}
          <div className="mt-6 flex gap-4">
            <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
              <FaBolt /> Buy Now
            </button>
            <button className="flex items-center gap-2 bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-900">
              <FaShoppingCart /> Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
