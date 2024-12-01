import { useEffect, useState } from "react";
import { useSpring, animated } from "react-spring";

const Leaf = ({ style }) => (
  <animated.div style={style} className="absolute text-skin-primary">
    🍂
  </animated.div>
);

const FallingLeaves = () => {
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    const createLeaf = () => {
      const newLeaf = {
        id: Date.now(),
        x: Math.random() * window.innerWidth,
        y: -20,
        rotation: Math.random() * 360,
        scale: 0.5 + Math.random() * 0.5,
      };
      setLeaves((prevLeaves) => [...prevLeaves, newLeaf]);

      setTimeout(() => {
        setLeaves((prevLeaves) =>
          prevLeaves.filter((leaf) => leaf.id !== newLeaf.id)
        );
      }, 5000);
    };

    const interval = setInterval(createLeaf, 300);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {leaves.map((leaf) => (
        <Leaf
          key={leaf.id}
          style={useSpring({
            from: {
              transform: `translate(${leaf.x}px, ${leaf.y}px) rotate(${leaf.rotation}deg) scale(${leaf.scale})`,
            },
            to: {
              transform: `translate(${leaf.x}px, ${
                window.innerHeight + 20
              }px) rotate(${leaf.rotation + 360}deg) scale(${leaf.scale})`,
            },
            config: { duration: 5000 },
          })}
        />
      ))}
    </>
  );
};

export default FallingLeaves;
