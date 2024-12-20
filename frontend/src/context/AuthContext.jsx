import { createContext, useContext, useState, useEffect } from "react";
import { api } from "../services/api"; // Ensure your API is correctly implemented
import * as jose from "jose";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const decodeToken = async (token) => {
    try {
      const decoded = jose.decodeJwt(token); // Decodes JWT without verification
      // console.log("Decoded Token:", decoded); // Debugging
      return decoded;
    } catch (err) {
      console.error("Error decoding token:", err.message);
      return null;
    }
  };

  const restoreUser = async () => {
    const token = localStorage.getItem("token");
    // console.log("Restoring user session, token:", token); // Debugging
    if (token) {
      const decoded = await decodeToken(token);
      if (decoded) {
        const userData = {
          email: decoded.email,
          isAdmin: decoded.isAdmin || false,
          id: decoded.id,
        };
        // console.log("Restored User Data:", userData); // Debugging
        setUser(userData);
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
        localStorage.setItem("token", response.token);
        const decoded = await decodeToken(response.token);
        const userData = {
          email,
          isAdmin: decoded?.isAdmin || false,
          id: decoded?.id,
        };
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
