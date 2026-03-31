import { apiService } from "./api-service";

export const uploadService = {
  upload: async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = await apiService.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Failed to upload file:", error);
      throw error;
    }
  },
};