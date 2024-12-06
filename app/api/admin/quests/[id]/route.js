import { NextResponse } from "next/server";
import { connect } from "@/lib/mongodb/mongoose";
import Quest from "@/lib/models/questModel";
import { adminAuth } from "@/lib/middleware/adminAuth";

export const GET = adminAuth(async (req, { params }) => {
  try {
    await connect();
    const quest = await Quest.findById(params.id);
    
    if (!quest) {
      return NextResponse.json(
        { error: "Quest not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(quest);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
});

export const PUT = adminAuth(async (req, { params }) => {
  try {
    await connect();
    const questData = await req.json();
    
    const quest = await Quest.findByIdAndUpdate(
      params.id,
      { ...questData },
      { new: true, runValidators: true }
    );

    if (!quest) {
      return NextResponse.json(
        { error: "Quest not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(quest);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
});

export const DELETE = adminAuth(async (req, { params }) => {
  try {
    await connect();
    const quest = await Quest.findByIdAndDelete(params.id);
    
    if (!quest) {
      return NextResponse.json(
        { error: "Quest not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Quest deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
});
