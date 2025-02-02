"use client"
import { useAppContext } from '@/custom-hooks/Context';
import { useEffect, useRef, useState } from 'react';

const VideoCarousel = () => {
  const {isDropdownOpen, setIsDropdownOpen} = useAppContext()
  
  return (
    <div className={`relative h-screen ${isDropdownOpen ? 'w-1/2 h-screen mask mask-parallelogram-4' : 'w-full'}`}>
      {/* Video Background */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        onLoadedMetadata={(event) => {
            event.target.playbackRate = 2;
          }}
        src='./b.mp4'
      />

      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white z-10">
        <h2 className={`font-bold mb-4 ${isDropdownOpen? 'text-xl': 'text-4xl'}`}>Let us automate your business!</h2>
        <p className={`font-bold mb-4 ${isDropdownOpen? 'text-xs': 'text-lg'}`}>Let us automate your business!', description: 'Be one of those 500+ people who, taking our servives, automated their business to balance it on the axis of needs of modern era!!</p>
      </div>
      
    </div>
  );
};

export default VideoCarousel;
