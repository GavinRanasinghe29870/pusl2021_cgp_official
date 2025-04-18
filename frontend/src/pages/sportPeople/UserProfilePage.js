import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuthStore } from '../../store/useAuthStore';

import ProfileHeader from '../../components/sportPeople/UserProfile/ProfileHeader';
import ProfileNavbar from '../../components/sportPeople/UserProfile/ProfileNavbar';
import ProfileHome from '../../components/sportPeople/UserProfile/ProfileHome';
import ProfileAbout from '../../components/sportPeople/UserProfile/ProfileAbout';
import ProfilePhotos from '../../components/sportPeople/UserProfile/ProfilePhoto';
import ProfileVideos from '../../components/sportPeople/UserProfile/ProfileVideos';
import ProfilePosts from '../../components/sportPeople/UserProfile/ProfilePosts';

function UserProfilePage() {
  const { id: userIdFromURL } = useParams();
  const navigate = useNavigate();
  const { user: authUser, checkAuth } = useAuthStore(); // ✅ Fixed here
  const loggedInUserId = authUser?._id;

  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [activeTab, setActiveTab] = useState('home');
  const [loading, setLoading] = useState(true);
  const [checkingAuth, setCheckingAuth] = useState(true);

  const isOwner = loggedInUserId === userIdFromURL;

  // ✅ Check authentication
  useEffect(() => {
    const verify = async () => {
      const result = await checkAuth();
      setCheckingAuth(false);
      if (!result.success) navigate('/Signin');
    };
    verify();
  }, [checkAuth, navigate]);

  // ✅ Fetch profile only after auth is confirmed
  useEffect(() => {
    if (checkingAuth || !authUser || !userIdFromURL) return;

    const fetchData = async () => {
      try {
        const [userRes, profileRes] = await Promise.all([
          axios.get(`http://localhost:5000/api/user/${userIdFromURL}`, {
            withCredentials: true,
          }),
          axios.get(`http://localhost:5000/api/user/${userIdFromURL}/profile-data`, {
            withCredentials: true,
          }),
        ]);

        setUser(userRes.data || {});
        setProfile(profileRes.data || {});
        setLoading(false);
      } catch (error) {
        console.error('❌ Error fetching profile:', error.response?.data || error.message);
        navigate('/');
      }
    };

    fetchData();
  }, [checkingAuth, authUser, userIdFromURL, navigate]);

  if (checkingAuth || loading) {
    return <div className="flex flex-1 items-center justify-center">
      <div
        className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
        role="status"
      ></div>
    </div>
  }

  const mergedUser = {
    ...user,
    ...profile,
    _id: user._id || profile.user?._id,
    name: user.firstName || profile.name || 'User',
    profilePhoto: user.profilePhoto || profile.profilePhoto || '',
    coverPhoto: user.coverPhoto || profile.coverPhoto || '',
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <ProfileHeader user={mergedUser} isOwner={isOwner} />
      </div>

      <div className="max-w-7xl mx-auto">
        <ProfileNavbar activeTab={activeTab} onTabChange={setActiveTab} />
      </div>

      <div className="p-4 max-w-7xl mx-auto">
        {activeTab === 'home' && <ProfileHome user={mergedUser} isOwner={isOwner} />}
        {activeTab === 'about' && <ProfileAbout user={mergedUser} isOwner={isOwner} />}
        {activeTab === 'photos' && <ProfilePhotos user={mergedUser} isOwner={isOwner} />}
        {activeTab === 'videos' && <ProfileVideos user={mergedUser} isOwner={isOwner} />}
        {activeTab === 'posts' && <ProfilePosts user={mergedUser} isOwner={isOwner} />}
      </div>
    </div>
  );
}

export default UserProfilePage;
