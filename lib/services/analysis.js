'use client';

import { quizApi, schoolsApi } from '@/lib/api';

/**
 * Analyzes quiz answers and finds matching schools
 * @param {Object} answers - The user's quiz responses
 * @returns {Promise<Object>} Analysis results and matching schools
 */
export async function analyzeQuizResults(answers) {
    try {
        // Get schools from API route (which fetches from Airtable)
        const schools = await schoolsApi.getFiltered(answers);

        // eslint-disable-next-line no-console
        console.log('Schools from Airtable:', schools);

        if (!schools || schools.length === 0) {
            // eslint-disable-next-line no-console
            console.warn('No schools returned from Airtable');
            return { matches: [], analysis: 'No matching schools found.' };
        }

        // Get AI analysis
        const data = await quizApi.analyze({
            answers,
            schools
        });

        // eslint-disable-next-line no-console
        console.log('AI Analysis response:', data);

        return {
            matches: data.matches || [],
            analysis: data.analysis || 'Analysis completed.'
        };
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Analysis failed:', error);
        throw new Error(`Failed to analyze quiz results: ${error.message}`);
    }
}
