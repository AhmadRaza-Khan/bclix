import Link from 'next/link';
import React from 'react';

const Info = () => {
  return (
    <div className="relative w-full min-h-screen flex items-center justify-center text-white">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        onLoadedMetadata={(event) => {
          event.target.playbackRate = 0.5;
        }}
        src="./info.mp4"
        className="absolute top-0 left-0 w-full h-full object-cover"
      />

      {/* Overlay for readability */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/50"></div>

      {/* Content */}
      <div className=" z-10 text-center px-6 md:px-12 absolute h-full flex flex-col justify-center items-center right-0 top-0 w-1/2 backdrop-blur-md">
        <h1 className="text-5xl font-bold">IT Solution Providers</h1>
        <p className="py-6 max-w-3xl mx-auto">
        Let us alchemize the brilliance of your imagination into a visionary enterprise, meticulously crafted to thrive in the dynamic landscape of the modern era. Through a seamless fusion of innovation, strategic foresight, and cutting-edge technology, we shape your ideas into tangible realities, ensuring they not only meet but surpass the evolving demands of the digital age.

With an unwavering commitment to excellence, we harness the power of creativity and technological prowess to build solutions that redefine possibilities. Every concept is carefully refined, every detail meticulously perfected, and every innovation strategically aligned to empower your business for long-term success. By blending ingenuity with precision, we bring forth transformative solutions that resonate with the future, setting new benchmarks in an ever-changing digital ecosystem.
        </p>

        <button className="mt-8 py-3 px-6 font-extrabold text-yellow-500 shadow-[0_0_15px_5px_rgba(236,158,14,1)] bg-gray-900 rounded-lg hover:scale-110 transition-transform">
          <Link href={'/request-quote'}>Request a Quote</Link>
        </button>
      </div>
    </div>
  );
};

export default Info;
