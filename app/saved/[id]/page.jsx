'use client';

import Button from '@/components/Button';
import ErrorMessage from '@/components/ErrorMessage';
import { motion } from 'framer-motion';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export default function SavedResultDetailClient({ params }) {
    const { data: session } = useSession();
    const router = useRouter();
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchSavedResult = useCallback(async () => {
        if (!params?.id) {
            console.log('No ID available in params:', params);
            setError('Invalid result ID');
            setLoading(false);
            return;
        }

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

    const handleDelete = async () => {
        if (!confirm('Are you sure you want to delete this saved result? This action cannot be undone.')) {
            return;
        }

        try {
            const response = await fetch(`/api/quiz/save/${params.id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete result');
            }

            toast.success('Result deleted successfully! 🗑️', {
                duration: 3000,
                position: 'top-center',
            });

            // Wait a moment for the toast to show before redirecting
            setTimeout(() => {
                router.push('/saved');
            }, 500);
        } catch (err) {
            toast.error('Failed to delete result: ' + err.message, {
                duration: 4000,
                position: 'top-center',
            });
            console.error('Error deleting result:', err);
        }
    };

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

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0,
        }).format(amount);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8 px-4">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-2xl shadow-lg p-6"
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
                    {/* Analysis Section */}
                    {result.results?.analysis && (
                        <section className="mb-12">
                            <h2 className="text-2xl font-semibold mb-4">Career Path Analysis</h2>
                            <div className="bg-mint-50/30 rounded-xl p-6">
                                <p className="text-gray-700 leading-relaxed">{result.results.analysis}</p>
                            </div>
                        </section>
                    )}

                    {/* Trade Schools Section */}
                    {result.results?.matches && result.results.matches.length > 0 && (
                        <section className="mt-12">
                            <h2 className="text-2xl font-semibold mb-4">Recommended Trade Schools</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 justify-items-center">
                                {result.results.matches.map((match, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="bg-gradient-to-br from-white via-mint-50 to-blue-50 rounded-2xl shadow-xl overflow-hidden border-2 border-blue-200 w-full"
                                    >
                                        <div className="p-4">
                                            <h3 className="text-2xl font-bold mb-2">{match?.name || 'School Name Not Available'}</h3>

                                            {match?.reasoning && (
                                                <div className="mb-4 p-3 bg-mint-50 rounded-lg border-l-4 border-mint-400">
                                                    <p className="text-sm text-mint-800">
                                                        <strong>Why this school matches:</strong> {match.reasoning}
                                                    </p>
                                                </div>
                                            )}

                                            <div className="space-y-6">
                                                {/* Program Details */}
                                                <div>
                                                    <h4 className="text-lg font-semibold text-mint-600 mb-3 flex items-center">
                                                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                                            <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838l-2.727 1.17 3.727 1.51a1 1 0 00.788 0l7-3a1 1 0 000-1.84l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18h8a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17h-6v-3.777a8.935 8.935 0 00-2 .712V17a1 1 0 001 1z" />
                                                        </svg>
                                                        Available Programs
                                                    </h4>
                                                    <div className="flex flex-wrap gap-2">
                                                        {match.industries?.map((industry, i) => (
                                                            <span
                                                                key={i}
                                                                className="inline-block bg-blue-100 text-blue-800 rounded-full px-3 py-1 text-sm font-semibold"
                                                            >
                                                                {industry}
                                                            </span>
                                                        )) || (
                                                                <span className="text-gray-500 italic">
                                                                    No programs listed
                                                                </span>
                                                            )}
                                                    </div>
                                                </div>

                                                <div className="w-full border-b-2 border-mint-300/70 my-6"></div>

                                                {/* Cost & Duration */}
                                                <div>
                                                    {match?.cost && (
                                                        <div className="mb-4">
                                                            <h4 className="text-lg font-semibold text-mint-600 mb-3 flex items-center">
                                                                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                                                    <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                                                                </svg>
                                                                Cost Type
                                                            </h4>
                                                            <div className="flex flex-wrap gap-2">
                                                                {match.cost.map((costType, i) => (
                                                                    <span
                                                                        key={i}
                                                                        className="inline-block bg-blue-100 text-blue-800 rounded-full px-3 py-1 text-sm font-semibold"
                                                                    >
                                                                        {costType}
                                                                    </span>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}

                                                    <div className="w-full border-b-2 border-mint-300/70 my-6"></div>

                                                    {match?.programLength && (
                                                        <div>
                                                            <h4 className="text-lg font-semibold text-mint-600 mb-3 flex items-center">
                                                                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                                                                </svg>
                                                                Program Duration
                                                            </h4>
                                                            <div className="flex flex-wrap gap-2">
                                                                {match.programLength.map((duration, i) => (
                                                                    <span
                                                                        key={i}
                                                                        className="inline-block bg-blue-100 text-blue-800 rounded-full px-3 py-1 text-sm font-semibold"
                                                                    >
                                                                        {duration}
                                                                    </span>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="w-full border-b-2 border-mint-300/70 my-6"></div>
                                            </div>

                                            {/* Additional Information */}
                                            <div className="mt-4 grid md:grid-cols-3 gap-4">
                                                {match?.location && (
                                                    <div>
                                                        <h4 className="text-base font-semibold text-mint-600 mb-1.5 flex items-center">
                                                            <svg className="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
                                                                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                                            </svg>
                                                            Location
                                                        </h4>
                                                        <div className="flex flex-wrap gap-2">
                                                            <span className="inline-block bg-blue-100 text-blue-800 rounded-full px-2.5 py-0.75 text-sm font-semibold">
                                                                {match.location}
                                                            </span>
                                                        </div>
                                                    </div>
                                                )}
                                                {match?.housing && (
                                                    <div>
                                                        <h4 className="text-base font-semibold text-mint-600 mb-1.5 flex items-center">
                                                            <svg className="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
                                                                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                                                            </svg>
                                                            Housing
                                                        </h4>
                                                        <div className="flex flex-wrap gap-2">
                                                            <span className="inline-block bg-blue-100 text-blue-800 rounded-full px-2.5 py-0.75 text-sm font-semibold">
                                                                {match.housing}
                                                            </span>
                                                        </div>
                                                    </div>
                                                )}
                                                {match?.pathway && (
                                                    <div>
                                                        <h4 className="text-base font-semibold text-mint-600 mb-1.5 flex items-center">
                                                            <svg className="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
                                                                <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
                                                            </svg>
                                                            Pathway
                                                        </h4>
                                                        <div className="flex flex-wrap gap-2">
                                                            {match.pathway.map((type, i) => (
                                                                <span
                                                                    key={i}
                                                                    className="inline-block bg-blue-100 text-blue-800 rounded-full px-2.5 py-0.75 text-sm font-semibold -ml-1"
                                                                >
                                                                    {type}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>


                                            {/* Actions */}
                                            <div className="mt-6 flex gap-4">
                                                {match?.website && (
                                                    <Button
                                                        href={match.website}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        variant="primary"
                                                    >
                                                        Visit Website
                                                    </Button>
                                                )}
                                                {match?.contactInfo && (
                                                    <Button
                                                        variant="outline"
                                                        onClick={() => window.location.href = `mailto:${match.contactInfo}`}
                                                    >
                                                        Contact School
                                                    </Button>
                                                )}
                                            </div>
                                        </div>
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
                            onClick={handleDelete}
                            variant="outline"
                            className="text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300"
                        >
                            Delete Result
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
