"use server";

import Roadmap from "../models/roadmapModel";
import User from "../models/userModel";
import { connect } from "../mongodb/mongoose";
const Groq = require("groq-sdk");
const axios = require('axios');

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const getVideoDuration = async (videoId) => {
  try {
    const response = await axios.get(`https://www.googleapis.com/youtube/v3/videos`, {
      params: {
        part: "contentDetails",
        id: videoId,
        key: process.env.NEXT_PUBLIC_YOUTUBE_API_KEY,
      },
    });

    if (response.data.items && response.data.items.length > 0) {
      const duration = response.data.items[0].contentDetails.duration; // Returns in ISO 8601 format
      // Convert ISO 8601 duration to minutes
      const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
      const hours = (match[1] ? parseInt(match[1]) : 0);
      const minutes = (match[2] ? parseInt(match[2]) : 0);
      const seconds = (match[3] ? parseInt(match[3]) : 0);
      
      const totalMinutes = hours * 60 + minutes + seconds / 60;
      return { duration, totalMinutes };
    }
    return null;
  } catch (error) {
    console.error("Error getting video duration:", error);
    return null;
  }
};

const searchYouTubeVideo = async (topic) => {
  try {
    // Search for videos with duration filter (only long videos)
    const response = await axios.get(`https://www.googleapis.com/youtube/v3/search`, {
      params: {
        part: "snippet",
        maxResults: 5, // Increased to have more options to filter
        order: "relevance",
        q: topic,
        type: "video",
        videoDuration: "medium", // Filter for medium length videos
        key: process.env.NEXT_PUBLIC_YOUTUBE_API_KEY,
      },
    });
    
    if (response.data.items && response.data.items.length > 0) {
      // Check each video's duration until we find one that's at least 10 minutes
      for (const item of response.data.items) {
        const videoId = item.id.videoId;
        const durationInfo = await getVideoDuration(videoId);
        
        if (durationInfo && durationInfo.totalMinutes >= 10) {
          return {
            videoId,
            duration: durationInfo.duration
          };
        }
      }
    }
    return null;
  } catch (error) {
    console.error("Error searching YouTube video:", error);
    return null;
  }
};

const generateRoadmap = async (prompt) => {
  try {
    console.log("Generating roadmap...");
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "Create a detailed learning roadmap in JSON format. Break down the learning path into steps, where each step represents a topic to master. Include a description of what to learn in each step (atleast 5 steps) and relevant documentation links. The format should be: { 'steps': [{ 'step': 1, 'topic': 'string', 'description': 'string', 'documentation': 'string' }] }"
        },
        {
          role: "user",
          content: prompt
        }
      ],
      model: "mixtral-8x7b-32768",
      temperature: 0.7,
      max_tokens: 1024,
      top_p: 1,
      stream: false,
      stop: null
    });

    let roadmapContent = chatCompletion.choices[0].message.content;
    console.log("Raw response:", roadmapContent);
    
    // Clean up the response - remove any non-JSON text and fix quotes
    roadmapContent = roadmapContent.replace(/^[\s\S]*?(\{[\s\S]*\})[\s\S]*$/, '$1')
                    .replace(/'/g, '"');
    
    // Parse the content
    const parsedContent = JSON.parse(roadmapContent);
    
    // Add video IDs and durations for each step
    for (const step of parsedContent.steps) {
      const searchQuery = `${step.topic} programming tutorial`;
      const videoInfo = await searchYouTubeVideo(searchQuery);
      if (videoInfo) {
        step.videoId = videoInfo.videoId;
        step.videoDuration = videoInfo.duration;
      }
    }
    
    console.log("Roadmap Generated Successfully with videos");
    return parsedContent;
  } catch (error) {
    console.error("Error generating roadmap:", error);
    throw error;
  }
};

export const createRoadmap = async (title, prompt, author) => {
  try {
    await connect();
    const user = await User.findOne({ clerkId: author });
    if (!user) throw new Error("User not found");

    const content = await generateRoadmap(prompt);
    
    const roadmap = await Roadmap.create({
      title,
      prompt,
      content,
      author: user.userName,
    });

    return roadmap.toObject();
  } catch (error) {
    console.error("Error creating roadmap:", error);
    throw error;
  }
};

export const getUserRoadmaps = async (author) => {
  try {
    await connect();
    const user = await User.findOne({ clerkId: author });
    if (!user) throw new Error("User not found");

    const roadmaps = await Roadmap.find({ author: user.userName }).sort({ createdAt: -1 });
    return JSON.parse(JSON.stringify(roadmaps)); // Convert to plain object
  } catch (error) {
    console.error("Error fetching roadmaps:", error);
    throw error;
  }
};

export const getRoadmapById = async (id) => {
  try {
    await connect();
    const roadmap = await Roadmap.findById(id);
    if (!roadmap) return null;
    return JSON.parse(JSON.stringify(roadmap)); // Convert to plain object
  } catch (error) {
    console.error("Error getting roadmap:", error);
    throw error;
  }
};
