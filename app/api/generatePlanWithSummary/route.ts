import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

interface TravelPlan {
  itinerary: Array<{
    day: string;
    morning: string;
    afternoon: string;
    evening: string;
    accommodation: string;
    meals: string;
    estimated_cost: string;
  }>;
  total_estimated_cost: string;
  travel_tips: string[];
  packing_list: string[];
  emergency_contacts: {
    local_emergency: string;
    embassy: string;
    hotel: string;
  };
}

const GEMINI_API_KEY = process.env.GEMINI_API_KEY!;
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

const TRAVEL_PROMPT_TEMPLATE = `
You are an expert travel planner. Create a travel plan:
DESTINATION: {destination}
DURATION: {duration} days
BUDGET: {budget}
TRAVEL_STYLE: {travel_style}
INTERESTS: {interests}
ACCOMMODATION_PREFERENCE: {accommodation}
TRANSPORTATION_PREFERENCE: {transportation}
SPECIAL_REQUESTS: {special_requests}

IMPORTANT: Respond with ONLY valid JSON in this format:
{
  "itinerary": [
    {
      "day": "Day 1",
      "morning": "Activity description",
      "afternoon": "Activity description",
      "evening": "Activity description",
      "accommodation": "Hotel/Accommodation details",
      "meals": "Meal suggestions",
      "estimated_cost": "Cost estimate"
    }
  ],
  "total_estimated_cost": "Total cost estimate",
  "travel_tips": ["Tip 1", "Tip 2", "Tip 3"],
  "packing_list": ["Item 1", "Item 2", "Item 3"],
  "emergency_contacts": {
    "local_emergency": "Emergency number",
    "embassy": "Embassy contact if applicable",
    "hotel": "Hotel contact"
  }
}
`;

export async function POST(req: Request) {
  try {
    if (!GEMINI_API_KEY) {
      return NextResponse.json({ error: "Gemini API key not configured" }, { status: 500 });
    }

    const travelData = await req.json();

    const formattedPrompt = TRAVEL_PROMPT_TEMPLATE
      .replace("{destination}", travelData.destination)
      .replace("{duration}", travelData.duration)
      .replace("{budget}", travelData.budget)
      .replace("{travel_style}", travelData.travel_style)
      .replace("{interests}", travelData.interests.join(", "))
      .replace("{accommodation}", travelData.accommodation)
      .replace("{transportation}", travelData.transportation)
      .replace("{special_requests}", travelData.special_requests || "None");

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: formattedPrompt }] }],
    });

    let responseText =
      result.response.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "";

    // Remove markdown/code fence if Gemini adds them
    if (responseText.startsWith("```json")) {
      responseText = responseText.slice(7);
    } else if (responseText.startsWith("```")) {
      responseText = responseText.slice(3);
    }
    if (responseText.endsWith("```")) {
      responseText = responseText.slice(0, -3);
    }
    responseText = responseText.trim();

    let travelPlan: TravelPlan;
    try {
      travelPlan = JSON.parse(responseText);
    } catch (parseError) {
      // Try to fix common JSON parsing issues
      const fixedText = responseText.replace(/,}/g, "}").replace(/,]/g, "]");
      try {
        travelPlan = JSON.parse(fixedText);
      } catch {
        throw new Error("Failed to parse travel plan response from AI");
      }
    }

    return NextResponse.json({
      plan: travelPlan,
      summary: `Trip to ${travelData.destination} for ${travelData.duration} days. Estimated budget: ${travelPlan.total_estimated_cost}.`,
    });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
    console.error('Travel plan generation error:', err);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
