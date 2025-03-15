import React, { useState, useEffect } from "react";
import axios from "axios";

export default function ProductsPage() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            await fetchProducts();
        };
        fetchData();
    }, []);

    async function fetchProducts() {
        try {
            const res = await axios.get("http://localhost:5000/api/products");
            setProducts(res.data);
            extractCategories(res.data);
        } catch (error) {
            console.error("Error fetching products", error);
        }
    }

    function extractCategories(products) {
        const uniqueCategories = [...new Set(products.map(product => product.pd_category))];
        setCategories(uniqueCategories);
    }

    async function filterProducts(category) {
        setSelectedCategory(category);
        if (category === "All") {
            fetchProducts();
        } else {
            try {
                const res = await axios.get(`http://localhost:5000/api/products/${category}`);
                setProducts(res.data);
            } catch (error) {
                console.error("Error fetching filtered products", error);
            }
        }
    }

    return (
        <div className="flex min-h-screen bg-gray-100 p-5">
            {/* Sidebar for categories */}
            <div className="w-1/4 p-4 bg-primary shadow rounded-lg">
                <div className="bg-primary-light pt-2 pb-2 mt-1">
                    <h2 className="text-xl text-black text-center font-bold">Categories</h2>
                </div>
                <div className="mt-4">
                    <ul>
                        <li
                            className={`cursor-pointer p-2 ${selectedCategory === "All" ? "bg-blue-500 text-white" : ""}`}
                            onClick={() => filterProducts("All")}
                        >
                            All
                        </li>
                        {categories.map((category, index) => (
                            <li
                                key={index}
                                className={`cursor-pointer p-2 ${selectedCategory === category ? "bg-blue-500 text-white" : ""}`}
                                onClick={() => filterProducts(category)}
                            >
                                {category}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Product Display Section */}
            <div className="w-3/4 p-4">
                <h2 className="text-2xl font-bold mb-4">Products</h2>
                <div className="grid grid-cols-3 gap-4">
                    {products.length > 0 ? (
                        products.map((product) => (
                            <div key={product._id} className="bg-white shadow rounded-lg p-4">
                                <img src={product.pd_image} alt={product.pd_name} className="w-full h-40 object-cover rounded" />
                                <h3 className="text-lg font-semibold mt-2">{product.pd_name}</h3>
                                <p className="text-gray-600">{product.pd_category}</p>
                                <p className="text-blue-600 font-bold">${product.pd_price}</p>
                                <p className="text-gray-700 mt-1">{product.pd_description}</p>
                            </div>
                        ))
                    ) : (
                        <p className="text-center col-span-3 text-gray-600">No products available</p>
                    )}
                </div>
            </div>
        </div>
    );
}
