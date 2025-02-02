"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { uploadNewTestimonial } from "@/actions/page";
import { toast } from "react-toastify";

let initialData = {
  title: "",
  rating: "",
  description: "",
  client: "",
  file: "",
};

export default function TestimonialUploadPage() {
  const [data, setData] = useState(initialData);
  const [file, setFile] = useState(null);
  const router = useRouter();

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let fileUrl = "";
      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append(
          "upload_preset",
          process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
        );

        const fileType = file.type.startsWith("image") ? "image" : "video";
        const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/${fileType}/upload`;

        const response = await fetch(cloudinaryUrl, {
          method: "POST",
          body: formData,
        });

        const cloudResponse = await response.json();
        fileUrl = cloudResponse.secure_url;
      }

      const uploadData = await uploadNewTestimonial({
        ...data,
        file: fileUrl,
      });

      if (uploadData.success) {
        toast.success("The testimonial uploaded successfully!😋", {
          style: {
            backgroundColor: "#333",
            color: "white",
            fontSize: "16px",
            fontWeight: "bold"
          },
          progressStyle: {
            background: "#4caf50",
          },
        });
        setData(initialData);
        setFile(null);
        router.refresh();
      }
    } catch (error) {
      console.error("Error uploading testimonial: ", error);
      alert("Failed to upload testimonial.");
    }
  };

  return (
    <div className="flex items-center justify-center py-10 px-4">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-full max-w-lg bg-black shadow-slate-400 shadow-2xl rounded-lg p-6 transition-transform transform scale-95 hover:scale-100"
      >
        <h2 className="text-2xl font-bold text-center text-gray-600 mb-5">
          Upload Testimonial
        </h2>

        {/* Title */}
        <div className="flex flex-col mb-4">
          <label className="mb-2 text-gray-600 font-medium">Title</label>
          <input
            className="rounded-md border bg-black text-gray-600 border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            type="text"
            value={data.title}
            onChange={(e) => setData({ ...data, title: e.target.value })}
            placeholder="Enter title"
          />
        </div>

        {/* Client */}
        <div className="flex flex-col mb-4">
          <label className="mb-2 text-gray-600 font-medium">Client Name</label>
          <input
            className="rounded-md border bg-black text-gray-600 border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            type="text"
            value={data.client}
            onChange={(e) => setData({ ...data, client: e.target.value })}
            placeholder="Enter client name"
          />
        </div>

        {/* Rating */}
        <div className="flex flex-col mb-4">
          <label className="mb-2 text-gray-600 font-medium">Rating</label>
          <input
            className="rounded-md border bg-black text-gray-600 border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            type="text"
            value={data.rating}
            onChange={(e) => setData({ ...data, rating: e.target.value })}
            placeholder="Enter rating"
          />
        </div>

        {/* Description */}
        <div className="flex flex-col mb-4">
          <label className="mb-2 text-gray-600 font-medium">Description</label>
          <textarea
            className="rounded-md border bg-black text-gray-600 border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={data.description}
            onChange={(e) => setData({ ...data, description: e.target.value })}
            placeholder="Enter project description"
          />
        </div>

        {/* File */}
        <div className="flex flex-col mb-6">
          <label className="mb-2 text-gray-600 font-medium">Upload File (Image/Video)</label>
          <input
            type="file"
            accept="image/*,video/*"
            className="border bg-black text-gray-600 border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500"
            onChange={handleFileChange}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 bg-indigo-600 text-white rounded-md font-semibold transition duration-300 hover:bg-indigo-700"
        >
          Upload Testimonial
        </button>
      </form>
    </div>
  );
}
