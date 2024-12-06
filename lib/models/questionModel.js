// lib/models/questionModel.js

import mongoose from "mongoose";

const { Schema } = mongoose;

// lib/models/questionModel.js

const questionSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    votes: {
      type: Number,
      default: 0,
    },
    voters: {
      type: [
        {
          userId: {
            type: String,
            required: true,
          },
          vote: {
            type: Number,
            required: true,
          },
        },
      ],
      default: [],
    },
    answers: {
      type: Number,
      default: 0,
    },
    views: {
      type: Number,
      default: 0,
    },
    tags: [
      {
        type: String,
      },
    ],
    author: {
      type: String,
      required: true,
      ref: "User",
    },
    replies: {
      type: [
        {
          author: {
            type: String,
            required: true,
          },
          content: {
            type: String,
            required: true,
          },
          createdAt: {
            type: Date,
            default: Date.now,
          },
        },
      ],
      default: [],
    },
    aiAnswerRequested: {
      type: Boolean,
      default: false,
    },
    aiAnswer: {
      content: {
        type: String,
        default: "",
      },
      time: {
        type: Date,
        default: Date.now,
      },
    },
  },
  {
    timestamps: true,
  }
);

const Question =
  mongoose.models.Question || mongoose.model("Question", questionSchema);

export default Question;
