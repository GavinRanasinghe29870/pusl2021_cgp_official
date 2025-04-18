import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaMapMarkerAlt, FaEnvelope, FaPhone, FaUser } from "react-icons/fa";

const DonorPortfolio = () => {
  const [donatings, setDonatings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch donating requests from the backend
    const fetchDonatings = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/donating/donatings");
        setDonatings(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching donating requests:", err);
        setError("Failed to load donating requests. Please try again later.");
        setLoading(false);
      }
    };

    fetchDonatings();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen py-8 px-4">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center text-blue-500">
          Donor Portfolio - We Are Here To Support You
        </h1>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-xl text-gray-600">Loading donating requests...</div>
          </div>
        ) : error ? (
          <div className="bg-red-100 text-red-700 p-4 rounded-lg text-center">
            {error}
          </div>
        ) : donatings.length === 0 ? (
          <div className="text-center text-gray-600 my-16">
            <p className="text-xl">No donating requests found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {donatings.map((donating) => (
              <div
                key={donating._id}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative h-64">
                  {donating.profilePic ? (
                    <img
                      // For files in the public folder, use the root-relative path
                      src={`/uploads/${donating.profilePic}`}
                      alt={`${donating.name}'s profile`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        console.log("Image failed to load, using placeholder");
                        e.target.onerror = null;
                        e.target.src = "https://via.placeholder.com/400x300?text=Profile+Image";
                      }}
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                      <FaUser className="text-gray-500" size={60} />
                    </div>
                  )}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                    <h2 className="text-white text-xl font-bold">{donating.name}</h2>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-start mb-4">
                    <FaMapMarkerAlt className="text-blue-500 mt-1 mr-3 flex-shrink-0" />
                    <p className="text-gray-700">{donating.address}</p>
                  </div>

                  <div className="flex items-start mb-4">
                    <FaEnvelope className="text-blue-500 mt-1 mr-3 flex-shrink-0" />
                    <p className="text-gray-700">{donating.email}</p>
                  </div>

                  <div className="flex items-start mb-4">
                    <FaPhone className="text-blue-500 mt-1 mr-3 flex-shrink-0" />
                    <p className="text-gray-700">{donating.phone}</p>
                  </div>

                  <div className="border-t border-gray-200 pt-4">
                    <h3 className="text-lg font-semibold mb-2">Description</h3>
                    <p className="text-gray-700">{donating.description}</p>
                  </div>

                  <div className="mt-6">
                    <button
                      className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg transition duration-200"
                      onClick={() => window.location.href = `mailto:${donating.email}?subject=Responding to your donating request`}
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