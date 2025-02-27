'use client';
import { useState, useRef } from 'react';
import axios from 'axios';
import { saveRequestQuote } from '@/actions/page';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

const RequestQuote = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('');
  const [projectCategory, setProjectCategory] = useState('');
  const [description, setDescription] = useState('');
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);
  const router = useRouter();

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
  };

  const removeFile = (index) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const uploadFilesToCloudinary = async (files) => {
    const uploadedFiles = [];
    for (const file of files) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET);

      try {
        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/auto/upload`,
          formData,
          { headers: { 'Content-Type': 'multipart/form-data' } }
        );
        uploadedFiles.push({
          url: response.data.secure_url.trim(),
          fileType: response.data.resource_type.trim(),
          filename: response.data.original_filename.trim(),
        });
      } catch (error) {
        toast.error("Failed to upload your file due to: ", error, {
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
    }
    return uploadedFiles;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const uploadedFiles = await uploadFilesToCloudinary(files);

    const formData = {
      name,
      email,
      phone,
      country,
      projectCategory,
      description,
      files: uploadedFiles,
    };

    try {
      const response = await saveRequestQuote(formData);
      if (response.success) {
        toast.success("Your quote has been sumitted successfully!😋", {
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
        setName('');
        setEmail('');
        setPhone('');
        setCountry('');
        setProjectCategory('');
        setDescription('');
        setFiles([]);
        
        router.push("/chat");
      }
    } catch (error) {
        toast.error("Failed to submit your quote due to: ", error, {
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-6">
      <form onSubmit={handleSubmit} className="w-full max-w-2xl bg-gray-800 p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-8 text-center">Submit Your Quote</h1>

        {/* Name */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-gray-700 text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Email */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-gray-700 text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Phone */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Phone</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full bg-gray-700 text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Country */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Country</label>
          <input
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="w-full bg-gray-700 text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Project Category */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Project Category</label>
          <select
            value={projectCategory}
            onChange={(e) => setProjectCategory(e.target.value)}
            className="w-full bg-gray-700 text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select a category</option>
            <option value="Webapp">Webapp</option>
            <option value="SAAS Application">SAAS Application</option>
            <option value="API Integration & Automation">API Integration & Automation</option>
            <option value="Website Development">Website Development</option>
            <option value="Ecommerce">Ecommerce</option>
            <option value="Mobile App">Mobile App</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Description */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full bg-gray-700 text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
            required
          />
        </div>

        {/* Attach File */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Attach File</label>
          <div className="flex items-center gap-4">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              multiple
            />
            <button
              type="button"
              onClick={() => fileInputRef.current.click()}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Choose Files
            </button>
            <div className="flex flex-wrap gap-2">
              {files.map((file, index) => (
                <div key={index} className="relative bg-gray-700 p-2 rounded-lg">
                  {file.type.startsWith('image/') || file.type.startsWith('video/') ? (
                    <img
                      src={URL.createObjectURL(file)}
                      alt={file.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                  ) : (
                    <span className="text-sm">{file.name}</span>
                  )}
                  <button
                    type="button"
                    onClick={() => removeFile(index)}
                    className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center hover:bg-red-700 transition"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
        >
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default RequestQuote;