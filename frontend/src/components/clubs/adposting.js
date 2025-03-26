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
    <div className="w-full min-h-screen bg-yellow-300">
      {/* Navbar */}
      <nav className="bg-blue-200 p-4 flex justify-between items-center">
        <h1 className="text-lg font-bold">LOGO</h1>
        <div className="flex space-x-4">
          <a href="#" className="font-bold border-b-2 border-black">Home</a>
          <a href="#">Help Center</a>
          <a href="#">Club Center</a>
          <a href="#">Friend Zone</a>
          <a href="#">Shop</a>
        </div>
      </nav>

      {/* Advertisement Posting */}
      <div className="p-8">
        <h2 className="text-xl font-bold text-center">Advertisement Posting</h2>
        <div className="bg-yellow-600 p-6 mt-4">
          <label className="block font-bold">Title</label>
          <input
            type="text"
            placeholder="Enter Title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border border-gray-400 mb-4"
          />

          <label className="block font-bold">Images</label>
          <div className="w-full p-4 border border-gray-400 bg-white text-center mb-4">
            {image ? <img src={image} alt="Uploaded" className="mx-auto h-32" /> : <p>Upload...</p>}
            <input type="file" onChange={handleImageUpload} className="mt-2" />
          </div>

          <label className="block font-bold">Email</label>
          <input
            type="email"
            placeholder="Enter Your Email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-400 mb-4"
          />

          <label className="block font-bold">Content</label>
          <textarea
            placeholder="Enter content here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-2 border border-gray-400 mb-4"
          />

          <button className="bg-blue-900 text-white px-6 py-2 block mx-auto">Post</button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-blue-200 p-4 text-center mt-8">
        
      </footer>
    </div>
  );
};

export default App;
