'use client';

/**
 * Results Page Component
 * 
 * Displays the analysis results and matching schools based on user's quiz answers.
 * This is a client component that fetches and displays data from the quiz.
 */

import ErrorMessage from '@/app/components/ErrorMessage';
import Button from '@/components/Button';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ResultsPage() {
    const [results, setResults] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const router = useRouter();

    const analyzeResults = async () => {
        try {
            setLoading(true);
            setError(null);

            const storedAnswers = sessionStorage.getItem('quizAnswers');

            if (!storedAnswers) {
                router.push('/questionnaire');
                return;
            }

            const answers = JSON.parse(storedAnswers);
            // eslint-disable-next-line no-console
            console.log('Quiz answers:', answers);

            // Import here to avoid server-side issues with client-only components
            const { analyzeQuizResults } = await import('@/lib/services/analysis');
            const results = await analyzeQuizResults(answers);

            // eslint-disable-next-line no-console
            console.log('Analysis results:', results);

            if (!results || !results.matches || results.matches.length === 0) {
                // eslint-disable-next-line no-console
                console.warn('No matches found in results:', results);
            }

            setResults(results);
        } catch (error) {
            console.error('Failed to analyze results:', error);
            setError(error.message || 'Failed to analyze quiz results. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        analyzeResults();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center"
                >                    <div className="w-16 h-16 border-4 border-mint-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-xl text-gray-700">Analyzing your answers...</p>
                </motion.div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
                <div className="max-w-md text-center">
                    <h1 className="text-2xl font-bold mb-4">Error</h1>
                    <ErrorMessage
                        message={error}
                        onRetry={analyzeResults}
                    />
                    <Button
                        onClick={() => router.push('/questionnaire')}
                        variant="primary"
                        className="mt-4"
                    >
                        Retake Quiz
                    </Button>
                </div>
            </div>
        );
    }

    if (!results?.matches?.length) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
                <div className="max-w-md text-center">
                    <h1 className="text-2xl font-bold mb-4">No matching schools found</h1>
                    <p className="mb-6">
                        We couldn&apos;t find any schools matching your criteria. This could be because:
                        <ul className="list-disc text-left mt-3 ml-6">
                            <li>Your answers were very specific</li>
                            <li>We don&apos;t have schools in our database that match your preferences</li>
                            <li>There might be a temporary issue with our school database</li>
                        </ul>
                    </p>
                    <div className="space-y-4">
                        <Button onClick={analyzeResults} variant="secondary" className="w-full">
                            Try Again
                        </Button>
                        <Button onClick={() => router.push('/questionnaire')} variant="primary" className="w-full">
                            Retake Quiz
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-10 px-4">
            <div className="max-w-5xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-3xl md:text-4xl font-bold mb-4">Your Best Career Path Matches</h1>
                    <p className="text-lg text-gray-700 max-w-2xl mx-auto">
                        Based on your answers, we&apos;ve found these trade schools that match your interests and goals.
                    </p>
                </motion.div>

                {/* AI Analysis */}
                {results.analysis && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white/80 backdrop-blur-sm rounded-xl p-6 mb-8 shadow-lg border border-mint-100"
                    >
                        <h2 className="text-xl font-semibold mb-3">Analysis of Your Results</h2>
                        <p className="text-gray-700 whitespace-pre-line">{results.analysis}</p>
                    </motion.div>
                )}

                {/* School Matches */}
                <div className="space-y-6">
                    {results.matches.map((school, index) => (
                        <motion.div
                            key={school.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 + (index * 0.1) }}
                            className="bg-white rounded-2xl shadow-xl overflow-hidden border border-mint-100"
                        >
                            <div className="p-6 md:p-8">
                                <div className="flex flex-col md:flex-row justify-between">                                    <div className="flex-1">
                                    <h3 className="text-2xl font-bold mb-2">{school.name}</h3>

                                    {/* Pathway and Industries */}
                                    {(school.pathway || school.industries) && (
                                        <div className="mb-4">
                                            {school.pathway && <span className="inline-block bg-mint-100 text-mint-800 rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2">{school.pathway}</span>}
                                            {school.industries && school.industries.split(',').map((industry, i) => (
                                                <span key={i} className="inline-block bg-blue-100 text-blue-800 rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2">{industry.trim()}</span>
                                            ))}
                                        </div>
                                    )}

                                    <div className="grid md:grid-cols-2 gap-4 mb-6">
                                        {/* Location */}
                                        {school.location && (
                                            <div className="flex items-start">
                                                <div className="mr-3 text-mint-500">📍</div>
                                                <div>
                                                    <p className="font-semibold">Location</p>
                                                    <p className="text-gray-600">{school.location}</p>
                                                </div>
                                            </div>
                                        )}

                                        {/* Cost */}
                                        {school.cost && (
                                            <div className="flex items-start">
                                                <div className="mr-3 text-mint-500">💰</div>
                                                <div>
                                                    <p className="font-semibold">Program Cost</p>
                                                    <p className="text-gray-600">{school.cost}</p>
                                                </div>
                                            </div>
                                        )}

                                        {/* Program Length */}
                                        {school.programLength && (
                                            <div className="flex items-start">
                                                <div className="mr-3 text-mint-500">⏱️</div>
                                                <div>
                                                    <p className="font-semibold">Program Length</p>
                                                    <p className="text-gray-600">{school.programLength}</p>
                                                </div>
                                            </div>
                                        )}

                                        {/* Housing */}
                                        {school.housing && (
                                            <div className="flex items-start">
                                                <div className="mr-3 text-mint-500">�</div>
                                                <div>
                                                    <p className="font-semibold">Housing</p>
                                                    <p className="text-gray-600">{school.housing}</p>
                                                </div>
                                            </div>
                                        )}                                        </div>

                                    {school.website && (
                                        <Button
                                            href={school.website}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            variant="primary"
                                            className="mr-4"
                                        >
                                            Visit Website
                                        </Button>
                                    )}
                                </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-8 text-center">
                    <Button onClick={() => router.push('/questionnaire')} variant="primary">
                        Find More Matches
                    </Button>
                </div>

                {/* Navigation Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="flex flex-col md:flex-row gap-4 justify-center mt-12"
                >
                    <Button
                        variant="text"
                        onClick={() => router.push('/dashboard')}
                        className="text-sky-600 hover:text-sky-700"
                    >
                        Back to Dashboard
                    </Button>

                    <Button
                        variant="outline"
                        onClick={() => {
                            sessionStorage.removeItem('quizAnswers');
                            router.push('/questionnaire');
                        }}
                    >
                        Retake Quiz
                    </Button>
                </motion.div>
            </div>
        </div>
    );
}
