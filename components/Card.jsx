"use client"
import ReadMoreIcon from '@mui/icons-material/ReadMore';
import { getLimitedTestimonialAction } from '@/actions/page';
import React, { useEffect, useState } from 'react'
import RatingStars from './Rating';
import { useRouter } from 'next/navigation';
const Card = () => {
   const [data, setData] = useState([]);
   const router = useRouter();
    const get = async ()=>{
      const comingData = await getLimitedTestimonialAction();
      setData(comingData?.data)
    }
    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    };
   useEffect(()=>{
    get() 
   }, [])
  return (
    <div className='grid grid-cols-5 mx-auto justify-items-center mb-32 content-center place-items-center'>

       {
        data?.map((value, i)=>(
            <div key={i} className="card mx-1 hover:scale-110 transform transition duration-200 hover:shadow-[0_0_15px_5px_rgba(59,130,246,0.8)] w-60 min-h-72 bg-gradient-to-r from-blue-500 via-white/20 to-transparent animate-[shimmer_1.5s_infinite">
            <figure>
                {
                    value?.file.includes('image') ? 
                    <img
                    className="w-full h-[135px] rounded-lg"
                    src={value?.file}
                    alt="Shoes" />
                :
                    <video
                    controls
                    className="w-full h-[135px] rounded-lg"
                    src={value?.file}
                    />
                }

            </figure>
            <div className="flex flex-col gap-2 my-auto text-slate-200 items-start pl-4">
              <h2 className="text-sm">{value?.title}</h2>
              <RatingStars rating={value?.rating} />
              <p className='text-xs line-clamp-2'>{value?.description}</p>
              <p className='text-xs'>{value?.client}</p>
              <p className='text-xs'>{formatDate(value?.createdAt)}</p>
              <div className="card-actions justify-end">
              </div>
            </div>
          </div>
        ))
       }
       <div className='flex items-center'>
        <p className='text-xl'>View More</p>
       <ReadMoreIcon sx={{ fontSize: 70 }} />
       </div>
    </div>
  )
}

export default Card