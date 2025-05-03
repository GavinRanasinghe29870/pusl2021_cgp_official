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

      console.log("🟢 Sending Sign-In Data:", dataToSend);

      const response = await axios.post(`${BASE_URL}/api/auth/signin`, dataToSend, {
        withCredentials: true,
      });

      if (response.data?.user) {
        set({
          user: response.data.user,
          isAuthenticated: true,
        });

        get().connectSocket();

        return { success: true, ...response.data };
      } else {
        return { success: false, error: "Invalid response" };
      }
    } catch (error) {
      console.error("❌ Signin error:", error.response?.data || error.message);
      return {
        success: false,
        error: error.response?.data?.error || error.message,
      };
    }
  },

  signup: async (formData) => {
    try {
      set({ isSigningUp: true });
      console.log("🟢 Sending Sign-Up Data:", formData);

      const response = await axios.post(`${BASE_URL}/api/auth/signup`, formData, {
        withCredentials: true,
      });

      set({ isSigningUp: false });

      if (response.data?.user) {
        set({
          user: response.data.user,
          isAuthenticated: true,
        });

        get().connectSocket();

        return { success: true, ...response.data };
      } else {
        return { success: false, error: "Invalid response" };
      }
    } catch (error) {
      set({ isSigningUp: false });
      console.error("❌ Signup error:", error.response?.data || error.message);
      return {
        success: false,
        error: error.response?.data?.error || error.message,
      };
    }
  },

  logout: async () => {
    try {
      await axios.post(`${BASE_URL}/api/auth/logout`, {}, {
        withCredentials: true,
      });

      const socket = get().socket;
      if (socket) {
        socket.disconnect();
        set({ socket: null });
      }

      set({ user: null, isAuthenticated: false });
      window.location.reload();
      return { success: true };
    } catch (error) {
      console.error("❌ Logout error:", error.message);
      return { success: false, error: error.message };
    }
  },

  checkAuth: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/auth/check`, {
        withCredentials: true,
      });

      console.log("✅ checkAuth response:", response.data);

      if (response.data?._id) {
        set({
          user: response.data,
          isAuthenticated: true,
        });

        if (!get().socket) get().connectSocket();

        return { success: true };
      }

      return { success: false };
    } catch (error) {
      console.error("❌ checkAuth failed:", error.response?.data || error.message);
      set({ user: null, isAuthenticated: false });
      return { success: false };
    }
  },

  connectSocket: () => {
    const { user, socket } = get();

    if (!user || (socket && socket.connected)) return;

    const newSocket = io(BASE_URL, {
      query: {
        userId: user._id,
      },
    });

    set({ socket: newSocket });

    newSocket.on("connect", () => {
      console.log("🟢 Socket connected:", newSocket.id);
    });

    newSocket.on("getOnlineUsers", (userIds) => {
      set((state) => {
        if (JSON.stringify(state.onlineUsers) !== JSON.stringify(userIds)) {
          return { onlineUsers: userIds };
        }
        return state;
      });
    });

    newSocket.on("disconnect", () => {
      console.log("🟡 Socket disconnected");
      set({ socket: null });
    });
  },
}));
