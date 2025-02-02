"use client";
import { useState, useEffect } from "react";
import Pusher from "pusher-js";

const useChat = () => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY, {
            cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
        });

        const channel = pusher.subscribe("chat-channel");

        channel.bind("new-message", (data) => {
            setMessages((prev) => [...prev, data]);
        });

        return () => {
            channel.unbind_all();
            channel.unsubscribe();
        };
    }, []);

    return messages;
};

export default useChat;
