import { NextResponse } from "next/server";
import { connect } from "@/lib/mongodb/mongoose";
import Quest from "@/lib/models/questModel";
import { adminAuth } from "@/lib/middleware/adminAuth";

export const GET = adminAuth(async () => {
  try {
    await connect();
    const quests = await Quest.find({}).sort({ createdAt: -1 });
    return NextResponse.json(quests);
  } catch (error) {
    console.error("Error fetching quests:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
});

export const POST = adminAuth(async (req) => {
  try {
    await connect();
    const questData = await req.json();
    
    // Ensure questions array is present and properly formatted
    if (!questData.questions) {
      questData.questions = [];
    }

    // Log the incoming data
    console.log("Received quest data:", JSON.stringify(questData, null, 2));
    
    const quest = await Quest.create({
      ...questData,
      createdBy: "admin",
    });

    // Log the created quest
    console.log("Created quest:", JSON.stringify(quest, null, 2));

    return NextResponse.json(quest);
  } catch (error) {
    console.error("Error creating quest:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
});
