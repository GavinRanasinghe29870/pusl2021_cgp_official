import React, { useState, useRef } from "react";
import { FaFileUpload, FaTimes } from "react-icons/fa"; // Font Awesome icons

const RegistrationApproval = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null); // Reference to the file input

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

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!selectedFile) {
      alert("⚠️ Please select a file before submitting.");
      return;
    }

    if (selectedFile.type !== "application/pdf") {
      alert("❌ Incorrect file format! Please upload a PDF file.");
      return;
    }

    alert("✅ File submitted successfully: " + selectedFile.name);
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

        {/* File Upload Section - Centering */}
        <div className="flex flex-col items-center space-y-4">
          {/* Choose File Button with Icon */}
          <label className="bg-primary text-white font-medium py-2 px-5 rounded-lg cursor-pointer shadow-md hover:bg-secondary transition flex items-center space-x-2">
            <FaFileUpload className="text-lg" />
            <span>Choose File</span>
            <input
              type="file"
              className="hidden"
              ref={fileInputRef} // Attach ref to input
              onChange={handleFileChange}
            />
          </label>

          {/* Display Selected File Name with Remove Option */}
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
      </div>
    </div>
  );
};

export default RegistrationApproval;
