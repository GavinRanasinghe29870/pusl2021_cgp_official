import React from "react";
import "../../App.css";
import { BsFillTelephoneFill } from "react-icons/bs";
import { FaMapLocation } from "react-icons/fa6";
import { IoIosMail } from "react-icons/io";

const SalesManage = () => {
  return (
    <div className="bg-white min-h-screen font-sans">
      <div className="p-6 mt-8">
        <h1 className="text-2xl font-bold mb-4">Order</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full border bg-blue-100 border-300 rounded-lg">
            <thead className="bg-white">
              <tr className="border-b bg-blue-100">
                <th className="py-2 px-4 border text-left border-black">#</th>
                <th className="py-2 px-4 border text-left border-black">
                  Order ID
                </th>
                <th className="py-2 px-4 border text-left border-black">
                  Product Name
                </th>
                <th className="py-2 px-4 border text-left border-black">
                  Address
                </th>
                <th className="py-2 px-4 border text-left border-black">
                  Date
                </th>
                <th className="py-2 px-4 border text-left border-black">
                  Price
                </th>
                <th className="py-2 px-4 border text-left border-black">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b table-fixed bg-blue-100 border-black">
                <td className="py-3 px-4 border border-black">2</td>
                <td className="py-3 px-4 border font-bold border-black">
                  1866
                </td>
                <td className="py-3 px-4 border border-black">
                  <div className="font-bold border-black">
                    Leather white ball
                  </div>
                </td>
                <td className="py-3 px-4 border border-black">
                  Rajapaksha Trade Center, Mahena, Warakapola
                </td>
                <td className="py-3 px-4 border border-black">6/12/2024</td>
                <td className="py-3 px-4 border border-black">4000/=</td>
                <td className="py-3 px-4 border border-black">Delivered</td>
              </tr>
              <tr className="border-b bg-blue-100 border-black">
                <td className="py-3 px-4 border border-black">3</td>
                <td className="py-3 px-4 border font-bold border-black">
                  1867
                </td>
                <td className="py-3 px-4 border border-black">
                  <div className="font-bold border-black">MRF Cricket bat</div>
                </td>
                <td className="py-3 px-4 border border-black">
                  C 12/3 Kandy road, Mahena, Warakapola
                </td>
                <td className="py-3 px-4 border border-black">test</td>
                <td className="py-3 px-4 border border-black">test</td>
                <td className="py-3 px-4 border border-black">test</td>
              </tr>
              <tr className="border-b bg-blue-100 border-black">
                <td className="py-3 px-4 border border-black">4</td>
                <td className="py-3 px-4 border font-bold border-black">
                  test
                </td>
                <td className="py-3 px-4 border border-black">
                  <div className="font-bold border-black">test</div>
                </td>
                <td className="py-3 px-4 border border-black">test</td>
                <td className="py-3 px-4 border border-black">test</td>
                <td className="py-3 px-4 border border-black">test</td>
                <td className="py-3 px-4 border border-black">test</td>
              </tr>
              <tr className="border-b bg-blue-100 border-black">
                <td className="py-3 px-4 border border-black">3</td>
                <td className="py-3 px-4 border font-bold border-black">
                  test
                </td>
                <td className="py-3 px-4 border border-black">
                  <div className="font-bold border-black">test</div>
                </td>
                <td className="py-3 px-4 border border-black">test</td>
                <td className="py-3 px-4 border border-black">test</td>
                <td className="py-3 px-4 border border-black">test</td>
                <td className="py-3 px-4 border border-black">test</td>
              </tr>
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
