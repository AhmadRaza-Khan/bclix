"use client"
import React from 'react'
import { useRouter } from 'next/navigation'
const Api = ({id, title, description, clients, image}) => {

  const router = useRouter();
  const searhApiPage = (id)=>{
    router.push(`/search-api/${id}`);
  }
  return (
  <div onClick={()=> searhApiPage(id)} className="card glass w-48">
  <figure>
    <img
      src={image}
      alt="car!" 
      className="h-36 w-52 object-fill"
      />
  </figure>
  <div className="flex flex-col items-center justify-start py-4">
    <h2 className="card-title text-sm text-white">{title}</h2>
    {/* <p className='text-xs'>{description}</p> */}
    <div className="card-actions">
      <p className="text-xs">Completed Projects: {clients}</p>
    </div>
  </div>
</div>
  )
}

export default Api