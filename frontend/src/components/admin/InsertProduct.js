import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function InsertProduct() {

    const [product, setProduct] = useState({
        pd_name: "",
        pd_category: "",
        pd_price: "",
        pd_image: "",
        pd_description: "",
    });

    const navigate = useNavigate();

    const categories = ["Cricket","Volleyball","Badminton","Basket Ball","Table Tenis","Tenis","Football","Chess","Netball","Swimming"];
    function handleChange(e) {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    }

    function handleCategorySelect(category){
        setProduct({...product,pd_category:category});
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
            } else{
                const errorData = await response.json();
                console.error("Error adding product:", errorData);
                alert("Failed to add Product!");
            }
        } catch (err) {
            console.error("Error!", err);
        }
    }

    return(
        <div className="p-4">
            <h1 className="text-2xl text-center font-bold font-header mb-4">Add New Product</h1>
            <form onSubmit={handleSubmit} className="space-y-4 ">
                <div>
                    <label className="block text-lg font-header">
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
                        <option value= "" className="text-center ">
                            Select a Category
                        </option>
                        {categories.map((category, index) =>(
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
                    <input className="w-80 p-2 border border-black" type="text" name="pd_image" 
                    value={product.pd_image} onChange={handleChange} required>
                    </input>
                </div>

                <div>
                    <label className="block text-sm font-medium">
                        Product Description
                    </label>
                    <textarea className="w-80 p-2 border border-black" type="text" name="pd_description" 
                    value={product.pd_description} onChange={handleChange} required>
                    </textarea>
                </div>
                <button type="submit" className="w-40 h-10 bg-blue-600 text-white p-2 rounded">
                    Add Product
                </button>
            </form>
        </div>
    );
}