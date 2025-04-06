import React, { useEffect, useState } from "react";
import axios from "axios";

// Member Card Component
const MemberCard = ({ member, onApprove, onReject, onMoveToPending }) => (
  <div className="bg-blue-900 text-white p-4 rounded-lg flex items-center space-x-4 mb-4">
    <img
      src={member.image ? `http://localhost:5000${member.image}` : "/default-avatar.png"}
      alt={member.name || "Member"}
      className="w-16 h-16 rounded-full border-2 border-white"
    />
    <div className="flex-1">
      <h3 className="text-lg font-bold">{member.name || "Unknown"}</h3>
      <p className="text-sm">{member.location || "Location not available"}</p>
      <p className="text-xs mt-1">{member.experience || "No experience specified"}</p>
    </div>
    <div className="flex flex-col space-y-2">
      {/* Only show Approve/Reject buttons for Pending members */}
      {member.status === "Pending" && (
        <>
          <button onClick={() => onApprove(member._id)} className="bg-green-500 text-white px-4 py-1 rounded">
            Approve
          </button>
          <button onClick={() => onReject(member._id)} className="bg-red-500 text-white px-4 py-1 rounded">
            Reject
          </button>
        </>
      )}
      {/* Allow changing status for Approved/Rejected members */}
      {member.status !== "Pending" && (
        <button onClick={() => onMoveToPending(member._id)} className="bg-gray-500 text-white px-4 py-1 rounded">
          Move to Pending
        </button>
      )}
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

  // Move Approved/Rejected member back to Pending
  const handleMoveToPending = async (id) => {
    try {
      await axios.post(`http://localhost:5000/api/req/members/${id}/pending`);
      fetchMembers(); // Refresh list after moving back
    } catch (error) {
      console.error("Error moving member to pending:", error);
    }
  };

  if (loading) return <p>Loading members...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  // Filter Members
  const pendingMembers = members.filter((m) => m.status === "Pending");
  const approvedMembers = members.filter((m) => m.status === "Approved");
  const rejectedMembers = members.filter((m) => m.status === "Rejected");

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Requested Members</h2>
      {pendingMembers.length === 0 ? (
        <p>No pending members.</p>
      ) : (
        pendingMembers.map((member) => (
          <MemberCard key={member._id} member={member} onApprove={handleApprove} onReject={handleReject} />
        ))
      )}

      <h2 className="text-2xl font-bold mt-8 mb-4">Approved Members</h2>
      {approvedMembers.length === 0 ? (
        <p>No approved members.</p>
      ) : (
        approvedMembers.map((member) => (
          <MemberCard key={member._id} member={member} onMoveToPending={handleMoveToPending} />
        ))
      )}

      <h2 className="text-2xl font-bold mt-8 mb-4">Rejected Members</h2>
      {rejectedMembers.length === 0 ? (
        <p>No rejected members.</p>
      ) : (
        rejectedMembers.map((member) => (
          <MemberCard key={member._id} member={member} onMoveToPending={handleMoveToPending} />
        ))
      )}
    </div>
  );
};

export default RequestedMembers;
