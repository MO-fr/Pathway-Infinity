'use client';

import QuizIntro from '@/components/QuizIntro';
import QuestionCard from '@/components/questionnaire/QuestionCard';
import QuizProgress from '@/components/questionnaire/QuizProgress';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

// Quiz questions data
const questions = [
    {
        id: 1,
        text: 'What type of work environment do you prefer?',
        options: [
            { text: 'Working outdoors and being physically active', value: 'outdoor' },
            { text: 'Working with machinery and tools', value: 'mechanical' },
            { text: 'Working in a controlled indoor environment', value: 'indoor' },
            { text: 'A mix of indoor and outdoor work', value: 'mixed' },
        ],
    },
    {
        id: 2,
        text: 'Which of these activities do you enjoy the most?',
        options: [
            { text: 'Building or repairing things', value: 'hands_on' },
            { text: 'Solving complex problems', value: 'analytical' },
            { text: 'Helping and working with people', value: 'social' },
            { text: 'Being creative and designing', value: 'creative' },
        ],
    },
    {
        id: 3,
        text: 'How do you prefer to learn new skills?',
        options: [
            { text: 'Hands-on practice and apprenticeship', value: 'practical' },
            { text: 'Classroom instruction with demonstrations', value: 'structured' },
            { text: 'Self-directed learning at my own pace', value: 'independent' },
            { text: 'A combination of theory and practice', value: 'balanced' },
        ],
    },
    {
        id: 4,
        text: 'Which career value is most important to you?',
        options: [
            { text: 'Job security and stability', value: 'stability' },
            { text: 'High earning potential', value: 'financial' },
            { text: 'Meaningful work that helps others', value: 'purpose' },
            { text: 'Opportunities for advancement', value: 'growth' },
        ],
    },
    {
        id: 5,
        text: 'How do you feel about technology in your career?',
        options: [
            { text: 'I want to work directly with advanced technology', value: 'tech_focused' },
            { text: 'I prefer traditional tools with some technology', value: 'balanced_tech' },
            { text: "I'm comfortable using technology as needed", value: 'tech_comfortable' },
            { text: 'I prefer minimal technology in my work', value: 'low_tech' },
        ],
    },
    {
        id: 6,
        text: 'What timeframe are you looking at for training?',
        options: [
            { text: 'Less than 1 year', value: 'short_term' },
            { text: '1-2 years', value: 'medium_term' },
            { text: '2-4 years', value: 'long_term' },
            { text: "I'm flexible on training time", value: 'flexible' },
        ],
    },
];



export default function QuestionnairePage() {

    const [isStarted, setIsStarted] = useState(false);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const router = useRouter();

    const handleAnswer = (answer) => {
        setSelectedAnswer(answer);
    };

    
    useEffect(() => {

        if (answers[questions[currentQuestionIndex]?.id]) {

            setSelectedAnswer(answers[questions[currentQuestionIndex].id]);
        }
    }, [currentQuestionIndex, answers]);


    const handleNextQuestion = () => {

        // Save the current question id and the selected answer
        if (selectedAnswer === null) return; // Prevent proceeding without an answer

        setAnswers((prev) => ({
            ...prev,
            [questions[currentQuestionIndex].id]: selectedAnswer,
        }));

        // Reset selected answer for the next question
        setSelectedAnswer(null);

        // Move to next question or finish quiz
        if (currentQuestionIndex < questions.length - 1) {

            setCurrentQuestionIndex((prev) => prev + 1);
        
        } 
        
        // Save answers to sessionStorage for results page
        else {	
            sessionStorage.setItem(
                'quizAnswers',
                JSON.stringify({
                    ...answers,
                    [questions[currentQuestionIndex].id]: selectedAnswer,
                })
            );

            // Navigate to results page
            router.push('/results');
        }
    };

    // Handle quiz start
    const handleStart = () => {


        setIsStarted(true);
        
        // Reset everything when starting/restarting
        setCurrentQuestionIndex(0);
        setAnswers({});
        setSelectedAnswer(null);
    
    };  // Check if current question is already answered (when navigating back)

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
            <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8">
                <AnimatePresence mode="wait">
                    {!isStarted ? (
                        <QuizIntro key="intro" onStart={handleStart} />
                    ) : (
                        <motion.div
                            key={currentQuestionIndex}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.4 }}
                            className="w-full flex flex-col items-center"
                        >
                            <QuestionCard
                                question={questions[currentQuestionIndex]}
                                onAnswer={handleAnswer}
                                currentQuestionIndex={currentQuestionIndex}
                                totalQuestions={questions.length}
                            />

                            <QuizProgress
                                currentQuestionIndex={currentQuestionIndex}
                                totalQuestions={questions.length}
                                onNextQuestion={handleNextQuestion}
                                isLastQuestion={currentQuestionIndex === questions.length - 1}
                                isAnswerSelected={selectedAnswer !== null}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}