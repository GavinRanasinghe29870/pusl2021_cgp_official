import React, { useEffect, useState } from "react";
import InsertProduct from "../../components/admin/InsertProduct";
import axios from "axios";

export default function ProductManage() {
  const [showModal, setShowModal] = useState(false);
  const [products, setProducts] = useState([]);
  const [editProduct, setEditProduct] = useState(null); // for edit mode

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    try {
      const res = await axios.get("http://localhost:5000/api/products");
      setProducts(res.data);
    } catch (error) {
      console.error("Error fetching Products", error);
    }
  }

  async function handleDelete(id) {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(`http://localhost:5000/api/products/${id}`);
        setProducts(products.filter((p) => p._id !== id));
      } catch (error) {
        console.error("Error deleting product", error);
      }
    }
  }

  function handleEdit(product) {
    setEditProduct(product);
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
    setEditProduct(null);
    fetchProducts(); // refresh after add/edit
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-[60px] font-bold mb-4 text-center bg-yellow-200">Products Managing</h1>

      <div className="mb-4 text-right">
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          onClick={() => setShowModal(true)}
        >
          Add New Product
        </button>
      </div>

      {showModal && (
        <InsertProduct onClose={closeModal} existingProduct={editProduct} />
      )}

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <thead className="bg-blue-800 text-white">
            <tr>
              <th className="py-3 px-4">ID</th>
              <th className="py-3 px-4">Product Name</th>
              <th className="py-3 px-4">Category</th>
              <th className="py-3 px-4">Cover Photo</th>
              <th className="py-3 px-4">Other Photo</th>
              <th className="py-3 px-4">Price</th>
              <th className="py-3 px-4">Description</th>
              <th className="py-3 px-4">Colors</th>
              <th className="py-3 px-4">Sizes</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((product, index) => (
                <tr
                  key={product._id}
                  className={`border-b last:border-0 ${
                    index % 2 === 0 ? "bg-gray-100" : "bg-white"
                  } hover:bg-gray-200`}
                >
                  <td className="py-3 px-4">{product._id}</td>
                  <td className="py-3 px-4">{product.pd_name}</td>
                  <td className="py-3 px-4">{product.pd_category}</td>
                  <td className="py-3 px-4">{product.pd_image}</td>
                  <td className="py-3 px-4">test</td>
                  <td className="py-3 px-4">{product.pd_price}</td>
                  <td className="py-3 px-4">{product.pd_description}</td>
                  <td className="py-3 px-4">test</td>
                  <td className="py-3 px-4">test</td>
                  <td className="py-3 px-4">
                    <div className="flex space-x-2">
                      <button
                        className="flex items-center bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                        onClick={() => handleEdit(product)}
                      >
                        <img
                          src="/edit-2-fill.svg"
                          alt="edit"
                          className="mr-1 w-4 h-4"
                        />
                        Edit
                      </button>
                      <button
                        className="flex items-center bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                        onClick={() => handleDelete(product._id)}
                      >
                        <img
                          src="/delete-2-fill.svg"
                          alt="delete"
                          className="mr-1 w-4 h-4"
                        />
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10" className="text-center py-4">
                  No Products Available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
