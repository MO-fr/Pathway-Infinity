'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import Button from './Button';

export default function SaveResultsButton({ results, onSave }) {
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState(null);

    const handleSave = async () => {
        try {
            setIsSaving(true);
            setError(null);

            const response = await fetch('/api/quiz/save', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ results }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to save results');
            }

            const savedResult = await response.json();
            onSave?.(savedResult);
            toast.success('Results saved successfully! 🎉', {
                duration: 3000,
                position: 'top-center',
                style: {
                    background: '#10B981',
                    color: '#FFFFFF',
                    fontWeight: 500,
                },
                icon: '✅',
            });
        } catch (err) {
            setError(err.message);
            console.error('Error saving results:', err);
            toast.error(err.message || 'Failed to save results', {
                duration: 3000,
                position: 'top-center',
            });
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="inline-block">
            <Button
                onClick={handleSave}
                disabled={isSaving}
                className="min-w-[140px]"
                variant="primary"
            >
                {isSaving ? 'Saving...' : 'Save Results'}
            </Button>
            {error && (
                <p className="text-red-500 text-sm mt-2" role="alert">
                    {error}
                </p>
            )}
        </div>
    );
}
