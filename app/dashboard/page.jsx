// Dashboard page
'use client';

import { motion } from 'framer-motion';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1
    }
};

export default function Dashboard() {
    const { data: session } = useSession();
    const [mounted, setMounted] = useState(false);

    const handleSignOut = async () => {
        await signOut({ callbackUrl: '/' });
    };

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
            {/* Welcome Section with Animation */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-7xl mx-auto mb-12 text-center relative"
            >
                <motion.button
                    onClick={handleSignOut}
                    className="absolute right-0 top-0 px-4 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors duration-200 flex items-center space-x-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    <span>Sign out</span>
                </motion.button>

                <motion.h1
                    className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    Welcome back, {session?.user?.name || 'Student'}! 👋
                </motion.h1>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white/50 backdrop-blur-sm rounded-full px-6 py-2 inline-block"
                >
                    <p className="text-gray-600 text-lg">
                        Your journey to a great career starts here
                    </p>
                </motion.div>
            </motion.div>

            {/* Main Actions Grid with Staggered Animation */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="max-w-7xl mx-auto grid gap-8 sm:grid-cols-2 lg:grid-cols-3 mb-12"
            >
                {/* Start Career Quiz Card */}
                <motion.div variants={itemVariants}>
                    <Link href="/questionnaire" className="block h-full">
                        <motion.div
                            whileHover={{
                                scale: 1.03,
                                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                            }}
                            transition={{ type: "spring", stiffness: 300 }}
                            className="h-full bg-white rounded-2xl shadow-sm border border-blue-100 hover:border-blue-200 p-8 transition-colors duration-300"
                        >
                            <div className="h-16 w-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 transform transition-transform group-hover:rotate-6">
                                <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                </svg>
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-3">Start Career Quiz</h2>
                            <p className="text-gray-600 text-lg">Discover trade programs that perfectly match your interests and skills.</p>
                        </motion.div>
                    </Link>
                </motion.div>

                {/* View Saved Programs Card */}
                <motion.div variants={itemVariants}>
                    <Link href="/saved" className="block h-full">
                        <motion.div
                            whileHover={{
                                scale: 1.03,
                                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                            }}
                            transition={{ type: "spring", stiffness: 300 }}
                            className="h-full bg-white rounded-2xl shadow-sm border border-green-100 hover:border-green-200 p-8 transition-colors duration-300"
                        >
                            <div className="h-16 w-16 bg-green-100 rounded-2xl flex items-center justify-center mb-6">
                                <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                                </svg>
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-3">Saved Programs</h2>
                            <p className="text-gray-600 text-lg">Review and compare your favorite trade programs.</p>
                        </motion.div>
                    </Link>
                </motion.div>

                {/* Start Over Card */}
                <motion.div variants={itemVariants}>
                    <Link href="/startover" className="block h-full">
                        <motion.div
                            whileHover={{
                                scale: 1.03,
                                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                            }}
                            transition={{ type: "spring", stiffness: 300 }}
                            className="h-full bg-white rounded-2xl shadow-sm border border-purple-100 hover:border-purple-200 p-8 transition-colors duration-300"
                        >
                            <div className="h-16 w-16 bg-purple-100 rounded-2xl flex items-center justify-center mb-6">
                                <svg className="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                </svg>
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-3">Start Fresh</h2>
                            <p className="text-gray-600 text-lg">Begin a new journey to explore different career paths.</p>
                        </motion.div>
                    </Link>
                </motion.div>
            </motion.div>

            {/* Quick Help Section with Animation */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="max-w-7xl mx-auto"
            >
                <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-100 p-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Need Help? We've Got You! 🌟</h2>
                    <div className="grid gap-6 md:grid-cols-2">
                        <motion.div
                            whileHover={{ scale: 1.01 }}
                            className="p-4 rounded-xl bg-blue-50/50 border border-blue-100"
                        >
                            <h3 className="text-lg font-semibold text-blue-900 mb-2">Getting Started</h3>
                            <p className="text-blue-700">Take the career quiz for personalized program recommendations based on your interests.</p>
                        </motion.div>

                        <motion.div
                            whileHover={{ scale: 1.01 }}
                            className="p-4 rounded-xl bg-green-50/50 border border-green-100"
                        >
                            <h3 className="text-lg font-semibold text-green-900 mb-2">Save & Compare</h3>
                            <p className="text-green-700">Save interesting programs to your dashboard and compare them later.</p>
                        </motion.div>

                        <motion.div
                            whileHover={{ scale: 1.01 }}
                            className="p-4 rounded-xl bg-purple-50/50 border border-purple-100"
                        >
                            <h3 className="text-lg font-semibold text-purple-900 mb-2">Explore Options</h3>
                            <p className="text-purple-700">Compare different trade programs to find your perfect match.</p>
                        </motion.div>

                        <motion.div
                            whileHover={{ scale: 1.01 }}
                            className="p-4 rounded-xl bg-amber-50/50 border border-amber-100"
                        >
                            <h3 className="text-lg font-semibold text-amber-900 mb-2">Start Fresh</h3>
                            <p className="text-amber-700">Feel free to start over and explore different career paths anytime.</p>
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
