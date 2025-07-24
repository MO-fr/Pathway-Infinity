/**
 * Error message component for displaying user-friendly error messages
 * Used across the application to provide consistent error handling UI
 */

'use client';

import { motion } from 'framer-motion';
import Button from './Button';

export default function ErrorMessage({ message, onRetry }) {
    return (
        <motion.div
            className="flex flex-col items-center justify-center text-center p-6 bg-red-50 rounded-lg shadow-sm max-w-xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            <div className="text-red-500 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Something went wrong</h3>
            <p className="text-gray-600 mb-4">{message || "We couldn't load your results. Please try again."}</p>
            {onRetry && (
                <Button onClick={onRetry} className="mt-2">
                    Try Again
                </Button>
            )}
        </motion.div>
    );
}
