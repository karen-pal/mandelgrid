import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MandelGrid from "../assets/mandelgrid.svg";

interface CircleAnimationProps {
  color?: string;
  time?: number;
}

const CircleAnimation = ({}: CircleAnimationProps): JSX.Element => {
  const [stage, setStage] = useState(0);
  const [position, setPosition] = useState({ cx: 250, cy: 330, r: 35 });
  const [blueStage, setBlueStage] = useState(0);
  const [orangeStage, setOrangeStage] = useState(0);
  const [bluePosition, setBluePosition] = useState({ cx: 219, cy: 267, r: 35 });
  const [orangePosition, setOrangePosition] = useState({
    cx: 250,
    cy: 330,
    r: 35,
  });

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setStage((prev) => (prev + 1) % 4); // % 4
  //     updatePosition();
  //   }, 800);
  //   return () => clearInterval(interval);
  // }, []);

  const updateBluePosition = () => {
    const randomIndex = Math.floor(Math.random() * gridPositions.length);
    setBluePosition(gridPositions[randomIndex]);
  };

  const updateOrangePosition = () => {
    const randomIndex = Math.floor(Math.random() * gridPositions.length);
    setOrangePosition(gridPositions[randomIndex]);
  };

  useEffect(() => {
    const blueInterval = setInterval(() => {
      setBlueStage((prev) => (prev + 1) % 4);
      updateBluePosition();
    }, 800);

    return () => clearInterval(blueInterval);
  }, []);

  useEffect(() => {
    const orangeInterval = setInterval(() => {
      setOrangeStage((prev) => (prev + 1) % 4);
      updateOrangePosition();
    }, 2000);

    return () => clearInterval(orangeInterval);
  }, []);

  const positions = [
    { cx: 250, cy: 330, r: 35 },
    { cx: 250, cy: 167, r: 20 },
    { cx: 250, cy: 90, r: 15 },
    { cx: 250, cy: 42, r: 10 },
  ];

  const gridPositions = [
    // First row
    { cx: 219, cy: 267, r: 35 },
    { cx: 249, cy: 267, r: 35 },
    { cx: 279, cy: 267, r: 35 },
    // Second row
    { cx: 189, cy: 297, r: 35 },
    { cx: 219, cy: 297, r: 35 },
    { cx: 249, cy: 297, r: 35 },
    { cx: 279, cy: 297, r: 35 },
    { cx: 309, cy: 297, r: 35 },
    // Third row
    { cx: 189, cy: 327, r: 35 },
    { cx: 219, cy: 327, r: 35 },
    { cx: 249, cy: 327, r: 35 },
    { cx: 279, cy: 327, r: 35 },
    { cx: 309, cy: 327, r: 35 },
    // Fourth row
    { cx: 189, cy: 357, r: 35 },
    { cx: 219, cy: 357, r: 35 },
    { cx: 249, cy: 357, r: 35 },
    { cx: 279, cy: 357, r: 35 },
    { cx: 309, cy: 357, r: 35 },
    // Fifth row
    { cx: 219, cy: 387, r: 35 },
    { cx: 249, cy: 387, r: 35 },
    { cx: 279, cy: 387, r: 35 },
  ];
  const updatePosition = () => {
    const randomIndex = Math.floor(Math.random() * gridPositions.length);
    setPosition(gridPositions[randomIndex]);
  };
  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
      <img
        src={MandelGrid}
        style={{ width: "100%", height: "100%", position: "absolute" }}
      />

      <svg
        width="100%"
        height="100%"
        viewBox="0 0 500 500"
        style={{ position: "absolute", left: 0, top: 0 }}
      >
        <AnimatePresence>
          {[0, 1, 2, 3].map((index) => {
            if (blueStage !== index) return null;

            const { cx, cy, r } = index === 0 ? bluePosition : positions[index];

            return (
              <motion.g
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
              >
                {[1.2, 0.8, 0.4].map((scale, i) => (
                  <motion.circle
                    key={i}
                    cx={cx}
                    cy={cy}
                    r={r * scale}
                    fill="none"
                    stroke="#0017e2"
                    strokeWidth={
                      cy === 42 || cy === 90 ? 1 : cy === 167 ? 1.5 : 2
                    }
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{
                      scale: 1,
                      opacity: i === 2 ? 1 : i === 1 ? 0.6 : 0.3,
                    }}
                    transition={{ duration: 0.5, delay: i * 0.2 }}
                  />
                ))}
              </motion.g>
            );
          })}
        </AnimatePresence>
      </svg>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 500 500"
        style={{ position: "absolute", left: 0, top: 0 }}
      >
        <AnimatePresence>
          {[0, 1, 2, 3].map((index) => {
            if (orangeStage !== index) return null;

            const { cx, cy, r } =
              index === 0 ? orangePosition : positions[index];

            return (
              <motion.g
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
              >
                {[1.2, 0.8, 0.4].map((scale, i) => (
                  <motion.circle
                    key={i}
                    cx={cx}
                    cy={cy}
                    r={r * scale}
                    fill="none"
                    stroke="#ff9706"
                    strokeWidth={
                      cy === 42 || cy === 90 ? 1 : cy === 167 ? 1.5 : 2
                    }
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{
                      scale: 1,
                      opacity: i === 2 ? 1 : i === 1 ? 0.6 : 0.3,
                    }}
                    transition={{ duration: 0.5, delay: i * 0.2 }}
                  />
                ))}
              </motion.g>
            );
          })}
        </AnimatePresence>
      </svg>
    </div>
  );
};

export default CircleAnimation;
