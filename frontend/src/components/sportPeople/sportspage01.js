import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import '../../App.css';
import { useNavigate } from "react-router-dom";


const responsive = {
  desktop: { breakpoint: { max: 3000, min: 1024 }, items: 2 },
  tablet: { breakpoint: { max: 1024, min: 768 }, items: 1 },
  mobile: { breakpoint: { max: 768, min: 0 }, items: 1 }
};

const SportPage01 = () => {
  const [clubs, setClubs] = useState([]);
  const [ads, setAds] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  // Fetch clubs
  useEffect(() => {
    const fetchClubs = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/clubs');
        setClubs(res.data);
      } catch (err) {
        console.error("Error fetching clubs:", err);
      }
    };
    fetchClubs();
  }, []);

  // Fetch ads
  useEffect(() => {
    const fetchAds = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/adposts/all');
        setAds(res.data);
      } catch (err) {
        console.error("Error fetching ads:", err);
      }
    };
    fetchAds();
  }, []);

  const filteredClubs = clubs.filter(club =>
    club.clubName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle club click and navigate to ClubPortfolio
  const handleClubClick = (clubId) => {
    navigate(`/ClubPortfolio/${clubId}`);
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 py-10 px-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Sidebar />

        {/* Main content */}
        <div className="md:col-span-2">
          <div className="relative bg-yellow-100 p-8 rounded-2xl shadow-xl">
            
            {/* 🟡 Advertisement Carousel inside container but above search bar */}
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Sponsored Ads</h3>
            {ads.length > 0 ? (
              <Carousel responsive={responsive} autoPlay infinite autoPlaySpeed={4000}>
                {ads.map((ad, index) => (
                  <div key={index} className="bg-white rounded-xl shadow-md p-4 mx-2 h-full">
                    <img
                      src={`http://localhost:5000/uploads/post_images/${ad.image}`}
                      alt={ad.title}
                      className="w-full h-40 object-cover rounded-md mb-3"
                    />
                    <h4 className="font-bold text-lg text-gray-700 mb-1">{ad.title}</h4>
                    <p className="text-sm text-gray-600 mb-1">{ad.content}</p>
                    <p className="text-xs text-gray-400 italic">📧 {ad.email}</p>
                  </div>
                ))}
              </Carousel>
            ) : (
              <p className="text-gray-500">No advertisements available.</p>
            )}

            {/* Add some space between ads and club details */}
            <div className="mb-6"></div>

            {/* Search bar and Club Details */}
            <div className="flex justify-between items-center mb-8">
              <h2 className="font-bold text-3xl text-gray-800">Club Details</h2>
              <input
                type="text"
                placeholder="Search by Club Name"
                className="p-2 w-56 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="grid gap-6 md:grid-cols-2 mb-10">
              {filteredClubs.length > 0 ? (
                filteredClubs.map((club, idx) => (
                  <div
                    key={idx}
                    className="flex items-center bg-yellow-200 rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300"
                    onClick={() => handleClubClick(club._id)} // Add onClick handler
                  >
                    <img
                      src={club.logo || "https://via.placeholder.com/80"}
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
