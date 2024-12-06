import mongoose from 'mongoose';

const attemptSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  questId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Quest',
    required: true,
  },
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
  },
  status: {
    type: String,
    enum: ['in-progress', 'completed', 'time-expired'],
    default: 'in-progress',
  },
  answers: [{
    questionId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
    isCorrect: {
      type: Boolean,
      default: false,
    },
    points: {
      type: Number,
      default: 0,
    },
    submittedAt: {
      type: Date,
      default: Date.now,
    },
    aiEvaluation: {
      score: {
        type: Number,
        min: 0,
        max: 100,
        default: 0
      },
      feedback: {
        type: String,
        default: ''
      },
      evaluatedAt: {
        type: Date
      }
    }
  }],
  totalPoints: {
    type: Number,
    default: 0,
  },
  maxPoints: {
    type: Number,
    required: true,
  }
}, {
  timestamps: true
});

// Ensure a user can only have one active attempt per quest
attemptSchema.index({ userId: 1, questId: 1, status: 1 });

export default mongoose.models.Attempt || mongoose.model('Attempt', attemptSchema);
