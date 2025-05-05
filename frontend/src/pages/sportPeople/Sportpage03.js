import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../../components/sportPeople/Sidebar';

const SportsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [donations, setDonations] = useState([]);

  const handleSearch = () => {
    console.log('Searching for:', searchQuery);
    // Optional search logic
  };

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/sportuser');
        setDonations(res.data);
      } catch (err) {
        console.error("Error fetching donation requests:", err);
      }
    };

    fetchDonations();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left Sidebar */}
          <Sidebar />

          {/* Main Content */}
          <div className="w-full md:w-3/4">
            {/* Search Bar */}
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <div className="bg-blue-100 p-4 rounded w-full md:w-1/2">
                <h2 className="font-medium">Search</h2>
                <div className="mt-2 flex gap-2">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search..."
                    className="p-2 rounded-l w-full"
                  />
                  <button
                    onClick={handleSearch}
                    className="p-2 bg-blue-500 text-white rounded-r"
                  >
                    Search
                  </button>
                </div>
              </div>
              <button className="bg-blue-100 p-4 rounded w-full">
                Requesting a Donation
              </button>
            </div>

            {/* Donation Requests Header */}
            <div className="bg-yellow-100 p-4 rounded mb-4">
              <h2 className="font-medium text-center">DONATION REQUESTS</h2>
            </div>

            {/* List of Donations */}
            {donations.map((donation, index) => (
              <div key={index} className="bg-yellow-100 p-4 rounded mb-4 shadow-md">
                <div className="flex items-center gap-4">
                  {donation.profilePic ? (
                    <img
                      src={`http://localhost:5000/uploads/${donation.profilePic}`}
                      alt="profile"
                      className="w-16 h-16 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center">
                      <span className="text-sm text-gray-700">No Photo</span>
                    </div>
                  )}
                  <div>
                    <p><strong>Name:</strong> {donation.name}</p>
                    <p><strong>Email:</strong> {donation.email}</p>
                    <p><strong>Phone:</strong> {donation.phone}</p>
                    <p><strong>Address:</strong> {donation.address}</p>
                    <p><strong>Description:</strong> {donation.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SportsPage;
