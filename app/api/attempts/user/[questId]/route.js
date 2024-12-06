import { NextResponse } from 'next/server';
import { connect } from '@/lib/mongodb/mongoose';
import Attempt from '@/lib/models/attemptModel';
import { auth } from '@clerk/nextjs';

export async function GET(request, { params }) {
  try {
    await connect();
    
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Find the most recent attempt for this user and quest
    const attempt = await Attempt.findOne({
      userId,
      questId: params.questId,
      status: { $in: ['in-progress', 'completed'] }
    }).sort({ createdAt: -1 });

    if (!attempt) {
      return NextResponse.json(null);
    }

    return NextResponse.json(attempt);
  } catch (error) {
    console.error('Error fetching user attempt:', error);
    return NextResponse.json(
      { error: 'Failed to fetch attempt' },
      { status: 500 }
    );
  }
}
