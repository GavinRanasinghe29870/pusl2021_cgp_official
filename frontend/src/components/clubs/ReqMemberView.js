// RequestedMembers.js
import React, { useEffect, useState } from "react";
import axios from "axios";

// Member Card Component
const MemberCard = ({ member, onApprove, onReject }) => (
  <div className="bg-blue-900 text-white p-4 rounded-lg flex items-center space-x-4 mb-4">
    {/* Member Image */}
    <img
      src={member.image ? `http://localhost:5000${member.image}` : "/default-avatar.png"}
      alt={member.name || "Member"}
      className="w-16 h-16 rounded-full border-2 border-white"
    />

    {/* Member Details */}
    <div className="flex-1">
      <h3 className="text-lg font-bold">{member.name || "Unknown"}</h3>
      <p className="text-sm">{member.location || "Location not available"}</p>
      <p className="text-xs mt-1">{member.experience || "No experience specified"}</p>
    </div>

    {/* Action Buttons */}
    <div className="flex flex-col space-y-2">
      <button className="bg-yellow-400 text-black px-4 py-1 rounded">{member.status || "Pending"}</button>
      <button onClick={() => onApprove(member._id)} className="bg-green-500 text-white px-4 py-1 rounded">Approve</button>
      <button onClick={() => onReject(member._id)} className="bg-red-500 text-white px-4 py-1 rounded">Reject</button>
    </div>
  </div>
);

const RequestedMembers = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch Members from API
  const fetchMembers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/req/members");
      setMembers(response.data);
    } catch (error) {
      console.error("Error fetching members:", error);
      setError("Failed to fetch members. Please check the API.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  // Approve Member
  const handleApprove = async (id) => {
    try {
      await axios.post(`http://localhost:5000/api/req/members/${id}/approve`);
      fetchMembers(); // Refresh list after approval
    } catch (error) {
      console.error("Error approving member:", error);
    }
  };

  // Reject Member
  const handleReject = async (id) => {
    try {
      await axios.post(`http://localhost:5000/api/req/members/${id}/reject`);
      fetchMembers(); // Refresh list after rejection
    } catch (error) {
      console.error("Error rejecting member:", error);
    }
  };

  if (loading) return <p>Loading members...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Requested Members</h2>
      {members.length === 0 ? (
        <p>No requested members available.</p>
      ) : (
        members.map((member) => (
          <MemberCard key={member._id} member={member} onApprove={handleApprove} onReject={handleReject} />
        ))
      )}
    </div>
  );
};

export default RequestedMembers;
