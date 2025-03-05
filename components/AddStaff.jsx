"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import CloseIcon from '@mui/icons-material/Close';
import { toast } from "react-toastify";
import { uploadNewStaff } from "@/actions/page";

let initialData = {
  name: "",
  designation: "",
  intro: "",
  email: "",
  phone: "",
  status: true,
  image: "",
};

export default function UploadNewStaff({ showStaff, setShowStaff }) {
  const [data, setData] = useState(initialData);
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
        formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET);

        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
          { method: "POST", body: formData }
        );
        const cloudResponse = await response.json();
        imageUrl = cloudResponse.secure_url;
      }

      const uploadData = await uploadNewStaff({ ...data, image: imageUrl });
      if (uploadData.success) {
        toast.success("Staff added successfully!", { style: { backgroundColor: "#333", color: "white" } });
        setData(initialData);
        router.refresh();
      }
    } catch (error) {
      console.error("Error adding staff: ", error);
      toast.error("Failed to add staff.");
    }
  };

  return (
    <div className="flex items-center justify-center py-10 px-4">
      {showStaff && (
        <form onSubmit={handleSubmit} className="flex flex-col w-full max-w-lg bg-black shadow-lg rounded-lg p-6">
          <div className="flex justify-end">
            <CloseIcon className="text-2xl text-gray-600 cursor-pointer hover:text-red-500" onClick={() => setShowStaff(!showStaff)} />
          </div>
          <h2 className="text-2xl font-bold text-center text-gray-600 mb-5">Add Staff</h2>
          
          {/* Name */}
          <input className="mb-4 p-3 bg-black text-gray-600 border rounded-md" type="text" placeholder="Name" value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })} />
          
          {/* Designation */}
          <input className="mb-4 p-3 bg-black text-gray-600 border rounded-md" type="text" placeholder="Designation" value={data.designation} onChange={(e) => setData({ ...data, designation: e.target.value })} />
          
          {/* Intro */}
          <textarea className="mb-4 p-3 bg-black text-gray-600 border rounded-md" placeholder="Introduction" value={data.intro} onChange={(e) => setData({ ...data, intro: e.target.value })}></textarea>
          
          {/* Email */}
          <input className="mb-4 p-3 bg-black text-gray-600 border rounded-md" type="email" placeholder="Email" value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} />
          
          {/* Phone */}
          <input className="mb-4 p-3 bg-black text-gray-600 border rounded-md" type="text" placeholder="Phone" value={data.phone} onChange={(e) => setData({ ...data, phone: e.target.value })} />
          
          {/* Image Upload */}
          <input className="mb-6 p-2 bg-black text-gray-600 border rounded-md" type="file" accept="image/*" onChange={handleImageChange} />
          
          {/* Submit Button */}
          <button type="submit" className="py-3 bg-indigo-600 text-white rounded-md font-semibold hover:bg-indigo-700">Add Staff</button>
        </form>
      )}
    </div>
  );
}