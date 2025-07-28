'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Button from './Button';

export default function QuizIntro({ onStart }) {
    const router = useRouter();

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-slate-50 to-blue-50"
        >
            <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={{
                    duration: 0.6,
                    ease: [0.165, 0.84, 0.44, 1]
                }}
                className="max-w-2xl w-full bg-white/70 backdrop-blur-sm p-8 md:p-12 rounded-2xl shadow-xl border border-mint-100 text-center"
            >
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                        Let&apos;s Explore Your Future Together! 🌟
                    </h1>
                    <p className="text-lg md:text-xl text-gray-600 mb-8">
                        This short quiz will help you discover trade school programs and career paths that perfectly match your interests and strengths.
                    </p>
                    <div className="space-y-6">
                        <div>
                            <Button
                                onClick={onStart}
                                variant="primary"
                                className="text-lg px-8 py-3"
                            >
                                Begin
                            </Button>
                        </div>
                        <div>
                            <Button
                                onClick={() => router.push('/dashboard')}
                                variant="outline"
                                className="text-base"
                            >
                                Back to Dashboard
                            </Button>
                        </div>
                        <p className="text-sm text-gray-500">
                            Takes about 5-10 minutes to complete
                        </p>
                    </div>
                </motion.div>
            </motion.div>
        </motion.div>
    );
}