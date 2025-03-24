import { create } from "zustand";
import { axiosInstance } from '../lib/axios.js';
import { io } from 'socket.io-client';

const BASE_URL = "http://localhost:5000";

export const useAuthStore = create ((set, get) => ({
    authUser: null,
    isSigningUp: false,
    isSigningIn: false,
    isCheckingAuth: true,
    onlineUsers: [],
    socket: null,

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get('/auth/check');

            set({ authUser: res.data });

            get().connectSocket();
        } catch (error) {
            console.log("Error checking auth:", error);
            set({ authUser: null });
        } finally {
            set({ isCheckingAuth: false });
        }
    },

    signup: async (data) => {
        set({ isSigningUp: true});
        try {
            const res = await axiosInstance.post('/auth/signup', data);
            set({ authUser: res.data });

            get().connectSocket();
        } catch (error) {
            console.error("Signup Error:", error);
        } finally {
            set({ isSigningUp: false });
        }
    },

    signin: async (data) => {
        set({ isSigningIn: true });
        try {
            const res = await axiosInstance.post('/auth/signin', data);
            set({ authUser: res.data });

            get().connectSocket();
        } catch (error) {
            console.error("Signin Error:", error);
        } finally {
            set({ isSigningIn: false });
        }
    },

    connectSocket: () => {
        const { authUser } = get();
        if (!authUser || get().socket?.connected) return;

        const socket = io(BASE_URL, {
            query: {
                userId: authUser._id,
            },
        });
        socket.connect();

        set({ socket: socket });

        socket.on("getOnlineUsers", (userIds) => {
            set({ onlineUsers: userIds });
        })
    },

}));