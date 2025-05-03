import React from 'react';
import ProfileAbout from './ProfileAbout';
import ProfilePhotos from './ProfilePhoto';
import ProfileVideos from './ProfileVideos';
import ProfilePosts from './ProfilePosts';

function ProfileHome({ user, isOwner }) {
  return (
    <div className="space-y-8">
      <ProfileAbout user={user} isOwner={isOwner} />
      <ProfilePhotos user={user} isOwner={isOwner} />
      <ProfileVideos user={user} isOwner={isOwner} />
      <ProfilePosts user={user} isOwner={isOwner} />
    </div>
  );
}

export default ProfileHome;
