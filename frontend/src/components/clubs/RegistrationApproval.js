import React, { useState, useRef, useEffect } from "react";
import { FaFileUpload, FaTimes, FaCheck, FaTimes as FaReject, FaClock } from "react-icons/fa";
import { useClubAuthStore } from "../../store/useClubAuthStore";


const RegistrationApproval = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const fileInputRef = useRef(null);
  
  // Get club data from auth store
  const { club } = useClubAuthStore();

  useEffect(() => {
    // Only fetch files if club is logged in
    if (club && club._id) {
      fetchClubFiles(club._id);
    }
  }, [club]); // Re-fetch when club changes

  // Function to fetch files for a specific club
  const fetchClubFiles = async (clubId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/registrationApproval/files/club/${clubId}`);
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedFile) {
      alert("⚠️ Please select a file before submitting.");
      return;
    }

    if (!club || !club._id) {
      alert("⚠️ You must be logged in to upload files.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("uploadedBy", club.Clubusername); // Add username from club object
    formData.append("clubId", club._id); // Add club ID

    try {
      const response = await fetch("http://localhost:5000/api/registrationApproval/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert("❌ Upload failed: " + (errorData.message || "Unknown error"));
        return;
      }

      const data = await response.json();
      alert("✅ File uploaded successfully!");

      // Refresh the club's file list
      fetchClubFiles(club._id);

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
      fetchClubFiles(club._id);
    } catch (error) {
      alert("❌ Deletion failed: " + error.message);
    }
  };

  // Function to get appropriate badge color based on status
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "accepted":
        return "bg-green-100 text-green-800 border-green-300";
      case "rejected":
        return "bg-red-100 text-red-800 border-red-300";
      default: // pending
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
    }
  };

  // Function to get appropriate icon based on status
  const StatusIcon = ({ status }) => {
    switch (status) {
      case "accepted":
        return <FaCheck className="text-green-600" />;
      case "rejected":
        return <FaReject className="text-red-600" />;
      default: // pending
        return <FaClock className="text-yellow-600" />;
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

        {/* Club Info Section */}
        <div className="mb-6 bg-white p-4 rounded-lg shadow-sm">
          {club ? (
            <div>
              <h3 className="font-semibold text-primary">Club Information</h3>
              <p className="text-gray-700">Logged in as: <span className="font-medium">{club.Clubusername}</span></p>
            </div>
          ) : (
            <div className="text-red-600">
              <p>You must be logged in to upload documents.</p>
            </div>
          )}
        </div>

        {/* File Upload Section */}
        <div className="flex flex-col items-center space-y-4">
          <label className={`bg-primary text-white font-medium py-2 px-5 rounded-lg cursor-pointer shadow-md hover:bg-secondary transition flex items-center space-x-2 ${!club && 'opacity-50 cursor-not-allowed'}`}>
            <FaFileUpload className="text-lg" />
            <span>Choose File</span>
            <input 
              type="file" 
              className="hidden" 
              ref={fileInputRef} 
              onChange={handleFileChange}
              disabled={!club} 
            />
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
          disabled={!club || !selectedFile}
          className={`bg-secondary text-gray-900 font-semibold py-2 px-6 rounded-lg shadow-lg mt-4 hover:bg-secondary-light transition ${(!club || !selectedFile) && 'opacity-50 cursor-not-allowed'}`}
        >
          Submit
        </button>

        {/* Display Uploaded Files with Status */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold">Your Uploaded Documents</h3>
          {!club ? (
            <p className="text-gray-600">Please log in to view your documents</p>
          ) : uploadedFiles.length === 0 ? (
            <p>You haven't uploaded any files yet</p>
          ) : (
            <div className="mt-4">
              <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Document</th>
                    <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Uploaded On</th>
                    <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {uploadedFiles.map((file) => (
                    <tr key={file._id} className="hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <a
                          href={file.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          {file.fileName}
                        </a>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusBadgeClass(file.status)}`}>
                          <StatusIcon status={file.status} className="mr-1" />
                          <span className="ml-1 capitalize">{file.status || "pending"}</span>
                        </span>
                        {file.remarks && (
                          <p className="text-xs text-gray-500 mt-1">{file.remarks}</p>
                        )}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-500">
                        {new Date(file.uploadedAt).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4">
                        <button
                          onClick={() => handleDeleteFile(file._id)}
                          className="bg-red-500 text-white px-2 py-1 rounded-lg hover:bg-red-700 transition"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegistrationApproval;