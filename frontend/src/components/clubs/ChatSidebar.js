import React from 'react'
import { useEffect } from 'react';
import { useChatStore } from '../../store/useChatStore'
import { MessageSquare } from "lucide-react";
import { useAuthStore } from '../../store/useAuthStore';

const ChatSidebar = () => {
    const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();

    const { onlineUsers } = useAuthStore();

    const skeletonContacts = Array(8).fill(null);

    useEffect(() => {
        getUsers()
    }, [getUsers])

    if (isUsersLoading) return <aside
        className="h-full w-20 lg:w-96 border-r border-base-300 
  flex flex-col transition-all duration-200"
    >
        {/* Header */}
        <div className="border-b border-base-300 w-full p-5">
            <div className="flex items-center gap-3">
                <MessageSquare size={30} className="text-primary " />
                <span className="font-medium text-xl hidden lg:block">Chats</span>
            </div>
        </div>

        {/* Skeleton Contacts */}
        <div className="overflow-y-auto w-full py-3">
            {skeletonContacts.map((_, idx) => (
                <div key={idx} className="w-full p-3 flex items-center gap-3">
                    {/* Avatar skeleton */}
                    <div className="relative mx-auto lg:mx-0">
                        <div className="skeleton size-12 rounded-full" />
                    </div>

                    {/* User info skeleton - only visible on larger screens */}
                    <div className="hidden lg:block text-left min-w-0 flex-1">
                        <div className="skeleton h-4 w-32 mb-2" />
                        <div className="skeleton h-3 w-16" />
                    </div>
                </div>
            ))}
        </div>
    </aside>

    return (
        <aside className='h-full w-full lg:w-96 border-r border-base-300 flex flex-col transition-all duration-200'>
            <div className='border-b border-base-300 w-full p-4 lg:p-5 shadow-md'>
                <div className='flex items-center gap-3'>
                    <div className='w-12 h-12 rounded-xl bg-primary-light items-center justify-center flex'>
                        <MessageSquare size={30} className="text-primary" />
                    </div>
                    <span className='font-medium text-xl block'>Chats</span>
                </div>
            </div>
            <div className='overflow-y-auto w-full py-3'>
                {users.map((user) => (
                    <button
                        key={user._id}
                        onClick={() => setSelectedUser(user)}
                        className={`
                            w-full p-3 pl-8 flex items-center gap-3 border-b
                            hover:bg-primary-light transition-colors
                            ${selectedUser?._id === user._id ? "bg-primary-light ring-1 ring-base-300" : ""}
                        `}
                    >
                        <div className="relative mx-0">
                            <img
                                src={user.profilePic || "/defaultProfilePic.jpg"}
                                alt={user.name}
                                className="size-12 object-cover rounded-full"
                            />
                            {onlineUsers.includes(user._id) ? (
                                <span
                                    className="absolute bottom-0 right-0 size-3 bg-green-500 
                                    rounded-full ring-2 ring-white"
                                />
                            ) : (<span
                                className="absolute bottom-0 right-0 size-3 bg-gray-400 
                                    rounded-full ring-2 ring-white"
                            />)
                            }
                        </div>

                        {/* User info - only visible on larger screens */}
                        <div className="block text-left min-w-0">
                            <div className="font-medium truncate">{user.firstName}</div>
                            <div className="text-sm text-zinc-500 truncate">
                                {user.lastMessage ? user.lastMessage.text : "No messages"}
                            </div>

                        </div>
                        {/* {unreadMessageCount > 0 && (
                            <div className='ml-auto bg-red-600 text-white text-xs rounded-full size-3 md:size-4 flex items-center justify-center'>
                                {unreadMessageCount}
                            </div>
                        )} */}
                    </button>
                ))}

                {users.length === 0 && (
                    <div className="text-center text-zinc-500 py-4">No online users</div>
                )}
            </div>
        </aside>
    )
}

export default ChatSidebar