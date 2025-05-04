import React, { useState } from "react";

const AdPosting = () => {
  const [title, setTitle] = useState("");
  const [email, setEmail] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [message, setMessage] = useState("");

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file)); // Preview image before submitting
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("email", email);
    formData.append("content", content);
    if (image) {
      formData.append("image", image);
    }

    try {
      const response = await fetch("http://localhost:5000/api/adposts", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Advertisement posted successfully!");
        setTitle("");
        setEmail("");
        setContent("");
        setImage(null);
        setPreview(null);
      } else {
        setMessage(data.error || "Failed to post advertisement.");
      }
    } catch (error) {
      console.error("Error posting ad:", error);
      setMessage("An error occurred.");
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-100 font-sans">
      {/* Advertisement Posting */}
      <div className="p-6 max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Post Your Advertisement</h2>

        {message && (
          <div className="mb-4 text-center text-sm text-green-600 font-semibold">{message}</div>
        )}

        <form
          onSubmit={handleSubmit}
          className="p-6 rounded-xl shadow-md border border-yellow-200 bg-gradient-to-br from-yellow-100 to-white"
          encType="multipart/form-data"
        >
          <label className="block font-medium mb-1 text-gray-700">Title</label>
          <input
            type="text"
            placeholder="Enter Title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />

          <label className="block font-medium mb-1 text-gray-700">Image</label>
          <div className="w-full p-4 border border-gray-300 bg-gray-50 rounded text-center mb-4">
            {preview ? (
              <img src={preview} alt="Preview" className="mx-auto h-32 object-contain rounded" />
            ) : (
              <p className="text-gray-500">No image uploaded</p>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="mt-2"
            />
          </div>

          <label className="block font-medium mb-1 text-gray-700">Email</label>
          <input
            type="email"
            placeholder="Enter Your Email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />

          <label className="block font-medium mb-1 text-gray-700">Content</label>
          <textarea
            placeholder="Enter content here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />

          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-2 rounded w-full transition duration-200"
          >
            Post Advertisement
          </button>
        </form>
      </div>

      {/* Footer */}
      <footer className="bg-indigo-100 text-center text-sm p-4 text-gray-600 mt-10">
        &copy; 2025 AdPortal. All rights reserved.
      </footer>
    </div>
  );
};

export default AdPosting;
