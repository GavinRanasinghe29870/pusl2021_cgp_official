import React, { useState } from "react";

const App = () => {
  const [title, setTitle] = useState("");
  const [email, setEmail] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);

  const handleImageUpload = (event) => {
    setImage(URL.createObjectURL(event.target.files[0]));
  };

  return (
    <div className="w-full min-h-screen bg-gray-100 font-sans">
      {/* Navbar */}
      {/* <header className="bg-indigo-600 text-white p-4 text-center shadow-md">
        <h1 className="text-2xl font-semibold">Ad Posting Portal</h1>
      </header> */}

      {/* Advertisement Posting */}
      <div className="p-6 max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Post Your Advertisement</h2>
        <div className="p-6 rounded-xl shadow-md border border-yellow-200 bg-gradient-to-br from-yellow-100 to-white">
          <label className="block font-medium mb-1 text-gray-700">Title</label>
          <input
            type="text"
            placeholder="Enter Title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />

          <label className="block font-medium mb-1 text-gray-700">Images</label>
          <div className="w-full p-4 border border-gray-300 bg-gray-50 rounded text-center mb-4">
            {image ? (
              <img src={image} alt="Uploaded" className="mx-auto h-32 object-contain rounded" />
            ) : (
              <p className="text-gray-500">No image uploaded</p>
            )}
            <input type="file" onChange={handleImageUpload} className="mt-2" />
          </div>

          <label className="block font-medium mb-1 text-gray-700">Email</label>
          <input
            type="email"
            placeholder="Enter Your Email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />

          <label className="block font-medium mb-1 text-gray-700">Content</label>
          <textarea
            placeholder="Enter content here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />

          <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-2 rounded w-full transition duration-200">
            Post Advertisement
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-indigo-100 text-center text-sm p-4 text-gray-600 mt-10">
        &copy; 2025 AdPortal. All rights reserved.
      </footer>
    </div>
  );
};

export default App;
