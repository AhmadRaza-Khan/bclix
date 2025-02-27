'use client';
import { useState, useEffect, useRef } from "react";
import axios from "axios";

const ImagePreview = ({ file }) => {
    const [isZoomed, setIsZoomed] = useState(false);

    return (
        <img
            src={file.url}
            alt="Uploaded"
            className={`transition-all duration-300 cursor-pointer ${isZoomed ? "w-64 h-64" : "w-16 h-16"}`}
            onClick={() => setIsZoomed(!isZoomed)}
        />
    );
};

const ChatBox = ({ userEmail, userName, messages, onSend, onClose }) => {
    const [responseMessage, setResponseMessage] = useState("");
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);
    const textareaRef = useRef(null);
    const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;
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
        if (!responseMessage.trim() && !file) return;
        setLoading(true);

        let uploadedFile = null;
        if (file) {
            uploadedFile = await uploadFileToCloudinary(file);
        }

        onSend(userEmail, responseMessage, uploadedFile ? [uploadedFile] : []);

        setResponseMessage("");
        setFile(null);
        setPreview(null);
        adjustTextareaHeight();
        setLoading(false);
    };

    const handleClearFile = () => {
        setFile(null);
        setPreview(null);
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            if (selectedFile.type.startsWith("image/")) {
                setPreview(URL.createObjectURL(selectedFile));
            } else {
                setPreview(selectedFile.name);
            }
        }
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
    }, [responseMessage]);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-4 rounded-lg w-[40vw] h-[60vh] flex flex-col shadow-lg">
                <div className="flex justify-between items-center mb-4 border-b pb-2">
                    <h2 className="text-lg font-bold">{userName}</h2>
                    <button onClick={onClose} className="text-gray-500 text-lg hover:text-gray-700">&times;</button>
                </div>
                <div className="overflow-y-auto border p-2 flex-1 reverse-scroll">
                    {messages.length > 0 ? (
                        messages.map((msg, i) => (
                            <div key={i} className={`chat ${msg.senderEmail === adminEmail ? "chat-end" : "chat-start"}`}>
                                <div className={`chat-bubble ${msg.senderEmail === adminEmail ? "bg-blue-500 text-white" : "bg-gray-100 text-black"}`}>
                                    <p className="text-sm">{msg.message}</p>
                                    {msg.files?.length > 0 && (
                                        <div className="mt-2">
                                            {msg.files.map((file, index) => (
                                                <div key={index} className="mt-1">
                                                    {file.fileType === "image" ? (
                                                        <ImagePreview file={file} />
                                                    ) : (
                                                        <a href={file.url} target="_blank" rel="noopener noreferrer" className="block text-blue-800 underline">
                                                            {file.filename} ({file.fileType})
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
                    {preview && (
                        <div className="flex items-center gap-2">
                            {file?.type.startsWith("image/") ? (
                                <img src={preview} alt="Preview" className="w-16 h-16 rounded" />
                            ) : (
                                <p className="text-gray-600">{preview}</p>
                            )}
                            <button onClick={handleClearFile} className="text-red-500 text-lg hover:text-red-700">&times;</button>
                        </div>
                    )}
                    <textarea
                        ref={textareaRef}
                        value={responseMessage}
                        onChange={(e) => setResponseMessage(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Type your response..."
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
            </div>
        </div>
    );
};

export default ChatBox;