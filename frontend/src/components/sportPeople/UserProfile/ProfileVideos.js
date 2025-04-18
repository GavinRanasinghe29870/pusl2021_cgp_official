import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FiPlus } from 'react-icons/fi';

function ProfileVideos({ user, isOwner }) {
  const [videos, setVideos] = useState([]);
  const [video, setVideo] = useState(null);
  const backendURL = 'http://localhost:5000';

  const fetchVideos = async () => {
    try {
      const res = await axios.get(`${backendURL}/api/user/${user._id}/posts`);
      const videoPosts = res.data.filter(post => {
        const ext = post.image?.split('.').pop().toLowerCase();
        return post.image && ['mp4', 'mov', 'webm'].includes(ext);
      });
      setVideos(videoPosts);
    } catch (err) {
      console.error('Failed to load videos:', err);
    }
  };

  const handleUpload = async () => {
    if (!video) return;
    const formData = new FormData();
    formData.append('image', video);

    try {
      await axios.post(`${backendURL}/api/user/${user._id}/post`, formData);
      setVideo(null);
      fetchVideos(); // Refresh video grid
    } catch (err) {
      console.error('Upload failed:', err);
    }
  };

  useEffect(() => {
    if (user?._id) fetchVideos();
  }, [user._id]);

  return (
    <div className="bg-blue-100 p-6 rounded-xl shadow mb-6">
      {/* 🎥 Yellow Heading */}
      <div className="bg-yellow-200 inline-block px-4 py-2 mb-6 font-semibold text-lg rounded">
        Videos
      </div>

      {/* Upload Video Button */}
      {isOwner && (
        <div className="mb-6">
          <label className="inline-flex items-center bg-yellow-200 font-semibold px-4 py-2 rounded cursor-pointer hover:bg-yellow-300 transition">
            <FiPlus className="mr-2" /> Add Videos
            <input
              type="file"
              accept="video/mp4,video/webm,video/mov"
              onChange={(e) => {
                setVideo(e.target.files[0]);
                setTimeout(handleUpload, 300);
              }}
              className="hidden"
            />
          </label>
        </div>
      )}

      {/* Video Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {videos.map((post) => (
          <div key={post._id} className="rounded overflow-hidden shadow hover:scale-[1.01] transition-transform">
            <video
              controls
              className="w-full h-48 object-cover rounded"
            >
              <source src={`${backendURL}${post.image}`} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        ))}

        {/* Upload Placeholder Slot */}
        {isOwner && (
          <div className="bg-gray-300 h-48 flex justify-center items-center rounded hover:bg-gray-400 cursor-pointer transition">
            <FiPlus className="text-2xl text-gray-600" />
          </div>
        )}
      </div>

      {/* "More" CTA */}
      {videos.length > 6 && (
        <div className="text-center mt-6 font-semibold text-gray-700">
          More <FiPlus className="inline ml-1" />
        </div>
      )}
    </div>
  );
}

export default ProfileVideos;
