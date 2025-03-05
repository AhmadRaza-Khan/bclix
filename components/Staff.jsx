"use client"
import { getAllStaff } from "@/actions/page";
import Image from "next/image";
import { useEffect, useState } from "react";
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';

const StaffCard = ({ staff }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleReadMore = () => setIsExpanded(!isExpanded);

  const truncatedText = staff.intro.length > 100 ? `${staff.intro.slice(0, 100)}...` : staff.intro;

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-5 transition-transform transform hover:scale-105 flex flex-col items-center text-center">
      {/* Staff Image */}
      <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-yellow-500 shadow-[0_0_15px_5px_rgba(236,158,14,1)]">
        <Image
          src={staff.image}
          alt={staff.name}
          width={128}
          height={128}
          className="object-cover"
        />
      </div>

      {/* Staff Details */}
      <h2 className="text-xl font-bold mt-3 text-gray-800 dark:text-gray-200">
        {staff.name}
      </h2>
      <p className="text-indigo-500 font-medium">{staff.designation}</p>
      <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
        {isExpanded ? staff.intro : truncatedText}
        {staff.intro.length > 100 && (
          <span
            className="text-indigo-500 cursor-pointer ml-1"
            onClick={toggleReadMore}
          >
            {isExpanded ? " Show Less" : " Read More"}
          </span>
        )}
      </p>

    
    </div>
  );
};

const StaffList = () => {
  const [staffData, setStaffData] = useState([]);

  const getStaff = async () => {
    const comingData = await getAllStaff();
    setStaffData(comingData?.data);
  };

  useEffect(() => {
    getStaff();
  }, []);

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl text-center text-gray-800 dark:text-gray-200 mb-8">
        Meet Our Team
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {staffData.map((staff) => (
          <StaffCard key={staff.email} staff={staff} />
        ))}
      </div>
    </div>
  );
};

export default StaffList;