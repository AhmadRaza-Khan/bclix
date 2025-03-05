"use client"
import Card from "@/components/Card";
import VideoCarousel from "@/components/Carousel";
import Carousel from "@/components/Carousel2";
import Info from "@/components/Info";
import { services } from "@/lib/data";
import Services from "@/components/Services";
import Carousel3 from "@/components/Carousel3";
import EastIcon from '@mui/icons-material/East';
import Link from "next/link";
import { useAppContext } from "@/custom-hooks/Context";
import ChatWidget from "@/components/Chat";
import StaffList from "@/components/Staff";
import Dropdown from "@/components/Dropdown";
export default function Home() {
    const { isDropdown2, dropdownRef } = useAppContext();
  return (

    <div  className="bg-gradient-to-r from-gray-950 to-black overflow-x-hidden">
      <>{isDropdown2 && (
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

                    <Dropdown />
                </div>
            )}
      </>
      <VideoCarousel />
      <Carousel />
      <Info />

      {/* feedbacke */}
      <h3 className=" text-center text-3xl text-white my-14">The services we have rendered and how our clients feedbacked</h3>
            <Card />
{/* services */}
<h3 className="text-center text-3xl text-white">Our Services</h3>
      <div className="grid grid-cols-4 justify-items-center content-center place-items-center">
        {
          services.map((value, i)=>(
            <Services key={i} title={value.title} img={value.img} desc={value.desc} />
          ))
        }
      </div>

{/* companies logos carousel */}
<div className="flex items-center justify-center">
<h3 className="text-center my-12 mt-10 text-3xl text-white">Search your API in our API Bank of 500+</h3>
<Link
  href="/search-api"
  className="rounded text-white my-12 mt-12 py-3 px-4 text-3xl hover:bg-gradient-to-r from-yellow-600 via-yellow-700 to-yellow-800 inline-block text-center"
>
  Get your API <EastIcon sx={{ fontSize: 50 }} />
</Link>

</div>
<Carousel3 />
<ChatWidget />
      <StaffList />
    </div>
  );
}
