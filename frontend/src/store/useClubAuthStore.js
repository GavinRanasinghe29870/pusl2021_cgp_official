import { create } from "zustand";
import axios from "axios";

const BASE_URL = "http://localhost:5000";

export const useClubAuthStore = create((set, get) => ({
    club: null,
    isAuthenticated: false,
    isSigningUp: false,
    onlineClubs: [],
    socket: null,

    signin: async (formData) => {
        try {
            const dataToSend = {
                Clubusername: formData.Clubusername,
                password: formData.password,
                sportLevel: formData.sportLevel || "Clubs",
            };

            console.log("🟢 Sending Sign-In Data:", dataToSend);

            const response = await axios.post(`${BASE_URL}/api/ClubAuth/Clubsignin`, dataToSend, {
                withCredentials: true,
            });

            if (response.data?.club) {
                set({
                    club: response.data.club,
                    isAuthenticated: true,
                });

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

            const response = await axios.post(`${BASE_URL}/api/ClubAuth/Clubsignup`, formData, {
                withCredentials: true,
            });

            set({ isSigningUp: false });

            if (response.data?.club) {
                set({
                    club: response.data.club,
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
            await axios.post(`${BASE_URL}/api/ClubAuth/logout`, {}, {
                withCredentials: true,
            });

            const socket = get().socket;
            if (socket) {
                socket.disconnect();
                set({ socket: null });
            }

            set({ club: null, isAuthenticated: false });
            window.location.reload();
            return { success: true };
        } catch (error) {
            console.error("❌ Logout error:", error.message);
            return { success: false, error: error.message };
        }
    },

    checkAuth: async () => {
        try {
            const response = await axios.get(`${BASE_URL}/api/ClubAuth/check`, {
                withCredentials: true,
            });

            console.log("✅ checkAuth response:", response.data);

            if (response.data?._id) {
                set({
                    club: response.data,
                    isAuthenticated: true,
                });

                if (!get().socket) get().connectSocket();

                return { success: true };
            }

            return { success: false };
        } catch (error) {
            console.error("❌ checkAuth failed:", error.response?.data || error.message);
            set({ club: null, isAuthenticated: false });
            return { success: false };
        }
    },
}));
