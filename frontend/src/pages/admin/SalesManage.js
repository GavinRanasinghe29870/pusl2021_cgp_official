import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../App.css";
import { BsFillTelephoneFill } from "react-icons/bs";
import { FaMapLocation } from "react-icons/fa6";
import { IoIosMail } from "react-icons/io";

const SalesManage = () => {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/sales");
        setSales(response.data);
      } catch (error) {
        console.error("Error fetching sales:", error);
      }
    };

    fetchSales();
  }, []);

  return (
    <div className="bg-white min-h-screen font-sans">
      <div className="p-6 mt-8">
        <h1 className="text-2xl font-bold mb-4">Order</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full border bg-blue-100 border-300 rounded-lg">
            <thead className="bg-white">
              <tr className="border-b bg-blue-100">
                <th className="py-2 px-4 border text-left border-black">#</th>
                <th className="py-2 px-4 border text-left border-black">Order ID</th>
                <th className="py-2 px-4 border text-left border-black">Product Name</th>
                <th className="py-2 px-4 border text-left border-black">Address</th>
                <th className="py-2 px-4 border text-left border-black">Date</th>
                <th className="py-2 px-4 border text-left border-black">Price</th>
                <th className="py-2 px-4 border text-left border-black">Status</th>
              </tr>
            </thead>
            <tbody>
              {sales.map((sale, index) => (
                <tr key={sale._id} className="border-b bg-blue-100 border-black">
                  <td className="py-3 px-4 border border-black">{index + 1}</td>
                  <td className="py-3 px-4 border font-bold border-black">{sale.orderId}</td>
                  <td className="py-3 px-4 border border-black">
                    <div className="font-bold border-black">{sale.productName}</div>
                  </td>
                  <td className="py-3 px-4 border border-black">{sale.address}</td>
                  <td className="py-3 px-4 border border-black">{new Date(sale.date).toLocaleDateString()}</td>
                  <td className="py-3 px-4 border border-black">{sale.price}/=</td>
                  <td className="py-3 px-4 border border-black">{sale.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <footer className="bg-blue-100 mt-6 py-4 border-t">
        <div className="flex justify-around text-sm text-gray-600">
          <div className="flex items-center space-x-2 text-2xl">
            <h3 className="font-bold">Contact Details</h3>
          </div>
          <div className="flex items-center space-x-2 ">
            <span>
              <BsFillTelephoneFill className="text-blue-500 text-2xl" />
            </span>
            <span>+94 776443258</span>
          </div>
          <div className="flex items-center space-x-2">
            <span>
              <FaMapLocation className="text-primary text-2xl" />
            </span>
            <span>B2, Buthpitiya, Colombo.</span>
          </div>
          <div className="flex items-center space-x-2">
            <span>
              <IoIosMail className="text-primary text-2xl h-20" />
            </span>
            <span>sportzy@gmail.com</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SalesManage;