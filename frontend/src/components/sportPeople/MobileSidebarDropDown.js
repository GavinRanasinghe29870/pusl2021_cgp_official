import React from "react";

export default function MobileSidebar({ isOpen, toggleSidebar, categories, selectedCategory, onSelectCategory }) {
    return (
        <div className="block sm:hidden p-4">
            <div className="sm:hidden rounded-lg">
                <button
                    onClick={toggleSidebar}
                    className="bg-gray-800 text-white px-4 py-2 rounded-md shadow"
                >
                    ☰ Categories
                </button>
            </div>

            {isOpen && (
                <div className="lg:hidden absolute top-16 left-0 w-64 bg-gray-800 text-white p-4 shadow-lg">
                    <div className="mt-4 text-white text-sm md:text-xl sm:text-md">
                        <ul>
                            <li
                                className={`cursor-pointer p-2 ${selectedCategory === "All" ? "bg-blue-500 text-black" : ""}`}
                                onClick={() => onSelectCategory("All")}
                            >
                                All
                            </li>
                            {categories.map((category, index) => (
                                <li
                                    key={index}
                                    className={`cursor-pointer p-2 ${selectedCategory === category ? "bg-blue-500 text-black" : ""}`}
                                    onClick={() => onSelectCategory(category)}
                                >
                                    {category}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
}
