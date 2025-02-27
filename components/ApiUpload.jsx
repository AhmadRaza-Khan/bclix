"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { uploadNewAPI } from "@/actions/page";
import CloseIcon from '@mui/icons-material/Close';
import { toast } from "react-toastify";
let initialData = {
  title: "",
  category: "",
  description: "",
  clients: "",
  image: "",
};

export default function APIUploadPage({close, setClose}) {
  const [data, setData] = useState(initialData);
  const [token, setToken] = useState();
  const [imageFile, setImageFile] = useState(null);
  const router = useRouter();

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImageFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let imageUrl = "";
      if (imageFile) {
        const formData = new FormData();
        formData.append("file", imageFile);
        formData.append(
          "upload_preset",
          process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET 
        );

        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
          {
            method: "POST",
            body: formData,
          }
        );

        const cloudResponse = await response.json();
        imageUrl = cloudResponse.secure_url;
      }

      const uploadData = await uploadNewAPI({
        ...data,
        image: imageUrl,
      });
      console.log(uploadData)
      if (uploadData.success) {
        toast.success("The api uploaded successfully!😋", {
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
            
        setData(initialData);
        router.refresh();
      }
    } catch (error) {
      console.error("Error uploading api: ", error);
      alert("Failed to upload api.");
    }
  };

  return (
    <div className="flex items-center justify-center py-10 px-4">
        {
            close && 
<form
        onSubmit={handleSubmit}
        className="flex flex-col w-full max-w-lg bg-black shadow-slate-400 shadow-2xl rounded-lg p-6 transition-transform transform scale-95 hover:scale-100"
      >
        <div className="flex justify-end">
          <CloseIcon
            className="text-2xl text-gray-600 cursor-pointer hover:text-red-500"
            onClick={() => setClose(!close)}
          />
        </div>
  
        <h2 className="text-2xl font-bold text-center text-gray-600 mb-5">
          Upload API
        </h2>
  
        {/* Title */}
        <div className="flex flex-col mb-4">
          <label htmlFor="engTitle" className="mb-2 text-gray-600 font-medium">
            Title
          </label>
          <input
            className="rounded-md border bg-black text-gray-600 border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 p-3"
            id="title"
            name="title"
            type="text"
            value={data.title}
            onChange={(e) => setData({ ...data, title: e.target.value })}
            placeholder="Enter api's title"
          />
        </div>

        {/* Clients */}
        <div className="flex flex-col mb-4">
          <label htmlFor="engTitle" className="mb-2 text-gray-600 font-medium">
            Clients Number
          </label>
          <input
            className="rounded-md border bg-black text-gray-600 border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 p-3"
            id="title"
            name="clients"
            type="text"
            value={data.clients}
            onChange={(e) => setData({ ...data, clients: e.target.value })}
            placeholder="Enter clients' number"
          />
        </div>
  
        
  
        {/* category */}
        <div className="flex flex-col mb-4">
    <label htmlFor="category" className="mb-2 text-gray-600 font-medium">
      Category
         </label>
     <select
       className="rounded-md border bg-black text-gray-600 border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 p-3"
       id="category"
       name="category"
       value={data.category}
       onChange={(e) => setData({ ...data, category: e.target.value })}
     >
       <option value="">Select a category</option>
       <option value="Supplier">Supplier</option>
       <option value="CRM">CRM</option>
       <option value="POS">POS</option>
      <option value="Logistics">Logistics</option>
      <option value="E-Sims">E-Sims</option>
      <option value="Socialmedia Events">Socialmedia Events</option>
      <option value="Digital Marketing">Digital Marketing</option>
      <option value="Data Analytics">Data Analytics</option>
      <option value="Loyalty and Redeem">Loyalty and Redeem</option>
      <option value="AI">AI</option>

  </select>
</div>

{/* api Description */}
<div className="flex flex-col mb-4">
          <label htmlFor="description" className="mb-2 text-gray-600 font-medium">
            Description
          </label>
          <textarea
            className="rounded-md border bg-black text-gray-600 border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 p-3"
            id="description"
            name="description"
            value={data.description}
            onChange={(e) => setData({ ...data, description: e.target.value })}
            placeholder="Enter description"
          />
        </div>
  
    
        {/* API Image */}
        <div className="flex flex-col mb-6">
          <label htmlFor="image" className="mb-2 text-gray-600 font-medium">
            API Image
          </label>
          <input
            id="image"
            name="image"
            type="file"
            accept="image/*"
            className="border bg-black text-gray-600 border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500"
            onChange={handleImageChange}
          />
        </div>
  
        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 bg-indigo-600 text-white rounded-md font-semibold transition duration-300 hover:bg-indigo-700"
        >
          Upload API
        </button>
      </form>
        }
      
  </div>
  
  );
}
