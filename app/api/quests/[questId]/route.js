import { NextResponse } from 'next/server';
import { connect } from '@/lib/mongodb/mongoose';
import Quest from '@/lib/models/questModel';

export async function GET(request, { params }) {
  try {
    await connect();
    
    const quest = await Quest.findById(params.questId)
      .select('name level timeLimit questions startTime endTime');

    if (!quest) {
      return NextResponse.json(
        { error: 'Quest not found' },
        { status: 404 }
      );
    }

    console.log('Quest details:', {
      id: quest._id,
      startTime: quest.startTime,
      endTime: quest.endTime,
      timeLimit: quest.timeLimit
    });

    return NextResponse.json(quest);
  } catch (error) {
    console.error('Error fetching quest:', error);
    return NextResponse.json(
      { error: 'Failed to fetch quest' },
      { status: 500 }
    );
  }
}
