import { apiService } from "./api-service";



export const authService = {

    login: async (email, password) => {
        try {
            const response = await apiService.post("/auth/login", { email, password }, { withCredentials: true });
            return response.data;
        } catch (error) {
            console.error("Login failed:", error);
            throw error;
        }
    },
    fetchMe: async () => {
        try {
            const response = await apiService.get("/auth/me", { withCredentials: true });
            return response.data;
        } catch (error) {
            console.error("Failed to fetch user information:", error);
            throw error;
        }
    },

    logout: async () => {
        try {
            await apiService.post("/auth/logout", {}, { withCredentials: true });

        } catch (error) {
            console.error("Logout failed:", error);
            throw error;
        }
    },
};