'use client';

import Button from '@/components/Button';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function QuizProgress({
    currentQuestionIndex,
    totalQuestions,
    onNextQuestion,
    isLastQuestion,
    isAnswerSelected
}) {
    const router = useRouter();

    return (
        <motion.div
            className="w-full max-w-2xl mx-auto mb-8 mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
        >
            <div className="flex justify-between items-center px-2">
                <Button
                    variant="text"
                    onClick={() => router.push('/dashboard')}
                    className="text-sky-600 hover:text-sky-700"
                >
                    Exit Quiz
                </Button>

                {isAnswerSelected && (
                    <Button
                        variant="primary"
                        onClick={onNextQuestion}
                        className="ml-auto"
                    >
                        {isLastQuestion ? 'See Results' : 'Next Question'}
                    </Button>
                )}
            </div>

            <div className="w-full bg-mint-100/50 h-2 rounded-full mt-4">
                <motion.div
                    className="h-full bg-mint-500 rounded-full"
                    initial={{ width: 0 }}
                    animate={{
                        width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%`
                    }}
                    transition={{ duration: 0.5 }}
                />
            </div>
        </motion.div>
    );
}
