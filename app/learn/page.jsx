"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

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

  return (
    <div>
      <header>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search for coding videos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button>Search</button>
        </div>
      </header>
      <main>
        <div className="video-grid">
          {videos.map((video) => (
            <div
              key={video.id.videoId}
              className="video-card"
              onClick={() => router.push(`/learn/${video.id.videoId}`)}
            >
              <img
                src={video.snippet.thumbnails.medium.url}
                alt={video.snippet.title}
              />
              <h3>{video.snippet.title}</h3>
              <p>{video.snippet.channelTitle}</p>
            </div>
          ))}
        </div>
      </main>
      {/* <style jsx>{`
        header {
          display: flex;
          justify-content: center;
          padding: 20px;
          background-color: #f8f8f8;
          border-bottom: 1px solid #ddd;
        }
        .search-bar {
          display: flex;
          width: 100%;
          max-width: 600px;
        }
        .search-bar input {
          flex: 1;
          padding: 10px;
          font-size: 16px;
          border: 1px solid #ccc;
          border-radius: 4px 0 0 4px;
        }
        .search-bar button {
          padding: 10px 20px;
          font-size: 16px;
          border: none;
          border-radius: 0 4px 4px 0;
          background-color: #007bff;
          color: white;
          cursor: pointer;
        }
        .video-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 16px;
          justify-content: center;
          padding: 20px;
        }
        .video-card {
          width: 300px;
          border: 1px solid #ccc;
          padding: 16px;
          border-radius: 8px;
          transition: transform 0.2s;
        }
        .video-card:hover {
          transform: scale(1.05);
        }
        .video-card img {
          width: 100%;
          border-radius: 8px;
        }
        .video-card a {
          text-decoration: none;
          color: inherit;
        }
        .video-card h3 {
          margin: 8px 0;
        }
      `}</style> */}
    </div>
  );
};

export default LearnPage;