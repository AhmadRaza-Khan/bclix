"use client";
import { deleteStaff, getAllStaff, getAPIAction, getTestimonialAction, logoutAction } from "@/actions/page";
import AdminChat from "@/components/Admin-Chat";
import APIUploadPage from "@/components/ApiUpload";
import Testimonial from "@/components/Testimonial";
import TestimonialUploadPage from "@/components/TestimonialUpload";
import Image from "next/image";
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/custom-hooks/Context";
import AdminQuotes from "@/components/Admin-Quote";
import UploadNewStaff from "@/components/AddStaff";
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
const AdminDashboard = () => {
  const [close, setClose] = useState(false);
  const [showStaff, setShowStaff] = useState(false);
  const [showTestimonialForm, setShowTestimonialForm] = useState(false);
  const [apiData, setApiData] = useState([]);
  const [staffData, setStaffData] = useState([]);
  const [data, setData] = useState([]);
  const {setUser, setUserEmail, logout} = useAppContext();
  const router = useRouter();
  const get = async ()=>{
    const comingData = await getTestimonialAction();
    setData(comingData?.data)
  }

  const getStaff = async ()=>{
    const comingData = await getAllStaff();
    setStaffData(comingData?.data)
    console.log(comingData)
  }

  const getApiData = async()=>{
        const apis = await getAPIAction()
        setApiData(apis.data)
      }
      useEffect(()=>{
        getApiData()
        get()
        getStaff()
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

  const handleDeleteStaff = async(id)=>{
    const response = await deleteStaff(id);
    console.log(response);
  }
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

          {/* Staff Section */}
          <div className="bg-black shadow-md mt-10 shadow-slate-400 p-6 rounded-lg">
        <div className="flex justify-between">
          <button
            className="bg-black border-2 border-white text-white py-2 px-4 rounded-md hover:bg-gray-900"
            onClick={() => setShowStaff(true)}
          >
            Add Staff Member
          </button>
        </div>

        {!showStaff && (
          <>
            <h2 className="text-xl text-center font-semibold mt-8 mb-4 text-white">Staff Members</h2>
            <div className="space-y-3">
              {staffData?.map((staff, index) => (

                <div
                  key={index + 1}
                  className="colllapse flex justify-between items-center bg-black p-4 rounded-md border border-gray-300 shadow-md shadow-slate-400"
                >
                  <details className="collapse bg-base-200">
                  <summary className="collapse-title">
                 
                  <h3 className="flex-grow text-center text-white">{staff?.name}</h3>
                  </summary>
                  <div className="collapse-content">
                  <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-5 transition-transform transform hover:scale-105 flex flex-col items-center text-center">
                        {/* Staff Image */}
                        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-yellow-500 shadow-[0_0_15px_5px_rgba(236,158,14,1)]">
                          <Image
                            src={staff.image}
                            alt={staff.name}
                            width={128}
                            height={128}
                            className="object-cover"
                          />
                        </div>
                  
                        {/* Staff Details */}
                        <h2 className="text-xl font-bold mt-3 text-gray-800 dark:text-gray-200">
                          {staff.name}
                        </h2>
                        <p className="text-indigo-500 font-medium">{staff.designation}</p>
                        <p className="text-gray-600 text-center dark:text-gray-400 text-sm mt-2">
                          { staff.intro }
                        </p>
                  
                        {/* Contact Info */}
                        <div className="flex flex-col items-center gap-2 mt-4 text-gray-700 dark:text-gray-300">
                          <div className="flex items-center gap-2">
                            <EmailIcon size={18} />
                            <span>{staff.email}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <LocalPhoneIcon size={18} />
                            <span>{staff.phone}</span>
                          </div>
                        </div>
                      </div>
                  </div>
                  </details>
                </div>
              ))}
            </div>
          </>
        )}
        <UploadNewStaff showStaff={showStaff} setShowStaff={setShowStaff} />
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
