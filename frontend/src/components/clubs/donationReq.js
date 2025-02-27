

import React, { useState } from "react";

const DonationRequestForm = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [description, setDescription] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "name") setName(value);
    if (name === "address") setAddress(value);
    if (name === "email") setEmail(value);
    if (name === "phone") setPhone(value);
    if (name === "description") setDescription(value);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicture(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted", {
      name,
      address,
      email,
      phone,
      description,
      profilePicture,
    });
    setIsModalOpen(false);
  };

  return (
    <div>
      {/* Button to open modal */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-blue-500 text-white py-2 px-4"
      >
        Open Donation Form
      </button>

      {isModalOpen && (
        <>
          <div
            className="fixed inset-0 bg-gray-500 bg-opacity-50 z-10"
            onClick={() => setIsModalOpen(false)}
          ></div>

          <div className="fixed inset-0 flex justify-center items-center z-20">
            <div className="bg-blue-500 p-8 rounded-lg w-full max-w-lg relative text-white">
              <button
                className="absolute top-4 right-4 text-white text-xl"
                onClick={() => setIsModalOpen(false)}
              >
                X
              </button>

              {/* Title */}
              <h2 className="text-3xl font-bold mb-6 flex items-center justify-center">
                Donation Request Form
              </h2>

              {/* Profile Image Upload */}
              <div className="relative w-20 h-20 bg-gray-400 rounded-full flex items-center justify-center mb-4">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Profile"
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <span className="text-white">👤</span>
                )}

                <label
                  htmlFor="file-input"
                  className="absolute bottom-0 right-0 bg-gray-700 p-1 rounded-full cursor-pointer"
                >
                  📷
                </label>
                <input
                  type="file"
                  id="file-input"
                  name="profilePicture"
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {[
                  { label: "Name of the Donee", name: "name", value: name, placeholder: "Enter Your Name..." },
                  { label: "Address", name: "address", value: address, placeholder: "Enter Your Address..." },
                  { label: "Email", name: "email", value: email, placeholder: "Enter Your Email..." },
                  { label: "Phone Number", name: "phone", value: phone, placeholder: "Enter Your Phone Number..." },
                ].map((field) => (
                  <div
                    key={field.name}
                    className="flex flex-col sm:flex-row sm:items-center sm:space-x-4"
                  >
                    <label className="font-semibold w-full sm:w-40 text-lg mb-2 sm:mb-0">
                      {field.label}
                    </label>
                    <input
                      type="text"
                      name={field.name}
                      value={field.value}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-white"
                      placeholder={field.placeholder}
                      required
                    />
                  </div>
                ))}

                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
                  <label className="font-semibold w-full sm:w-40 text-lg mb-2 sm:mb-0">Donation Description</label>
                  <textarea
                    name="description"
                    value={description}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-white h-36"
                    placeholder="Enter your Donation Description..."
                    required
                  />
                </div>

                <div className="flex justify-end">
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

export default DonationRequestForm;
