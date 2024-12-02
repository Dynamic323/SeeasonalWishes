import React, { useState } from "react";
import { User2Icon } from "lucide-react";
function AdminLogin() {
    const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div>
      {" "}
      <section className="bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a
            className="flex items-center mb-6 text-2xl font-semibold text-white"
            href="#"
          >
            <User2Icon className="mr-3" />
            Welcome Back Admin
          </a>
          <div className="w-full rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-white">
                Login to your account
              </h1>
              <form className="space-y-4 md:space-y-6">
                <div>
                  <label
                    className="block mb-2 text-sm font-medium text-white"
                    htmlFor="email"
                  >
                    Your email
                  </label>
                  <input
                    className="border rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                    id="email"
                    name="email"
                    placeholder="name@company.com"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    className="block mb-2 text-sm font-medium text-white"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <input
                    className="rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                    id="password"
                    name="password"
                    placeholder="••••••••"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                {/* Error message div */}
                {/* <div id="error" ref={errorRef} className="text-red-500"></div> */}
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        aria-describedby="remember"
                        className="w-4 h-4 border rounded focus:ring-3 focus:ring-primary-300 bg-gray-700 border-gray-600 focus:ring-primary-600 ring-offset-gray-800"
                        id="remember"
                        type="checkbox"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label className="text-gray-300" htmlFor="remember">
                        Remember me
                      </label>
                    </div>
                  </div>
                  <a
                    className="text-sm font-medium text-blue-600 hover:underline"
                    href="#"
                  >
                    Forgot password?
                  </a>
                </div>
                <button
                  className="w-full text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700"
                  type="submit"
                >
                  Sign in
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AdminLogin;
