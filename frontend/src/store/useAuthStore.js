import { create } from "zustand";
import axios from "axios";

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  isSigningUp: false,

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

      return {
        success: true,
        ...response.data,
      };
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
      set({ user: null, isAuthenticated: false });
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
        return { success: true };
      }

      return { success: false };
    } catch (error) {
      console.error("Auth check error:", error);
      set({ user: null, isAuthenticated: false });
      return { success: false };
    }
  },
}));
