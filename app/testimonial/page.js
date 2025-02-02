"use client"
import { getTestimonialAction } from '@/actions/page';
import Testimonial from '@/components/Testimonial';
import { useEffect, useState } from 'react';

const TestimonialPage = () => {
  const [data, setData] = useState([]);
  const get = async ()=>{
    const comingData = await getTestimonialAction();
    setData(comingData?.data)
  }
 useEffect(()=>{
  get() 
 }, [])
  return (
    <div className='py-20'>
       
  <div className="py-16">
      <h1 className="mb-10 text-5xl text-center font-bold">How our clients evaluate our expertise</h1>
      <p className="mb-5 text-center max-w-6xl">
      Excellence is not merely what we claim—it is what our clients affirm. Through their words, their experiences, and their trust, they paint a vivid testament to the quality, dedication, and innovation we bring to every project. Their voices echo the standards we uphold, the challenges we conquer, and the value we deliver. Let their testimonials be the measure of our commitment and the reflection of our unwavering pursuit of excellence.
      </p>
  </div>

<Testimonial data={data} />
    </div>
  );
};

export default TestimonialPage;
