import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { FiEdit } from 'react-icons/fi';
import { FaCamera } from "react-icons/fa";
import { Plus, RotateCw, UserCheck } from 'lucide-react';

function ProfileHeader({ user, isOwner }) {
  const [coverPhoto, setCoverPhoto] = useState('');
  const [profilePhoto, setProfilePhoto] = useState('');
  const [editableInfo, setEditableInfo] = useState({
    firstName: '',
    city: '',
    sports: '',
  });
  const [editing, setEditing] = useState(false);
  const [friendStatus, setFriendStatus] = useState('not_connected');
  const [requestId, setRequestId] = useState(null);

  const backendURL = 'http://localhost:5000';

  useEffect(() => {
    setCoverPhoto(user.coverPhoto || '');
    setProfilePhoto(user.profilePhoto || '');
    setEditableInfo({
      firstName: user.firstName || '',
      city: user.city || '',
      sports: Array.isArray(user.sports) ? user.sports.join(', ') : user.sports || '',
    });

    if (!isOwner) {
      fetchFriendStatus();
    }
  }, [user, isOwner]);

  const fetchFriendStatus = async () => {
    try {
      const res = await axios.get(`${backendURL}/api/friendRequest/status/${user._id}`, {
        withCredentials: true,
      });
      setFriendStatus(res.data.status);
      if (res.data.requestId) {
        setRequestId(res.data.requestId);
      }
    } catch (err) {
      console.error('Failed to fetch friend status:', err);
    }
  };

  const handleSendFriendRequest = async () => {
    try {
      const res = await axios.post(
        `${backendURL}/api/friendRequest/send/${user._id}`,
        {},
        { withCredentials: true }
      );
      fetchFriendStatus();
    } catch (err) {
      console.error('Failed to send friend request:', err);
      alert(err.response?.data?.message || 'Error sending friend request');
    }
  };

  const handleAcceptFriendRequest = async () => {
    try {
      const res = await axios.post(
        `${backendURL}/api/friendRequest/accept/${requestId}`,
        {},
        { withCredentials: true }
      );
      fetchFriendStatus();
    } catch (err) {
      console.error('Failed to accept friend request:', err);
      alert(err.response?.data?.message || 'Error accepting friend request');
    }
  };

  const handleRejectFriendRequest = async () => {
    try {
      const res = await axios.post(
        `${backendURL}/api/friendRequest/reject/${requestId}`,
        {},
        { withCredentials: true }
      );
      fetchFriendStatus();
    } catch (err) {
      console.error('Failed to reject friend request:', err);
      alert(err.response?.data?.message || 'Error rejecting friend request');
    }
  };

  const handleCoverChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('coverPhoto', file);

    try {
      const res = await axios.post(`${backendURL}/api/user/${user._id}/cover-photo`, formData, {
        withCredentials: true,
      });
      setCoverPhoto(res.data.coverPhoto);
    } catch (err) {
      console.error('Cover photo upload failed:', err);
      alert('Failed to upload cover photo');
    }
  };

  const handleProfileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('profilePhoto', file);

    try {
      const res = await axios.post(`${backendURL}/api/user/${user._id}/profile-photo`, formData, {
        withCredentials: true,
      });
      setProfilePhoto(res.data.profilePhoto);
    } catch (err) {
      console.error('Profile photo upload failed:', err);
      alert('Failed to upload profile photo');
    }
  };

  const handleInfoChange = (e) => {
    const { name, value } = e.target;
    setEditableInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      await axios.put(`${backendURL}/api/user/${user._id}/profile-data`, {
        ...editableInfo,
        sports: editableInfo.sports.split(',').map((s) => s.trim()),
      });
      setEditing(false);
    } catch (err) {
      console.error('Failed to save profile header info:', err);
    }
  };

  return (
    <div className="relative w-full bg-white shadow mb-4 rounded-b-2xl overflow-hidden">
      {/* Cover Photo */}
      <div className="relative w-full h-64">
        <img
          src={coverPhoto ? `${backendURL}${coverPhoto}` : '/default-cover.jpg'}
          alt="Cover"
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2 flex gap-2">
          {isOwner && (
            <label className="flex items-center gap-1 bg-white bg-opacity-80 text-black text-sm px-3 py-1 rounded shadow cursor-pointer hover:bg-opacity-100">
              <FaCamera size={16} />
              Add Cover Photo
              <input type="file" onChange={handleCoverChange} className="hidden" />
            </label>
          )}
          {!isOwner && (
            <>
              {friendStatus === 'not_connected' && (
                <button
                  onClick={handleSendFriendRequest}
                  className="flex items-center gap-1 bg-blue-600 text-lg text-white px-4 py-1 rounded shadow hover:bg-blue-700"
                >
                  <Plus className="inline mr-1" size={20} />
                  Add Friend
                </button>
              )}
              {friendStatus === 'pending' && (
                <button className="flex items-center gap-1 text-lg bg-gray-400 text-white px-4 py-1 rounded shadow" disabled>
                  <RotateCw className="inline mr-1" size={20} />
                  Request Sent
                </button>
              )}
              {friendStatus === 'received' && (
                <div className="flex gap-2">
                  <button
                    onClick={handleAcceptFriendRequest}
                    className="bg-green-600 text-white px-4 py-1 rounded shadow hover:bg-green-700"
                  >
                    Accept
                  </button>
                  <button
                    onClick={handleRejectFriendRequest}
                    className="bg-red-600 text-white px-4 py-1 rounded shadow hover:bg-red-700"
                  >
                    Reject
                  </button>
                </div>
              )}
              {friendStatus === 'connected' && (
                <button className="flex items-center gap-1 bg-gray-400 text-lg text-white px-4 py-1 rounded shadow" disabled>
                  <UserCheck className="inline mr-1" size={20} />
                  Friends
                </button>
              )}
            </>
          )}
        </div>
      </div>

      {/* Profile Info */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="relative flex flex-col md:flex-row items-start md:items-end gap-4 -mt-16 md:-mt-20 pb-6">
          {/* Profile Image */}
          <div className="relative shrink-0">
            <img
              src={profilePhoto ? `${backendURL}${profilePhoto}` : '/default-profile.jpg'}
              alt="Profile"
              className="w-32 h-32 md:w-36 md:h-36 rounded-full border-4 border-white object-cover shadow-lg"
            />
            {isOwner && (
              <label className="absolute bottom-2 right-2 bg-black bg-opacity-60 text-white text-xs p-2 rounded-full cursor-pointer hover:bg-opacity-80">
                <FaCamera size={16} />
                <input type="file" onChange={handleProfileChange} className="hidden" />
              </label>
            )}
          </div>

          {/* Info Text */}
          <div className="pt-4 md:pt-20 w-full">
            {editing ? (
              <>
                <input
                  name="firstName"
                  value={editableInfo.firstName}
                  onChange={handleInfoChange}
                  className="text-xl font-bold border p-1 rounded w-full md:w-[300px]"
                />
                <div className="flex gap-4 mt-2 items-center">
                  <FaMapMarkerAlt className="text-blue-600" />
                  <input
                    name="city"
                    value={editableInfo.city}
                    onChange={handleInfoChange}
                    className="text-gray-700 border p-1 rounded w-full md:w-[300px]"
                  />
                </div>
                <input
                  name="sports"
                  value={editableInfo.sports}
                  onChange={handleInfoChange}
                  placeholder="Cricket, Football"
                  className="text-gray-700 border p-1 rounded mt-2 w-full md:w-[300px]"
                />
                <button
                  onClick={handleSave}
                  className="mt-3 px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Save
                </button>
              </>
            ) : (
              <>
                <h2 className="text-xl md:text-2xl font-semibold text-black flex items-center gap-2">
                  {editableInfo.firstName || 'Unnamed User'}
                  {isOwner && (
                    <FiEdit className="text-gray-600 cursor-pointer" onClick={() => setEditing(true)} />
                  )}
                </h2>
                <p className="text-gray-600 flex items-center gap-1 mt-1">
                  <FaMapMarkerAlt className="text-blue-600" />
                  <span className="font-medium">{editableInfo.city || 'Unknown'}</span>
                  {isOwner && (
                    <FiEdit className="ml-1 text-gray-600 cursor-pointer" onClick={() => setEditing(true)} />
                  )}
                </p>
                <p className="text-gray-700 mt-1">
                  {editableInfo.sports || 'No sports added'}
                  {isOwner && (
                    <FiEdit className="ml-2 text-gray-600 cursor-pointer inline" onClick={() => setEditing(true)} />
                  )}
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileHeader;