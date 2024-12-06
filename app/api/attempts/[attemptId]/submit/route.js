import { NextResponse } from "next/server";
import { connect } from "@/lib/mongodb/mongoose";
import Attempt from "@/lib/models/attemptModel";
import { submitQuestAttempt } from "@/lib/actions/quest";
import { auth } from "@clerk/nextjs";

export async function POST(request, { params }) {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { answers } = await request.json();
    await connect();

    const attempt = await Attempt.findById(params.attemptId);
    if (!attempt) {
      return NextResponse.json(
        { error: "Attempt not found" },
        { status: 404 }
      );
    }

    // Get AI evaluation for each answer
    const result = await submitQuestAttempt(params.attemptId, answers);

    // Update attempt with answers and their individual AI evaluations
    attempt.answers = answers.map(answer => {
      const evaluation = result.evaluations.find(e => e.questionId === answer.questionId);
      return {
        questionId: answer.questionId,
        answer: answer.answer,
        submittedAt: new Date(),
        aiEvaluation: evaluation.evaluation
      };
    });

    // Update total points based on sum of all evaluations
    attempt.totalPoints = result.totalScore;
    attempt.status = "completed";
    attempt.endTime = new Date();
    
    await attempt.save();
    return NextResponse.json({ success: true, attempt });

  } catch (error) {
    console.error("Error in submit route:", error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
