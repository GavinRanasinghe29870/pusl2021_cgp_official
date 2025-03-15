import React, { useState } from "react";
import { FaCheckCircle, FaShoppingCart, FaBolt } from "react-icons/fa";
import { motion } from "framer-motion";

const SingleProduct = () => {
  const product = {
    name: "Badminton Rackets for Outdoor Sports",
    description: {
      Specifications: [
        { title: "Brand", value: "ALP-SPORT" },
        { title: "Model", value: "ALP AIR 10U" },
        { title: "Weight", value: "10U / 52-62g (cordless simple racket weight)" },
        { title: "Tension", value: "28-35 lbs (original 28 lbs)" },
        { title: "Balance", value: "320 ± 5 mm" },
        { title: "Handle", value: "G5" },
      ],
      Features: [
        { title: "Material", value: "T500 100% carbon fiber + titanium" },
        { title: "Flexibility", value: "Strong flexibility, high-speed impact performance" },
        { title: "Weight", value: "Ultra-light" },
        { title: "Durability", value: "High toughness" },
      ],
      Package: [
        { title: "Includes", value: "1 * Racket + 1 * Fleece Bag + 2 * Hand Gel" },
      ],
    },
    price: 1081.7,
    images: [
      "/mainproduct.png",
      "/side1product.png",
      "/side2product.png",
      "/side3product.png",
    ],
    colors: ["white", "black", "red", "blue"],
  };

  const [mainImage, setMainImage] = useState(product.images[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("Specifications");

  return (
    <div className="container mx-auto p-6 max-w-5xl bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">{product.name}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Image Section */}
        <div className="relative">
          <motion.img
            src={mainImage}
            alt="Product"
            className="w-full aspect-[3.6/4] object-cover rounded-lg shadow-md hover:scale-105 transition-transform"
          />
          <div className="flex justify-center gap-4 mt-4">
            {product.images.map((img, index) => (
              <motion.img
                key={index}
                src={img}
                alt={`Thumbnail ${index + 1}`}
                className={`w-16 h-16 cursor-pointer rounded-lg border-2 transition-all hover:scale-110 ${
                  mainImage === img ? "border-blue-500" : "border-gray-300"
                }`}
                onClick={() => setMainImage(img)}
              />
            ))}
          </div>
        </div>

        {/* Details Section */}
        <div className="flex flex-col justify-between h-full space-y-6">
          {/* Tabbed Description Section */}
          <div className="mb-4 bg-gray-100 p-6 rounded-md shadow-sm">
            <div className="flex border-b mb-3">
              {Object.keys(product.description).map((tab) => (
                <button
                  key={tab}
                  className={`px-4 py-2 font-semibold transition-all rounded-t-md ${
                    activeTab === tab ? "bg-blue-500 text-white" : "text-gray-500 hover:text-blue-500"
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>
            <ul className="space-y-2">
              {product.description[activeTab].map((item, index) => (
                <li key={index} className="flex items-center gap-2">
                  <FaCheckCircle className="text-blue-500" />
                  <strong>{item.title}:</strong> {item.value}
                </li>
              ))}
            </ul>
          </div>

          {/* Additional Details */}
          <div className="bg-gray-50 p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2">Why Choose This Racket?</h3>
            <p className="text-gray-600">Experience ultra-lightweight performance with superior durability, designed for professionals and enthusiasts alike.</p>
          </div>

          {/* Color Selection */}
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Choose Color:</h3>
            <div className="flex gap-3 mt-2">
              {product.colors.map((color, index) => (
                <div
                  key={index}
                  className={`w-10 h-10 rounded-full cursor-pointer border-2 flex items-center justify-center transition-all ${
                    selectedColor === color ? "border-blue-500 scale-110 shadow-md" : "border-gray-300"
                  }`}
                  style={{ backgroundColor: color }}
                  onClick={() => setSelectedColor(color)}
                >
                  {selectedColor === color && <FaCheckCircle className="text-white" />}
                </div>
              ))}
            </div>
            <p className="text-sm mt-2 text-gray-500">Selected: {selectedColor}</p>
          </div>

          {/* Quantity Selector */}
          <div className="mt-4 flex items-center gap-6">
            <h3 className="text-lg font-semibold">Quantity:</h3>
            <motion.button className="bg-gray-300 px-3 py-1 rounded-full shadow-md hover:bg-gray-400" onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}>-</motion.button>
            <span className="text-lg font-semibold">{quantity}</span>
            <motion.button className="bg-blue-500 px-3 py-1 rounded-full shadow-md text-white hover:bg-blue-600" onClick={() => setQuantity((prev) => prev + 1)}>+</motion.button>
          </div>

          {/* Price Label */}
          <p className="text-xl font-semibold text-gray-700 border-t border-gray-300 pt-4">
            Price: <span className="text-blue-500">LKR {product.price.toFixed(2)}</span>
          </p>

          {/* Buttons */}
          <div className="mt-6 flex gap-4">
            <motion.button className="w-full bg-green-500 text-white font-bold py-3 rounded-lg shadow-lg flex items-center justify-center gap-2 hover:scale-105 hover:shadow-xl">
              <FaBolt /> Buy Now
            </motion.button>
            <motion.button className="w-full bg-blue-500 text-white font-bold py-3 rounded-lg shadow-lg flex items-center justify-center gap-2 hover:scale-105 hover:shadow-xl">
              <FaShoppingCart /> Add to Cart
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;