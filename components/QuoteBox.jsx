'use client';
import { useState } from "react";

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

const QuoteBox = ({ quote, onClose }) => {
    const { name, email, phone, country, description, projectCategory, uploadedFiles } = quote;
console.log(quote)
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg w-[90vw] md:w-[40vw] h-[80vh] flex flex-col shadow-lg overflow-hidden">
                <div className="flex justify-between items-center mb-4 border-b pb-2">
                    <h2 className="text-lg font-bold">{name}</h2>
                    <button onClick={onClose} className="text-gray-500 text-lg hover:text-gray-700">&times;</button>
                </div>
                <div className="flex-1 overflow-y-auto p-2">
                    <p className="text-sm mb-2"><strong>Email:</strong> {email}</p>
                    <p className="text-sm mb-2"><strong>Phone:</strong> {phone}</p>
                    <p className="text-sm mb-2"><strong>Country:</strong> {country}</p>
                    <p className="text-sm mb-4"><strong>Category:</strong> {projectCategory}</p>
                    <p className="text-sm mb-4"><strong>Description:</strong> {description}</p>

                    <div>
                        {uploadedFiles?.length > 0 ? (
                            uploadedFiles.map((file, index) => (
                                <div key={index} className="mt-2">
                                    {file.fileType === "image" ? (
                                        <ImagePreview file={file} />
                                    ) : (
                                        <a href={file.url} download className="block text-blue-800 underline">
                                            {file.filename} ({file.fileType})
                                        </a>
                                    )}
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500 text-center">No files uploaded...</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuoteBox;