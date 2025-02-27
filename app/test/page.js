"use client";
import { deleteConversations, deleteUsers, getAllQuote, getAllQuotesHistory, getChatAction, getChatHistory, getQuoteHistory, getUser } from '@/actions/page';
import { useAppContext } from '@/custom-hooks/Context';
import { useEffect, useState } from 'react';

const Test = () => {
  const {userEmail} = useAppContext();
  const [data, setData] = useState();
  const get = async () => {
    const comingData = await getAllQuote();
    console.log(comingData);
    setData(comingData);
  };

  useEffect(() => {
    
      get();
    
  }, [userEmail]);

  return <div>{/* Render data here */}</div>;
};

export default Test;
