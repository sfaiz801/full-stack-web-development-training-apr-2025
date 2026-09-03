import apiClient from "@/lib/apiClient";

export const userService = {
  getProfile: async () => {
    const response = await apiClient.get("/profile");
    return response.data;
  },
};
