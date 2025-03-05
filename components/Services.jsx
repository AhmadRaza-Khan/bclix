import React from 'react'

const Services = ({title, img, desc}) => {
    
  return (
    <div className="card glass w-72 my-10">
  <figure>
    <img
      src={img}
      className="object-contain h-52 rounded-xl my-2 bg-gradient-to-r from-yellow-600 to-yellow-700 shadow-[0_0_15px_5px_rgba(236,158,14,1)]"
      alt="car!" />
      
  </figure>
  <div className="card-body">
    <h2 className="text-md">{title}</h2>
    <p className='text-xs'>{desc}</p>
  </div>
</div>
  )
}

export default Services