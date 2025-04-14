import { create } from "zustand";
import axios from "axios";
import { io } from "socket.io-client";

const BASE_URL = "http://localhost:5000";

export const useAuthStore = create((set, get) => ({
  user: null,
  isAuthenticated: false,
  isSigningUp: false,
  onlineUsers: [],
  socket: null,

  signin: async (formData) => {
    try {
      const dataToSend = {
        username: formData.username,
        password: formData.password,
        sportLevel: formData.sportLevel || "SportPeople",
      };

      console.log("Sending Sign-In Data:", dataToSend);

      const response = await axios.post(
        "http://localhost:5000/api/auth/signin",
        dataToSend,
        {
          withCredentials: true,
        }
      );

      if (response.data?.user) {
        set({
          user: response.data.user,
          isAuthenticated: true,
        });

        // Connect socket after successful sign-in
        get().connectSocket();

        return { success: true, ...response.data };
      } else {
        return { success: false, error: "Invalid response" };
      }
    } catch (error) {
      console.error("Authentication error:", error);
      return {
        success: false,
        error: error.response?.data?.error || error.message,
      };
    }
  },

  signup: async (formData) => {
    try {
      set({ isSigningUp: true });

      console.log("Sending Sign-Up Data:", formData);

      const response = await axios.post(
        "http://localhost:5000/api/auth/signup",
        formData,
        {
          withCredentials: true,
        }
      );

      set({ isSigningUp: false });

      if (response.data?.user) {
        set({
          user: response.data.user,
          isAuthenticated: true,
        });

        // Connect socket after successful sign-up
        get().connectSocket();

        return { success: true, ...response.data };
      } else {
        return { success: false, error: "Invalid response" };
      }
    } catch (error) {
      set({ isSigningUp: false });
      console.error("Signup error:", error);
      return {
        success: false,
        error: error.response?.data?.error || error.message,
      };
    }
  },

  logout: async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/auth/logout",
        {},
        { withCredentials: true }
      );

      // Disconnect socket on logout
      const socket = get().socket;
      if (socket) {
        socket.disconnect();
        set({ socket: null });
      }

      set({ user: null, isAuthenticated: false });
      window.location.reload();
      return { success: true };
    } catch (error) {
      console.error("Logout error:", error);
      return { success: false, error: error.message };
    }
  },

  checkAuth: async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/auth/check", {
        withCredentials: true,
      });

      if (response.data) {
        set({
          user: response.data,
          isAuthenticated: true,
        });

        // Connect socket after successful auth check
        get().connectSocket();

        return { success: true };
      }

      return { success: false };
    } catch (error) {
      console.error("Auth check error:", error);
      set({ user: null, isAuthenticated: false });
      return { success: false };
    }
  },

  connectSocket: () => {
    const { user, socket } = get();
    if (!user || socket?.connected) return;

    const newSocket = io(BASE_URL, {
      query: {
        userId: user._id,
      },
    });

    newSocket.connect();

    set({ socket: newSocket });

    newSocket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });

    newSocket.on("disconnect", () => {
      console.log("Socket disconnected");
      set({ socket: null });
    });
  },
}));