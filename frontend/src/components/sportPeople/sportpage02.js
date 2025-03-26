import React from 'react';
import '../../App.css';
import Navbar from './Navbar';
import Footer from './Footer';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const SportPage02 = () => {
  return (
    <div className="w-full min-h-screen bg-gray-100">
      {/* Navbar */}
      <Navbar />

      {/* Main Section */}
      <div className="p-8 grid grid-cols-3 gap-4">
        {/* Sidebar */}
        <div className="space-y-4">
          <div className="w-full h-12 bg-blue-300"></div>
          <div className="w-full h-12 bg-blue-300"></div>
          <div className="w-full h-12 bg-blue-300"></div>
          <div className="w-full h-12 bg-blue-300"></div>
          <div className="w-full h-12 bg-blue-300"></div>
        </div>

        {/* Search and Details Section */}
        <div className="col-span-2">
          <input
            type="text"
            placeholder="Search"
            className="w-full p-2 border border-gray-400 mb-4"
          />
          <div className="bg-yellow-100 p-4">
            <h2 className="font-bold">PERSON DETAILS</h2>
            <div className="mt-2 space-y-2">
              <div className="w-full h-12 bg-yellow-200"></div>
              <div className="w-full h-12 bg-yellow-200"></div>
              <div className="w-full h-12 bg-yellow-200"></div>
              <div className="w-full h-12 bg-yellow-200"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default SportPage02;
