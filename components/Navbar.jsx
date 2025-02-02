"use client"
import React, { useEffect, useState } from 'react'
import { useAppContext } from '@/custom-hooks/Context'
import CloseIcon from '@mui/icons-material/Close';
import { UserButton } from '@clerk/nextjs';
const Navbar = () => {
  const{isDropdownOpen, setIsDropdownOpen, isDropdown2, setIsDropdown2} = useAppContext();
  const [path, setPath] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setPath(window.location.pathname);
    }
  }, []);
  
  return (
        <div className="navbar overflow-x-hidden bg-transparent fixed top-0 z-50 flex items-center">
  <div className="flex-1">
    <a className="">
        <img className='object-contain rounded-2xl w-32 h-20' src="./logo.png" alt="logo" />
    </a>
  </div>
  {
    path === "/"?
    (
      <>
      {
    isDropdownOpen?
    <CloseIcon onClick={()=> setIsDropdownOpen(false)}/>
    :
      <div className="flex-none">
    <button onClick={()=> setIsDropdownOpen(true)} className="btn btn-square btn-ghost">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        className="inline-block h-5 w-5 stroke-current">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path>
      </svg>
    </button>
  </div>
    
  }
      </>
    )
    :
    <>
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
  </>
  }
</div>
  )
}

export default Navbar