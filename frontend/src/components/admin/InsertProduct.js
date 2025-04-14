import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function InsertProduct({ onClose }) {

    const [product, setProduct] = useState({
        pd_name: "",
        pd_category: "",
        pd_price: "",
        pd_image: "",
        pd_description: "",
    });
    const [imagePreview, setImagePreview] = useState(null);
    const fileInputRef = useRef(null);
    const [imageName, setImageName] = useState("No File Choosed");
    const navigate = useNavigate();

    const categories = ["Cricket", "Volleyball", "Badminton", "Basket Ball", "Table Tenis", "Tenis", "Football", "Chess", "Netball", "Swimming"];
    function handleChange(e) {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    }

    function handleCategorySelect(category) {
        setProduct({ ...product, pd_category: category });
    }

    function handleImageChange(e) {
        const file = e.target.files[0];

        if (file) {
            setImageName(file.name)
            const reader = new FileReader();
            reader.onloadend = () => {
                setProduct({ ...product, pd_image: reader.result });
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    }

    function handleChooseImageClick() {
        fileInputRef.current.click(); // Trigger file input click
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:5000/api/products/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(product),
            });
            if (response.ok) {
                alert("Product added successfully!");
                navigate("/shop");
            } else {
                const errorData = await response.json();
                console.error("Error adding product:", errorData);
                alert("Failed to add Product!");
            }
        } catch (err) {
            console.error("Error!", err);
        }
    }

    return (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-screen bg-white bg-opacity-90 grid place-items-center">
            <button className="absolute top-2 right-2 text-red-500 text-2xl" onClick={onClose}>
                &times;
            </button>
            <h1 className="text-2xl text-center font-bold font-header mb-4">Add New Product</h1>
            <form onSubmit={handleSubmit} className="space-y-4 ">
                <div className="item-center justify-center">
                    <label className=" item-center justify-center block text-lg font-header">
                        Product Name
                    </label>
                    <input type="text" name="pd_name" className="w-80 p-2 border border-black" value={product.pd_name}
                        onChange={handleChange} required></input>
                </div>
                <div>
                    <label className="block text-sm font-medium">
                        Category
                    </label>
                    <select className="w-60 p-2 mt-3 border border-black" value={product.pd_category}
                        onChange={(e) => handleCategorySelect(e.target.value)} required>
                        <option value="" className="text-center ">
                            Select a Category
                        </option>
                        {categories.map((category, index) => (
                            <option key={index} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium">
                        Price(LKR)
                    </label>
                    <input className="w-80 p-2 border border-black" type="number" name="pd_price"
                        value={product.pd_price} onChange={handleChange} required>
                    </input>
                </div>

                <div>
                    <label className="block text-sm font-medium">
                        Product Image
                    </label>
                    <div className="flex items-center gap-4 mt-2">
                        <div className="border-2 border-black-900 p-2">
                        <span className="text-gray-600">
                            {imageName}
                        </span>
                        </div>
                        
                        <button type="button" onClick={handleChooseImageClick} className="w-40 p-2 bg-secondary-light cursor-pointer text-black hover:bg-secondary transition">
                        Choose Image
                    </button>
                    </div>
                    <input className="hidden" type="file" accept="image/*"
                        onChange={handleImageChange} required ref={fileInputRef}>
                    </input>
                    
                    {imagePreview && (
                        <img src={imagePreview} alt="Preview" className="mt-2 w-40 h-40 object-cover border rounded" />
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium">
                        Product Description
                    </label>
                    <textarea className="w-80 p-2 border border-black" type="text" name="pd_description"
                        value={product.pd_description} onChange={handleChange} required>
                    </textarea>
                </div>
                <button type="submit" className="w-40 h-10 bg-blue-600 text-white p-2 rounded ">
                    Add Product
                </button>
            </form>
        </div>
    );
}