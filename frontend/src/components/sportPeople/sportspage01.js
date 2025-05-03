import React, { useState } from 'react';
import '../../App.css';
import 'react-multi-carousel/lib/styles.css';

const SportPage01 = () => {
  const clubs = [
    {
      name: "Falcons Football Club",
      location: "New York, USA",
      description: "Dedicated to promoting youth football and teamwork spirit.",
      logo: "https://via.placeholder.com/80",
    },
    {
      name: "London Runners",
      location: "London, UK",
      description: "Marathon and sprint training for all ages and levels.",
      logo: "https://via.placeholder.com/80",
    },
    {
      name: "Mumbai Cricket Legends",
      location: "Mumbai, India",
      description: "Uniting cricket lovers and nurturing new talent.",
      logo: "https://via.placeholder.com/80",
    },
    {
      name: "Madrid Gymnastics Club",
      location: "Madrid, Spain",
      description: "Professional gymnastics coaching and competitions.",
      logo: "https://via.placeholder.com/80",
    },
    {
      name: "Beijing Table Tennis Hub",
      location: "Beijing, China",
      description: "World-class table tennis training and tournaments.",
      logo: "https://via.placeholder.com/80",
    },
    {
      name: "Toronto Ice Warriors",
      location: "Toronto, Canada",
      description: "Ice hockey training and friendly matches for enthusiasts.",
      logo: "https://via.placeholder.com/80",
    },
  ];

  const [searchTerm, setSearchTerm] = useState("");

  const filteredClubs = clubs.filter(club =>
    club.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 py-10 px-8">
      {/* Main Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Sidebar */}
        <div className="space-y-5">
          {[
            "Clubs",
            "Add Friend (Social Gathering)",
            "Events",
            "Donation Requesting / Donating",
          ].map((text, index) => (
            <button
              key={index}
              className="w-full py-4 px-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              {text}
            </button>
          ))}
        </div>

        {/* Search and Details Section */}
        <div className="md:col-span-2">
          <div className="relative bg-yellow-100 p-8 rounded-2xl shadow-xl">
            {/* Header with Title and Search */}
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

            {/* Club Cards */}
            <div className="grid gap-6 md:grid-cols-2">
              {filteredClubs.length > 0 ? (
                filteredClubs.map((club, idx) => (
                  <div
                    key={idx}
                    className="flex items-center bg-yellow-200 rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    <img
                      src={club.logo}
                      alt={club.name}
                      className="w-20 h-20 rounded-full object-cover border-4 border-yellow-300 mr-6"
                    />
                    <div>
                      <h3 className="font-bold text-xl text-gray-800 mb-1">{club.name}</h3>
                      <p className="text-gray-600 text-sm mb-1">📍 {club.location}</p>
                      <p className="text-gray-700 text-xs">{club.description}</p>
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

      {/* Footer */}
      {/* <Footer /> */}
    </div>
  );
};

export default SportPage01;
