import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  FaThumbsUp,
  FaCommentAlt,
  FaRetweet,
  FaPaperPlane,
  FaEllipsisH,
  FaTrashAlt,
} from 'react-icons/fa';
import { io } from 'socket.io-client';

function PostCard({ post, userId, isOwner, onUpdate }) {
  const backendURL = 'http://localhost:5000';
  const hasLiked = post.likes?.includes(userId);
  const hasReposted = post.reposts?.includes(userId);

  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  const socket = io(backendURL);

  useEffect(() => {
    socket.on('receiveComment', (data) => {
      if (data.postId === post._id) {
        onUpdate();
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [post._id, onUpdate]);

  const toggleLike = async () => {
    await axios.put(`${backendURL}/api/post/${post._id}/like`, { userId });
    onUpdate();
  };

  const handleRepost = async () => {
    await axios.put(`${backendURL}/api/post/${post._id}/repost`, { userId });
    onUpdate();
  };

  const handleAddComment = async () => {
    if (!commentText.trim()) return;
    try {
      await axios.put(`${backendURL}/api/post/${post._id}/comment`, {
        userId,
        text: commentText,
      });

      socket.emit('sendComment', { postId: post._id });
      setCommentText('');
      onUpdate();
    } catch (err) {
      console.error('Error adding comment:', err);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${backendURL}/api/post/${post._id}`);
      onUpdate();
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden relative">
      <div className="flex items-center gap-3 p-4">
        <img
          src={`${backendURL}${post.userId?.profilePhoto || '/uploads/profile_photos/default.jpg'}`}
          alt="Profile"
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <p className="font-semibold text-sm">{post.userId?.name || 'User Name'}</p>
          <p className="text-xs text-gray-500">{new Date(post.createdAt).toLocaleString()}</p>
        </div>

        {isOwner && (
          <div className="ml-auto relative">
            <button onClick={() => setMenuOpen(!menuOpen)} className="text-gray-400">
              <FaEllipsisH />
            </button>
            {menuOpen && (
              <div className="absolute top-6 right-0 bg-white border rounded shadow z-10">
                <button
                  onClick={handleDelete}
                  className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full"
                >
                  <FaTrashAlt /> Delete
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {post.description && (
        <div className="px-4 text-sm text-gray-800 leading-relaxed mb-2">
          {post.description}
        </div>
      )}

      {post.image && (
        <div className="px-4">
          <img
            src={`${backendURL}${post.image}`}
            alt="Post visual"
            className="w-full rounded-lg max-h-[300px] object-cover"
          />
        </div>
      )}

      <div className="px-4 py-2 text-xs text-gray-700 flex items-center gap-4 border-t border-gray-200">
        <span className="text-blue-600 flex items-center gap-1">
          <FaThumbsUp className="text-xs" /> {post.likes?.length || 0}
        </span>
        <span>{post.comments?.length || 0} comments</span>
        <span>{post.reposts?.length || 0} reposts</span>
      </div>

      <div className="grid grid-cols-4 text-sm text-gray-600 px-4 py-3 border-t">
        <button onClick={toggleLike} className="flex flex-col items-center hover:text-blue-600">
          <FaThumbsUp className="mb-1" /> Like
        </button>
        <button onClick={() => setShowComments(!showComments)} className="flex flex-col items-center hover:text-blue-600">
          <FaCommentAlt className="mb-1" /> Comment
        </button>
        <button onClick={handleRepost} className="flex flex-col items-center hover:text-green-600">
          <FaRetweet className="mb-1" /> Repost
        </button>
        <div className="flex flex-col items-center">
          <FaPaperPlane className="mb-1" /> Send
        </div>
      </div>

      {showComments && (
        <div className="px-4 pb-4">
          <div className="mt-2 space-y-2 max-h-40 overflow-y-auto pr-2">
            {post.comments?.map((comment, idx) => (
              <div key={idx} className="text-sm border-b pb-1">
                <span className="font-medium">{comment.userId?.name || 'User'}: </span>
                <span>{comment.text}</span>
              </div>
            ))}
          </div>
          <div className="mt-3 flex gap-2">
            <input
              type="text"
              placeholder="Write a comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="flex-grow border rounded px-3 py-1 text-sm"
            />
            <button
              onClick={handleAddComment}
              className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm"
            >
              Post
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default PostCard;
