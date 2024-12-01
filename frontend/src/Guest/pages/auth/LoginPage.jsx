import React from "react";

function LoginPage() {
  return (
    <div className="min-h-screen bg-skin-background flex flex-col items-center justify-center px-4">
      <h1 className="text-5xl font-bold mb-12">Seasonal Wishes</h1>
      <div className="bg-gradient-autumn p-8 rounded-lg shadow-lg text-center w-full max-w-md">
        <h2 className="text-xl font-semibold text-skin-dark-text mb-6">
          Welcome Back to <br />
          <span className="text-3xl font-bold mt-2 block">Seasonal Wishes</span>
        </h2>
        <form className="space-y-4">
          <input
            type="email"
            placeholder="Email address"
            required
            className="w-full px-4 py-3 md:py-4 rounded-md bg-white bg-opacity-80 placeholder-skin-dark-text text-skin-dark-text focus:outline-none focus:ring-2 focus:ring-skin-primary"
          />
          <input
            type="password"
            placeholder="Password"
            required
            className="w-full px-4 py-3 md:py-4 rounded-md bg-white bg-opacity-80 placeholder-skin-dark-text text-skin-dark-text focus:outline-none focus:ring-2 focus:ring-skin-primary"
          />
          <button
            type="submit"
            className="w-full bg-skin-button dark font-bold py-3 py-2 px-4 rounded-md hover:bg-skin-primary transition duration-300 mt-6"
          >
            Login
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
