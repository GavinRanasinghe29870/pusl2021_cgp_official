import { create } from "zustand";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

export const useClubAuthStore = create((set, get) => ({
    club: null,
    isAuthenticated: false,
    isSigningUp: false,
    onlineClubs: [],
    socket: null,

    handleError: (error) => {
        console.error("❌ Error:", error.response?.data || error.message);
        return {
            success: false,
            error: error.response?.data?.error || "An unexpected error occurred",
        };
    },

    signin: async (formData) => {
        const validation = validateFormData(formData, ["Clubusername", "password"]);
        if (!validation.success) return validation;

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
            return get().handleError(error);
        }
    },

    signup: async (formData) => {
        set({ isSigningUp: true });
        try {
            console.log("🟢 Sending Sign-Up Data:", formData);

            const response = await axios.post(`${BASE_URL}/api/ClubAuth/Clubsignup`, formData, {
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
            return get().handleError(error);
        } finally {
            set({ isSigningUp: false });
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
            return { success: true };
        } catch (error) {
            return get().handleError(error);
        }
    },

    checkClubAuth: async () => {
        try {
            const response = await axios.get(`${BASE_URL}/api/ClubAuth/check`, {
                withCredentials: true,
            });

            console.log("✅ checkClubAuth response:", response.data);

            if (response.data?._id) {
                set({
                    club: response.data,
                    isAuthenticated: true,
                });

                return { success: true };
            }

            return { success: false };
        } catch (error) {
            console.error("❌ checkClubAuth failed:", error.response?.data || error.message);
            set({ club: null, isAuthenticated: false });
            return { success: false };
        }
    },
}));

const validateFormData = (formData, requiredFields) => {
    for (const field of requiredFields) {
        if (!formData[field]) {
            return { success: false, error: `${field} is required` };
        }
    }
    return { success: true };
};