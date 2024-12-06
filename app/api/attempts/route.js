import { NextResponse } from 'next/server';
import { connect } from '@/lib/mongodb/mongoose';
import Quest from '@/lib/models/questModel';
import Attempt from '@/lib/models/attemptModel';
import { auth } from '@clerk/nextjs';

export async function POST(request) {
  try {
    await connect();
    
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { questId } = await request.json();

    // Check if quest exists and is still active
    const quest = await Quest.findById(questId);
    if (!quest) {
      return NextResponse.json(
        { error: 'Quest not found' },
        { status: 404 }
      );
    }

    const now = new Date();
    const endTime = new Date(quest.endTime);
    if (now >= endTime) {
      return NextResponse.json(
        { error: 'This quest has ended' },
        { status: 400 }
      );
    }

    // Check for existing attempts
    const existingAttempt = await Attempt.findOne({
      userId,
      questId,
      status: { $in: ['in-progress', 'completed'] }
    });

    if (existingAttempt) {
      return NextResponse.json(
        { error: 'You have already attempted this quest' },
        { status: 400 }
      );
    }

    // Create new attempt
    const attempt = new Attempt({
      userId,
      questId,
      startTime: now,
      endTime: endTime,
      status: 'in-progress',
      totalPoints: 0,
      maxPoints: quest.questions.reduce((total, q) => total + q.points, 0),
      answers: []
    });

    await attempt.save();
    return NextResponse.json(attempt);
  } catch (error) {
    console.error('Error creating attempt:', error);
    return NextResponse.json(
      { error: 'Failed to create attempt' },
      { status: 500 }
    );
  }
}
