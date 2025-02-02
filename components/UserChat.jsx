'use client';
import { useState } from "react";
import { sendMessage, sendMessageAction } from "@/actions/page"; 
import useChat from "@/custom-hooks/useChat";
import { useAppContext } from "@/custom-hooks/Context";
import mongoose from "mongoose";

const UserChat = () => {
    const [message, setMessage] = useState("");
    const messages = useChat();
    const { user, userId } = useAppContext();
  const adminId = new mongoose.Types.ObjectId("679ba0c05cf437805891a789");

    const handleSend = async () => {
        if (!message.trim()) return;
        const senderName = typeof user === "string" ? user : user?.name || "Anonymous";
        await sendMessage({ sender: senderName, message });

        const response = await sendMessageAction({ sender: senderName, message, userId, adminId });

        console.log(response);
        setMessage("");
    };

    return (
        <div className="p-4 border w-80">
            <h2>User Chat</h2>
            <div className="h-40 overflow-y-auto border p-2">
                {messages.length > 0 ? (
                    messages.map((msg, i) => (
                        <p key={i}>
                            <strong>{msg.sender}:</strong> {msg.message}
                        </p>
                    ))
                ) : (
                    <p className="text-gray-500">No messages yet...</p>
                )}
            </div>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="border p-1 w-full"
                placeholder="Type a message..."
            />
            <button
                onClick={handleSend}
                className="mt-2 bg-blue-500 text-white px-4 py-1 w-full"
                disabled={!message.trim()} // Disable button if input is empty
            >
                Send
            </button>
        </div>
    );
};

export default UserChat;
