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
    function handleChange(e) {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const response = await fetch("/api/products", {
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
                alert("Failed to add Product!");
            }
        } catch (err) {
            console.error("Error!", err);
        }
    }

    return(
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Add New Product</h1>
            <form className="space-y-4">
                <div>
                    <label className="block text-sm font-medium">
                        Product Name
                    </label>
                    <input type="text" name="pd_name" className="w-full p-2" required></input>
                </div>
                <div>
                    <label className="block text-sm font-medium">
                        
                    </label>
                </div>
            </form>

        </div>
    );
}