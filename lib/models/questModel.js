import mongoose from "mongoose";

const { Schema } = mongoose;

const questSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    timeLimit: {
      type: Number, // in minutes
      required: true,
    },
    level: {
      type: String,
      enum: ["beginner", "intermediate", "advanced"],
      required: true,
    },
    questions: [
      {
        type: {
          type: String,
          enum: ["short", "coding"],
          required: true,
        },
        title: {
          type: String,
          required: true,
        },
        description: {
          type: String,
          required: true,
        },
        testCases: [{
          input: String,
          expectedOutput: String,
        }],
        points: {
          type: Number,
          required: true,
        }
      }
    ],
    startTime: {
      type: Date,
      required: true,
    },
    endTime: {
      type: Date,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    createdBy: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Quest = mongoose.models.Quest || mongoose.model("Quest", questSchema);

export default Quest;
