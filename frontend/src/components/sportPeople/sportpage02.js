import React, { useState } from 'react';
import '../../App.css';
import 'react-multi-carousel/lib/styles.css';

const SportPage02 = () => {
  const persons = [
    {
      name: "John Doe",
      location: "New York, USA",
      bio: "Passionate about sports and community events. Always looking for new friends and challenges!",
      image: "https://via.placeholder.com/80",
    },
    {
      name: "Emily Smith",
      location: "London, UK",
      bio: "Avid football fan and marathon runner. Loves connecting with other sport enthusiasts.",
      image: "https://via.placeholder.com/80",
    },
    {
      name: "Raj Patel",
      location: "Mumbai, India",
      bio: "Cricket lover and social volunteer. Promotes sportsmanship among youth.",
      image: "https://via.placeholder.com/80",
    },
    {
      name: "Sofia González",
      location: "Madrid, Spain",
      bio: "Gymnast and fitness coach. Passionate about a healthy lifestyle and teamwork.",
      image: "https://via.placeholder.com/80",
    },
    {
      name: "Chen Wei",
      location: "Beijing, China",
      bio: "Table tennis champion and motivational speaker. Encourages perseverance through sports.",
      image: "https://via.placeholder.com/80",
    },
    {
      name: "Liam Brown",
      location: "Toronto, Canada",
      bio: "Ice hockey player and community leader. Believes sports bring people together.",
      image: "https://via.placeholder.com/80",
    },
  ];

  const [searchTerm, setSearchTerm] = useState("");

  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
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
            "Sports Equipment Shop",
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
              <h2 className="font-bold text-3xl text-gray-800">Person Details</h2>
              <input
                type="text"
                placeholder="Search by Name"
                className="p-2 w-56 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Person Cards */}
            <div className="grid gap-6 md:grid-cols-2">
              {filteredPersons.length > 0 ? (
                filteredPersons.map((person, idx) => (
                  <div
                    key={idx}
                    className="flex items-center bg-yellow-200 rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    <img
                      src={person.image}
                      alt={person.name}
                      className="w-20 h-20 rounded-full object-cover border-4 border-yellow-300 mr-6"
                    />
                    <div>
                      <h3 className="font-bold text-xl text-gray-800 mb-1">{person.name}</h3>
                      <p className="text-gray-600 text-sm mb-1">📍 {person.location}</p>
                      <p className="text-gray-700 text-xs">{person.bio}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-600 text-center col-span-2">No person found.</p>
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

export default SportPage02;
