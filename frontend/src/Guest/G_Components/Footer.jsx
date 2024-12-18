import React from "react";

function Footer() {
  return (
    <div className="bg-gray-900 text-white">
      <footer className="  py-12 space-y-16 lg:pl-16 sm:pl-12 pl-6">
        {/* Brand Section */}
        <div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
            FestiveWishes
          </h2>
          <p className="text-lg text-gray-400 pt-4 leading-relaxed">
            Making every occasion special with personalized greetings and timely
            wishes.
          </p>
        </div>
        <div className="grid sm:grid-cols-3 lg:grid-cols-3 grid-flow-row gap-y-4 sm:gap-y-0 lg:gap-y-0 w-full ">
          {/* Quick Links Section */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-semibold">Quick Links</h2>
            <div className="grid gap-2 text-lg text-gray-400 pt-4">
              <a href="#" className="hover:text-gray-200 transition">
                About Us
              </a>
              <a href="/Feature" className="hover:text-gray-200 transition">
                Features
              </a>
              <a href="#" className="hover:text-gray-200 transition">
                Pricing
              </a>
              <a href="#" className="hover:text-gray-200 transition">
                Contact
              </a>
            </div>
          </div>

          {/* Templates Section */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-semibold">Templates</h2>
            <div className="grid gap-2 text-lg text-gray-400 pt-4">
              <a href="#" className="hover:text-gray-200 transition">
                Birthday Wishes
              </a>
              <a href="#" className="hover:text-gray-200 transition">
                Anniversary Cards
              </a>
              <a href="#" className="hover:text-gray-200 transition">
                Holiday Greetings
              </a>
              <a href="#" className="hover:text-gray-200 transition">
                Custom Messages
              </a>
            </div>
          </div>

          {/* Newsletter Section */}
          <div className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-semibold">Newsletter</h2>
            <p className="text-lg text-gray-400">
              Stay updated with our latest templates and features.
            </p>
            <div className="flex items-center space-x-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full max-w-sm px-4 py-2 bg-gray-800 text-white placeholder-gray-500 rounded-md outline-none focus:ring-2 focus:ring-primary focus:bg-gray-700"
              />
              <button className="bg-red-600 text-white py-3 px-4 rounded-md hover:bg-red-500 transition hover:scale-105">
                <i className="fas fa-paper-plane"></i>
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
