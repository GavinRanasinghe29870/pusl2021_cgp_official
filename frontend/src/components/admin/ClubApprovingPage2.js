import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Download } from "lucide-react";

const ClubApprovingPage2 = () => {
  const [clubs, setClubs] = useState([]);
  const location = useLocation();
  const selectedCategory = location.state?.category;

  useEffect(() => {
    const fetchClubs = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/registrationApproval/files");
        setClubs(response.data);
      } catch (error) {
        console.error("Error fetching clubs:", error);
        alert("Failed to fetch clubs. Please try again later.");
      }
    };

    fetchClubs();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/registrationApproval/status/${id}`,
        { status, remarks: "" } // Add empty remarks if needed
      );

      // Refresh the data after update
      const refreshResponse = await axios.get("http://localhost:5000/api/registrationApproval/files");
      setClubs(refreshResponse.data);

    } catch (error) {
      console.error("Error updating status:", error);
      // Optionally show an error message to the user
    }
  };

  const filteredClubs = selectedCategory
    ? clubs.filter((club) => club.sportCategory === selectedCategory)
    : clubs;

  const pendingClubs = filteredClubs.filter((club) => club.status === "pending");
  const acceptedClubs = filteredClubs.filter((club) => club.status === "accepted");

  return (
    <div className="min-h-screen bg-white px-4 py-6 md:px-12 lg:px-32">
      <h1 className="text-center text-3xl font-bold mb-10 text-[#0D1271]">
        Club Approvals - {selectedCategory || "All Categories"}
      </h1>

      <section>
        <h2 className="text-2xl font-bold mb-4 text-[#0D1271]">Pending Clubs</h2>
        {pendingClubs.length > 0 ? (
          pendingClubs.map((club) => (
            <div
              key={club._id}
              className="bg-[#0D1271] text-white rounded-md p-4 mb-4 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-md"
            >
              <div className="flex items-center flex-1">
                <img
                  src={club.logo || "/defaultProfilePic.jpg"}
                  alt={club.clubName}
                  className="w-14 h-14 rounded-full object-cover border-2 border-white"
                />
                <div className="ml-4">
                  <p className="font-bold">{club.clubName}</p>
                  <p className="text-sm">Uploaded by: {club.uploadedBy?.Clubusername || club.uploadedBy}</p>
                  <p className="text-sm">Category: {club.sportCategory}</p>
                  <p className="text-yellow-400 text-sm capitalize">{club.status}</p>
                </div>
              </div>

              <div className="flex flex-1 items-center gap-3">
                <p className="font-bold text-lg">{club.fileName}</p>
                <a
                  href={club.fileUrl}
                  download={club.fileName}
                  className="bg-secondary hover:bg-yellow-500 text-black font-semibold px-4 py-2 rounded-md flex items-center gap-2"
                >
                  <Download className="text-black" />
                  Download PDF
                </a>
              </div>

              <div className="flex flex-1 justify-end gap-2">
                <button
                  className="bg-secondary hover:bg-yellow-500 text-black font-semibold px-4 py-2 rounded-md"
                  onClick={() => updateStatus(club._id, "accepted")}
                >
                  Approve
                </button>
                <button
                  className="bg-secondary hover:bg-yellow-500 text-black font-semibold px-4 py-2 rounded-md"
                  onClick={() => updateStatus(club._id, "rejected")}
                >
                  Decline
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-left py-14 text-gray-500">No pending requests</p>
        )}
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4 text-[#0D1271]">Accepted Clubs</h2>
        {acceptedClubs.map((club) => (
          <div
            key={club._id}
            className="bg-[#0D1271] text-white rounded-md p-4 mb-4 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-md"
          >
            <div className="flex items-center flex-1">
              <img
                src={club.logo || "/defaultProfilePic.jpg"}
                alt={club.clubName}
                className="w-14 h-14 rounded-full object-cover border-2 border-white"
              />
              <div className="ml-4">
                <p className="font-bold">{club.clubName}</p>
                <p className="text-sm">Uploaded by: {club.uploadedBy?.Clubusername || club.uploadedBy}</p>
                <p className="text-sm">Category: {club.sportCategory}</p>
                <p className="text-green-500 text-sm capitalize">{club.status}</p>
              </div>
            </div>

            <div className="flex flex-1 items-center gap-3">
              <p className="font-bold text-lg">{club.fileName}</p>
            </div>

            <div className="flex flex-1 justify-end gap-2">
              <a
                href={club.fileUrl}
                download={club.fileName}
                className="bg-secondary hover:bg-yellow-500 text-black font-semibold px-4 py-2 rounded-md flex items-center gap-2"
              >
                <Download className="text-black" />
              </a>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default ClubApprovingPage2;