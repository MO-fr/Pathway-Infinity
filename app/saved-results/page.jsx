'use client';

import Button from '@/components/Button';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function SavedResultsPage() {
    const [savedResults, setSavedResults] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const router = useRouter();

    useEffect(() => {
        fetchSavedResults();
    }, []);

    const fetchSavedResults = async () => {
        try {
            setIsLoading(true);
            const response = await fetch('/api/quiz/save');

            if (!response.ok) {
                throw new Error('Failed to fetch saved results');
            }

            const data = await response.json();
            setSavedResults(data);
        } catch (err) {
            setError(err.message);
            console.error('Error fetching saved results:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-center">
                        <div className="w-8 h-8 border-4 border-mint-500 border-t-transparent rounded-full animate-spin" />
                        <span className="ml-3">Loading saved results...</span>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8">
                <div className="container mx-auto px-4">
                    <div className="max-w-2xl mx-auto text-center">
                        <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
                        <p className="text-gray-600 mb-6">{error}</p>
                        <Button onClick={() => router.push('/dashboard')} variant="primary">
                            Back to Dashboard
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8">
            <div className="container mx-auto px-4">
                <div className="max-w-6xl mx-auto">
                    <h1 className="text-3xl font-bold mb-8">Your Saved Results</h1>

                    {savedResults.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-gray-600 mb-6">
                                You haven&apos;t saved any quiz results yet.
                            </p>
                            <Button
                                onClick={() => router.push('/questionnaire')}
                                variant="primary"
                            >
                                Take the Quiz
                            </Button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {savedResults.map((result) => (
                                <div
                                    key={result.id}
                                    className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                                >
                                    <div className="p-6">
                                        <div className="flex justify-between items-start mb-4">
                                            <h2 className="text-xl font-semibold">Career Match Results</h2>
                                            <span className="text-sm text-gray-500">
                                                {formatDate(result.savedAt)}
                                            </span>
                                        </div>

                                        <div className="mb-6">
                                            {result.results.analysis && (
                                                <p className="text-gray-600 line-clamp-3">
                                                    {result.results.analysis}
                                                </p>
                                            )}
                                        </div>

                                        <div className="flex justify-end space-x-4">
                                            <Button
                                                onClick={() => router.push(`/saved-results/${result.id}`)}
                                                variant="secondary"
                                                className="text-sm"
                                            >
                                                View Details
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="mt-8 text-center">
                        <Button
                            onClick={() => router.push('/dashboard')}
                            variant="outline"
                            className="mx-2"
                        >
                            Back to Dashboard
                        </Button>
                        <Button
                            onClick={() => router.push('/questionnaire')}
                            variant="primary"
                            className="mx-2"
                        >
                            Take New Quiz
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
