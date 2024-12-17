import { createContext, useContext, useState } from "react";
import { api } from "../services/api";
import * as jose from "jose";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const decodeToken = async (token) => {
    try {
      // Decode the payload without verifying the signature
      const decoded = jose.decodeJwt(token);
      return decoded;
    } catch (err) {
      console.error("Error decoding token:", err);
      return null;
    }
  };

  const login = async (email, password) => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.login({ email, password });


      
      
      if (response.token) {
        localStorage.setItem("token", response.token);
        localStorage.setItem("userId", response.userId);
        const decoded = await decodeToken(response.token);
        const userData = {
          email,
          isAdmin: decoded?.isAdmin || false,
          id: decoded?.id,
        };
        setUser(userData);
        return userData;
      } else {
        throw new Error(response.message);
      }
    } catch (err) {
      setError(err.message);
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
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
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
