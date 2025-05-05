import { create } from "zustand";
import { axiosInstance } from '../lib/axios.js';
import { useAuthStore } from "./useAuthStore.js";
import { useClubAuthStore } from "./useClubAuthStore.js";

export const useChatStore = create((set, get) => ({
    messages: [],
    users: [],
    selectedUser: null,
    isUsersLoading: false,
    isMessagesLoading: false,
    unreadCounts: {},

    getUsers: async () => {
        set({ isUsersLoading: true });
        try {
            const res = await axiosInstance.get('/messages/users');
            const loggedInUserId = useAuthStore.getState().user?._id || 
                                 useClubAuthStore.getState().club?._id;
            
            // Get unread counts for each user
            const unreadCounts = {};
            await Promise.all(
                res.data.map(async (user) => {
                    const count = await axiosInstance.get(`/messages/unread-count/${user._id}`);
                    unreadCounts[user._id] = count.data;
                })
            );
            
            set({ users: res.data, unreadCounts });
        } catch (error) {
            console.error("Error getting users:", error);
        } finally {
            set({ isUsersLoading: false });
        }
    },

    getMessages: async (userId) => {
        set({ isMessagesLoading: true });
        try {
            const res = await axiosInstance.get(`/messages/${userId}`);
            set({ messages: res.data });
        } catch (error) {
            console.error("Error getting messages:", error);
        } finally {
            set({ isMessagesLoading: false });
        }
    },

    sendMessages: async (messageData) => {
        const { selectedUser, messages } = get();
        try {
            const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, {
                ...messageData,
                receiverId: selectedUser._id
            });
            set({ messages: [...messages, res.data] });
        } catch (error) {
            console.error("Error sending message:", error);
        }
    },

    getTotalUnreadCount: () => {
        const { unreadCounts } = get();
        return Object.values(unreadCounts).reduce((sum, count) => sum + count, 0);
    },

    subscribeToMessages: () => {
        const { user, socket: userSocket } = useAuthStore.getState();
        const { club, socket: clubSocket } = useClubAuthStore.getState();
        const { selectedUser, getUsers } = get();
    
        if (!selectedUser) return;
    
        const socket = user ? userSocket : club ? clubSocket : null;
        if (!socket) return;
    
        socket.on("newMessage", (newMessage) => {
            if (newMessage.senderId !== selectedUser._id) {
                // Refresh unread counts when receiving a new message
                getUsers();
            }
            set({
                messages: [...get().messages, newMessage],
            });
        });
    },

    unsubscribeFromMessages: () => {
        const { user, socket: userSocket } = useAuthStore.getState();
        const { club, socket: clubSocket } = useClubAuthStore.getState();

        const socket = user ? userSocket : club ? clubSocket : null;
        if (!socket) return;

        socket.off("newMessage");
    },

    setSelectedUser: (selectedUser) => set({ selectedUser }),
}));