import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

export async function POST(req) {

    try {

        const { answers, schools } = await req.json();

        // Use OpenAI to analyze matches
        const completion = await openai.chat.completions.create({
            model: "gpt-4",
            messages: [
                {
                    role: "system",
                    content: "You are a career counselor helping match students to trade schools based on their quiz answers. Consider work environment preferences, learning style, and career goals."
                },
                {
                    role: "user",
                    content: `Based on these quiz answers: ${JSON.stringify(answers)}
           and these schools: ${JSON.stringify(schools)},
           provide the top 3 matching schools with detailed reasoning.`
                }
            ],
            temperature: 0.7,
        });

        const analysis = completion.choices[0].message.content;

        // Find the schools mentioned in the analysis
        const matchingSchools = schools.slice(0, 3); // For now, just return top 3

        return NextResponse.json({
            matches: matchingSchools,
            analysis
        });
    } catch (error) {
        console.error('Analysis failed:', error);
        return NextResponse.json(
            { error: 'Failed to analyze results' },
            { status: 500 }
        );
    }
}
