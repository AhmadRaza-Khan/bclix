'use client';
import { useEffect, useState, useCallback, useRef } from "react";
import { sendQuoteAction, getQuoteHistory } from "@/actions/page";
import { useAppContext } from "@/custom-hooks/Context";
import Dropdown from "@/components/Dropdown";
import axios from "axios";

const ImagePreview = ({ file }) => {
    const [isZoomed, setIsZoomed] = useState(false);
  
    return (
      <img
        src={file.url}
        alt="Uploaded"
        className={`transition-all duration-300 cursor-pointer ${isZoomed ? "w-96 h-96" : "w-16 h-16"}`}
        onClick={() => setIsZoomed(!isZoomed)}
      />
    );
};

const contentStyle = {
    maxHeight: '90vh',
    overflowY: 'scroll',
    scrollBehavior: 'smooth',
    scrollbarWidth: 'none',
    msOverflowStyle: 'none',
};

const QuotePage = () => {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState(null);
    const [filePreview, setFilePreview] = useState(null);
    const { userEmail } = useAppContext();
    const messagesEndRef = useRef(null);
    const textareaRef = useRef(null);
    const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;
    const fetchChat = useCallback(async () => {
        const response = await getQuoteHistory(userEmail);
        setMessages(response.data[0].messages);
    }, [userEmail]);

    useEffect(() => {
        fetchChat();
    }, [fetchChat]);

    const uploadFileToCloudinary = async (file) => {
        if (!file) return null;
    
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET);
    
        try {
    
            const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/auto/upload`;
    
            const res = await axios.post(cloudinaryUrl, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
    
            return {
                url: res.data.secure_url,
                filename: res.data.original_filename,
                fileType: res.data.resource_type,
            };
        } catch (error) {
            console.error("File upload error:", error.response?.data || error.message);
            return null;
        }
    };

    const handleSend = async () => {
        if (!message.trim() && !file) return;
        setLoading(true);

        let uploadedFile = null;
        if (file) {
            uploadedFile = await uploadFileToCloudinary(file);
        }
        const response = await sendQuoteAction({
            userEmail,
            message,
            files: uploadedFile ? [uploadedFile] : [],
        });

        if (response.success) {
            const newMessage = {
                userEmail: userEmail, 
                senderEmail: userEmail,
                message,
                files: uploadedFile ? [uploadedFile] : [],
                timestamp: new Date(),
            };
            setMessages((prevMessages) => [...prevMessages, newMessage]);
            setMessage("");
            setFile(null);
            setFilePreview(null);
            adjustTextareaHeight();
            setLoading(false);
        } else {
            console.error("Failed to send message:", response.message);
            setLoading(false);
        }
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            if (selectedFile.type.startsWith('image/')) {
                setFilePreview(URL.createObjectURL(selectedFile));
            } else {
                setFilePreview(selectedFile.name);
            }
        }
    };

    const handleClearFile = () => {
        setFile(null);
        setFilePreview(null);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const adjustTextareaHeight = () => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    };

    useEffect(() => {
        adjustTextareaHeight();
    }, [message]);

    useEffect(() => {
        const interval = setInterval(() => {
            fetchChat();
        }, 10000);
        return () => clearInterval(interval);
    }, [fetchChat]);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    return (
        <div className="pt-24 flex flex-col justify-between h-screen bg-gradient-to-r from-black via-slate-600 to-black">
            <Dropdown />
            <h1 className="text-3xl text-slate-500 text-center font-extrabold">Our experts are always there to help you out!</h1>
            <div style={contentStyle} className="overflow-y-auto pt-32 hide-scrollbar flex-1 reverse-scroll">
                {messages?.length > 0 ? (
                    messages.map((msg) => (
                        <div
                          key={msg._id}
                          className={`chat ${
                            msg.senderEmail === adminEmail ? "chat-start" : "chat-end"
                          }` }
                        >
                          <div
                            className={`chat-bubble bg-gray-100 text-black max-w-xs break-words`}
                          >
                            <p className="text-sm">{msg.message}</p>
                    
                            {msg.files?.length > 0 && (
                              <div className="mt-2">
                                {msg.files.map((file, index) => (
                                  <div key={file._id} className="mt-1">
                                    {file.url.includes("image") ? (
                                 
                                      <ImagePreview key={index} file={file} />
                                    ) : (
                                     
                                      <a
                                        key={index}
                                        href={file.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block text-blue-800 underline"
                                      >
                                        {file.filename} ({file.type})
                                      </a>
                                    )}
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      ))
                ) : (
                    <p className="text-gray-500 text-center">No messages yet...</p>
                )}
                <div ref={messagesEndRef}></div>
            </div>
            <div className="flex mt-4 gap-2 items-end">
                <input type="file" onChange={handleFileChange} className="hidden" id="fileInput" />
                <label htmlFor="fileInput" className="btn btn-outline btn-secondary">📎</label>
                <textarea
                    ref={textareaRef}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type your message..."
                    className="border border-secondary p-[11px] rounded-md flex-1 resize-none overflow-hidden"
                    rows={1}
                    style={{ minHeight: "44px" }}
                />
                {loading ? (
                    <button className="btn btn-square">
                        <span className="loading loading-spinner"></span>
                    </button>
                ) : (
                    <button onClick={handleSend} className="btn btn-outline btn-secondary">Send</button>
                )}
            </div>
            {filePreview && (
                <div className="mt-2 flex items-center">
                    {typeof filePreview === 'string' && filePreview.startsWith('blob:') ? (
                        <img src={filePreview} alt="Preview" className="w-16 h-16 mr-2" />
                    ) : (
                        <span className="mr-2">{filePreview}</span>
                    )}
                    <button onClick={handleClearFile} className="btn btn-outline btn-error btn-xs">Clear</button>
                </div>
            )}
        </div>
    );
};

export default QuotePage;