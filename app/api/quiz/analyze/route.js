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

  try {

    // 1. Parse and validate the incoming request body.
    const body = await req.json();

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

    // Optimize for large school datasets - limit to first 50 schools to stay within context window
    const schoolsForAnalysis =
      schools.length > 50 ? schools.slice(0, 50) : schools;

    console.log(
      `Analyzing ${schoolsForAnalysis.length} schools (total: ${schools.length})`
    );

    // 2. Check for a valid OpenAI API key. If it's missing, provide a fallback analysis.
    if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === "your-valid-openai-api-key-here") {
      console.log("Using fallback analysis (no OpenAI)");
      return getFallbackAnalysis(schools, parsedAnswers);
    }

    // 3. Use OpenAI for analysis if the API key is available.
    try {
      return await getAIAnalysis(schoolsForAnalysis, parsedAnswers);
    } catch (openaiError) {
      console.error("OpenAI API failed, using fallback:", openaiError);
      return getFallbackAnalysis(schools, parsedAnswers);
    }
  }

  catch (error) {
    console.error("[ANALYZE API] Error:", error);
    return NextResponse.json(
      { error: "Failed to analyze results: " + error.message },
      { status: 500 }
    );
  }
}

// Fallback analysis function
function getFallbackAnalysis(schools, parsedAnswers) {
  console.log('=== FALLBACK ANALYSIS START ===');
  console.log('Total schools received:', schools.length);
  console.log('Sample school structure:', schools[0]);
  console.log('Parsed answers:', parsedAnswers);

  // Create a more intelligent matching system based on quiz answers
  const preferences = Object.values(parsedAnswers).join(' ').toLowerCase();
  console.log('Preferences string:', preferences);

  // Score schools based on how well they match preferences
  const scoredSchools = schools.map(school => {
    let score = 0;
    let reasoning = [];

    // Check for pathway matches
    if (school.Pathway && Array.isArray(school.Pathway)) {
      school.Pathway.forEach(pathway => {
        if (preferences.includes(pathway.toLowerCase())) {
          score += 3;
          reasoning.push(`matches your interest in ${pathway}`);
        }
      });
    }

    // Check for industry matches
    if (school.Industries && Array.isArray(school.Industries)) {
      school.Industries.forEach(industry => {
        if (preferences.includes(industry.toLowerCase())) {
          score += 2;
          reasoning.push(`aligns with ${industry} field`);
        }
      });
    }

    // Check for program length preferences
    if (school['Program Length'] && Array.isArray(school['Program Length'])) {
      school['Program Length'].forEach(length => {
        if (preferences.includes(length.toLowerCase()) || preferences.includes('quick') && length.includes('Month')) {
          score += 1;
          reasoning.push(`fits your preferred timeframe`);
        }
      });
    }

    // Check for location preferences
    if (school.Location && preferences.includes(school.Location.toLowerCase().split(',')[0])) {
      score += 1;
      reasoning.push(`located in your preferred area`);
    }

    // Default reasoning if no specific matches
    if (reasoning.length === 0) {
      reasoning.push(`offers quality programs that match your career goals`);
    }

    return {
      ...school,
      score,
      reasoning: reasoning.slice(0, 2).join(' and ') // Limit to top 2 reasons
    };
  });

  // Sort by score and take top 5
  const topSchools = scoredSchools
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);

  // Generate analysis based on answers
  const answersArray = Object.values(parsedAnswers);
  const analysisText = `Based on your quiz responses, you have indicated a preference for ${answersArray[0]} work environments and ${answersArray[1]} activities. Your answers suggest you value ${answersArray[2]} approaches to learning and prioritize ${answersArray[3]} in your career decisions. With ${answersArray[4]} technical skills and seeking ${answersArray[5]} program durations, you appear well-suited for trade school programs that offer hands-on training and practical career preparation. These preferences suggest you would thrive in vocational education settings that provide structured learning paths, real-world skill development, and direct pathways to stable employment. The schools recommended below have been carefully selected to align with your work style preferences, career goals, and educational needs. Each offers programs that match your interests while providing the support and flexibility you're looking for in your career education journey.`;

  const response = {
    matches: topSchools,
    analysis: analysisText,
  };

  console.log('Fallback response:', JSON.stringify(response, null, 2));
  console.log('Number of matches:', topSchools.length);

  return NextResponse.json(response);
}

// AI analysis function
async function getAIAnalysis(schoolsForAnalysis, parsedAnswers) {
  const completion = await openai.chat.completions.create({
    model: "gpt-5-nano", // Updated to current cost-effective model, if model too unintelligent bump to mini
    messages: [
      {
        role: "system",
        content:
          "You are an expert career counselor specializing in trade schools and vocational education. Provide detailed, personalized analysis that helps students understand their career path options. Your response MUST be valid JSON.",
      },
      {
        role: "user",
        content: `Analyze the following student's quiz responses and match them with appropriate trade schools:

Student Quiz Answers: ${JSON.stringify(parsedAnswers)}

Available Schools: ${JSON.stringify(schoolsForAnalysis)}

Provide a comprehensive JSON response with these two keys:

1. "analysis" - Write a detailed career path analysis (150-200 words) that:
   - Interprets what their quiz answers reveal about their preferences, work style, and career goals
   - Explains what types of careers would be suitable based on their responses
   - Discusses how their preferences align with trade school opportunities
   - Be specific, personal, and insightful

2. "recommendedSchools" - Array of 3-5 best matching schools. For EACH school:
   - Include ALL original school properties: Name, Pathway, Industries, Program Length, Cost, Housing, Website, Location, Requirements
   - Add a "reasoning" property (60-100 words) that deeply explains:
     * WHY this specific school matches their preferences
     * HOW the school's programs align with their quiz answers
     * WHAT specific features make it a good fit (cost, location, duration, etc.)
   - Be detailed and personalized

CRITICAL: Return complete school objects with all original data fields intact, just add the reasoning property.`,
      },
    ],
    max_tokens: 3000, // Increased for detailed analysis
    temperature: 0.8, // Slightly higher for more creative, detailed responses
    response_format: { type: "json_object" },
  });

  const aiResponse = completion.choices[0].message.content;
  let aiResult;

  try {
    aiResult = JSON.parse(aiResponse);
    if (!aiResult.analysis || !aiResult.recommendedSchools) {
      throw new Error("Invalid AI response structure");
    }
  } catch (parseError) {
    console.error("Failed to parse AI response:", parseError);
    throw parseError;
  }

  return NextResponse.json({
    matches: aiResult.recommendedSchools,
    analysis: aiResult.analysis,
  });
}
