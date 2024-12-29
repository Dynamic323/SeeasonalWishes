// const API_BASE_URL = "http://localhost:3000/api";
const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const api = {
  async fetchWithAuth(url, options = {}) {
    const token = localStorage.getItem("token"); // Retrieve the token from storage
    if (!token) {
      throw new Error("No token found, user is not logged in.");
    }

    const headers = {
      ...options.headers,
      Authorization: `Bearer ${token}`, // Include the token in the Authorization header
    };

    try {
      const response = await fetch(url, { ...options, headers });

      // If the token is invalid or expired, log out the user
      if (response.status === 401) {
        handleLogout(); // Call the logout function
        throw new Error("Invalid or expired token");
      }

      // Parse JSON response if successful
      return await response.json();
    } catch (error) {
      console.error("Error with fetchWithAuth:", error);
      throw error; // Rethrow the error for further handling
    }
  },

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
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include", // Include credentials (cookies, sessions) if necessary
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

  sendReply: async (payload) => {
    try {
      const response = await fetch(`${API_BASE_URL}/replies`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorMessage = await response.text(); // Get the response body
        console.error(
          `Error sending reply: ${response.status} - ${errorMessage}`
        );
        throw new Error(
          `Error sending reply: ${response.status} - ${errorMessage}`
        );
      }

      // Check if the response is JSON
      const contentType = response.headers.get("Content-Type");
      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();
        return data;
      } else {
        throw new Error("Received non-JSON response");
      }
    } catch (error) {
      console.error("Error sending reply:", error);
      throw error; // You can also re-throw or return an error response to handle in the UI
    }
  },

  getRepliesForUser: async ({ userId }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/replies/${userId}`);
      const contentType = response.headers.get("Content-Type");

      if (!response.ok) {
        throw new Error(
          `Failed to fetch replies: ${response.status} ${response.statusText}`
        );
      }

      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();
        return data;
      } else {
        throw new Error(`Expected JSON response but received: ${contentType}`);
      }
    } catch (error) {
      console.error("Error fetching replies:", error);
      throw error;
    }
  },

  deleteReply: async (greetingId, replyId) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/replies/greetings/${greetingId}/replies/${replyId}
        
        `,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error(
          `Failed to delete reply: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();
      // console.log("Reply deleted successfully:", data);
      return data;
    } catch (error) {
      console.error("Error in deleting reply:", error);
      throw error;
    }
  },
  deleteGreeting: async (greetingId, token) => {
    try {
      console.log(`${API_BASE_URL}/replies/${greetingId}/del`);

      const response = await fetch(
        `${API_BASE_URL}/replies/${greetingId}/del`, // Updated API URL to reflect the greeting deletion
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(
          `Failed to delete greeting: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error in deleting greeting:", error);
      throw error;
    }
  },
};

const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");

  alert("Your session has expired. Please log in again."); // Feedback to the user
  window.location.href = "/login";
};
