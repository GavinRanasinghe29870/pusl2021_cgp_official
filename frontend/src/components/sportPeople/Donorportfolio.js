import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaMapMarkerAlt, FaEnvelope, FaPhone, FaUser, FaSearch, FaSpinner } from "react-icons/fa";

const DonorPortfolio = () => {
  const [donatings, setDonatings] = useState([]);
  const [filteredDonatings, setFilteredDonatings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCard, setSelectedCard] = useState(null);

  useEffect(() => {
    // Fetch donating requests from the backend
    const fetchDonatings = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/donating/donatings");
        setDonatings(response.data);
        setFilteredDonatings(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching donating requests:", err);
        setError("Failed to load donating requests. Please try again later.");
        setLoading(false);
      }
    };

    fetchDonatings();
  }, []);

  // Handle search functionality
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredDonatings(donatings);
    } else {
      const filtered = donatings.filter(
        (donating) =>
          donating.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          donating.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          donating.address.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredDonatings(filtered);
    }
  }, [searchTerm, donatings]);

  // Handle modal for detailed view
  const openDetailModal = (donating) => {
    setSelectedCard(donating);
  };

  const closeDetailModal = () => {
    setSelectedCard(null);
  };

  return (
    <div className="bg-gray-100 min-h-screen py-8 px-4">
      <div className="container mx-auto">
        {/* Hero Section */}
        <div className="bg-primary rounded-xl p-8 mb-8 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-20"></div>
          <div className="relative z-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center font-header">
              Donor Portfolio List
            </h1>
            <p className="text-xl text-center max-w-3xl mx-auto font-body mb-8">
              We connect generous donors with those in need. Browse our list of donors who are ready to support athletic development.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-md mx-auto relative">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by name, location, or keywords..."
                  className="w-full bg-white bg-opacity-90 text-primary py-3 px-5 pl-12 rounded-full focus:outline-none focus:ring-2 focus:ring-secondary"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary" />
              </div>
            </div>
          </div>
        </div>

        {/* Status Messages */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <FaSpinner className="animate-spin text-primary mr-2" size={24} />
            <div className="text-xl text-gray-600 font-body">Loading donating requests...</div>
          </div>
        ) : error ? (
          <div className="bg-red-100 text-red-700 p-4 rounded-lg text-center font-body">
            {error}
          </div>
        ) : filteredDonatings.length === 0 ? (
          <div className="text-center text-gray-600 my-16 font-body bg-white p-8 rounded-lg shadow-md">
            <FaSearch className="mx-auto mb-4 text-primary" size={40} />
            <p className="text-xl mb-2">No donating requests found</p>
            <p className="text-gray-500">Try adjusting your search or check back later for new donors</p>
          </div>
        ) : (
          <>
            {/* Results Count */}
            <div className="mb-6 font-body">
              <p className="text-gray-600">
                Showing <span className="font-semibold">{filteredDonatings.length}</span> potential donors
              </p>
            </div>
            
            {/* Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDonatings.map((donating) => (
                <div
                  key={donating._id}
                  className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1 cursor-pointer"
                  onClick={() => openDetailModal(donating)}
                >
                  <div className="relative h-64">
                    {donating.profilePic ? (
                      <img
                        src={`/uploads/${donating.profilePic}`}
                        alt={`${donating.name}'s profile`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "https://via.placeholder.com/400x300?text=Profile+Image";
                        }}
                      />
                    ) : (
                      <div className="w-full h-full bg-primary-light flex items-center justify-center">
                        <FaUser className="text-primary" size={60} />
                      </div>
                    )}
                    <div className="absolute top-0 right-0 m-4">
                      <span className="bg-secondary text-primary text-xs font-bold py-1 px-3 rounded-full font-body">
                        Donor
                      </span>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary to-transparent p-4">
                      <h2 className="text-white text-xl font-bold font-header">{donating.name}</h2>
                    </div>
                  </div>

                  <div className="p-6 font-body">
                    <div className="flex items-start mb-3">
                      <FaMapMarkerAlt className="text-primary mt-1 mr-3 flex-shrink-0" />
                      <p className="text-gray-700 line-clamp-1">{donating.address}</p>
                    </div>

                    <div className="border-t border-gray-200 pt-4 mt-2">
                      <h3 className="text-lg font-semibold mb-2 font-header">Description</h3>
                      <p className="text-gray-700 line-clamp-3">{donating.description}</p>
                    </div>

                    <div className="mt-4 flex justify-between items-center">
                      <button
                        className="bg-primary hover:bg-primary-light hover:text-primary text-white font-medium py-2 px-4 rounded-lg transition duration-200 text-sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          window.location.href = `mailto:${donating.email}?subject=Responding to your donating request`;
                        }}
                      >
                        Contact Donor
                      </button>
                      <button
                        className="text-primary hover:text-secondary font-medium transition duration-200 text-sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          openDetailModal(donating);
                        }}
                      >
                        View Details →
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Detailed View Modal */}
      {selectedCard && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-end p-4">
              <button 
                onClick={closeDetailModal}
                className="text-gray-500 hover:text-primary"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-6">
              <div className="flex flex-col md:flex-row gap-8">
                {/* Left column with image */}
                <div className="md:w-1/3">
                  <div className="rounded-lg overflow-hidden border border-gray-200">
                    {selectedCard.profilePic ? (
                      <img
                        src={`/uploads/${selectedCard.profilePic}`}
                        alt={`${selectedCard.name}'s profile`}
                        className="w-full h-64 object-cover"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "https://via.placeholder.com/400x300?text=Profile+Image";
                        }}
                      />
                    ) : (
                      <div className="w-full h-64 bg-primary-light flex items-center justify-center">
                        <FaUser className="text-primary" size={60} />
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Right column with details */}
                <div className="md:w-2/3">
                  <h2 className="text-2xl font-bold text-primary font-header mb-4">{selectedCard.name}</h2>
                  
                  <div className="space-y-4 font-body">
                    <div className="flex items-start">
                      <FaMapMarkerAlt className="text-primary mt-1 mr-3 flex-shrink-0" />
                      <div>
                        <h3 className="font-medium text-gray-900">Address</h3>
                        <p className="text-gray-700">{selectedCard.address}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <FaEnvelope className="text-primary mt-1 mr-3 flex-shrink-0" />
                      <div>
                        <h3 className="font-medium text-gray-900">Email</h3>
                        <p className="text-gray-700">{selectedCard.email}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <FaPhone className="text-primary mt-1 mr-3 flex-shrink-0" />
                      <div>
                        <h3 className="font-medium text-gray-900">Phone</h3>
                        <p className="text-gray-700">{selectedCard.phone}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 border-t border-gray-200 pt-6">
                <h3 className="text-xl font-semibold mb-4 font-header">Description</h3>
                <p className="text-gray-700 font-body whitespace-pre-line">{selectedCard.description}</p>
              </div>
              
              <div className="mt-8 flex justify-center">
                <button
                  className="bg-primary hover:bg-secondary hover:text-primary text-white font-bold py-3 px-8 rounded-lg transition duration-200"
                  onClick={() => window.location.href = `mailto:${selectedCard.email}?subject=Responding to your donating request`}
                >
                  Contact Donor
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DonorPortfolio;