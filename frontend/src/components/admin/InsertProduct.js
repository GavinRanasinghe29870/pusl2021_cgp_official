import React, { useState, useEffect } from "react";

export default function InsertProduct({ onClose, existingProduct }) {
  const [product, setProduct] = useState({
    pd_name: "",
    pd_category: "",
    pd_price: "",
    pd_image: "",
    pd_description: "",
  });

  useEffect(() => {
    if (existingProduct) {
      setProduct(existingProduct);
    }
  }, [existingProduct]);

  function handleChange(e) {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const url = existingProduct
      ? `http://localhost:5000/api/products/${existingProduct._id}`
      : "http://localhost:5000/api/products/add";

    const method = existingProduct ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });

      if (response.ok) {
        alert(`Product ${existingProduct ? "updated" : "added"} successfully!`);
        onClose();
      } else {
        const errorData = await response.json();
        console.error("Error:", errorData);
        alert(`Failed to ${existingProduct ? "update" : "add"} Product!`);
      }
    } catch (err) {
      console.error("Error!", err);
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg w-[500px]">
        <h2 className="text-xl font-semibold mb-4">
          {existingProduct ? "Edit Product" : "Add New Product"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
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
            <label className="block mb-1 font-medium">Cover Photo URL</label>
            <input
              type="text"
              name="pd_image"
              value={product.pd_image}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
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
