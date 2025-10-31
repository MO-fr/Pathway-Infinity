'use client';

/**
 * Results Page Component
 * 
 * Displays the analysis results and matching schools based on user's quiz answers.
 * This is a client component that fetches and displays data from the quiz.
 */

import Button from '@/components/Button';
import ErrorMessage from '@/components/ErrorMessage';
import SaveResultsButton from '@/components/SaveResultsButton';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export default function ResultsPage() {
    const [results, setResults] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loadingStep, setLoadingStep] = useState('Preparing analysis...');
    const [error, setError] = useState(null);
    const router = useRouter();

    useEffect(() => {
        analyzeResults();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    /**
     * Helper function to safely get school property values
     * Handles case variations (e.g., 'Name' vs 'name')
     */
    const getSchoolProperty = (school, propertyName) => {

        if (!school || typeof school !== 'object') return null;

        // Try exact match first
        if (school[propertyName]) return school[propertyName];

        // Try capitalized version
        const capitalized = propertyName.charAt(0).toUpperCase() + propertyName.slice(1);
        if (school[capitalized]) return school[capitalized];

        // Try lowercase version
        const lowercase = propertyName.toLowerCase();
        if (school[lowercase]) return school[lowercase];

        return null;
    };

    /**
     * Helper function to safely render arrays (for pathways, industries, etc.)
     */
    const renderArray = (items, className, ariaLabel) => {

        if (!items) return null;

        const itemsArray = Array.isArray(items) ? items : [items];

        return itemsArray.map((item, i) => (
            <span
                key={`${ariaLabel}-${i}-${item}`}
                className={className}
                role="badge"
                aria-label={`${ariaLabel}: ${item}`}
            >
                {item}
            </span>
        ));
    };

    const analyzeResults = async () => {

        try {

            setLoading(true);
            setError(null);
            setLoadingStep('Retrieving your quiz answers...');

            const storedAnswers = sessionStorage.getItem('quizAnswers');

            if (!storedAnswers) {
                throw new Error('No quiz answers found. Please take the quiz first.');
            }

            console.log('Stored answers:', storedAnswers);

            // 1. Fetch school data for AI analysis
            setLoadingStep('Loading school database...');

            const schoolsResponse = await fetch("/api/schools");

            if (!schoolsResponse.ok) {
                throw new Error(`Failed to fetch schools data: ${schoolsResponse.status}`);
            }

            const schoolsData = await schoolsResponse.json();

            console.log('Schools data count:', schoolsData.length || 0);

            // 2. Send request to AI analysis endpoint
            setLoadingStep('Analyzing your preferences with AI...');

            const aiResponse = await fetch("/api/quiz/analyze", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    answers: storedAnswers,
                    schools: schoolsData
                })
            });

            if (!aiResponse.ok) {
                const errorData = await aiResponse.json();
                throw new Error(errorData.error || `Analysis failed: ${aiResponse.status}`);
            }

            setLoadingStep('Processing your matches...');

            const analysisData = await aiResponse.json();
            console.log('AI Analysis response:', analysisData);
            console.log('Analysis text:', analysisData.analysis);
            console.log('Matches array:', analysisData.matches);
            console.log('Number of matches:', analysisData.matches?.length);
            console.log('First match:', analysisData.matches?.[0]);
            console.log('First match details:', JSON.stringify(analysisData.matches?.[0], null, 2));

            // 3. Validate response structure
            if (!analysisData || typeof analysisData !== 'object') {
                throw new Error('Invalid response format from analysis API');
            }

            if (analysisData.error) {
                throw new Error(analysisData.error);
            }

            if (!analysisData.matches || !Array.isArray(analysisData.matches)) {
                throw new Error('No school matches found in response');
            }

            // 4. Set the results state with validated data
            setLoadingStep('Finalizing results...');
            console.log('Setting results state with:', analysisData);
            setResults(analysisData);
            console.log('Results state set successfully');

        } catch (err) {
            console.error('Error occurred while analyzing results:', err);
            setError(err.message || 'Failed to analyze quiz results. Please try again.');
        } finally {
            setLoading(false);
            setLoadingStep('');
        }
    };

    const handleRetakeQuiz = () => {
        sessionStorage.removeItem('quizAnswers');
        router.push('/questionnaire');
    };

    return (
        <React.Fragment>
            {loading && (
                <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center"
                        role="status"
                        aria-live="polite"
                    >
                        <div
                            className="w-16 h-16 border-4 border-mint-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"
                            aria-hidden="true"
                        />
                        <p className="text-xl text-gray-700 dark:text-gray-300 mb-2">Analyzing your answers...</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{loadingStep}</p>
                        <span className="sr-only">Loading results, please wait</span>
                    </motion.div>
                </div>
            )}

            {error && !loading && (
                <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center p-4">
                    <div className="max-w-md text-center" role="alert" aria-live="assertive">
                        <h1 className="text-2xl font-bold mb-4 dark:text-white" id="error-title">Error</h1>
                        <ErrorMessage
                            message={error}
                            onRetry={analyzeResults}
                            aria-describedby="error-title"
                        />
                        <Button
                            onClick={handleRetakeQuiz}
                            variant="primary"
                            className="mt-4"
                            aria-label="Retake the quiz to try again"
                        >
                            Retake Quiz
                        </Button>
                    </div>
                </div>
            )}

            {!loading && !error && !results?.matches?.length && (
                <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center p-4">
                    <div className="max-w-md text-center" role="main">
                        <h1 className="text-2xl font-bold mb-4 dark:text-white" id="no-results-title">No matching schools found</h1>
                        <div className="mb-6" aria-describedby="no-results-title">
                            <p className="mb-3 dark:text-gray-300">
                                We couldn&apos;t find any schools matching your criteria. This could be because:
                            </p>
                            <ul className="list-disc text-left mt-3 ml-6 dark:text-gray-300" role="list">
                                <li>Your answers were very specific</li>
                                <li>We don&apos;t have schools in our database that match your preferences</li>
                                <li>There might be a temporary issue with our school database</li>
                            </ul>
                        </div>
                        <div className="space-y-4">
                            <Button
                                onClick={analyzeResults}
                                variant="secondary"
                                className="w-full"
                                aria-label="Try searching for schools again"
                            >
                                Try Again
                            </Button>
                            <Button
                                onClick={handleRetakeQuiz}
                                variant="primary"
                                className="w-full"
                                aria-label="Start over with a new quiz"
                            >
                                Retake Quiz
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {!loading && !error && results?.matches?.length > 0 && (
                <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 py-10 px-4">
                    <div className="max-w-5xl mx-auto">
                        <motion.header
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="text-center mb-12"
                        >
                            <h1 className="text-3xl md:text-4xl font-bold mb-4 dark:text-white">Your Best Career Path Matches</h1>
                            <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
                                Based on your answers, we&apos;ve found these trade schools that match your interests and goals.
                            </p>
                        </motion.header>

                        {/* AI Analysis */}
                        {results.analysis && (
                            <motion.section
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl p-6 mb-8 shadow-lg border border-mint-100 dark:border-slate-700"
                                aria-labelledby="analysis-title"
                            >
                                <h2 className="text-xl font-semibold mb-3 dark:text-white" id="analysis-title">Analysis of Your Results</h2>
                                <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">{results.analysis}</p>
                            </motion.section>
                        )}

                        {/* School Matches */}
                        <section aria-labelledby="matches-title">
                            <h2 className="sr-only" id="matches-title">Matching Schools</h2>
                            <div className="space-y-6" role="list">
                                {results.matches.map((school, index) => {
                                    // Normalize school data using helper functions
                                    const schoolName = getSchoolProperty(school, 'name') || getSchoolProperty(school, 'Name') || 'Unnamed School';
                                    const pathways = getSchoolProperty(school, 'pathway') || getSchoolProperty(school, 'Pathway');
                                    const industries = getSchoolProperty(school, 'industries') || getSchoolProperty(school, 'Industries');
                                    const location = getSchoolProperty(school, 'location') || getSchoolProperty(school, 'Location');
                                    const cost = getSchoolProperty(school, 'cost') || getSchoolProperty(school, 'Cost');
                                    const programLength = getSchoolProperty(school, 'Program Length');
                                    const housing = getSchoolProperty(school, 'Housing');
                                    const website = getSchoolProperty(school, 'website') || getSchoolProperty(school, 'Website');
                                    const reasoning = getSchoolProperty(school, 'reasoning');

                                    return (
                                        <motion.div
                                            key={`school-${schoolName}-${index}`}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.3 + (index * 0.1) }}
                                            className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden border border-mint-100 dark:border-slate-700"
                                            role="article"
                                            aria-labelledby={`school-title-${index}`}
                                        >
                                            <div className="p-6 md:p-8">
                                                <div className="flex flex-col md:flex-row justify-between">
                                                    <div className="flex-1">
                                                        <h3
                                                            className="text-2xl font-bold mb-2 dark:text-white"
                                                            id={`school-title-${index}`}
                                                        >
                                                            {schoolName}
                                                        </h3>

                                                        {/* AI Reasoning (if available) */}
                                                        {reasoning && (
                                                            <div className="mb-4 p-3 bg-mint-50 dark:bg-mint-900/30 rounded-lg border-l-4 border-mint-400 dark:border-mint-600">
                                                                <p className="text-sm text-mint-800 dark:text-mint-300">
                                                                    <strong>Why this school matches:</strong> {reasoning}
                                                                </p>
                                                            </div>
                                                        )}

                                                        {/* Pathways and Industries */}
                                                        <div className="mb-4" role="group" aria-label="School pathways and industries">
                                                            {pathways && renderArray(
                                                                pathways,
                                                                "inline-block bg-mint-100 dark:bg-mint-900/30 text-mint-800 dark:text-mint-300 rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2",
                                                                "Pathway"
                                                            )}
                                                            {industries && renderArray(
                                                                industries,
                                                                "inline-block bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2",
                                                                "Industry"
                                                            )}
                                                        </div>

                                                        <dl className="grid md:grid-cols-2 gap-4 mb-6">
                                                            {/* Location */}
                                                            {location && (
                                                                <div className="flex items-start">
                                                                    <div className="mr-3 text-mint-500" aria-hidden="true">📍</div>
                                                                    <div>
                                                                        <dt className="font-semibold dark:text-gray-200">Location</dt>
                                                                        <dd className="text-gray-600 dark:text-gray-400">{location}</dd>
                                                                    </div>
                                                                </div>
                                                            )}

                                                            {/* Cost */}
                                                            {cost && (
                                                                <div className="flex items-start">
                                                                    <div className="mr-3 text-mint-500" aria-hidden="true">💰</div>
                                                                    <div>
                                                                        <dt className="font-semibold dark:text-gray-200">Program Cost</dt>
                                                                        <dd className="text-gray-600 dark:text-gray-400">{Array.isArray(cost) ? cost.join(', ') : cost}</dd>
                                                                    </div>
                                                                </div>
                                                            )}

                                                            {/* Program Length */}
                                                            {programLength && (
                                                                <div className="flex items-start">
                                                                    <div className="mr-3 text-mint-500" aria-hidden="true">⏱️</div>
                                                                    <div>
                                                                        <dt className="font-semibold dark:text-gray-200">Program Length</dt>
                                                                        <dd className="text-gray-600 dark:text-gray-400">{Array.isArray(programLength) ? programLength.join(', ') : programLength}</dd>
                                                                    </div>
                                                                </div>
                                                            )}

                                                            {/* Housing */}
                                                            {housing && (
                                                                <div className="flex items-start">
                                                                    <div className="mr-3 text-mint-500" aria-hidden="true">🏠</div>
                                                                    <div>
                                                                        <dt className="font-semibold dark:text-gray-200">Housing</dt>
                                                                        <dd className="text-gray-600 dark:text-gray-400">{housing}</dd>
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </dl>

                                                        {website && (
                                                            <Button
                                                                href={website}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                variant="primary"
                                                                className="mr-4"
                                                                aria-label={`Visit ${schoolName} website (opens in new tab)`}
                                                            >
                                                                Visit Website
                                                            </Button>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </section>

                        <div className="mt-8 text-center space-x-4">
                            <SaveResultsButton
                                results={results}
                                onSave={() => {
                                    // Optional: Show success message or redirect
                                }}
                            />
                            <Button
                                onClick={() => router.push('/questionnaire')}
                                variant="primary"
                                aria-label="Find more matching schools"
                            >
                                Find More Matches
                            </Button>
                        </div>

                        {/* Navigation Buttons */}
                        <motion.nav
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="flex flex-col md:flex-row gap-4 justify-center mt-12"
                            aria-label="Page navigation"
                        >
                            <Button
                                variant="text"
                                onClick={() => router.push('/dashboard')}
                                className="text-sky-600 hover:text-sky-700"
                                aria-label="Go back to dashboard"
                            >
                                Back to Dashboard
                            </Button>

                            <Button
                                variant="outline"
                                onClick={handleRetakeQuiz}
                                aria-label="Start quiz over from the beginning"
                            >
                                Retake Quiz
                            </Button>
                        </motion.nav>
                    </div>
                </main>
            )}
        </React.Fragment>
    );
}
