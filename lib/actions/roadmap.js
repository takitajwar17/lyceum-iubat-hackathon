"use server";

import Roadmap from "../models/roadmapModel";
import User from "../models/userModel";
import { connect } from "../mongodb/mongoose";
const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

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
    
    // Attempt to parse the JSON
    try {
      const parsedContent = JSON.parse(roadmapContent);
      console.log("Roadmap Generated Successfully");
      return parsedContent;
    } catch (parseError) {
      console.error("JSON Parse Error:", parseError);
      throw new Error("Failed to parse AI response as JSON");
    }
  } catch (error) {
    console.error("Error generating roadmap:", error.message);
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
    return roadmaps;
  } catch (error) {
    console.error("Error fetching roadmaps:", error);
    throw error;
  }
};
