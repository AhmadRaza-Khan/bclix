"use client";
import { getChatAction } from '@/actions/page';
import { useAppContext } from '@/custom-hooks/Context';
import mongoose from 'mongoose';
import { useEffect, useState } from 'react';

const Test = () => {
  const [data, setData] = useState();
  const { userId } = useAppContext();  // Make sure userId is available in context
  const adminId = "679ba0c05cf437805891a789";  // Hardcoded adminId for testing
  const adminObjectId = new mongoose.Types.ObjectId(adminId)
  const get = async () => {
    if (!userId) {
      console.error("userId is not available!");
      return;
    }
    const comingData = await getChatAction({ userId, adminObjectId });
    console.log(comingData);
    setData(comingData);
  };

  useEffect(() => {
    if (userId) {
      get();
    }
  }, [userId]);

  return <div>{/* Render data here */}</div>;
};

export default Test;
