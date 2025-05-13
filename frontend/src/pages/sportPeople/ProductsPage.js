import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import MobileSidebar from "../../components/sportPeople/MobileSidebarDropDown";
import { useAuthStore } from "../../store/useAuthStore";

export default function ProductsPage() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const { user } = useAuthStore();

    useEffect(() => {
        fetchProducts();
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
        <div>
            <div className="w-full bg-primary mt-[20px] p-[40px]">
                <h2 className="text-2xl text-white text-center text-header-01 font-bold mb-1">Products</h2>
            </div>

            <div className="block md:flex sm:flex min-h-screen bg-gray-100 mt-0">
                {/* Desktop Sidebar */}
                <div className="hidden md:block sm:block w-[120px] md:w-[200px] sm:w-[150px] p-2 bg-primary shadow">
                    <div className="bg-primary-light pt-2 pb-2 pl-2 mt-0">
                        <h2 className="text-sm md:text-xl sm:text-md text-black text-center font-bold">Categories</h2>
                    </div>
                    <ul className="mt-4 text-white text-sm md:text-xl sm:text-md">
                        <li
                            className={`cursor-pointer p-2 ${selectedCategory === "All" ? "bg-blue-500 text-black" : ""}`}
                            onClick={() => filterProducts("All")}
                        >
                            All
                        </li>
                        {categories.map((category, index) => (
                            <li
                                key={index}
                                className={`cursor-pointer p-2 ${selectedCategory === category ? "bg-blue-500 text-black" : ""}`}
                                onClick={() => filterProducts(category)}
                            >
                                {category}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Mobile Sidebar */}
                <MobileSidebar
                    isOpen={isOpen}
                    toggleSidebar={() => setIsOpen(!isOpen)}
                    categories={categories}
                    selectedCategory={selectedCategory}
                    onSelectCategory={filterProducts}
                />

                {/* Product Display Section */}
                <div className="w-full p-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {products.length > 0 ? (
                            products.map((product) => (
                                <Link
                                    to={`/product/${product._id}`}
                                    key={product._id}
                                    className="group"
                                >
                                    <div className="relative bg-white rounded-xl overflow-hidden shadow-lg transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                                        <div className="overflow-hidden">
                                            <img
                                                src={`/uploads/${product.pd_image}`}
                                                alt={product.pd_name}
                                                className="w-full h-48 object-cover transform transition-transform duration-300 group-hover:scale-105"
                                            />
                                            <div className="absolute inset-0 group-hover:bg-opacity-10 transition duration-300"></div>
                                        </div>
                                        <div className="p-4 transition-colors duration-300 group-hover:bg-blue-50">
                                            <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-700">
                                                {product.pd_name}
                                            </h3>
                                            <p className="text-sm text-gray-600 group-hover:text-gray-800">{product.pd_category}</p>
                                            <p className="text-blue-600 font-bold mt-1">${product.pd_price}</p>
                                        </div>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <p className="text-center col-span-3 text-gray-600">No products available</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
