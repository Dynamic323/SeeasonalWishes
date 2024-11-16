import React from "react";

function HomePage() {
  return (
    <div>
      <div className="bg-background text-text z-10 flex justify-center items-center h-[38vh]">
        {/* A section with the autumn gradient background */}
        <section className="bg-gradient-autumn p-10">
          <h1 className="text-4xl font-bold text-light-text">
            Welcome to the Seasonal Whishes
          </h1>
          <p className="text-lg text-dark-text">
            Celebrate the warmth of the season with a personalized message for
            your loved ones.
          </p>
        </section>

        {/* Button with autumn accent color */}
        <button className="bg-button text-light-text p-3 rounded hover:bg-hover">
          Send Message
        </button>
      </div>
    </div>
  );
}

export default HomePage;
