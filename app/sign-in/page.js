"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { LoginAction } from "@/actions/page";
import Cookies from "js-cookie";
import { useAppContext } from "@/custom-hooks/Context";

let initialData = {
  email: "",
  password: ""
};

export default function SignInPage() {
  const [data, setData] = useState(initialData);
  const router = useRouter();
  const {user, setUser, setUserId} = useAppContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const uploadData = await LoginAction(data);
      console.log(uploadData.id)

      if (uploadData.success) {
        setUser(uploadData?.name)
        setUserId(uploadData?.id)
        
        toast.success("Your account has been created successfully!😋", {
          style: {
            backgroundColor: "#333",
            color: "white",
            fontSize: "16px",
            fontWeight: "bold"
          },
          progressStyle: {
            background: "#4caf50",
          },
        })
        Cookies.set('token', uploadData.token, {
          path: '/',
          secure: true,
          sameSite: 'Strict',
        });

        setData(initialData);
        router.refresh();
      }
    } catch (error) {
        toast.error("Failed to register due to: ", error, {
            style: {
              backgroundColor: "#333",
              color: "white",
              fontSize: "16px",
              fontWeight: "bold"
            },
            progressStyle: {
              background: "#4caf50",
            },
          })
    }
  };

  return (
    <div className="flex items-center justify-center py-10 px-4">
      <form
        onSubmit={handleSubmit}
        className="flex gap-10 flex-col w-full max-w-lg bg-black  shadow-[0_0_15px_5px_rgba(59,130,246,0.8)] rounded-lg p-10 transition-transform transform scale-95 hover:scale-100"
      >
  
        <h2 className="text-2xl font-bold text-center text-gray-600 mb-5">
          Sign In
        </h2>
  
       
<label className="input input-bordered flex items-center gap-2">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    fill="currentColor"
    className="h-4 w-4 opacity-70">
    <path
      d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
    <path
      d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
  </svg>
  <input
   name="email"
   type="email"
   value={data.email}
   onChange={(e) => setData({ ...data, email: e.target.value })}
   className="grow" 
   placeholder="Email" 
   />
</label>
<label className="input input-bordered flex items-center gap-2">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    fill="currentColor"
    className="h-4 w-4 opacity-70">
    <path
      fillRule="evenodd"
      d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
      clipRule="evenodd" />
  </svg>
   <input 
   name="password"
   type="password" 
   value={data.password}
   onChange={(e) => setData({ ...data, password: e.target.value })}
   className="grow" 
   placeholder="Name" 
   />
</label>
        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 bg-indigo-600 text-white rounded-md font-semibold transition duration-300 hover:bg-indigo-700"
        >
          Sign Up
        </button>
      </form>
  </div>
  
  );
}
