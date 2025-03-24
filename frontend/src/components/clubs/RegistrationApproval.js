import React, { useState, useRef, useEffect } from "react";
import { FaFileUpload, FaTimes } from "react-icons/fa"; // Font Awesome icons

const RegistrationApproval = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]); // State for storing files
  const [username, setUsername] = useState(""); // State for username
  const fileInputRef = useRef(null); // Reference to the file input

  useEffect(() => {
    // Only fetch files if username is provided
    if (username) {
      fetchUserFiles(username);
    }
  }, [username]); // Re-fetch when username changes

  // Function to fetch files for a specific user
  const fetchUserFiles = async (username) => {
    try {
      const response = await fetch(`http://localhost:5000/api/registrationApproval/files/${username}`);
      if (!response.ok) throw new Error("Failed to fetch files");
      const files = await response.json();
      setUploadedFiles(files);
    } catch (error) {
      console.error("Error fetching files:", error);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    // Check if the file is a PDF
    if (file && file.type !== "application/pdf") {
      alert("❌ Incorrect file format! Please upload a PDF file.");
      event.target.value = ""; // Reset file input
      return;
    }

    setSelectedFile(file);
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Reset file input value
    }
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedFile) {
      alert("⚠️ Please select a file before submitting.");
      return;
    }

    if (!username) {
      alert("⚠️ Please enter your club username before submitting.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("uploadedBy", username); // Add username to form data

    try {
      const response = await fetch("http://localhost:5000/api/registrationApproval/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text(); // Read error message
        alert("❌ Upload failed: " + errorText);
        return;
      }

      const data = await response.json();
      alert("✅ File uploaded successfully!");

      // Refresh the user's file list
      fetchUserFiles(username);

      // Reset file input
      setSelectedFile(null);
      fileInputRef.current.value = "";
    } catch (error) {
      alert("❌ Upload failed: " + error.message);
    }
  };

  const handleDeleteFile = async (fileId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this file?");
    if (!confirmDelete) return;
  
    try {
      const response = await fetch(`http://localhost:5000/api/registrationApproval/delete/${fileId}`, {
        method: "DELETE",
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        alert("❌ Deletion failed: " + errorText);
        return;
      }
  
      alert("✅ File deleted successfully!");
      // Update file list after deletion
      fetchUserFiles(username);
    } catch (error) {
      alert("❌ Deletion failed: " + error.message);
    }
  };
  
  return (
    <div className="w-full min-h-screen bg-primary-light flex flex-col items-center py-10 px-4 font-body">
      {/* Club Registration Policy */}
      <div className="w-full max-w-custom-1200 bg-[#FBF6E9] text-gray-900 p-8 rounded-xl shadow-lg text-center">
        <h1 className="text-header-02 font-header font-bold text-primary mb-6">Club Registration Policy</h1>
        <div className="text-left space-y-6">
          <div>
            <h2 className="text-header-04 font-semibold">1. Membership and Registration Policy</h2>
            <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
              <li>Eligibility: Specify age requirements, skill levels, or other qualifications for joining.</li>
              <li>Registration Requirements: Outline the information needed to create an account.</li>
              <li>Membership Types and Fees: Explain different membership levels and associated fees.</li>
              <li>Renewals and Cancellations: Provide instructions for renewing memberships.</li>
            </ul>
          </div>
          <div>
            <h2 className="text-header-04 font-semibold">2. Code of Conduct</h2>
            <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
              <li>Sportsmanship: Emphasize respect, fair play, and good conduct.</li>
              <li>Prohibited Behavior: No harassment, abusive language, or discrimination.</li>
              <li>Consequences: Violations may result in warnings, suspensions, or bans.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Document Submission Section */}
      <div className="w-full max-w-custom-900 bg-[#FBF6E9] p-8 rounded-xl shadow-lg mt-8 text-center">
        <h2 className="text-header-03 font-bold text-primary">Submit your Documents</h2>
        <p className="text-gray-600 text-sm mb-4">(Only PDF files are accepted)</p>

        {/* Username Field */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Your Club Username"
            value={username}
            onChange={handleUsernameChange}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary w-full max-w-md"
          />
          <p className="text-gray-600 text-sm mt-1">
            Enter your username to see your uploaded documents and to submit new ones
          </p>
        </div>

        {/* File Upload Section */}
        <div className="flex flex-col items-center space-y-4">
          <label className="bg-primary text-white font-medium py-2 px-5 rounded-lg cursor-pointer shadow-md hover:bg-secondary transition flex items-center space-x-2">
            <FaFileUpload className="text-lg" />
            <span>Choose File</span>
            <input type="file" className="hidden" ref={fileInputRef} onChange={handleFileChange} />
          </label>

          {selectedFile && (
            <div className="flex items-center space-x-2 bg-gray-200 px-3 py-1 rounded-lg">
              <p className="text-gray-700">{selectedFile.name}</p>
              <button
                onClick={handleRemoveFile}
                className="text-red-600 hover:text-red-800"
                aria-label="Remove file"
              >
                <FaTimes />
              </button>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="bg-secondary text-gray-900 font-semibold py-2 px-6 rounded-lg shadow-lg mt-4 hover:bg-secondary-light transition"
        >
          Submit
        </button>

        {/* Display Uploaded Files */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold">Your Uploaded Documents</h3>
          {!username ? (
            <p className="text-gray-600">Please enter your username to view your documents</p>
          ) : uploadedFiles.length === 0 ? (
            <p>You haven't uploaded any files yet</p>
          ) : (
            <ul className="list-disc list-inside">
              {uploadedFiles.map((file) => (
                <li key={file._id} className="flex justify-between items-center my-2">
                  <a
                    href={file.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    {file.fileName}
                  </a>
                  <button
                    onClick={() => handleDeleteFile(file._id)}
                    className="bg-red-500 text-white px-2 py-1 rounded-lg ml-4 hover:bg-red-700 transition"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegistrationApproval;