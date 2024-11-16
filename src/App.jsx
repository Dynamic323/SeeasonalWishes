import React, { Children, useState } from "react";
import ParticleEngineInitializer from "./components/ParticlesBg/ParticleEngineInitializer";
import ParticlesBackground from "./components/ParticlesBg/ParticlesBackground";
import Mainlayout from "./layouts/Mainlayout";
import HomePage from "./pages/HomePage";
import { Outlet } from "react-router-dom";

const App = () => {
  const [isInitialized, setIsInitialized] = useState(false);

  const handleParticlesInit = () => {
    setIsInitialized(true); // Once the engine is initialized, set the state to true
  };

  return (
    <>
      {/* // JUst forget About this code here // Initialize the particle engine */}
      {/* <ParticleEngineInitializer onInit={handleParticlesInit} />
       Render the particle background when initialization is done
      {isInitialized && <ParticlesBackground />} */}

      <Mainlayout>
      </Mainlayout>
      <Outlet />
    </>
  );
};

export default App;
