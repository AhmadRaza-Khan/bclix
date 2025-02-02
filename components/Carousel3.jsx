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
    ]
      return (
        <div className="overflow-hidden w-full bg-transparent mt-4">
      <motion.div
        className="flex w-max gap-4"
        animate={{ x: ["0%", "-100%"] }}
        transition={{
          duration: 80,
          repeat: Infinity,
          repeatType: "loop",
          ease: "linear",
        }}
      >
        {/* Duplicate the images array to create a seamless loop */}
        {images.concat(images).map((image, index) => (
          <div key={index} className="w-32 h-32 mx-5 my-5 flex-shrink-0 bg-white">
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              className="object-contain w-full h-full rounded-xl "
            />
          </div> 
        ))}
      </motion.div>
    </div>
      );
}

export default Carousel3