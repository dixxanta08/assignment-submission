import { apiService } from "./api-service";


export const listingService = {


    getListings: async (params) => {
        try {
            console.log("Fetching listings with params:", params);
            const response = await apiService.get("/listings", { params });
            return response.data;
        } catch (error) {
            console.error("Failed to fetch listings:", error);
            throw error;
        }
    },

    getMyListings: async () => {
        try {
            const response = await apiService.get("/listings/my");
            return response.data;
        } catch (error) {
            console.error("Failed to fetch my listings:", error);
            throw error;
        }
    },

    getListingById: async (id) => {
        try {
            const response = await apiService.get(`/listings/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Failed to fetch listing with id ${id}:`, error);
            throw error;
        }
    },

    createListing: async (listingData) => {
        try {
            const response = await apiService.post("/listings", listingData);
            return response.data;
        } catch (error) {
            console.error("Failed to create listing:", error);
            throw error;
        }
    },
    updateListing: async (id, listingData) => {
        try {
            const response = await apiService.patch(`/listings/${id}`, listingData);
            return response.data;
        }
        catch (error) {
            console.error(`Failed to update listing with id ${id}:`, error);
            throw error;
        }
    },
    deleteListing: async (id) => {
        try {
            await apiService.delete(`/listings/${id}`);
        }
        catch (error) {
            console.error(`Failed to delete listing with id ${id}:`, error);
            throw error;
        }

    }
    ,
    restoreListing: async (id) => {
        try {
            const response = await apiService.patch(`/listings/${id}/restore`);
            return response.data;
        }
        catch (error) {
            console.error(`Failed to restore listing with id ${id}:`, error);
            throw error;
        }
    }


};