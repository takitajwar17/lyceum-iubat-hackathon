import { NextResponse } from 'next/server';
import { connect } from '@/lib/mongodb/mongoose';
import Attempt from '@/lib/models/attemptModel';

export async function GET(request, { params }) {
  try {
    await connect();
    
    const attempt = await Attempt.findById(params.attemptId)
      .populate('questId', 'name level timeLimit');

    if (!attempt) {
      return NextResponse.json(
        { error: 'Attempt not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(attempt);
  } catch (error) {
    console.error('Error fetching attempt:', error);
    return NextResponse.json(
      { error: 'Failed to fetch attempt' },
      { status: 500 }
    );
  }
}
