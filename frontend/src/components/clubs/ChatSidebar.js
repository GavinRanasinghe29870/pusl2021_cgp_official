import React, { useState } from 'react';
import { LuSearch } from "react-icons/lu";
import { useEffect } from 'react';
import { useChatStore } from '../../store/useChatStore';
import { MessageSquare } from "lucide-react";
import { useAuthStore } from '../../store/useAuthStore';
import { useClubAuthStore } from '../../store/useClubAuthStore';

const ChatSidebar = () => {
    const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading, unreadCounts } = useChatStore();
    const { onlineUsers: authOnlineUsers } = useAuthStore();
    const { onlineUsers: clubOnlineUsers } = useClubAuthStore();

    const skeletonContacts = Array(8).fill(null);
    const backendURL = 'http://localhost:5000';

    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        getUsers();
    }, [getUsers]);

    const filteredUsers = users.filter(user =>
        (user.firstName || user.ClubName).toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (isUsersLoading) return (
        <aside className="h-full w-20 lg:w-96 border-r border-base-300 flex flex-col transition-all duration-200 animate-pulse">
            {/* Header */}
            <div className='w-full p-4 lg:p-5'>
                <div className='flex items-center gap-3'>
                    <div className='w-12 h-12 rounded-xl bg-primary-light items-center justify-center flex'>
                        <MessageSquare size={30} className="text-primary" />
                    </div>
                    <span className='font-medium text-xl block'>Chats</span>
                </div>
            </div>

            {/* Search Bar */}
            <div className="border-b border-base-300 px-4 pb-5 shadow-md">
                <div className="relative flex items-center">
                    <LuSearch className="absolute left-3 text-xl xl:text-2xl text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search by Name"
                        className="p-2 pl-10 w-full border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* Skeleton Contacts */}
            <div className="overflow-y-auto w-full py-3">
                {skeletonContacts.map((_, idx) => (
                    <div key={idx} className="w-full py-3 px-8 flex items-center gap-3">
                        <div className="relative mx-auto lg:mx-0">
                            <div className="skeleton size-12 rounded-full bg-gray-300" />
                        </div>
                        <div className="hidden lg:block text-left min-w-0 flex-1">
                            <div className="skeleton h-4 w-32 mb-2 bg-gray-300 rounded" />
                            <div className="skeleton h-3 w-16 bg-gray-300 rounded" />
                        </div>
                    </div>
                ))}
            </div>
        </aside>
    );

    return (
        <aside className='h-full w-full lg:w-96 border-r border-base-300 flex flex-col transition-all duration-200'>
            {/* Header */}
            <div className='w-full p-4 lg:p-5'>
                <div className='flex items-center gap-3'>
                    <div className='w-12 h-12 rounded-xl bg-primary-light items-center justify-center flex'>
                        <MessageSquare size={30} className="text-primary" />
                    </div>
                    <span className='font-medium text-xl block'>Chats</span>
                </div>
            </div>

            {/* Search Bar */}
            <div className="border-b border-base-300 px-4 pb-5 shadow-md">
                <div className="relative flex items-center">
                    <LuSearch className="absolute left-3 text-xl xl:text-2xl text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search by Name"
                        className="p-2 pl-10 w-full border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* User List */}
            <div className='overflow-y-auto w-full py-3'>
                {filteredUsers.map((user) => (
                    <button
                        key={user._id}
                        onClick={() => {
                            setSelectedUser(user);
                            useChatStore.getState().getMessages(user._id);
                        }}
                        className={`w-full p-3 pl-8 flex items-center gap-3 border-b hover:bg-primary-light transition-colors ${selectedUser?._id === user._id ? "bg-primary-light ring-1 ring-base-300" : ""
                            }`}
                    >
                        <div className="relative mx-0">
                            <img
                                src={user.profilePhoto ? `${backendURL}${user.profilePhoto}` : '/defaultProfilePic.jpg'}
                                alt={user.name}
                                className="size-12 object-cover rounded-full"
                            />
                            {authOnlineUsers.includes(user._id) || clubOnlineUsers.includes(user._id) ? (
                                <span className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-white" />
                            ) : (
                                <span className="absolute bottom-0 right-0 size-3 bg-gray-400 rounded-full ring-2 ring-white" />
                            )}
                        </div>

                        <div className="block text-left min-w-0 flex-1">
                            <div className="font-medium truncate flex justify-between">
                                <span>{user.firstName || user.ClubName}</span>
                                {unreadCounts[user._id] > 0 && (
                                    <span className="bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                        {unreadCounts[user._id]}
                                    </span>
                                )}
                            </div>
                            <div className="text-sm text-zinc-500 truncate">
                                {user.lastMessage ? user.lastMessage.text : "No messages"}
                            </div>
                        </div>
                    </button>
                ))}

                {filteredUsers.length === 0 && (
                    <div className="text-center text-zinc-500 py-4">No users found</div>
                )}
            </div>
        </aside>
    );
};

export default ChatSidebar;