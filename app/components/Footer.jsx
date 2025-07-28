'use client';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-slate-50 border-t border-mint-100">
            <div className="container mx-auto px-4 md:px-6 py-12">
                <div className="flex flex-col items-center text-center">
                    <h3 className="text-xl font-bold text-mint-600 mb-4">Pathway Infinity</h3>
                    <p className="text-sky-700 mb-4 max-w-md">Guiding students to discover their ideal career paths through personalized assessments.</p>
                    <div className="mb-6" />
                    <div className="border-t border-mint-100 w-full pt-8 flex flex-col md:flex-row justify-between items-center">
                        <p className="text-sky-600 text-sm">© {currentYear} Pathway Infinity. All rights reserved.</p>
                        <p className="text-sky-600 text-sm mt-4 md:mt-0">Helping students find their path since 2025</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
