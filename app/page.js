"use client"
import Card from "@/components/Card";
import VideoCarousel from "@/components/Carousel";
import Carousel from "@/components/Carousel2";
import Info from "@/components/Info";
import Image from "next/image";
import { useState } from "react";
import { services } from "@/lib/data";
import Services from "@/components/Services";
import Carousel3 from "@/components/Carousel3";
import EastIcon from '@mui/icons-material/East';
import Link from "next/link";
import { useAppContext } from "@/custom-hooks/Context";
import Chat from "@/components/Chat";
import ChatWidget from "@/components/Chat";
import { logoutAction } from "@/actions/page";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
export default function Home() {

    const router = useRouter();
    const { logout, setUser, setUserEmail, userEmail, show,isDropdownOpen, dropdownRef } = useAppContext();
    const handleLogout = async() => {
        const response = await logoutAction();
        if (response.success) {
            Cookies.remove('token', { path: '/' });
            setUser("");
            setUserEmail(""); 
            logout()
            router.push('/');
        } else {
            console.error(response.message);
        }
      };
  return (

    <div  className="bg-gradient-to-l from-black to-blue-950 overflow-x-hidden">
      <>{isDropdownOpen && (
                <div ref={dropdownRef} className="fixed right-5 w-screen flex justify-end h-full">
                    {/* Background Video */}
                    <video
                        autoPlay
                        muted
                        loop
                        className="absolute top-0 left-0 w-full h-full object-cover"
                    >
                        <source src="./programming.mp4" type="video/mp4" />
                    </video>

                    {/* Dropdown Content */}
                    <ul className="bg-white/0 backdrop-blur-md rounded-box w-52 h-fit p-10 mt-16 shadow">
                    {
                            userEmail ?
                            <div className="flex flex-col justify-center gap-2 items-start">
                              {
                                show && 
                                <Link href={'/admin-dashboard'} className="text-white hover:text-2xl hover:text-slate-300 text-xl">Admin Dashboard</Link>
                              }
                            <button onClick={handleLogout} className="text-white hover:text-2xl hover:text-slate-300 text-xl">Sign Out</button>
                            <Link href={'/chat'} className="text-white hover:text-2xl hover:text-slate-300 text-xl">Help</Link>
                            <Link href={'/quote'} className="text-white hover:text-2xl hover:text-slate-300 text-xl">Quote</Link>
                            <Link href={'/search-api'} className="text-white hover:text-2xl hover:text-slate-300 text-xl">Search Api</Link>
                            </div>
                            :
                            <div className="flex flex-col justify-center gap-2 items-start">
                            <Link href={'/sign-up'} className="text-white hover:text-2xl hover:text-slate-300 text-xl">Sign Up</Link>
                            <Link href={'/sign-in'} className="text-white hover:text-2xl hover:text-slate-300 text-xl">Sign In</Link>
                            <Link href={'/chat'} className="text-white hover:text-2xl hover:text-slate-300 text-xl">Help</Link>
                            <Link href={'/quote'} className="text-white hover:text-2xl hover:text-slate-300 text-xl">Quote</Link>
                            <Link href={'/search-api'} className="text-white hover:text-2xl hover:text-slate-300 text-xl">Search Api</Link>
                            </div>
                        }
                    </ul>
                </div>
            )}
      </>
      <VideoCarousel />
      <Carousel />
      <Info />

      {/* feedbacke */}
      <h3 className=" text-center text-3xl font-extrabold text-slate-400 my-28">The services we have rendered and how our clients feedbacked</h3>
      
            <Card />


{/* services */}
<h3 className="text-center my-16 text-5xl font-extrabold text-slate-400">Our Services</h3>
      <div className="grid grid-cols-3 gap-4 justify-items-center content-center place-items-center">
        {
          services.map((value, i)=>(
            <Services key={i} title={value.title} img={value.img} desc={value.desc} />
          ))
        }
      </div>

{/* companies logos carousel */}
<div className="flex items-center justify-center">
<h3 className="text-center my-12 mt-32 text-3xl font-extrabold text-slate-400">Search your API in our API Bank of 500+</h3>
<Link
  href="/search-api"
  className="rounded my-12 mt-32 py-3 px-4 text-3xl font-extrabold hover:bg-gradient-to-r from-black via-blue-500 to-blue-800 inline-block text-center"
>
  Get your API <EastIcon />
</Link>

</div>
<Carousel3 />
<ChatWidget />
      
    </div>
  );
}
