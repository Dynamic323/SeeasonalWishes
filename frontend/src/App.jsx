import React, { Children, useState } from "react";
import ParticleEngineInitializer from "./components/ParticlesBg/ParticleEngineInitializer";
import ParticlesBackground from "./components/ParticlesBg/ParticlesBackground";
import { Outlet } from "react-router-dom";
import { Getseason } from "../regurate";
import GuestLayout from "./Guest/GuestLayout";

const App = () => {
  const [isInitialized, setIsInitialized] = useState(false);

  const handleParticlesInit = () => {
    setIsInitialized(true); // Once the engine is initialized, set the state to true
  };

  return (
    <>
      <GuestLayout>

        
        <Outlet />
      </GuestLayout>
    </>
  );
};

export default App;
