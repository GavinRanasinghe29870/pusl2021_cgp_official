import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import '../../App.css';
import 'react-multi-carousel/lib/styles.css';

const SportPage01 = () => {
  const [clubs, setClubs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch clubs from backend
  useEffect(() => {
    const fetchClubs = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/clubs');
        console.log("Fetched Clubs:", res.data);  // Log the fetched clubs
        setClubs(res.data);
      } catch (err) {
        console.error("Error fetching clubs:", err);  // Log any errors
      }
    };

    fetchClubs();
  }, []);

  // Filter clubs by search term
  const filteredClubs = clubs.filter(club =>
    club.clubName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  console.log("Filtered Clubs:", filteredClubs);  // Log filtered clubs

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 py-10 px-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Sidebar Component */}
        <Sidebar />

        {/* Search and Details Section */}
        <div className="md:col-span-2">
          <div className="relative bg-yellow-100 p-8 rounded-2xl shadow-xl">
            <div className="flex justify-between items-center mb-8">
              <h2 className="font-bold text-3xl text-gray-800">Club Details</h2>
              <input
                type="text"
                placeholder="Search by Club Name"
                className="p-2 w-56 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  console.log("Search Term:", e.target.value);
                }}
              />
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {filteredClubs.length > 0 ? (
                filteredClubs.map((club, idx) => (
                  <div
                    key={idx}
                    className="flex items-center bg-yellow-200 rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    <img
                      src={club.logo || "https://via.placeholder.com/80"} // Default logo if missing
                      alt={club.clubName}
                      className="w-20 h-20 rounded-full object-cover border-4 border-yellow-300 mr-6"
                    />
                    <div>
                      <h3 className="font-bold text-xl text-gray-800 mb-1">{club.clubName}</h3>
                      <p className="text-gray-600 text-sm mb-1">📍 {club.location || "No location provided"}</p>
                      <p className="text-gray-700 text-xs">{club.description || "No description provided"}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-600 text-center col-span-2">No club found.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SportPage01;
