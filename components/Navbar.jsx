"use client"
import React from 'react'
import { useAppContext } from '@/custom-hooks/Context'
import CloseIcon from '@mui/icons-material/Close';
const Navbar = () => {
  const{ isDropdown2, setIsDropdown2} = useAppContext();
  
  return (
        <div className="navbar overflow-x-hidden bg-transparent fixed top-0 z-50 flex items-center">
  <div className="flex-1 ">
    <a className="">
        <img className='object-contain w-40 h-28 rounded-lg backdrop-blur-sm' src="./logo.png" alt="logo" />
    </a>
  </div> 

      {
    isDropdown2?
    <CloseIcon onClick={()=> setIsDropdown2(false)}/>
    :
    <div className="flex-none">
    <button onClick={()=>{setIsDropdown2(true)}} className="btn btn-square btn-ghost">
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        className="inline-block h-5 w-5 stroke-current">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M4 6h16M4 12h16M4 18h16"></path>
      </svg>
    </button>
  </div>
}
</div>
  )
}

export default Navbar