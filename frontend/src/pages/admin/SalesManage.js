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

  const statusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-200 text-yellow-800";
      case "Shipped":
        return "bg-blue-200 text-blue-800";
      case "Delivered":
        return "bg-green-200 text-green-800";
      default:
        return "bg-gray-200 text-gray-800";
    }
  };

  return (
    <div className="bg-white min-h-screen font-sans">
      <div className="p-6 mt-8">
        <h1 className="text-3xl font-extrabold mb-6 text-blue-800">Sales Orders</h1>
        <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-200">
          <table className="min-w-full bg-white text-sm text-left text-gray-700">
            <thead className="bg-blue-100 font-bold text-gray-900">
              <tr>
                <th className="py-3 px-4 border">#</th>
                <th className="py-3 px-4 border">Order ID</th>
                <th className="py-3 px-4 border">Product Name</th>
                <th className="py-3 px-4 border">Address</th>
                <th className="py-3 px-4 border">Date</th>
                <th className="py-3 px-4 border">Price</th>
                <th className="py-3 px-4 border">Username</th>
                <th className="py-3 px-4 border">Email</th>
                <th className="py-3 px-4 border">Status</th>
              </tr>
            </thead>
            <tbody>
              {sales.map((sale, index) => (
                <tr key={sale._id} className="odd:bg-blue-50 even:bg-white hover:bg-blue-200 transition">
                  <td className="py-3 px-4 border">{index + 1}</td>
                  <td className="py-3 px-4 border font-semibold">{sale.orderId}</td>
                  <td className="py-3 px-4 border">{sale.productName}</td>
                  <td className="py-3 px-4 border">{sale.address}</td>
                  <td className="py-3 px-4 border">{new Date(sale.date).toLocaleDateString()}</td>
                  <td className="py-3 px-4 border">{sale.price}/=</td>
                  <td className="py-3 px-4 border">{sale.username}</td>
                  <td className="py-3 px-4 border">{sale.userId?._id || sale.userId || "-"}</td>
                  <td className="py-3 px-4 border font-semibold rounded-md">
                    <span className={`px-2 py-1 rounded ${statusColor(sale.status)}`}>
                      {sale.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <footer className="bg-blue-100 mt-10 py-6 border-t shadow-inner">
        <div className="flex flex-col md:flex-row justify-around items-center text-sm text-gray-700 space-y-4 md:space-y-0">
          <h3 className="text-lg font-bold text-blue-700">Contact Details</h3>
          <div className="flex items-center space-x-2">
            <BsFillTelephoneFill className="text-blue-500 text-xl" />
            <span>+94 776443258</span>
          </div>
          <div className="flex items-center space-x-2">
            <FaMapLocation className="text-blue-500 text-xl" />
            <span>B2, Buthpitiya, Colombo.</span>
          </div>
          <div className="flex items-center space-x-2">
            <IoIosMail className="text-blue-500 text-xl" />
            <span>sportzy@gmail.com</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SalesManage;
