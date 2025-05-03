import React, { useState, useEffect } from 'react';
import FriendSidebar from "../../components/sportPeople/FriendSidebar";
import FriendChatContainer from "../../components/sportPeople/FriendChatContainer";
import { useFriendChatStore } from "../../store/useFriendChatStore";
import NoFriendSelected from "../../components/sportPeople/NoFriendSelected";

const FriendChat = () => {
  const { selectedUser } = useFriendChatStore();
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 640);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 1025);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (isSmallScreen) {
    return (
      <div className='bg-base-200'>
        <div className='flex items-center justify-center'>
          <div className='bg-base-100 rounded-lg shadow-xl w-full h-[calc(100vh-3.5rem)] md:h-[calc(100vh-5.4rem)] lg:h-[calc(100vh-5.4rem)] xl:h-[calc(100vh-6.4rem)]'>
            <div className='flex h-full rounded-lg overflow-hidden'>
              {selectedUser ? <FriendChatContainer /> : <FriendSidebar />}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='bg-base-200'>
      <div className='flex items-center justify-center'>
        <div className='bg-base-100 rounded-lg shadow-xl w-full h-[calc(100vh-3.5rem)] md:h-[calc(100vh-5.4rem)] lg:h-[calc(100vh-5.4rem)] xl:h-[calc(100vh-6.4rem)]'>
          <div className='flex h-full rounded-lg overflow-hidden'>
            <FriendSidebar />
            {!selectedUser ? <NoFriendSelected /> : <FriendChatContainer />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FriendChat;
