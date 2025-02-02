"use client";

import { motion } from "framer-motion";

const Carousel = () => {
    const images = [
        "/bootstrap.png",
        "/django.png",
        "/firebase.png",
        "/flask.png",
        "/go.png",
        "/graphql.png",
        "/js.png",
        "/mongo.png",
        "/mysql.png",
        "/next.png",
        "/node.png",
        "/php.png",
        "/postgres.png",
        "/python.png",
        "/react.png",
        "/rest.png",
        "/ruby.png",
        "/saas.png",
        "/shopify.png",
        "/sqlite.png",
        "/tailwind.png",
        "/woo.png",
      ];
    
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
          <div key={index} className="w-32 h-32 mx-5 my-5 flex-shrink-0">
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              className="object-cover w-full h-full rounded-lg shadow-[0_0_15px_5px_rgba(59,130,246,0.8)]"
            />
          </div> 
        ))}
      </motion.div>
    </div>
      );
}

export default Carousel