import React from 'react';
import { useNavigate } from 'react-router-dom'; // for programmatic navigation

const Sidebar = () => {
  const navigate = useNavigate(); // Initialize the navigation hook

  return (
    <div className="space-y-5">
      <button
        onClick={() => navigate('/sport01')}
        className="w-full py-4 px-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105"
      >
        Clubs
      </button>

      <button
        onClick={() => navigate('/sport02')}
        className="w-full py-4 px-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105"
      >
        Add Friend (Social Gathering)
      </button>

      <button
        className="w-full py-4 px-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105"
      >
        Events
      </button>

      <button
        className="w-full py-4 px-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105"
      >
        Donation Requesting / Donating
      </button>
    </div>
  );
};

export default Sidebar;
