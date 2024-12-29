import { createContext, useContext, useState, useEffect } from "react";
import { api } from "../services/api"; // Ensure your API is correctly implemented
import * as jose from "jose";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Decode the JWT token
  const decodeToken = async (token) => {
    try {
      if (!token || token.split('.').length !== 3) {
        throw new Error("Invalid JWT format");
      }
      const decoded = jose.decodeJwt(token); // Decodes JWT without verification
      return decoded;
    } catch (err) {
      console.error("Error decoding token:", err.message);
      return null;
    }
  };

  // Check if token has expired
  const isTokenExpired = (decodedToken) => {
    if (decodedToken && decodedToken.exp) {
      const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
      return decodedToken.exp < currentTime;
    }
    return false;
  };

  const restoreUser = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = await decodeToken(token);
      if (decoded) {
        // If token is expired, log out the user
        if (isTokenExpired(decoded)) {
          logout();
        } else {
          const userData = {
            email: decoded.email,
            isAdmin: decoded.isAdmin || false,
            id: decoded.id,
          };
          setUser(userData);
        }
      } else {
        console.log("Invalid token, logging out...");
        logout(); // Log out the user if the token is invalid
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    restoreUser(); // Restore user state on component mount
  }, []);

  const login = async (email, password) => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.login({ email, password });
      if (response.token) {
        // Save the token to localStorage
        localStorage.setItem("token", response.token);

        // Decode the token to extract user details
        const decoded = await decodeToken(response.token);
        const userData = {
          email,
          isAdmin: decoded?.isAdmin || false,
          id: decoded?.id,
        };

        // Save user id to localStorage
        localStorage.setItem("userId", userData.id);

        // Update the user state
        setUser(userData);

        return userData;
      } else {
        throw new Error(response.message || "Login failed");
      }
    } catch (err) {
      setError(err.message);
      console.error("Login Error:", err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const register = async (username, email, password) => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.register({ username, email, password });
      if (response.message === "User registered successfully!") {
        return true;
      } else {
        throw new Error(response.message);
      }
    } catch (err) {
      setError(err.message);
      console.error("Registration Error:", err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    console.log("Logging out...");
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, error, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
