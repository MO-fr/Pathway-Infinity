'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (    <footer className="bg-slate-50 border-t border-mint-100">
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          {/* Logo and description */}
          <div className="col-span-1 md:col-span-1">            <h3 className="text-xl font-bold text-mint-600 mb-4">Pathway Infinity</h3>
            <p className="text-sky-700 mb-4">Guiding students to discover their ideal career paths through personalized assessments.</p>            <div className="flex space-x-4">              <a href="#" className="text-sky-500 hover:text-mint-600">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-sky-500 hover:text-mint-600">
                <span className="sr-only">LinkedIn</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </div>
          </div>
          
          {/* Links */}          <div>
            <h3 className="text-sm font-semibold text-sky-900 tracking-wider uppercase mb-4">Platform</h3>
            <ul className="space-y-2">              <li><Link href="/questionnaire" className="text-sky-700 hover:text-mint-600">Assessment</Link></li>
              <li><Link href="/results" className="text-sky-700 hover:text-mint-600">Results</Link></li>
              <li><Link href="/saved" className="text-sky-700 hover:text-mint-600">Saved Pathways</Link></li>
              <li><Link href="/dashboard" className="text-sky-700 hover:text-mint-600">Dashboard</Link></li>
            </ul>
          </div>
          
          <div>            <h3 className="text-sm font-semibold text-sky-900 tracking-wider uppercase mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-sky-700 hover:text-mint-600">About Us</Link></li>
              <li><Link href="#" className="text-sky-700 hover:text-mint-600">Careers</Link></li>
              <li><Link href="#" className="text-sky-700 hover:text-mint-600">Contact</Link></li>
              <li><Link href="#" className="text-sky-700 hover:text-mint-600">Partners</Link></li>
            </ul>
          </div>
          
          <div>            <h3 className="text-sm font-semibold text-sky-900 tracking-wider uppercase mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-sky-700 hover:text-mint-600">Privacy Policy</Link></li>
              <li><Link href="#" className="text-sky-700 hover:text-mint-600">Terms of Service</Link></li>
              <li><Link href="#" className="text-sky-700 hover:text-mint-600">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>          <div className="border-t border-mint-100 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">          <p className="text-sky-600 text-sm">© {currentYear} Pathway Infinity. All rights reserved.</p>
          <p className="text-sky-600 text-sm mt-4 md:mt-0">Helping students find their path since 2023</p>
        </div>
      </div>
    </footer>
  );
}
