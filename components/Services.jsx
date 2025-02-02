import React from 'react'

const Services = ({title, img, desc}) => {
    
  return (
    <div className="card glass w-52">
  <figure>
    <img
      src={img}
      className="object-contain h-40 rounded-xl mt-2"
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