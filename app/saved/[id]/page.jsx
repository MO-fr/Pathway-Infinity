'use client';

import ErrorMessage from '@/app/components/ErrorMessage';
import Button from '@/components/Button';
import { motion } from 'framer-motion';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

export default function SavedResultDetail({ params }) {
    const { data: session } = useSession();
    const router = useRouter();
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchSavedResult = useCallback(async () => {
        try {
            setLoading(true);
            console.log('Fetching result with params:', params);
            const response = await fetch(`/api/quiz/save/${params.id}`);
            console.log('Response status:', response.status);

            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error('Result not found');
                }
                if (response.status === 403) {
                    throw new Error('You do not have permission to view this result');
                }
                throw new Error('Failed to fetch saved result');
            }

            const data = await response.json();
            setResult(data);
        } catch (err) {
            setError(err.message);
            console.error('Error fetching saved result:', err);
        } finally {
            setLoading(false);
        }
    }, [params]);

    useEffect(() => {
        if (!session) {
            router.push('/login');
            return;
        }

        fetchSavedResult();
    }, [session, router, fetchSavedResult]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-12 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center justify-center">
                        <div className="w-8 h-8 border-4 border-mint-500 border-t-transparent rounded-full animate-spin" />
                        <span className="ml-3 text-gray-600">Loading saved result...</span>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-12 px-4">
                <div className="max-w-7xl mx-auto">
                    <ErrorMessage message={error} />
                    <div className="mt-8 text-center">
                        <Button
                            onClick={() => router.push('/saved')}
                            variant="primary"
                        >
                            Back to Saved Results
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    if (!result) {
        return null;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-12 px-4">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-2xl shadow-lg p-8"
                >
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-4">Your Career Match Results</h1>
                        <p className="text-gray-600">
                            Saved on {new Date(result.savedAt).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                        </p>
                    </div>

                    {/* Analysis Section */}
                    {result.results.analysis && (
                        <section className="mb-12">
                            <h2 className="text-2xl font-semibold mb-4">Analysis</h2>
                            <div className="prose max-w-none">
                                <p className="text-gray-700">{result.results.analysis}</p>
                            </div>
                        </section>
                    )}

                    {/* Matched Schools Section */}
                    {result.results.matchedSchools && result.results.matchedSchools.length > 0 && (
                        <section className="mt-12">
                            <h2 className="text-2xl font-semibold mb-6">Matched Trade Schools & Programs</h2>
                            <div className="grid gap-8">
                                {result.results.matchedSchools.map((school, index) => (
                                    <motion.div
                                        key={school.id || index}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="bg-white rounded-lg shadow p-6 border border-mint-100"
                                    >
                                        <h3 className="text-xl font-semibold mb-4">{school.name}</h3>
                                        {school.programs && (
                                            <div className="mb-4">
                                                <h4 className="font-medium mb-2">Available Programs:</h4>
                                                <div className="flex flex-wrap gap-2">
                                                    {school.programs.map((program, i) => (
                                                        <span
                                                            key={i}
                                                            className="bg-mint-50 text-mint-700 px-3 py-1 rounded-full text-sm"
                                                        >
                                                            {program}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                        {school.website && (
                                            <Button
                                                href={school.website}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                variant="primary"
                                                className="mt-4"
                                            >
                                                Visit Website
                                            </Button>
                                        )}
                                    </motion.div>
                                ))}
                            </div>
                        </section>
                    )}

                    <div className="mt-12 flex justify-center space-x-4">
                        <Button
                            onClick={() => router.push('/saved')}
                            variant="outline"
                        >
                            Back to Saved Results
                        </Button>
                        <Button
                            onClick={() => router.push('/questionnaire')}
                            variant="primary"
                        >
                            Take Quiz Again
                        </Button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
