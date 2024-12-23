// const API_BASE_URL = "http://localhost:3000/api";
const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const api = {
  // Auth functions
  async register({ username, email, password }) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      return data;
    } catch (error) {
      throw error;
    }
  },

  async login({ email, password }) {
    console.log("====================================");
    console.log(API_BASE_URL);
    console.log("====================================");
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      return data;
    } catch (error) {
      throw error;
    }
  },

  // Greeting-related functions
  createGreeting: async (formData, token) => {
    try {
      const response = await fetch("http://localhost:3000/api/greetings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const error = await response.json();

        throw new Error(
          error.error || error.message || "Failed to create greeting"
        );
      }

      return response.json();
    } catch (error) {
      console.error("Error creating greeting:", error);
      throw error;
    }
  },

  fetchUserGreetings: async (userId, token) => {
    try {
      const response = await fetch(`${API_BASE_URL}/greetings/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch greetings");
      }

      return data.data; // Return greetings array
    } catch (err) {
      console.error("Error fetching greetings:", err);
      throw err; // Rethrow error for the caller to handle
    }
  },

  async getGreetingBySlug(slug) {
    try {
      const response = await fetch(`${API_BASE_URL}/greetings/share/${slug}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch greeting");
      }

      return data;
    } catch (error) {
      throw error;
    }
  },

  async deleteGreeting(slug, token) {
    try {
      const response = await fetch(`${API_BASE_URL}/greetings/${slug}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Pass token for authentication
        },
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to delete greeting");
      }

      return { message: "Greeting deleted successfully" };
    } catch (error) {
      throw error;
    }
  },
};
