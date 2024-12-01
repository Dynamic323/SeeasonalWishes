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
        <h1 className="text-4xl sm:text-5xl md:text-xl font-bold text-skin-text text-center my-6 ">
          Contact Us
        </h1>

        {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-12"> */}
        <div className="flex justify-center items-center">
          {/* Contact Form */}
          {/* <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-xl backdrop-blur-sm">
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
          </div> */}

          {/* Contact Information */}
          <div className="bg-gradient-autumn w-[60%] p-8 rounded-2xl shadow-2xl text-skin-dark-text backdrop-blur-sm transform hover:scale-90 transition-all duration-300">
            <h2 className="text-3xl font-semibold mb-8 shadow-text border-b-2 border-skin-light-text pb-2">
              Contact Information
            </h2>
            <div className="space-y-8">
              <div className="flex items-start">
                <i className="fas fa-map-marker-alt mr-4 text-skin-accent text-3xl mt-1"></i>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Our Location</h3>
                  <p className="text-lg">
                    123 Autumn Lane, Seasonal City, SC 12345
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <i className="fas fa-phone-alt mr-4 text-skin-accent text-3xl mt-1"></i>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Phone</h3>
                  <p className="text-lg">+1 (555) 123-4567</p>
                </div>
              </div>
              <div className="flex items-start">
                <i className="fas fa-envelope mr-4 text-skin-accent text-3xl mt-1"></i>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Email</h3>
                  <p className="text-lg">contact@seasonalwishes.com</p>
                </div>
              </div>
            </div>
            <div className="mt-12">
              <h3 className="text-2xl font-semibold mb-4 shadow-text border-b-2 border-skin-light-text pb-2">
                Business Hours
              </h3>
              <ul className="space-y-2 text-lg">
                <li>
                  <i className="fas fa-clock mr-2 text-skin-accent"></i>Monday -
                  Friday: 9am - 5pm
                </li>
                <li>
                  <i className="fas fa-clock mr-2 text-skin-accent"></i>
                  Saturday: 10am - 2pm
                </li>
                <li>
                  <i className="fas fa-clock mr-2 text-skin-accent"></i>Sunday:
                  Closed
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="mt-16 flex justify-center space-x-6">
          <a
            href="#"
            className="text-skin-accent hover:text-skin-primary transition-colors duration-300"
          >
            <i className="fab fa-facebook-f text-4xl"></i>
          </a>
          <a
            href="#"
            className="text-skin-accent hover:text-skin-primary transition-colors duration-300"
          >
            <i className="fab fa-twitter text-4xl"></i>
          </a>
          <a
            href="#"
            className="text-skin-accent hover:text-skin-primary transition-colors duration-300"
          >
            <i className="fab fa-instagram text-4xl"></i>
          </a>
          <a
            href="#"
            className="text-skin-accent hover:text-skin-primary transition-colors duration-300"
          >
            <i className="fab fa-linkedin-in text-4xl"></i>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
