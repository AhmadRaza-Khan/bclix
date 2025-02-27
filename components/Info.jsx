import Link from 'next/link';
import React from 'react'

const Info = () => {
  return (
    <div className="flex items-center bg-transparent min-h-screen">
  <div className="hero-content flex-col lg:flex-row">
    <video
      autoPlay
      loop
      muted
      onLoadedMetadata={(event) => {
          event.target.playbackRate = 0.5;
        }}
      src={"./d.mp4"}
      className="max-w-2xl mask mask-decagon shadow-2xl " />
    <div>
      <h1 className="text-5xl font-bold">IT Solution Providers</h1>
      <p className="py-6">Let's alchemize your imagination into a business aligned with the demands of the modern era</p>
      
      <button className="rounded animate-gradual-bounce my-12 mt-32 py-3 px-4 font-extrabold bg-gradient-to-r from-black via-blue-500 to-blue-800 hover:scale-150 transition-transform transform">
  <Link href={'/request-quote'}>Request a Quote</Link>
</button>
    </div>
  </div>
</div>
  )
}

export default Info