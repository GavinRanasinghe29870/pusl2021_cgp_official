import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import '../../App.css';
import 'react-multi-carousel/lib/styles.css';

const SportPage02 = () => {
  const [persons, setPersons] = useState([]);  // State for storing members
  const [searchTerm, setSearchTerm] = useState("");  // State for handling search
  const [loading, setLoading] = useState(true); // Loading state for fetch operation

  useEffect(() => {
    const fetchPersons = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/sportPeople/members/approved');
            console.log("Fetched approved members:", res.data);  // Log the response data
            setPersons(res.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching approved members", error);
            setLoading(false);
        }
    };
    fetchPersons();
  }, []);
  



  // Filter persons by the search term
  const filteredPersons = persons.filter(person =>
    (person.name || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 py-10 px-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Sidebar Component */}
        <Sidebar />

        {/* Search and Member Details Section */}
        <div className="md:col-span-2">
          <div className="relative bg-yellow-100 p-8 rounded-2xl shadow-xl">
            <div className="flex justify-between items-center mb-8">
              <h2 className="font-bold text-3xl text-gray-800">Member Details</h2>
              <input
                type="text"
                placeholder="Search by Member Name"
                className="p-2 w-56 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Show loading message if fetching data */}
            {loading && <p className="text-gray-600 text-center col-span-2">Loading members...</p>}

            <div className="grid gap-6 md:grid-cols-2">
              {filteredPersons.length > 0 ? (
                filteredPersons.map((person) => (
                  <div
                    key={person._id}
                    className="flex items-center bg-yellow-200 rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    <img
                      src={`http://localhost:5000${person.image}`}  // Add full server URL
                      alt={person.name}
                      className="w-20 h-20 rounded-full object-cover border-4 border-yellow-300 mr-6"
                    />

                    <div>
                      <h3 className="font-bold text-xl text-gray-800 mb-1">{person.name}</h3>
                      <p className="text-gray-600 text-sm mb-1">📍 {person.location}</p>
                      <p className="text-gray-700 text-xs">{person.experience}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-600 text-center col-span-2">No approved members found.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SportPage02;
