'use client';

import Button from '@/components/Button';
import { motion } from 'framer-motion';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export default function SavedResultsPage() {
    const { data: session } = useSession();
    const router = useRouter();
    const [savedResults, setSavedResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchSavedResults = async () => {
        try {
            setLoading(true);
            const response = await fetch('/api/quiz/save');
            console.log('Response status:', response.status);

            if (!response.ok) {
                throw new Error('Failed to fetch saved results');
            }

            const data = await response.json();
            setSavedResults(data);
        } catch (err) {
            setError(err.message);
            console.error('Error fetching saved results:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (resultId) => {
        if (!confirm('Are you sure you want to delete this saved result? This action cannot be undone.')) {
            return;
        }

        try {
            const response = await fetch(`/api/quiz/save/${resultId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete result');
            }

            setSavedResults(savedResults.filter(result => result.id !== resultId));
            toast.success('Result deleted successfully! 🗑️', {
                duration: 3000,
                position: 'top-center',
            });
        } catch (err) {
            toast.error('Failed to delete result: ' + err.message, {
                duration: 4000,
                position: 'top-center',
            });
            console.error('Error deleting result:', err);
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    useEffect(() => {
        if (!session) {
            router.push('/login');
            return;
        }

        fetchSavedResults();
    }, [session, router]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-12 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center justify-center">
                        <div className="w-8 h-8 border-4 border-mint-500 border-t-transparent rounded-full animate-spin" />
                        <span className="ml-3 text-gray-600">Loading saved results...</span>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-12 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
                        <p className="text-gray-600 mb-6">{error}</p>
                        <Button
                            onClick={() => router.push('/dashboard')}
                            variant="primary"
                        >
                            Back to Dashboard
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-12 px-4">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">Your Saved Results</h1>
                    <p className="text-gray-600">
                        Review your previously saved career match results and assessments.
                    </p>
                </motion.div>

                {savedResults.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="bg-white rounded-2xl p-8 shadow-lg">
                            <p className="text-gray-600 mb-6 text-lg">
                                You haven&apos;t saved any quiz results yet.
                            </p>
                            <Button
                                onClick={() => router.push('/questionnaire')}
                                variant="primary"
                            >
                                Take the Quiz
                            </Button>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {savedResults.map((result, index) => (
                            <motion.div
                                key={result.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                            >
                                <div className="p-6">
                                    <div className="mb-2">
                                        <span className="text-sm text-gray-500">
                                            {formatDate(result.savedAt)}
                                        </span>
                                    </div>

                                    <div className="mb-6">
                                        {result.results?.analysis && (
                                            <p className="text-gray-600 line-clamp-3">
                                                {result.results.analysis}
                                            </p>
                                        )}
                                    </div>

                                    <div className="flex justify-between items-center space-x-3">
                                        <Button
                                            onClick={() => handleDelete(result.id)}
                                            variant="outline"
                                            className="text-sm text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300"
                                        >
                                            Delete
                                        </Button>
                                        <Button
                                            onClick={() => router.push(`/saved/${result.id}`)}
                                            variant="primary"
                                            className="text-sm"
                                        >
                                            View Details
                                        </Button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}

                <div className="mt-12 text-center space-x-4">
                    <Button
                        onClick={() => router.push('/dashboard')}
                        variant="outline"
                    >
                        Back to Dashboard
                    </Button>
                    <Button
                        onClick={() => router.push('/questionnaire')}
                        variant="primary"
                    >
                        Take New Quiz
                    </Button>
                </div>
            </div>
        </div>
    );
}
