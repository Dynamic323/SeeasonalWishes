import React from "react";
import HomePage from "./pages/HomePage";
import Navbar from "./G_Components/Navbar";
import Footer from "./G_Components/Footer";
function GuestLayout({ children }) {
  return (
    <div className="min-h-screen pt-16 bg-skin-background">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}

export default GuestLayout;
