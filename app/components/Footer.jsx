'use client';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-slate-50 dark:bg-slate-900 border-t border-mint-100 dark:border-slate-700">
            <div className="container mx-auto px-4 md:px-6 py-12">
                <div className="flex flex-col items-center text-center">
                    <h3 className="text-xl font-bold text-mint-600 dark:text-mint-400 mb-4">Pathway Infinity</h3>
                    <p className="text-gray-700 dark:text-gray-300 mb-4 max-w-md">Guiding students to discover their ideal career paths through personalized assessments.</p>
                    <div className="mb-6" />
                    <div className="border-t border-mint-100 dark:border-slate-700 w-full pt-8 flex flex-col md:flex-row justify-between items-center">
                        <p className="text-gray-600 dark:text-gray-400 text-sm">© {currentYear} Pathway Infinity. All rights reserved.</p>
                        <p className="text-gray-600 dark:text-gray-400 text-sm mt-4 md:mt-0">Helping students find their path since 2025</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
