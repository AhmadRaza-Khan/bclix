"use client";
import React, { useState } from "react";
import RatingStars from "./Rating";

const Testimonial = ({ data }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="grid grid-cols-4 justify-items-center mb-32 content-center place-items-center">
      {data?.map((value, i) => (
        <TestimonialCard key={i} value={value} formatDate={formatDate} />
      ))}
    </div>
  );
};

const TestimonialCard = ({ value, formatDate }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="card mx-2 hover:scale-105 transform transition duration-300 hover:shadow-[0_0_15px_5px_rgba(59,130,246,0.8)] w-60 min-h-72 bg-gradient-to-r from-blue-500 via-white/20 to-transparent animate-[shimmer_1.5s_infinite]">
      <figure>
        {value?.file.includes("image") ? (
          <img
            className="w-full h-[135px] rounded-lg"
            src={value?.file}
            alt="Testimonial"
          />
        ) : (
          <video controls className="w-full h-[135px] rounded-lg" src={value?.file} />
        )}
      </figure>

      <div className="flex flex-col my-auto text-slate-200 items-start p-4">
        <div className="flex flex-col mb-3">
        <h2 className="text-sm font-semibold">{value?.title}</h2>
        <RatingStars rating={value?.rating} />
        </div>


        <p className={`text-xs ${expanded ? "" : "line-clamp-2"}`}>
          {value?.description}
        </p>
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-gray-950 text-[10px] hover:underline"
        >
          {expanded ? "See Less" : "See More"}
        </button>

        <p className="text-xs">{value?.client}</p>
        <p className="text-xs">{formatDate(value?.createdAt)}</p>
      </div>
    </div>
  );
};

export default Testimonial;
