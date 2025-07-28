// Saved recommendations page
'use client';

import Button from '@/components/Button';
import { motion } from 'framer-motion';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1 }
    }
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1
    }
};

export default function SavedProgramsPage() {
    const { data: session } = useSession();
    const router = useRouter();
    const [savedResults, setSavedResults] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!session) {
            router.push('/login');
            return;
        }

        fetchSavedResults();
    }, [session, router]);

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
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-12 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center justify-center">
                        <div className="w-8 h-8 border-4 border-mint-500 border-t-transparent rounded-full animate-spin" />
                        <span className="ml-3 text-gray-600">Loading saved programs...</span>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-12 px-4">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Your Saved Programs</h1>
                    <p className="text-gray-600 text-lg">
                        Review and compare your matched trade programs
                    </p>
                </motion.div>

                {error ? (
                    <div className="text-center">
                        <p className="text-red-500 mb-4">{error}</p>
                        <Button onClick={fetchSavedResults} variant="primary">
                            Try Again
                        </Button>
                    </div>
                ) : savedResults.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-12"
                    >
                        <p className="text-gray-600 text-lg mb-6">
                            You haven&apos;t saved any programs yet.
                        </p>
                        <Button
                            onClick={() => router.push('/questionnaire')}
                            variant="primary"
                        >
                            Take Career Quiz
                        </Button>
                    </motion.div>
                ) : (
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
                    >
                        {savedResults.map((result) => (
                            <motion.div
                                key={result.id}
                                variants={itemVariants}
                                className="bg-white rounded-2xl shadow-sm border border-mint-100 p-6 hover:border-mint-200 transition-colors duration-300"
                            >
                                <div className="mb-4">
                                    <span className="text-sm text-gray-500">
                                        Saved on {formatDate(result.savedAt)}
                                    </span>
                                </div>

                                {result.results.analysis && (
                                    <p className="text-gray-600 mb-4 line-clamp-3">
                                        {result.results.analysis}
                                    </p>
                                )}

                                <div className="mt-4 flex justify-between items-center">
                                    <Button
                                        onClick={() => router.push(`/saved/${result.id}`)}
                                        variant="outline"
                                        className="text-sm"
                                    >
                                        View Details
                                    </Button>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </div>
        </div>
    );
}
