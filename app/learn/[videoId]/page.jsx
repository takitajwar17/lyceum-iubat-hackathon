"use client";
import React, { useEffect } from "react";

const VideoPage = ({ params }) => {
  const { videoId } = params;


  return (
    <div className="flex bg-gray-100">
      <div className="w-1/2 h-[calc(80vh-64px)] overflow-hidden bg-gray-100">
        {/* Embed YouTube Video */}
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${videoId}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="rounded-sm p-4"
        ></iframe>
      </div>
      <div className="w-0.5 px-2 cursor-ew-resize bg-gray-300" />
      <div className="w-1/2 shadow-lg overflow-hidden bg-white">
        {/* Code Editor Section - to be implemented later */}
        <div className="h-full">
          Code Editor Section
        </div>
      </div>
    </div>
  );
};

export default VideoPage;
