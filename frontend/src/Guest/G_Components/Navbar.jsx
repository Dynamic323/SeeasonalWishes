import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div>
      <nav className="fixed z-40 top-0 left-0 bg-white/80 backdrop-blur-sm border-b border-skin-accent/20 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <a href="/">
                <span className="text-2xl font-bold text-skin-primary">
                  Seasonal Wishes
                </span>
              </a>
            </div>

            {/* Menu Button (Mobile View) */}
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className="text-skin-primary focus:outline-none"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {[
                  { id: 0, href: "/", text: "Home" },
                  { id: 1, href: "/Feature", text: "Feature" },
                  { id: 2, href: "/Preview", text: "Preview" },
                  { id: 3, href: "/contact", text: "Contact" },
                ].map((item) => (
                  <Link
                    key={item.id}
                    to={item.href}
                    className="text-skin-text hover:text-skin-primary px-3 py-2 rounded-md text-sm font-medium"
                  >
                    {item.text}
                  </Link>
                ))}
              </div>
            </div>

            {/* Sign-In Button */}
            <div className="hidden md:block">
              <Link to="/sign-in">
                <button className="bg-skin-button hover:bg-skin-primary text-skin-light-text font-bold py-2 px-4 rounded transition duration-300">
                  Sign in
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-4 pb-4 space-y-2">
              {[
                { id: 0, href: "/", text: "Home" },
                { id: 1, href: "/Feature", text: "Feature" },
                { id: 2, href: "/Preview", text: "Preview" },
                { id: 3, href: "/contact", text: "Contact" },
              ].map((item) => (
                <Link
                  key={item.id}
                  to={item.href}
                  className="block text-skin-text hover:text-skin-primary px-3 py-2 rounded-md text-sm font-medium"
                  onClick={() => setIsMenuOpen(false)} // Close menu on click
                >
                  {item.text}
                </Link>
              ))}
              <Link to="/sign-in">
                <button
                  className="w-full bg-skin-button hover:bg-skin-primary text-skin-light-text font-bold py-2 px-4 rounded transition duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign in
                </button>
              </Link>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
}

export default Navbar;
