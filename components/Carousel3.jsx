"use client";

import { motion } from "framer-motion";

const Carousel3 = () => {
  const images = [
    "./companies/ab.jpeg",
    "./companies/bc.jpeg",
    "./companies/cd.jpeg",
    "./companies/de.jpeg",
    "./companies/ef.jpeg",
    "./companies/fg.jpeg",
    "./companies/ij.jpeg",
    "./companies/jk.jpeg",
    "./companies/lm.jpeg",
  ];

  return (
    <div className="overflow-hidden rounded-xl w-full bg-transparent mt-4">
      <motion.div
        className="flex w-max"
        animate={{ x: ["0%", "-50%"] }} // Moves only half for seamless loop
        transition={{
          duration: 50, // Adjust speed for smoother movement
          repeat: Infinity,
          repeatType: "loop",
          ease: "linear",
        }}
      >
        {/* Duplicate the images to remove gaps */}
        {[...images, ...images].map((image, index) => (
          <div key={index} className="w-32 h-32 mx-5 rounded-xl my-5 flex-shrink-0 bg-white">
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              className="object-contain w-full h-full rounded-xl shadow-[0_0_15px_5px_rgba(236,158,14,1)]"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default Carousel3;
