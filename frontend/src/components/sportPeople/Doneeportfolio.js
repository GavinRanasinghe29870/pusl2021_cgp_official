import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

const DoneePortfolio = () => {
  const { id } = useParams();
  const [donee, setDonee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDoneeDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:5000/api/donation/donations/${id}`);
        setDonee(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching donee details:", err);
        setError("Failed to load donee details. Please try again later.");
        setLoading(false);
      }
    };

    fetchDoneeDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-primary-light">
        <div className="text-primary text-header-03 font-header">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-primary-light">
        <div className="text-red-500 text-header-04 mb-4 font-body">{error}</div>
        <Link to="/donations" className="bg-primary text-white py-2 px-4 rounded-lg hover:bg-opacity-90 font-body">
          Back to Donations
        </Link>
      </div>
    );
  }

  if (!donee) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-primary-light">
        <div className="text-red-500 text-header-04 mb-4 font-body">Donee not found</div>
        <Link to="/donations" className="bg-primary text-white py-2 px-4 rounded-lg hover:bg-opacity-90 font-body">
          Back to Donations
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary-light py-12 px-4 sm:px-6 lg:px-8 font-body">
      <div className="max-w-custom-900 mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header with profile picture */}
        <div className="bg-primary p-6 flex flex-col items-center sm:flex-row sm:items-start">
          <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-300 flex-shrink-0 border-4 border-white shadow-lg">
            {donee.profilePic ? (
              <img
                src={`/uploads/${donee.profilePic}`}
                alt={`${donee.name}'s profile`}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-400 text-white text-4xl">
                👤
              </div>
            )}
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-6 text-center sm:text-left">
            <h1 className="text-header-02 font-header text-white">{donee.name}</h1>
            <p className="text-primary-light mt-1">Donation Request</p>
            <p className="text-primary-light mt-1">
              Posted on: {new Date(donee.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Donation details */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-primary-light p-4 rounded-lg">
              <h3 className="text-primary font-header text-header-05 mb-2">Contact Information</h3>
              <div className="space-y-3">
                <div className="flex items-start">
                  <span className="text-primary mr-2">📧</span>
                  <div>
                    <p className="text-gray-600 text-sm font-body">Email</p>
                    <p className="text-gray-800 font-body">{donee.email}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-primary mr-2">📞</span>
                  <div>
                    <p className="text-gray-600 text-sm font-body">Phone</p>
                    <p className="text-gray-800 font-body">{donee.phone}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-primary mr-2">📍</span>
                  <div>
                    <p className="text-gray-600 text-sm font-body">Address</p>
                    <p className="text-gray-800 font-body">{donee.address}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-primary-light p-4 rounded-lg">
              <h3 className="text-primary font-header text-header-05 mb-2">Request Details</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-gray-600 text-sm font-body">Request ID</p>
                  <p className="text-gray-800 font-mono text-sm">{donee._id}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm font-body">Status</p>
                  <p className="bg-secondary-light text-primary px-2 py-1 rounded-full text-sm inline-block">
                    Pending
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 bg-primary-light p-4 rounded-lg">
            <h3 className="text-primary font-header text-header-05 mb-2">Description</h3>
            <p className="text-gray-700 whitespace-pre-line font-body">{donee.description}</p>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row justify-between gap-4">
            <Link
              to="/donations"
              className="bg-gray-200 text-gray-800 py-2 px-6 rounded-lg hover:bg-gray-300 text-center font-body"
            >
              Back to All Requests
            </Link>
            <button
              className="bg-primary text-white py-2 px-6 rounded-lg hover:bg-opacity-90 font-body"
              onClick={() => window.location.href = `mailto:${donee.email}?subject=Regarding Your Donation Request`}
            >
              Contact Donee
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoneePortfolio;