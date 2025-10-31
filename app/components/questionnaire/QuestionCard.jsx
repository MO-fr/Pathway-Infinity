'use client';

import { motion } from 'framer-motion';

export default function QuestionCard({ question, onAnswer, currentQuestionIndex, totalQuestions }) {

    if (!question) return null;

    return (
        <div className="max-w-2xl w-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm p-8 md:p-12 rounded-2xl shadow-xl border border-mint-100 dark:border-slate-700">
            <div className="mb-8">
                <span className="text-sm uppercase text-sky-600 dark:text-sky-400 font-semibold tracking-wider">
                    Question {currentQuestionIndex + 1} of {totalQuestions}
                </span>
                <h3 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white mt-2">{question.text}</h3>
            </div>

            <form className="space-y-4">
                {question.options.map((option, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="relative"
                    >
                        <label
                            className="flex items-start p-4 md:p-5 bg-white dark:bg-slate-700 border-2 border-mint-200 dark:border-slate-600 rounded-xl cursor-pointer hover:border-mint-400 dark:hover:border-mint-600 hover:bg-mint-50 dark:hover:bg-slate-600 transition-all duration-200"
                        >
                            <input
                                type="radio"
                                name="question-option"
                                value={option.value}
                                onChange={() => onAnswer(option.value)}
                                className="mt-1 h-5 w-5 text-mint-600 focus:ring-mint-500 border-gray-300 dark:border-gray-600"
                            />
                            <span className="ml-3 text-lg text-gray-700 dark:text-gray-200">
                                {option.text}
                            </span>
                        </label>
                    </motion.div>
                ))}
            </form>
        </div>
    );
}