'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import Button from './Button';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (    <header      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-slate-50/90 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center h-16 md:h-20">          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-xl md:text-2xl font-bold text-mint-600">
              Pathway Infinity
            </span>
          </Link>          
          
          {/* Auth Buttons (Desktop) */}
          <div className="hidden md:flex items-center space-x-4">
            <Button href="/login" variant="text">
              Log in
            </Button>
            <Button href="/signup" variant="primary">
              Sign up
            </Button>
          </div>

          {/* Mobile Menu Button */}          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-sky-700 focus:outline-none"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-slate-50 border-t border-mint-100"
          >            <div className="container mx-auto px-4 py-4 space-y-4">
              <Link 
                href="/dashboard" 
                className="block py-2 text-sky-800 hover:text-mint-600"
                onClick={() => setIsOpen(false)}
              >
                Dashboard
              </Link>
              
              <div className="pt-4 border-t border-mint-100 flex flex-col space-y-3">
                <Link 
                  href="/login" 
                  className="py-2 text-center text-sky-800 hover:text-mint-600"
                  onClick={() => setIsOpen(false)}
                >
                  Log in
                </Link>
                <Link 
                  href="/signup" 
                  className="py-2 text-center bg-mint-500 text-white rounded-full hover:bg-mint-600"
                  onClick={() => setIsOpen(false)}
                >
                  Sign up
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
