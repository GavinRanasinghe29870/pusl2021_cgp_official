import React, { useEffect, useState } from "react";
import axios from "axios";
import { useClubAuthStore } from "../../store/useClubAuthStore";

const ReqMemberView = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { club } = useClubAuthStore();
  const clubUserId = club?._id;

  useEffect(() => {
    const fetchMemberRequests = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/members/recipient/${clubUserId}`
        );
        setMembers(response.data);
      } catch (err) {
        console.error("Error fetching members:", err);
        setError("Failed to fetch member requests.");
      } finally {
        setLoading(false);
      }
    };

    if (clubUserId) {
      fetchMemberRequests();
    }
  }, [clubUserId]);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.put(`http://localhost:5000/api/members/${id}`, {
        status: newStatus,
      });
      setMembers((prev) =>
        prev.map((m) => (m._id === id ? { ...m, status: newStatus } : m))
      );
    } catch (err) {
      console.error("Error updating status:", err);
      alert("Failed to update status.");
    }
  };

  const renderStatusBadge = (status) => {
    const badgeColors = {
      pending: { bg: "#fef3c7", text: "#92400e" },
      accepted: { bg: "#d1fae5", text: "#065f46" },
      rejected: { bg: "#fee2e2", text: "#991b1b" },
    };
    const { bg, text } = badgeColors[status] || {};
    return (
      <span
        style={{
          backgroundColor: bg,
          color: text,
          padding: "4px 10px",
          fontSize: "0.8rem",
          borderRadius: "999px",
          fontWeight: 600,
        }}
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const renderMemberCard = (member) => (
    <li
      key={member._id}
      style={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "15px",
        marginBottom: "10px",
        backgroundColor: "#1e3a8a", // dark blue
        color: "white",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div>
        <p><strong>Sender:</strong> {member.sender?.firstName || "Unknown"}</p>
        <p><strong>Recipient:</strong> {member.recipient?.ClubName || "Unknown"}</p>
        <p><strong>Status:</strong> {renderStatusBadge(member.status)}</p>
      </div>

      <div style={{ display: "flex", gap: "10px" }}>
        {member.status === "pending" ? (
          <>
            <button
              onClick={() => handleStatusChange(member._id, "accepted")}
              style={{
                backgroundColor: "#22c55e",
                color: "white",
                padding: "5px 10px",
                border: "none",
                borderRadius: "5px",
              }}
            >
              Approve
            </button>
            <button
              onClick={() => handleStatusChange(member._id, "rejected")}
              style={{
                backgroundColor: "#ef4444",
                color: "white",
                padding: "5px 10px",
                border: "none",
                borderRadius: "5px",
              }}
            >
              Reject
            </button>
          </>
        ) : (
          <button
            onClick={() => handleStatusChange(member._id, "pending")}
            style={{
              backgroundColor: "#3b82f6",
              color: "white",
              padding: "5px 10px",
              border: "none",
              borderRadius: "5px",
            }}
          >
            Move to Pending
          </button>
        )}
      </div>
    </li>
  );

  if (!clubUserId) return <p>Loading club information...</p>;
  if (loading) return <p>Loading requests...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  const requestedMembers = members.filter((m) => m.status === "pending");
  const approvedMembers = members.filter((m) => m.status === "accepted");
  const rejectedMembers = members.filter((m) => m.status === "rejected");

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <div
        style={{
          border: "1px solid #ccc",
          borderRadius: "8px",
          padding: "20px",
          backgroundColor: "#f8fafc",
        }}
      >
        <h2 style={{ fontWeight: "bold", textAlign: "center", marginBottom: "16px" }}>
          Member Requests
        </h2>

        <div style={{ marginTop: "20px" }}>
          <h3 style={{ fontWeight: "bold", marginBottom: "8px" }}>Requested Members</h3>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {requestedMembers.map(renderMemberCard)}
            {requestedMembers.length === 0 && <p>No pending requests.</p>}
          </ul>
        </div>

        <div style={{ marginTop: "20px" }}>
          <h3 style={{ fontWeight: "bold", marginBottom: "8px" }}>Approved Members</h3>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {approvedMembers.map(renderMemberCard)}
            {approvedMembers.length === 0 && <p>No approved members.</p>}
          </ul>
        </div>

        <div style={{ marginTop: "20px" }}>
          <h3 style={{ fontWeight: "bold", marginBottom: "8px" }}>Rejected Members</h3>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {rejectedMembers.map(renderMemberCard)}
            {rejectedMembers.length === 0 && <p>No rejected members.</p>}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ReqMemberView;
