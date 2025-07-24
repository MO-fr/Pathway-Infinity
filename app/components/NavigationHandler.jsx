'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';

export default function NavigationHandler({ children }) {
    const pathname = usePathname();
    const isQuizRoute = pathname?.startsWith('/questionnaire') || pathname?.startsWith('/results');

    return (
        <>
            {!isQuizRoute && <Navbar />}
            <main className={`flex-grow relative ${!isQuizRoute ? 'pt-16 md:pt-20' : ''}`}>
                {children}
            </main>
        </>
    );
}