import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaMapMarkerAlt, FaEnvelope, FaPhone, FaUser } from "react-icons/fa";

const DonorPortfolio = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch donation requests from the backend
    const fetchDonations = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/donation/donations");
        setDonations(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching donation requests:", err);
        setError("Failed to load donation requests. Please try again later.");
        setLoading(false);
      }
    };

    fetchDonations();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen py-8 px-4">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center text-blue-600">Donor Portfolio - We Are Here To Support You</h1>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-xl text-gray-600">Loading donation requests...</div>
          </div>
        ) : error ? (
          <div className="bg-red-100 text-red-700 p-4 rounded-lg text-center">
            {error}
          </div>
        ) : donations.length === 0 ? (
          <div className="text-center text-gray-600 my-16">
            <p className="text-xl">No donation requests found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {donations.map((donation) => (
              <div
                key={donation._id}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative">
                  {donation.profilePic ? (
                    <img
                      src={`/uploads/${donation.profilePic}`}
                      alt={`${donation.name}'s profile`}
                      className="w-full h-64 object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://via.placeholder.com/400x300?text=No+Image";
                      }}
                    />
                  ) : (
                    <div className="w-full h-64 bg-gray-300 flex items-center justify-center">
                      <FaUser className="text-gray-500" size={60} />
                    </div>
                  )}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                    <h2 className="text-white text-xl font-bold">{donation.name}</h2>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-start mb-4">
                    <FaMapMarkerAlt className="text-blue-500 mt-1 mr-3 flex-shrink-0" />
                    <p className="text-gray-700">{donation.address}</p>
                  </div>

                  <div className="flex items-start mb-4">
                    <FaEnvelope className="text-blue-500 mt-1 mr-3 flex-shrink-0" />
                    <p className="text-gray-700">{donation.email}</p>
                  </div>

                  <div className="flex items-start mb-4">
                    <FaPhone className="text-blue-500 mt-1 mr-3 flex-shrink-0" />
                    <p className="text-gray-700">{donation.phone}</p>
                  </div>

                  <div className="border-t border-gray-200 pt-4">
                    <h3 className="text-lg font-semibold mb-2">Description</h3>
                    <p className="text-gray-700">{donation.description}</p>
                  </div>

                  <div className="mt-6">
                    <button
                      className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg transition duration-200"
                      onClick={() => window.location.href = `mailto:${donation.email}?subject=Responding to your donation request`}
                    >
                      Contact
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DonorPortfolio;