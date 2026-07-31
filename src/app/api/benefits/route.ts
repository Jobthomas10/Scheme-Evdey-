import { NextResponse } from "next/server";
import { callXAiGrokReasoning } from "@/lib/xaiService";
import { extractProfileFromStory } from "@/lib/schemeMatcher";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { story, clarifyingAnswer } = body;

    const storyText =
      story && story.trim().length > 0
        ? story
        : "I am a 21-year-old male B.Tech student from Kerala with an annual income of ₹2.5 lakh.";

    // Call xAI Grok API for live intelligence & scheme reasoning
    const reportData = await callXAiGrokReasoning(storyText, clarifyingAnswer);
    const extractedProfile = reportData.extractedProfile || extractProfileFromStory(storyText);

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      extractedProfile,
      data: reportData,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to process profile reasoning" },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const story =
    searchParams.get("story") ||
    "I am a 21-year-old male B.Tech student from Kerala with an annual income of ₹2.5 lakh.";

  const reportData = await callXAiGrokReasoning(story);
  return NextResponse.json({ success: true, data: reportData });
}
