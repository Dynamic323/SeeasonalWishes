import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

function LoginPage() {
  const navigate = useNavigate();
  const { login, error, user } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userData = await login(formData.email, formData.password);
      if (userData) {
        if (userData.isAdmin) {
          navigate("/admin/dashboard");
        } else {
          navigate("/user/dashboard");
        }
      }
    } catch (err) {
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-skin-background flex flex-col items-center justify-center px-4">
      <h1 className="text-5xl font-bold mb-12">Seasonal Wishes</h1>
      <div className="bg-gradient-autumn p-8 rounded-lg shadow-lg text-center w-full max-w-md">
        <h2 className="text-xl font-semibold text-skin-dark-text mb-6">
          Welcome Back to <br />
          <span className="text-3xl font-bold mt-2 block">Seasonal Wishes</span>
        </h2>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
            {error}
          </div>
        )}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email address"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 md:py-4 rounded-md bg-white bg-opacity-80 placeholder-skin-dark-text text-skin-dark-text focus:outline-none focus:ring-2 focus:ring-skin-primary"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-3 md:py-4 rounded-md bg-white bg-opacity-80 placeholder-skin-dark-text text-skin-dark-text focus:outline-none focus:ring-2 focus:ring-skin-primary"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-skin-button text-white font-bold py-3 px-4 rounded-md hover:bg-skin-primary transition duration-300 mt-6 disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <div className="mt-6 text-skin-dark-text">
          <span className="mr-2">Don't have an account?</span>
          <a
            href="/signup"
            className="text-skin-button hover:text-skin-primary transition duration-300"
          >
            Sign Up
          </a>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
