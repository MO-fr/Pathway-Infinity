'use client';

/**
 * Theme Context Provider
 * 
 * Manages dark/light mode state across the application.
 * Persists user preference in localStorage and applies the theme to the document.
 */

import { usePathname } from 'next/navigation';
import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [mounted, setMounted] = useState(false);
    const pathname = usePathname();

    // Check if we're on a page that should support dark mode
    const isDarkModeAllowed = pathname?.startsWith('/dashboard') ||
        pathname?.startsWith('/saved') ||
        pathname?.startsWith('/questionnaire') ||
        pathname?.startsWith('/results');

    // Load theme preference from localStorage on mount
    useEffect(() => {
        setMounted(true);
        const savedTheme = localStorage.getItem('theme');

        // Only apply dark mode if we're on an allowed page and user has it saved
        if (savedTheme === 'dark' && isDarkModeAllowed) {
            setIsDarkMode(true);
            document.documentElement.classList.add('dark');
        } else {
            setIsDarkMode(false);
            document.documentElement.classList.remove('dark');
        }
    }, [isDarkModeAllowed]);

    // Force light mode when navigating to public pages
    useEffect(() => {
        if (!mounted) return;

        if (!isDarkModeAllowed) {
            setIsDarkMode(false);
            document.documentElement.classList.remove('dark');
        } else {
            // When navigating to dark mode allowed pages, restore saved preference
            const savedTheme = localStorage.getItem('theme');
            if (savedTheme === 'dark') {
                setIsDarkMode(true);
                document.documentElement.classList.add('dark');
            }
        }
    }, [pathname, isDarkModeAllowed, mounted]);

    // Update theme when isDarkMode changes
    useEffect(() => {
        if (!mounted) return;

        if (isDarkMode && isDarkModeAllowed) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [isDarkMode, mounted, isDarkModeAllowed]);

    const toggleTheme = () => {
        if (isDarkModeAllowed) {
            setIsDarkMode(prev => !prev);
        }
    };

    const setLightMode = () => {
        setIsDarkMode(false);
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
    };

    // Prevent flash of unstyled content
    if (!mounted) {
        return null;
    }

    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleTheme, setLightMode }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}
