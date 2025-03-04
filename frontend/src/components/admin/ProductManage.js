import React from "react";

export default function ProductManage() {


    return (
        <div>
            <div className="font-header text-header-01 px-1 sm:px-4">
                <h1>Products</h1>
            </div>
            <button className="font-body text-header-04 items-right">
                Add New Product
            </button>
            <div className="min-w-full overflow-x-auto">
                <table className="min-w-full bg-primary-light border border-gray-300">
                    <thead>
                        <tr>
                            <th className="py-1 px-1 border-b">ID</th>
                            <th className="py-2 px-1 sm:px-4 border-b whitespace-nowrap">Product Name</th>
                            <th className="py-2 px-1 border-b whitespace-nowrap">Category</th>
                            <th className="py-2 px-1 border-b whitespace-nowrap">Cover Photo</th>
                            <th className="py-2 px-1 border-b whitespace-nowrap">Other Photo</th>
                            <th className="py-2 px-1 border-b whitespace-nowrap">Price</th>
                            <th className="py-2 px-1 border-b whitespace-nowrap">Description</th>
                            <th className="py-2 px-1 border-b whitespace-nowrap">Colors</th>
                            <th className="py-2 px-1 border-b whitespace-nowrap">Sizes</th>
                            <th className="py-2 px-1 border-b whitespace-nowrap">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th className="py-2 px-1 border-b whitespace-nowrap"> test</th>
                            <th className="py-2 px-1 border-b whitespace-nowrap"> test </th>
                            <th className="py-2 px-1 border-b whitespace-nowrap"> test</th>
                            <th className="py-2 px-1 border-b whitespace-nowrap"> test</th>
                            <th className="py-2 px-1 border-b whitespace-nowrap"> test</th>
                            <th className="py-2 px-1 border-b whitespace-nowrap"> test</th>
                            <th className="py-2 px-1 border-b whitespace-nowrap"> test</th>
                            <th className="py-2 px-1 border-b whitespace-nowrap"> test</th>
                            <th className="py-2 px-1 border-b whitespace-nowrap"> test</th>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}