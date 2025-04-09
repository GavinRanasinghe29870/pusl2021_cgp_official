import React from 'react';
import ProfileAbout from './ProfileAbout';
import ProfilePhotos from './ProfilePhotos';
import ProfileVideos from './ProfileVideos';
import ProfilePosts from './ProfilePosts';

function ProfileHome({ user }) {
  return (
    <div className="space-y-8">
      <ProfileAbout user={user} />
      <ProfilePhotos user={user} />
      <ProfileVideos user={user} />
      <ProfilePosts user={user} />
    </div>
  );
}

export default ProfileHome;
