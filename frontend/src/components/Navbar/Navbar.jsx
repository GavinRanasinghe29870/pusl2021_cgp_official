import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-gray-100 py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-6">
        {/* Logo */}
        <h1 className="text-xl font-bold">LOGO</h1>

        {/* Navigation Links */}
        <ul className="hidden md:flex space-x-6 text-gray-600">
          <li><a href="#">Home</a></li>
          <li><a href="#">Image Gallery</a></li>
          <li><a href="#">Core Center</a></li>
          <li><a href="#">Football Zone</a></li>
          <li><a href="#">Shop</a></li>
        </ul>

        {/* Search & User Icon */}
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Search..."
            className="px-3 py-1 border rounded-md"
          />
          <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
