"use client";
import { useState } from "react";
import { sendMessage } from "@/actions/page";
import useChat from "@/custom-hooks/useChat";

const AdminChat = () => {
    const [message, setMessage] = useState("");
    const messages = useChat();

    const handleSend = async () => {
        if (!message.trim()) return;
        await sendMessage({ sender: "Admin", message });
        setMessage("");
    };

    return (
        <div className="p-4 border w-80">
            <h2>Admin Chat</h2>
            <div className="h-40 overflow-y-auto border p-2">
                {messages.map((msg, i) => (
                    <p key={i}><strong>{msg.sender}:</strong> {msg.message}</p>
                ))}
            </div>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="border p-1 w-full"
            />
            <button onClick={handleSend} className="mt-2 bg-green-500 text-white px-4 py-1">
                Send
            </button>
        </div>
    );
};

export default AdminChat;
