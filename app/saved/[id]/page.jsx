'use client';

import Button from '@/app/components/Button';
import ErrorMessage from '@/app/components/ErrorMessage';
import { motion } from 'framer-motion';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

export default function SavedResultDetail({ params }) {
    const { data: session } = useSession();
    const router = useRouter();
    const [results, setResults] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [loadingStep, setLoadingStep] = useState('Loading saved results...');

    const getSchoolProperty = (school, propertyName) => {
        if (!school || typeof school !== 'object') return null;
        if (school[propertyName]) return school[propertyName];
        const capitalized = propertyName.charAt(0).toUpperCase() + propertyName.slice(1);
        if (school[capitalized]) return school[capitalized];
        const lowercase = propertyName.toLowerCase();
        if (school[lowercase]) return school[lowercase];
        return null;
    };

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

    const fetchSavedResult = useCallback(async () => {
        try {
            setLoading(true);
            setLoadingStep('Fetching saved results...');
            const response = await fetch(`/api/quiz/save/${params.id}`);

            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error('Result not found');
                }
                if (response.status === 403) {
                    throw new Error('You do not have permission to view this result');
                }
                throw new Error('An error occurred while fetching the result');
            }

            const data = await response.json();

            // The results are already analyzed and stored in the database
            setResults({
                ...data.results, // This contains the analyzed results including matches and summary
                savedAt: data.savedAt,
                id: data.id
            });
        } catch (error) {
            console.error('Error fetching result:', error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }, [params.id]);

    useEffect(() => {
        if (!session) {
            router.push('/login');
            return;
        }
        fetchSavedResult();
    }, [session, router, fetchSavedResult]);

    const handleRetakeQuiz = () => {
        sessionStorage.removeItem('quizAnswers');
        router.push('/questionnaire');
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
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
                    <p className="text-xl text-gray-700 mb-2">Loading your saved results...</p>
                    <p className="text-sm text-gray-500">{loadingStep}</p>
                    <span className="sr-only">Loading saved results, please wait</span>
                </motion.div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
                <div className="max-w-md text-center" role="alert" aria-live="assertive">
                    <h1 className="text-2xl font-bold mb-4" id="error-title">Error</h1>
                    <ErrorMessage
                        message={error}
                        onRetry={fetchSavedResult}
                        aria-describedby="error-title"
                    />
                    <Button
                        onClick={handleRetakeQuiz}
                        variant="primary"
                        className="mt-4"
                    >
                        Take Quiz Again
                    </Button>
                </div>
            </div>
        );
    }

    if (!results) {
        return null;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 sm:p-6 lg:p-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-7xl mx-auto"
            >
                <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">Your Career Path Analysis Results</h1>
                    <p className="text-gray-600 mb-6">
                        Saved on: {new Date(results.savedAt).toLocaleDateString()}
                    </p>

                    {/* AI Analysis */}
                    {results.analysis && (
                        <div className="mb-8 bg-mint-50 rounded-xl p-6">
                            <h2 className="text-2xl font-semibold mb-4 text-mint-900">AI Analysis</h2>
                            <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{results.analysis}</p>
                        </div>
                    )}

                    {/* School Matches */}
                    {results.matches && results.matches.length > 0 && (
                        <div>
                            <h2 className="text-2xl font-semibold mb-6">Recommended Schools</h2>
                            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                {results.matches.map((school, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border-2 border-mint-200 hover:border-mint-300"
                                    >
                                        <h3 className="text-xl font-semibold mb-3">
                                            {getSchoolProperty(school, 'name')}
                                        </h3>

                                        {/* Match Score */}
                                        <div className="mb-4">
                                            <div className="inline-block bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
                                                Recommended Match
                                            </div>
                                        </div>

                                        {/* School Details */}
                                        <div className="space-y-3">
                                            {/* Location */}
                                            {getSchoolProperty(school, 'location') && (
                                                <p className="text-gray-600">
                                                    📍 {getSchoolProperty(school, 'location')}
                                                </p>
                                            )}

                                            {/* Programs */}
                                            {getSchoolProperty(school, 'programs') && (
                                                <div className="flex flex-wrap gap-2">
                                                    {renderArray(
                                                        getSchoolProperty(school, 'programs'),
                                                        "bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded",
                                                        "program"
                                                    )}
                                                </div>
                                            )}

                                            {/* Pathways */}
                                            {getSchoolProperty(school, 'pathway') && (
                                                <div className="flex flex-wrap gap-2 mb-3">
                                                    {renderArray(
                                                        getSchoolProperty(school, 'pathway'),
                                                        "bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded",
                                                        "pathway"
                                                    )}
                                                </div>
                                            )}

                                            {/* Industries */}
                                            {getSchoolProperty(school, 'industries') && (
                                                <div className="mb-3">
                                                    <h4 className="text-sm font-semibold text-gray-700 mb-1">Industries</h4>
                                                    <div className="flex flex-wrap gap-2">
                                                        {renderArray(
                                                            getSchoolProperty(school, 'industries'),
                                                            "bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded",
                                                            "industry"
                                                        )}
                                                    </div>
                                                </div>
                                            )}

                                            {/* Program Length */}
                                            {getSchoolProperty(school, 'programLength') && (
                                                <div className="mb-3">
                                                    <h4 className="text-sm font-semibold text-gray-700 mb-1">Program Length</h4>
                                                    <div className="flex flex-wrap gap-2">
                                                        {renderArray(
                                                            getSchoolProperty(school, 'programLength'),
                                                            "bg-mint-100 text-mint-800 text-xs px-2 py-1 rounded",
                                                            "program-length"
                                                        )}
                                                    </div>
                                                </div>
                                            )}

                                            {/* Housing & Cost */}
                                            <div className="grid grid-cols-2 gap-4 mb-3">
                                                {getSchoolProperty(school, 'housing') && (
                                                    <div>
                                                        <h4 className="text-sm font-semibold text-gray-700 mb-1">Housing</h4>
                                                        <p className="text-sm text-gray-600">{getSchoolProperty(school, 'housing')}</p>
                                                    </div>
                                                )}
                                                {getSchoolProperty(school, 'cost') && (
                                                    <div>
                                                        <h4 className="text-sm font-semibold text-gray-700 mb-1">Cost</h4>
                                                        <div className="flex flex-wrap gap-2">
                                                            {renderArray(
                                                                getSchoolProperty(school, 'cost'),
                                                                "bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded",
                                                                "cost"
                                                            )}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Website */}
                                            {getSchoolProperty(school, 'website') && (
                                                <div className="mb-3">
                                                    <a
                                                        href={getSchoolProperty(school, 'website')}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-mint-600 hover:text-mint-700 text-sm underline"
                                                    >
                                                        Visit Website →
                                                    </a>
                                                </div>
                                            )}

                                            {/* Reasoning */}
                                            {getSchoolProperty(school, 'reasoning') && (
                                                <div className="mt-4 pt-4 border-t border-gray-200">
                                                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Why This Match?</h4>
                                                    <p className="text-sm text-gray-600">{getSchoolProperty(school, 'reasoning')}</p>
                                                </div>
                                            )}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap justify-center gap-4">
                    <Button
                        onClick={() => router.push('/saved')}
                        variant="secondary"
                    >
                        Back to Saved Results
                    </Button>
                    <Button
                        onClick={handleRetakeQuiz}
                        variant="primary"
                    >
                        Take Quiz Again
                    </Button>
                </div>
            </motion.div>
        </div>
    );
}