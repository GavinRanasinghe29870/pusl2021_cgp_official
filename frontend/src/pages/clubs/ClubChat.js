import React, { useState, useEffect } from 'react';
import { useChatStore } from '../../store/useChatStore';
import ChatSidebar from '../../components/clubs/ChatSidebar';
import NoChatSelected from '../../components/clubs/NoChatSelected';
import ChatContainer from '../../components/clubs/ChatContainer';

const ClubChat = () => {
  const { selectedUser } = useChatStore();
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
              {selectedUser ? <ChatContainer /> : <ChatSidebar />}
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
            <ChatSidebar />
            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClubChat;