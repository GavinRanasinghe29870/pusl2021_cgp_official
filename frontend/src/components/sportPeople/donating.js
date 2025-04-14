import React, { useState } from "react";
import axios from "axios";

const DonatingRequestForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    email: "",
    phone: "",
    description: "",
    profilePic: null, // New field for profile picture
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState(null); // Define imagePreview state

  // Handle input change (text and image)
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "profilePic") {
      setFormData((prev) => ({ ...prev, profilePic: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Handle file change for image preview
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, profilePic: file }));
      setImagePreview(URL.createObjectURL(file)); // Set image preview
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Use FormData to send both text and image
      const form = new FormData();
      for (const key in formData) {
        form.append(key, formData[key]);
      }

      const response = await axios.post(
        "http://localhost:5000/api/donating/DonatingRequest",
        form,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      alert("Donating request submitted successfully!");
      console.log("Response:", response.data);

      // Reset form and close modal
      setFormData({
        name: "",
        address: "",
        email: "",
        phone: "",
        description: "",
        profilePic: null,
      });
      setImagePreview(null); // Clear image preview
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error submitting form:", error.response?.data || error);
      alert("Error submitting form. Please try again later.");
    }
  };

  return (
    <div>
      {/* Open Modal Button */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-blue-500 text-white py-2 px-4 rounded-lg"
      >
        Open Donating Form
      </button>

      {/* Modal */}
      {isModalOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-gray-500 bg-opacity-50 z-10"
            onClick={() => setIsModalOpen(false)}
          ></div>

          {/* Modal Content */}
          <div className="fixed inset-0 flex justify-center items-center z-20 p-4">
            <div className="bg-blue-500 p-8 rounded-lg w-full max-w-lg relative text-white max-h-[90vh] overflow-y-auto">
              {/* Close Button */}
              <button
                className="absolute top-4 right-4 text-white text-xl"
                onClick={() => setIsModalOpen(false)}
              >
                X
              </button>

              <h2 className="text-3xl font-bold mb-6 text-center">
                Donating Request Form
              </h2>

              {/* Profile Picture Icon aligned to the top left corner */}
               <div className="flex justify-start items-start mb-4">
               <div className="relative w-24 h-24 bg-gray-400 rounded-full flex items-center justify-center">
               {imagePreview ? (
               <img
               src={imagePreview}
                  alt="Profile"
                    className="w-full h-full rounded-full object-cover"
                   />
                 ) : (
                  <span className="text-white text-2xl">👤</span>
               )}
                <label
                 htmlFor="file-input"
                className="absolute top-0 left-0 bg-gray-700 p-2 rounded-full cursor-pointer"
    >
                 📷
                 </label>
                 <input
                  type="file"
                  id="file-input"
                  accept="image/*"
                  className="hidden"
                   onChange={handleFileChange}
                 />
                   </div>
                  </div>
                        

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name of Donor */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
                  <label className="font-semibold w-full sm:w-40 text-lg mb-2 sm:mb-0" htmlFor="name">
                    Name of Donor
                  </label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg text-black"
                    placeholder="Enter name of donor..."
                    required
                  />
                </div>

                {/* Address */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
                  <label className="font-semibold w-full sm:w-40 text-lg mb-2 sm:mb-0" htmlFor="address">
                    Address
                  </label>
                  <input
                    id="address"
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg text-black"
                    placeholder="Enter address..."
                    required
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
                  <label className="font-semibold w-full sm:w-40 text-lg mb-2 sm:mb-0" htmlFor="email">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg text-black"
                    placeholder="Enter email..."
                    required
                  />
                </div>

                {/* Phone No. */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
                  <label className="font-semibold w-full sm:w-40 text-lg mb-2 sm:mb-0" htmlFor="phone">
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg text-black"
                    placeholder="Enter phone number...."
                    required
                  />
                </div>

                {/* Description Field */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
                  <label
                    htmlFor="description"
                    className="font-semibold w-full sm:w-40 text-lg mb-2 sm:mb-0"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg text-black h-36"
                    placeholder="Enter donation description..."
                    required
                  />
                </div>
                {/* Submit Button */}
                <div className="flex justify-end  bg-blue-500 py-4">
                  <button
                    type="submit"
                    className="bg-yellow-500 text-black font-bold py-3 px-4 rounded-lg hover:bg-yellow-600 transition duration-200"
                  >
                    Post
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DonatingRequestForm;
