"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { IoSearch } from "react-icons/io5";

const API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
const CHANNEL_IDS = [
  "UC8butISFwT-Wl7EV0hUK0BQ", // freeCodeCamp
  "UC59K-uG2A5ogwIrHw4bmlEg", // Telusko
];

const LearnPage = () => {
  const [videos, setVideos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const promises = CHANNEL_IDS.map((channelId) =>
        axios.get(`https://www.googleapis.com/youtube/v3/search`, {
          params: {
            part: "snippet",
            channelId: channelId,
            maxResults: 5,
            order: "date",
            key: API_KEY,
          },
        })
      );
      const results = await Promise.all(promises);
      const allVideos = results.flatMap((result) => result.data.items);
      setVideos(allVideos);
    } catch (error) {
      console.error("Error fetching videos", error);
    }
  };

  const fetchVideosBySearch = async () => {
    try {
      const promises = CHANNEL_IDS.map((channelId) =>
        axios.get(`https://www.googleapis.com/youtube/v3/search`, {
          params: {
            part: "snippet",
            channelId: channelId,
            maxResults: 10,
            order: "relevance",
            q: searchTerm,
            key: API_KEY,
          },
        })
      );
      const results = await Promise.all(promises);
      const allVideos = results.flatMap((result) => result.data.items);
      setVideos(allVideos);
    } catch (error) {
      console.error("Error fetching videos by search", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow p-4">
        <div className="max-w-4xl mx-auto flex items-center">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                fetchVideosBySearch();
              }
            }}
            placeholder="Search for coding videos..."
            className="flex-grow p-2 border border-gray-300 rounded-l-md focus:outline-none "
          />
          <button onClick={fetchVideosBySearch} className="p-2 bg-blue-500 flex items-center gap-1 text-white rounded-r-md hover:bg-blue-600"><IoSearch />Search</button>
        </div>
      </header>
      <main className="max-w-6xl mx-auto py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((video) => (
            <div
              key={video.id.videoId}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              onClick={() => router.push(`/learn/${video.id.videoId}`)}
            >
              <div className="relative" style={{ paddingBottom: '56.25%' }}>
                <img
                  src={video.snippet.thumbnails.medium.url}
                  alt={video.snippet.title}
                  className="absolute top-0 left-0 w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-medium">{video.snippet.title}</h3>
                <p className="text-gray-600">{video.snippet.channelTitle}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default LearnPage;