import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import PostCard from './PostCard';
import { useAuthStore } from '../../../store/useAuthStore'; // ✅ Corrected import path

function ProfilePosts({ user, isOwner }) {
  const [posts, setPosts] = useState([]);
  const [desc, setDesc] = useState('');
  const [image, setImage] = useState(null);
  const { user: authUser } = useAuthStore();
  const backendURL = 'http://localhost:5000';

  const fetchPosts = useCallback(async () => {
    if (!user._id) return;
    try {
      const res = await axios.get(`${backendURL}/api/user/${user._id}/posts`);
      setPosts(res.data || []);
    } catch (err) {
      console.error('Error fetching posts:', err);
    }
  }, [user._id]);

  const handlePost = async () => {
    if (!desc && !image) return;

    const formData = new FormData();
    formData.append('description', desc);
    if (image) formData.append('image', image);

    try {
      await axios.post(`${backendURL}/api/user/${authUser._id}/post`, formData);
      setDesc('');
      setImage(null);
      fetchPosts(); // Refresh posts
    } catch (err) {
      console.error('Error creating post:', err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return (
    <div className="bg-blue-100 p-6 rounded-xl max-w-7xl mx-auto">
      {/* ➕ Post Form for Owner */}
      {isOwner && (
        <>
          <div className="bg-yellow-200 px-4 py-2 mb-4 w-fit font-semibold text-gray-800 rounded shadow">
            + New Post
          </div>

          <div className="bg-white p-4 rounded shadow mb-6">
            <textarea
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="What's on your mind?"
              className="w-full border p-2 rounded mb-2"
            />
            <input
              type="file"
              accept="image/*,video/*"
              onChange={(e) => setImage(e.target.files[0])}
              className="block mb-2"
            />
            <button
              onClick={handlePost}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Post
            </button>
          </div>
        </>
      )}

      {/* 📬 Posts List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {posts.length > 0 ? (
          posts.map((post) => (
            <PostCard
              key={post._id}
              post={post}
              userId={authUser._id}
              isOwner={isOwner}
              onUpdate={fetchPosts}
            />
          ))
        ) : (
          <div className="col-span-2 bg-white rounded-xl shadow-md flex flex-col items-center justify-center text-center p-6">
            <div className="text-4xl text-gray-300 mb-4">📝</div>
            <p className="text-gray-700 font-medium mb-4">
              {isOwner
                ? 'You have not posted anything yet.'
                : `${user.firstName || 'This user'} hasn't posted yet.`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfilePosts;
