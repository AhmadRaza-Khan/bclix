"use client"
import Conversation from '@/components/Conversation';
import React, { useEffect, useState } from 'react'

const Chat = () => {
    const [data, setData] = useState();
  const userId = 'ali123'
  return (
    <div className='py-52'>
        <Conversation userId={userId} />
    </div>
  )
}

export default Chat