"use client";
import CodeEditor from "@/components/ui/CodeEditor";
import React, { useEffect } from "react";

const VideoPage = ({ params }) => {
  const { videoId } = params;

  useEffect(() => {
    const resizer = document.querySelector(".cursor-ew-resize");
    const leftPanel = resizer.previousElementSibling;
    const rightPanel = resizer.nextElementSibling;

    const handleMouseDown = (event) => {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    };

    const handleMouseMove = (event) => {
      const newWidth = event.clientX - leftPanel.getBoundingClientRect().left;
      leftPanel.style.width = `${newWidth}px`;
      rightPanel.style.width = `calc(100% - ${newWidth}px - 0.25rem)`; // Adjust for the width of the resizer (0.25rem = 1px)
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    resizer.addEventListener("mousedown", handleMouseDown);

    return () => {
      resizer.removeEventListener("mousedown", handleMouseDown);
    };
  }, []);

  return (
    <div className="flex bg-gray-100">
      <div className="resizeable w-1/2 h-[calc(80vh-64px)] overflow-hidden bg-gray-100">
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
          <CodeEditor/>
        </div>
      </div>
    </div>
  );
};

export default VideoPage;
