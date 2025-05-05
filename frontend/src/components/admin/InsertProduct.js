import React, { useState, useEffect } from "react";
import axios from "axios";

export default function InsertProduct({ onClose, existingProduct }) {
  const [product, setProduct] = useState({
    pd_name: "",
    pd_category: "",
    pd_price: "",
    pd_description: "",
    pd_colors: [],
    pd_size: [],
  });

  const [coverPhoto, setCoverPhoto] = useState(null);
  const [sideImages, setSideImages] = useState([]);

  useEffect(() => {
    if (existingProduct) {
      setProduct(existingProduct);
    }
  }, [existingProduct]);

  function handleChange(e) {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  }

  const handleColorChange = (e) => {
    setProduct((prev) => ({
      ...prev,
      pd_colors: e.target.value.split(",").map(c => c.trim()),
    }));
  };

  const handleSizeChange = (e) => {
    setProduct((prev) => ({
      ...prev,
      pd_size: e.target.value.split(",").map(c => c.trim()),
    }));
  };


  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("pd_name", product.pd_name);
    formData.append("pd_category", product.pd_category);
    formData.append("pd_price", product.pd_price);
    formData.append("pd_description", product.pd_description);
    formData.append("pd_colors", JSON.stringify(product.pd_colors));
    formData.append("pd_size", JSON.stringify(product.pd_size));
    

    if (coverPhoto) formData.append("pd_image", coverPhoto);
    sideImages.forEach((img) => formData.append("pd_side_images", img));

    const url = existingProduct
      ? `http://localhost:5000/api/products/${existingProduct._id}`
      : "http://localhost:5000/api/products/add";

    const method = existingProduct ? "put" : "post";

    try {
      const response = await axios({
        method,
        url,
        data: formData,
      });

      console.log("Upload response:", response.data);

      alert(`Product ${existingProduct ? "updated" : "added"} successfully!`);
      onClose();
    } catch (err) {
      console.error("Upload failed:", err.response?.data || err.message);
      alert("Failed to add product. Check all fields.");
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg w-[500px] max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">
          {existingProduct ? "Edit Product" : "Add New Product"}
        </h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Product Name</label>
            <input
              type="text"
              name="pd_name"
              value={product.pd_name}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Category</label>
            <input
              type="text"
              name="pd_category"
              value={product.pd_category}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Price</label>
            <input
              type="number"
              name="pd_price"
              value={product.pd_price}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Description</label>
            <textarea
              name="pd_description"
              value={product.pd_description}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              rows={3}
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Cover Photo</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setCoverPhoto(e.target.files[0])}
              className="w-full"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Other Photos</label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => setSideImages([...e.target.files])}
              className="w-full"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Colors (comma separated)</label>
            <input
              type="text"
              name="pd_colors"
              placeholder="#ff0000, #00ff00"
              value={product.pd_colors.join(", ")}
              onChange={handleColorChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Sizes (comma separated)</label>
            <input
              type="text"
              name="pd_size"
              placeholder="Xl, L"
              value={product.pd_size.join(", ")}
              onChange={handleSizeChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              {existingProduct ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
