"use client"
import SendIcon from '@mui/icons-material/Send';
import { useState } from "react";
import MessageIcon from '@mui/icons-material/Message';
import CancelIcon from '@mui/icons-material/Cancel';
import { useRouter } from 'next/navigation';
const ChatWidget = () => {
  const router = useRouter()

  return (
    <div className="relative">
      <div
        onClick={()=>router.push(`/chat`)}
        className="fixed bottom-16 right-10 animate-gradual-bounce bg-gradient-to-r from-yellow-600 to-yellow-700 text-white p-4 rounded-full shadow-lg cursor-pointer z-50 hover:bg-blue-700 transition-all"
      >
        <MessageIcon />
      </div>
    </div>
  );
};

export default ChatWidget;
