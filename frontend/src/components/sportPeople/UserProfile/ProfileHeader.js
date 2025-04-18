import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { FiEdit } from 'react-icons/fi';
import { FaCamera } from "react-icons/fa";

function ProfileHeader({ user, isOwner }) {
  const [coverPhoto, setCoverPhoto] = useState('');
  const [profilePhoto, setProfilePhoto] = useState('');
  const [editableInfo, setEditableInfo] = useState({
    name: '',
    city: '',
    sports: '',
  });
  const [editing, setEditing] = useState(false);
  const [isFriend, setIsFriend] = useState(false);

  const viewerId = localStorage.getItem('userId');
  const backendURL = 'http://localhost:5000';

  useEffect(() => {
    setCoverPhoto(user.coverPhoto || '');
    setProfilePhoto(user.profilePhoto || '');
    setEditableInfo({
      name: user.firstName || user.name || '',
      city: user.city || '',
      sports: Array.isArray(user.sports) ? user.sports.join(', ') : user.sports || '',
    });

    if (!isOwner && user.friends?.includes(viewerId)) {
      setIsFriend(true);
    }
  }, [user, isOwner, viewerId]); // ✅ Added viewerId

  const handleCoverChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('coverPhoto', file);

    try {
      const res = await axios.post(`${backendURL}/api/user/${user._id}/cover-photo`, formData);
      setCoverPhoto(res.data.coverPhoto);
    } catch (err) {
      console.error('Cover photo upload failed:', err);
    }
  };

  const handleProfileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('profilePhoto', file);

    try {
      const res = await axios.post(`${backendURL}/api/user/${user._id}/profile-photo`, formData);
      setProfilePhoto(res.data.profilePhoto);
    } catch (err) {
      console.error('Profile photo upload failed:', err);
    }
  };

  const handleToggleFriend = async () => {
    try {
      const res = await axios.put(`${backendURL}/api/user/${viewerId}/friends/${user._id}`);
      setIsFriend(res.data.isFriend);
    } catch (err) {
      console.error('Friend toggle failed:', err);
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
              <FaCamera size={16}/>
              Add Cover Photo
              <input type="file" onChange={handleCoverChange} className="hidden" />
            </label>
          )}
          {!isOwner && (
            <button
              onClick={handleToggleFriend}
              className="bg-blue-600 text-white px-4 py-1 rounded shadow hover:bg-blue-700"
            >
              {isFriend ? 'Unfriend' : 'Add Friend'}
            </button>
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
                <FaCamera size={16}/>
                <input type="file" onChange={handleProfileChange} className="hidden" />
              </label>
            )}
          </div>

          {/* Info Text */}
          <div className="pt-4 md:pt-20 w-full">
            {editing ? (
              <>
                <input
                  name="name"
                  value={editableInfo.name}
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
                  {editableInfo.name || 'Unnamed User'}
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
