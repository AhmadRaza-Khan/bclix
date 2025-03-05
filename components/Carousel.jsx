"use client";
import { useAppContext } from '@/custom-hooks/Context';

const VideoCarousel = () => {
  const { isDropdown2 } = useAppContext();

  return (
    <div className={`relative h-screen ${isDropdown2 ? 'w-1/2 h-screen mask mask-parallelogram-4' : 'w-full'}`}>
      {/* Video Background */}
      <video
        className={`absolute inset-0 w-full h-full object-cover transition-transform duration-500 ${isDropdown2 ? 'own-transform' : ''}`}
        autoPlay
        loop
        muted
        onLoadedMetadata={(event) => {
          event.target.playbackRate = 2;
        }}
        src='./new_vid.mp4'
      />

      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white backdrop-blur-sm p-4 z-10">
        <h2 className={`font-bold mb-4 ${isDropdown2 ? 'text-xl' : 'text-4xl'}`}>Let us automate your business!</h2>
        <p className={`font-bold mb-4 ${isDropdown2 ? 'text-xs' : 'text-lg'}`}>
          Be one of those 500+ people who, taking our services, automated their business to balance it on the axis of needs of the modern era!!
        </p>
      </div>
    </div>
  );
};

export default VideoCarousel;