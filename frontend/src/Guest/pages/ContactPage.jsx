import React, { useState, useEffect } from "react";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-skin-background text-skin-text relative overflow-hidden">
      {/* Falling Leaves Animation */}
      {/* <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-fall"
            style={{
              left: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 5 + 5}s`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          >
            <i
              className={`fas fa-leaf text-skin-accent text-opacity-50 text-${
                Math.floor(Math.random() * 3) + 2
              }xl transform rotate-${Math.floor(Math.random() * 360)}`}
            ></i>
          </div>
        ))}
      </div> */}

      <div className="container pt-14 mx-auto px-4 py-12 relative z-10">
        <h1 className="text-4xl sm:text-5xl md:text-5xl font-bold text-skin-text text-center my-6 ">
          Contact Us
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-xl backdrop-blur-sm">
            <h2 className="text-3xl font-semibold mb-6 text-skin-secondary">
              Send us a message
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-skin-dark-text mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-skin-accent rounded-md focus:outline-none focus:ring-2 focus:ring-skin-primary transition duration-300"
                  required
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-skin-dark-text mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-skin-accent rounded-md focus:outline-none focus:ring-2 focus:ring-skin-primary transition duration-300"
                  required
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-skin-dark-text mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-4 py-2 border border-skin-accent rounded-md focus:outline-none focus:ring-2 focus:ring-skin-primary transition duration-300"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-skin-button text-skin-light-text font-bold py-3 px-6 rounded-md hover:bg-skin-primary transition duration-300 transform hover:scale-105"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="bg-gradient-autumn p-8 rounded-lg shadow-xl text-skin-light-text backdrop-blur-sm">
            <h2 className="text-3xl font-semibold mb-8 shadow-text">
              Get in touch
            </h2>
            <div className="space-y-6">
              <div className="flex items-start">
                <i className="fas fa-map-marker-alt mr-4 text-skin-accent text-2xl mt-1"></i>
                <p className="text-lg">
                  123 Autumn Lane, Seasonal City, SC 12345
                </p>
              </div>
              <div className="flex items-center">
                <i className="fas fa-phone mr-4 text-skin-accent text-2xl"></i>
                <p className="text-lg">+1 (555) 123-4567</p>
              </div>
              <div className="flex items-center">
                <i className="fas fa-envelope mr-4 text-skin-accent text-2xl"></i>
                <p className="text-lg">contact@seasonalwishes.com</p>
              </div>
            </div>
            <div className="mt-12">
              <h3 className="text-2xl font-semibold mb-4 shadow-text">
                Business Hours
              </h3>
              <ul className="space-y-2 text-lg">
                <li>Monday - Friday: 9am - 5pm</li>
                <li>Saturday: 10am - 2pm</li>
                <li>Sunday: Closed</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="mt-16 flex justify-center">
          <div className="w-20 h-20 bg-skin-accent rounded-full mx-3 animate-bounce shadow-lg"></div>
          <div
            className="w-20 h-20 bg-skin-primary rounded-full mx-3 animate-bounce shadow-lg"
            style={{ animationDelay: "0.2s" }}
          ></div>
          <div
            className="w-20 h-20 bg-skin-secondary rounded-full mx-3 animate-bounce shadow-lg"
            style={{ animationDelay: "0.4s" }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
