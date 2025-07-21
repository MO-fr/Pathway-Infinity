import { NextResponse } from "next/server";
import OpenAI from "openai";

// Initialize the OpenAI client. It's safe to do this at the module level.
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Handles POST requests to analyze quiz answers against a list of schools.
 * This endpoint uses the OpenAI API to provide personalized school recommendations.
 *
 * @param {Request} req - The incoming request object.
 * @returns {NextResponse} A JSON response with matched schools and analysis.
 */
export async function POST(req) {
  console.log("Starting POST request");

  try {
    // 1. Parse and validate the incoming request body.
    const body = await req.json();
    console.log("REQUEST BODY:", JSON.stringify(body, null, 2));

    const { answers, schools } = body;

    if (!answers) {
      return NextResponse.json(
        { error: "Quiz answers are required" },
        { status: 400 }
      );
    }

    if (!schools || !Array.isArray(schools)) {
      return NextResponse.json(
        { error: "Schools data is required and must be an array" },
        { status: 400 }
      );
    }

    // Ensure answers are a JS object.
    const parsedAnswers =
      typeof answers === "string" ? JSON.parse(answers) : answers;

    // 2. Check for a valid OpenAI API key. If it's missing, provide a fallback analysis.
    if (
      !process.env.OPENAI_API_KEY ||
      process.env.OPENAI_API_KEY === "your-valid-openai-api-key-here"
    ) {
      console.log("Using fallback analysis (no OpenAI)");

      // Simple fallback logic: return the first 3 schools.
      const topSchools = schools.slice(0, 3);

      return NextResponse.json({
        matches: topSchools,
        analysis: `Based on your quiz responses, we've identified these schools that align with your preferences. Your answers indicate you prefer: ${Object.values(
          parsedAnswers
        ).join(
          ", "
        )}. These schools offer programs that match your interests and learning style. Note: This is a simplified analysis. For more detailed AI-powered matching, please configure an OpenAI API key.`,
      });
    }

    // 3. Use OpenAI for analysis if the API key is available.
    console.log("Using OpenAI for analysis");

    // Optimize for large school datasets - limit to first 50 schools to stay within context window
    const schoolsForAnalysis =
      schools.length > 50 ? schools.slice(0, 50) : schools;
    console.log(
      `Analyzing ${schoolsForAnalysis.length} schools (total: ${schools.length})`
    );

    const completion = await openai.chat.completions.create({
      model: "gpt-4.1-nano", // Using a modern, capable, and cost-effective model.
      messages: [
        {
          role: "system",
          content:
            "You are a career counselor helping match students to trade schools based on their quiz answers. Your goal is to provide a detailed analysis and recommend the best matching schools. Your response MUST be a valid JSON object.",
        },
        {
          role: "user",
          content: `Based on these quiz answers: ${JSON.stringify(
            parsedAnswers
          )}
                    and this list of available schools: ${JSON.stringify(
                      schoolsForAnalysis
                    )}
                    
                    Please provide:
                    1. A detailed analysis of the student's preferences and career fit.
                    2. A key named "recommendedSchools" containing an array of the top 3-5 matching school objects, exactly as they were provided in the input list. Include a "reasoning" property inside each school object explaining why it's a good match.
                    
                    Format your entire response as a single, valid JSON object with two keys: "analysis" (a string) and "recommendedSchools" (an array of objects).`,
        },
      ],
      temperature: 0.7,
      response_format: { type: "json_object" }, // Ensure the output is valid JSON.
    });

    const aiResponse = completion.choices[0].message.content;
    console.log("Raw Response:", aiResponse);

    // 4. Parse and validate the AI response
    let aiResult;
    try {
      aiResult = JSON.parse(aiResponse);

      // Validate the expected structure
      if (!aiResult.analysis || !aiResult.recommendedSchools) {
        throw new Error("Invalid AI response structure");
      }
    } catch (parseError) {
      console.error("Failed to parse AI response:", parseError);

      // Fallback response
      return NextResponse.json({
        matches: schools.slice(0, 3),
        analysis:
          "AI analysis completed, but response format was invalid. Showing top matching schools based on your preferences.",
      });
    }

    // 5. Return the AI-analyzed results in the expected format
    const response = {
      matches: aiResult.recommendedSchools,
      analysis: aiResult.analysis,
    };

    console.log("Final Response:", JSON.stringify(response, null, 2));
    return NextResponse.json(response);
  } catch (error) {
    console.error("[ANALYZE API] Error:", error);

    // Return specific error information
    if (error.name === "OpenAIError" || error.status === 401) {
      return NextResponse.json(
        { error: "OpenAI API error: " + error.message },
        { status: 503 }
      );
    }

    return NextResponse.json(
      { error: "Failed to analyze results: " + error.message },
      { status: 500 }
    );
  }
}
