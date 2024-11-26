import { useEffect, useState } from "react";
import { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim"; // or another loader like loadFull or loadBasic

const ParticleEngineInitializer = ({ onInit }) => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine); // Loading slim particles engine
    }).then(() => {
      setInit(true);
      onInit(); // Notify the parent component when the engine is initialized
    });
  }, [onInit]);

  return <>{init ? null : <div>Loading particles...</div>}</>;
};

export default ParticleEngineInitializer;
