import { Link } from "react-router-dom";
import React from "react";
import Navbar from "../G_Components/Navbar";
import TestimonialsSection from "../G_Components/TestimonialsSection";
import FAQ from "../G_Components/FAQ";

function HomePage() {
  const explore = [
    {
      title: "Create a Greeting",
      description: "Craft personalized messages with our easy-to-use editor.",
      icon: "🎁",
    },
    {
      title: "Explore Templates",
      description: "Choose from a variety of beautiful pre-designed templates.",
      icon: "🔍",
    },
    {
      title: "Schedule Your Message",
      description: "Set the perfect time for your greetings to be received.",
      icon: "📅",
    },
  ];

  const enhance = [
    {
      text: "Personalized Touch",
      subtext: "Add your personal to every message",
      icon: " fa-heart",
    },
    {
      text: "Instant Delivery",
      subtext: "Send wishes to anywhere in the world",
      icon: "fa-solid fa-plane",
    },
    {
      text: "Never Miss a Date",
      subtext: "Set reminders for important occasions",
      icon: "fa-clock",
    },
    {
      text: "Premium Templates",
      subtext: "Access to exclusive design templates",
      icon: " fa-star",
    },
  ];

  return (
    <div className="min-h-screen pt-14 bg-skin-background">
      {/* Navigation */}
      {/* <Navbar /> */}

      {/*droping leaves */}
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

      {/* Hero Section with SVG pattern */}
      <section className=" overflow-hidden py-20 sm:py-32 bg-gradient-autumn">
        {/* <div className="absolute inset-0 overflow-hidden">
          <AutumnLeaf
            style={{ top: "10%", left: "5%", transform: "rotate(-15deg)" }}
          />
          <AutumnLeaf
            style={{ top: "20%", right: "10%", transform: "rotate(30deg)" }}
          />
          <AutumnLeaf
            style={{ bottom: "15%", left: "15%", transform: "rotate(45deg)" }}
          />
          <AutumnLeaf
            style={{
              bottom: "10%",
              right: "5%",
              transform: "rotate(-30deg)",
            }}
          />
        </div> */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-skin-text text-center mb-6">
            Welcome to SeasonalWishes
          </h1>
          <p className="text-xl md:text-2xl text-skin-dark-text text-center mb-8 max-w-3xl">
            Create, schedule, and send heartfelt greetings that surprise and
            delight your loved ones
          </p>
          <button className="bg-skin-button hover:bg-skin-primary text-skin-light-text text-lg font-bold py-3 px-8 rounded-full shadow-lg transition duration-300 transform hover:scale-105">
            Get started
          </button>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          {explore.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="p-6">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-skin-text mb-2">
                  {feature.title}
                </h3>
                <p className="text-skin-dark-text">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="bg-skin-accent/10 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-skin-text text-center mb-12">
            Why Choose FestiveWishes?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {enhance.map((item) => (
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6 text-center">
                  <div className="text-4xl mb-4">
                    {enhance.icon}
                    <i class={`fa-regular ${item.icon}`}></i>
                  </div>
                  <h3 className="text-xl font-semibold text-skin-text mb-2">
                    {item.text}
                  </h3>
                  <p className="text-skin-dark-text">{item.subtext}</p>
                </div>
              </div>
            ))}
            {/* Additional 'why choose' cards can be added here */}
          </div>
        </div>
      </section>

      <TestimonialsSection />
      <FAQ/>
    </div>
  );
}

export default HomePage;
