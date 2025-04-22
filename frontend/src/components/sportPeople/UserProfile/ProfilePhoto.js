import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { FiPlus } from 'react-icons/fi';

function ProfilePhotos({ user, isOwner }) {
  const [photos, setPhotos] = useState([]);
  const [photo, setPhoto] = useState(null);
  const backendURL = 'http://localhost:5000';

  const fetchPhotos = useCallback(async () => {
    if (!user._id) return;
    try {
      const res = await axios.get(`${backendURL}/api/user/${user._id}/posts`);
      const imagePosts = res.data.filter(post => {
        const ext = post.image?.split('.').pop().toLowerCase();
        return post.image && ['jpg', 'jpeg', 'png', 'webp', 'gif'].includes(ext);
      });
      setPhotos(imagePosts);
    } catch (err) {
      console.error('Failed to load photos:', err);
    }
  }, [user._id]);

  const handleUpload = async () => {
    if (!photo) return;

    const formData = new FormData();
    formData.append('image', photo);

    try {
      await axios.post(`${backendURL}/api/user/${user._id}/post`, formData);
      setPhoto(null);
      fetchPhotos(); // refresh grid
    } catch (err) {
      console.error('Upload failed:', err);
    }
  };

  useEffect(() => {
    fetchPhotos();
  }, [fetchPhotos]);

  return (
    <div className="bg-primary-light p-6 rounded-xl shadow mb-6">
      <div className="bg-secondary-light inline-block px-4 py-2 mb-6 font-semibold text-lg rounded">
        Photos
      </div>

      {isOwner && (
        <div className="mb-6">
          <label className="inline-flex items-center bg-secondary-light font-semibold px-4 py-2 rounded cursor-pointer hover:bg-yellow-300 transition">
            <FiPlus className="mr-2" /> Add Photos
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                setPhoto(file);
                setTimeout(() => handleUpload(), 300);
              }}
              className="hidden"
            />
          </label>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {photos.map((post) => (
          <img
            key={post._id}
            src={`${backendURL}${post.image}`}
            alt="User Upload"
            className="w-full h-48 object-cover rounded hover:scale-105 transition-transform duration-300"
          />
        ))}

        {isOwner && (
          <div className="bg-gray-300 h-48 flex justify-center items-center rounded hover:bg-gray-400 cursor-pointer transition">
            <FiPlus className="text-2xl text-gray-600" />
          </div>
        )}
      </div>

      {photos.length > 6 && (
        <div className="text-center mt-6 font-semibold text-gray-700">
          More <FiPlus className="inline ml-1" />
        </div>
      )}
    </div>
  );
}

export default ProfilePhotos;
