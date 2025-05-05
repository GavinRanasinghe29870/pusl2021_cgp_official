import React, { useEffect, useState } from "react";
import { FaUserCircle, FaEnvelope, FaFutbol } from "react-icons/fa";

export default function RegClubs() {
  const [user, setUser] = useState(null);
  const userId = "67f62a352f22fc904112409f";

  useEffect(() => {
    fetch(`http://localhost:5000/api/regclubs/${userId}`)
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch((err) => console.error("Error fetching user data", err));
  }, []);

  if (!user) {
    return <div className="text-center mt-10 text-gray-600">Loading...</div>;
  }

  return (
    <div className="min-h-screen py-12 px-6 bg-[#D4E4FE]">
      <h1 className="text-4xl font-extrabold text-[#0D1271] text-center mb-10">
        Registered Clubs
      </h1>

      {user.registeredClubs && user.registeredClubs.length > 0 ? (
        <div className="grid md:grid-cols-2 gap-8 ml-8">
          {user.registeredClubs.map((club) => (
            <div
              key={club._id}
              className="bg-white shadow-md rounded-2xl p-6 border-l-8 border-[#F5E12F] hover:shadow-xl transition duration-300"
            >
              <h2 className="text-xl font-bold text-[#0D1271] mb-3">
                {club.ClubName}
              </h2>
              <div className="flex items-center text-sm text-gray-700 mb-2">
                <FaUserCircle className="text-[#F5E12F] mr-2" />
                <strong className="mr-1">Username:</strong> {club.Clubusername}
              </div>
              <div className="flex items-center text-sm text-gray-700 mb-2">
                <FaEnvelope className="text-[#F5E12F] mr-2" />
                <strong className="mr-1">Email:</strong> {club.email}
              </div>
              <div className="flex items-center text-sm text-gray-700">
                <FaFutbol className="text-[#F5E12F] mr-2" />
                <strong className="mr-1">Sport:</strong> {club.sportCategory}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">No registered clubs found.</p>
      )}
    </div>
  );
}
