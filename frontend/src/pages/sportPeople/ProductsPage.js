import React, { useState, useEffect } from "react";
import axios from "axios";

export default function ProductsPage() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [isOpen, setIsOpen] = useState(false);


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
        <div>
            <div className="w-full bg-primary mt-[20px] p-[40px]">
            <h2 className="text-2xl text-white text-center text-header-01 font-bold mb-1">Products</h2>
            </div>

        <div className="block md:flex sm:flex min-h-screen bg-gray-100 mt-0">
            
            {/* Desktop Sidebar for categories */}
            <div className="hidden md:block sm:block w-[120px] md:w-[200px] sm:w-[150px] p-2 bg-primary shadow">
                <div className="bg-primary-light pt-2 pb-2 pl-2 mt-0">
                    <h2 className="text-sm md:text-xl sm:text-md text-black text-center font-bold">Categories</h2>
                </div>
                <div className="mt-4 text-white text-sm md:text-xl sm:text-md">
                    <ul>
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
            </div>

            {/* Mobile Sidebar DropDown */}
            <div className="block sm:hidden p-4">
                <div className="sm:hidden rounded-lg ">

                    <button onClick={() => setIsOpen(!isOpen)} className="bg-gray-800 text-white px-4 py-2 rounded-md shadow">
                        ☰ Categories
                    </button>
                </div>
                {isOpen && (
                    <div className="lg:hidden absolute top-16 left-0 w-64 bg-gray-800 text-white p-4 shadow-lg">
                        
                        <div className="mt-4 text-white text-sm md:text-xl sm:text-md">
                            <ul>
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
                    </div>

                )
                }
            </div>



            {/* Product Display Section */}
            <div className="w-full p-4">
                
                <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-4">
                    {products.length > 0 ? (
                        products.map((product) => (
                            <div key={product._id} className="bg-primary-light shadow rounded-lg p-4">
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
        </div>
    );
}
