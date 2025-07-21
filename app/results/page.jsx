// Results page
'use client';

import Button from '@/components/Button';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ResultsPage() {

    const [results, setResults] = useState(null);
    const [loading, setLoading] = useState(true);
    
    const router = useRouter(); 
    
    useEffect(() => {

        // Process the quiz answers from sessionStorage
        const processQuizResults = () => {

            try {

                const storedAnswers = sessionStorage.getItem('quizAnswers');
                console.log("[RESULTS] Stored Answers:", storedAnswers);

                if (!storedAnswers) {

                    // No answers found, use fallback data
                    setResults({
                        topMatch: {
                            title: "Construction Trades",
                            description: "Building, renovating, and maintaining structures.",
                            careers: [
                                "Carpenter", "Electrician", "Plumber", "HVAC Technician",
                                "Construction Manager", "Welder", "Masonry Worker"
                            ],
                            icon: "🏗️"
                        },
                        secondMatch: {
                            title: "Automotive & Mechanical",
                            description: "Working with vehicles and mechanical systems.",
                            careers: [
                                "Automotive Mechanic", "Diesel Technician", "Auto Body Repair",
                                "Heavy Equipment Operator", "Aviation Mechanic"
                            ],
                            icon: "🔧"
                        }
                    });
                    setLoading(false);
                    return;
                }

                const userAnswers = JSON.parse(storedAnswers);
                console.log("[RESULTS] User Answers:", userAnswers);

                const response = fetch('/api/career-matches', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ answers: userAnswers }),
                });
                // Based on user answers, determine career matches
                // In a real app, this would be a more sophisticated algorithm
                // For now, we'll use the answers to choose between predefined matches

                // Example career matches based on answer patterns
                const careerMatches = {
                    // Construction & Trades focused
                    constructionTrades: {
                        title: "Construction Trades",
                        description: "Building, renovating, and maintaining structures.",
                        careers: [
                            "Carpenter", "Electrician", "Plumber", "HVAC Technician",
                            "Construction Manager", "Welder", "Masonry Worker"
                        ],
                        icon: "🏗️"
                    },
                    // Automotive & Mechanical focused
                    automotiveMechanical: {
                        title: "Automotive & Mechanical",
                        description: "Working with vehicles and mechanical systems.",
                        careers: [
                            "Automotive Mechanic", "Diesel Technician", "Auto Body Repair",
                            "Heavy Equipment Operator", "Aviation Mechanic"
                        ],
                        icon: "🔧"
                    },
                    // Healthcare & Medical focused
                    healthcareMedical: {
                        title: "Healthcare & Medical",
                        description: "Providing care and support in medical settings.",
                        careers: [
                            "Medical Assistant", "Dental Hygienist", "Pharmacy Technician",
                            "Nursing Assistant", "Physical Therapy Assistant"
                        ],
                        icon: "⚕️"
                    },
                    // Tech & IT focused
                    technologyIT: {
                        title: "Technology & IT",
                        description: "Working with computers, networks, and digital systems.",
                        careers: [
                            "IT Support Specialist", "Network Technician", "Computer Repair Technician",
                            "Cybersecurity Specialist", "Web Developer"
                        ],
                        icon: "💻"
                    }
                };

                // Simple scoring algorithm based on answers
                let scores = {
                    constructionTrades: 0,
                    automotiveMechanical: 0,
                    healthcareMedical: 0,
                    technologyIT: 0
                };

                // Question 1: Work environment preference
                if (userAnswers[1] === 'outdoor') {
                    scores.constructionTrades += 2;
                } else if (userAnswers[1] === 'mechanical') {
                    scores.automotiveMechanical += 2;
                } else if (userAnswers[1] === 'indoor') {
                    scores.healthcareMedical += 1;
                    scores.technologyIT += 1;
                }

                // Question 2: Activity preference
                if (userAnswers[2] === 'hands_on') {
                    scores.constructionTrades += 1;
                    scores.automotiveMechanical += 1;
                } else if (userAnswers[2] === 'analytical') {
                    scores.technologyIT += 2;
                } else if (userAnswers[2] === 'social') {
                    scores.healthcareMedical += 2;
                }

                // Question 3: Learning style
                if (userAnswers[3] === 'practical') {
                    scores.constructionTrades += 1;
                    scores.automotiveMechanical += 1;
                }

                // Question 4: Career values
                if (userAnswers[4] === 'stability') {
                    scores.healthcareMedical += 1;
                } else if (userAnswers[4] === 'financial') {
                    scores.technologyIT += 1;
                }

                // Question 5: Technology preference
                if (userAnswers[5] === 'tech_focused') {
                    scores.technologyIT += 2;
                } else if (userAnswers[5] === 'low_tech') {
                    scores.constructionTrades += 1;
                }

                // Sort scores to find top matches
                const sortedScores = Object.entries(scores)
                    .sort((a, b) => b[1] - a[1])
                    .map(item => item[0]);

                // Set the top two matches
                setResults({
                    topMatch: careerMatches[sortedScores[0]],
                    secondMatch: careerMatches[sortedScores[1]]
                });

                setLoading(false);

            } catch (error) {
                console.error("Error processing quiz results:", error);
                setLoading(false);
            }
        };

        // Add a slight delay to simulate processing
        const timer = setTimeout(() => {
            processQuizResults();
        }, 1500);

        return () => clearTimeout(timer);
    }, [router]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center"
                >
                    <div className="w-16 h-16 border-4 border-mint-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-xl text-gray-700">Analyzing your answers...</p>
                </motion.div>
            </div>
        );
    }

    if (!results) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
                <div className="max-w-md text-center">
                    <h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
                    <p className="mb-6">We couldn't process your quiz results. Please try taking the quiz again.</p>
                    <Button onClick={() => router.push('/questionnaire')} variant="primary">
                        Retake Quiz
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-10 px-4">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-3xl md:text-4xl font-bold mb-4">Your Career Path Results</h1>
                    <p className="text-lg text-gray-700 max-w-2xl mx-auto">
                        Based on your answers, we've identified career paths that align with your interests and preferences.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-8 mb-12">
                    {/* Top Match */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white rounded-2xl shadow-xl overflow-hidden border border-mint-100"
                    >
                        <div className="p-4 text-white bg-mint-500">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-bold">Top Match</h2>
                                <span className="text-3xl">{results.topMatch.icon}</span>
                            </div>
                        </div>
                        <div className="p-6">
                            <h3 className="text-2xl font-bold mb-2">{results.topMatch.title}</h3>
                            <p className="text-gray-700 mb-4">{results.topMatch.description}</p>

                            <h4 className="font-semibold text-gray-900 mb-2">Career Options:</h4>
                            <ul className="space-y-1 mb-6">
                                {results.topMatch.careers.map((career, index) => (
                                    <motion.li
                                        key={index}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.3 + (index * 0.1) }}
                                        className="flex items-center"
                                    >
                                        <span className="mr-2">•</span>
                                        {career}
                                    </motion.li>
                                ))}
                            </ul>

                            <Button variant="primary" className="w-full">Explore Programs</Button>
                        </div>
                    </motion.div>

                    {/* Second Match */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        className="bg-white rounded-2xl shadow-xl overflow-hidden border border-mint-100"
                    >
                        <div className="p-4 text-white bg-sky-500">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-bold">Second Match</h2>
                                <span className="text-3xl">{results.secondMatch.icon}</span>
                            </div>
                        </div>
                        <div className="p-6">
                            <h3 className="text-2xl font-bold mb-2">{results.secondMatch.title}</h3>
                            <p className="text-gray-700 mb-4">{results.secondMatch.description}</p>

                            <h4 className="font-semibold text-gray-900 mb-2">Career Options:</h4>
                            <ul className="space-y-1 mb-6">
                                {results.secondMatch.careers.map((career, index) => (
                                    <motion.li
                                        key={index}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.5 + (index * 0.1) }}
                                        className="flex items-center"
                                    >
                                        <span className="mr-2">•</span>
                                        {career}
                                    </motion.li>
                                ))}
                            </ul>

                            <Button variant="outline" className="w-full">Explore Programs</Button>
                        </div>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="flex flex-col md:flex-row gap-4 justify-center"
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
