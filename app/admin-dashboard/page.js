"use client";
import { getAPIAction, getTestimonialAction, logoutAction } from "@/actions/page";
import AdminChat from "@/components/Admin-Chat";
import APIUploadPage from "@/components/ApiUpload";
import Testimonial from "@/components/Testimonial";
import TestimonialUploadPage from "@/components/TestimonialUpload";
import Image from "next/image";
import CloseIcon from '@mui/icons-material/Close';
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/custom-hooks/Context";
import AdminQuotes from "@/components/Admin-Quote";
const AdminDashboard = () => {
  const [close, setClose] = useState(false);
  const [showTestimonialForm, setShowTestimonialForm] = useState(false);
  const [apiData, setApiData] = useState([]);
  const [data, setData] = useState([]);
  const {setUser, setUserEmail, logout} = useAppContext();
  const router = useRouter();
  const get = async ()=>{
    const comingData = await getTestimonialAction();
    setData(comingData?.data)
  }

  const getApiData = async()=>{
        const apis = await getAPIAction()
        setApiData(apis.data)
      }
      useEffect(()=>{
        getApiData()
        get()
      }, [])

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
<div className="flex pt-20 flex-col items-center justify-center relative min-h-screen bg-black">
  <h1 className="text-3xl font-bold mt-10 text-white">Admin Panel</h1>
          <button
            className="bg-black border-2 absolute top-[130px] lg:top-[200px] right-20 border-white text-white py-1 lg:py-2 px-4 rounded-md hover:bg-gray-800"
            onClick={handleLogout}
          >
            Logout
          </button>

  <div className="flex flex-col lg:flex-row justify-around gap-10 items-start my-32 w-full max-w-screen-xl">
    {/* Left Section */}
<div className="w-full lg:w-1/2">

      {/* Chat Section */}
      <div className="flex flex-col mb-10 bg-black shadow-md shadow-slate-400 p-6 rounded-lg w-full">
       <details className="collapse bg-base-200">
   <summary className="collapse-title text-xl font-medium">User Chats</summary>
    <div className="collapse-content">
      <AdminChat />
      </div>
    </details>
      
     
    </div>

{/*Quote Section*/}
     <div className="flex flex-col bg-black shadow-md shadow-slate-400 p-6 rounded-lg w-full">
       <details className="collapse bg-base-200">
   <summary className="collapse-title text-xl font-medium">Requested Quotes</summary>
    <div className="collapse-content">
      <AdminQuotes />
      </div>
    </details>
      
     
    </div>
</div>

    {/* api and testimonials */}
    <div className="flex flex-col w-full lg:w-1/2 gap-6">
      {/* Api Section */}
      <div className="bg-black shadow-md shadow-slate-400 p-6 rounded-lg">
        <div className="flex justify-between">
          <button
            className="bg-black border-2 border-white text-white py-2 px-4 rounded-md hover:bg-gray-900"
            onClick={() => setClose(true)}
          >
            Upload New API
          </button>
        </div>

        {!close && (
          <>
            <h2 className="text-xl text-center font-semibold mt-8 mb-4 text-white">Current API</h2>
            <div className="space-y-3">
              {apiData?.map((api, index) => (
                <div
                  key={index + 1}
                  className="flex justify-between items-center bg-black p-4 rounded-md border border-gray-300 shadow-md shadow-slate-400"
                >
                  <p className="font-medium text-white">{index + 1}.</p>
                  <h3 className="flex-grow text-center font-semibold text-white">{api?.title}</h3>
                  <Image
                    src={api?.image}
                    alt="img"
                    height={40}
                    width={40}
                    className="rounded-full h-10 w-10 object-cover"
                  />
                </div>
              ))}
            </div>
          </>
        )}
        <APIUploadPage close={close} setClose={setClose} />
      </div>

      {/* Testimonial Section */}
      <div className="bg-black shadow-md shadow-slate-400 p-6 rounded-lg">
        <button
          className="bg-black border-2 mx-auto border-white text-white py-2 px-4 rounded-md hover:bg-gray-900"
          onClick={() => setShowTestimonialForm(true)}
        >
          Upload New Testimonial
        </button>

        {!showTestimonialForm && (
   
            <div className="flex flex-col relative shadow-md shadow-slate-600 py-5 pb-10 items-center justify-center space-y-3">
            
          <div className="space-y-3">
            <h2 className="text-2xl font-semibold  mb-8 text-center text-white">Current Testimonials</h2>
          {data?.map((data, index) => (
            <div
              key={index + 1}
              className="flex justify-between items-center bg-black p-4 rounded-md border border-gray-300 shadow-md shadow-slate-400"
            >
              <p className="font-medium text-white">{index + 1}.</p>
              <h3 className="flex-grow ml-3 mr-10 font-semibold text-white">{data?.title}</h3>
              <p className="flex-grow text-xs text-end text-white">{data?.client}</p>
             
            </div>
          ))}
        </div>

      </div>
        )}
        <TestimonialUploadPage showTestimonialForm={showTestimonialForm} setShowTestimonialForm={setShowTestimonialForm} />
      </div>
    </div>
  </div>
</div>
  );
};

export default AdminDashboard;
