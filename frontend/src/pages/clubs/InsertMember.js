import React from "react";

const InsertMember = () => {
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    const formData = {
      sender: "67f63ce9cfcbea3e6682e874", // User
      recipient: "6817c906410d181f75047215", // Clubuser
    };

    try {
      const response = await fetch("http://localhost:5000/api/memberTestInsert/insert-test-member", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Ensure the content is sent as JSON
        },
        body: JSON.stringify(formData), // Convert the data into JSON
      });

      const result = await response.json();

      if (response.ok) {
        alert("Test member inserted successfully!");
      } else {
        alert(result.message || "Error inserting test member");
      }
    } catch (error) {
      console.error("Error during form submission:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Insert Test Member</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem", maxWidth: "400px" }}>
        <div>
          <label>Sender ID (User):</label><br />
          <input
            type="text"
            name="sender"
            value="67f63ce9cfcbea3e6682e874"
            readOnly
          />
        </div>

        <div>
          <label>Recipient ID (Clubuser):</label><br />
          <input
            type="text"
            name="recipient"
            value="6817c906410d181f75047215"
            readOnly
          />
        </div>

        <button type="submit">Submit Member</button>
      </form>
    </div>
  );
};

export default InsertMember;
