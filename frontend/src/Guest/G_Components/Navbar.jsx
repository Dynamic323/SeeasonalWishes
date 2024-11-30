import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div>
      {" "}
      <nav className=" fixed z-40 top-0 left-0 bg-white/80 backdrop-blur-sm border-b border-skin-accent/20 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <a href="/">
                <span className="text-2xl font-bold text-skin-primary">
                  FestiveWishes
                </span>
              </a>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {[
                  {
                    href: "/",
                    text: "Home",
                  },
                  {
                    href: "/Feature",
                    text: "Feature",
                  },
                  {
                    href: "/Preview",
                    text: "Preview",
                  },
                  {
                    href: "/contact",
                    text: "contact",
                  },
                ].map((item) => (
                  <Link
                    to={`${item.href}`}
                    className="text-skin-text hover:text-skin-primary px-3 py-2 rounded-md text-sm font-medium"
                  >
                    {item.text}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <Link to="/sign-in">
                <button className="bg-skin-button hover:bg-skin-primary text-skin-light-text font-bold py-2 px-4 rounded transition duration-300">
                  Sign in
                </button>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
