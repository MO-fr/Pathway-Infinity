'use client';

import Button from '@/components/Button.jsx';
import DarkModeToggle from '@/components/DarkModeToggle.jsx';
import { useTheme } from '@/context/ThemeContext';
import { AnimatePresence, motion } from 'framer-motion';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

export default function Navbar() {
  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const { isDarkMode, setLightMode } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);

  // Check if we're on a page that should show dark mode toggle
  const showDarkModeToggle = pathname?.startsWith('/dashboard') ||
    pathname?.startsWith('/saved') ||
    pathname?.startsWith('/questionnaire') ||
    pathname?.startsWith('/results');

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

  const handleSignOut = useCallback(async () => {
    if (isSigningOut) return; // Prevent multiple clicks

    try {
      setIsSigningOut(true);

      // Force light mode before signing out
      document.documentElement.classList.remove('dark');

      // Set theme to light in localStorage before clearing
      localStorage.setItem('theme', 'light');

      // Clear any other local storage items if they exist
      const theme = localStorage.getItem('theme');
      localStorage.clear();
      // Restore light theme setting
      localStorage.setItem('theme', 'light');

      // Sign out using NextAuth
      await signOut({
        callbackUrl: '/login',
        redirect: false
      });

      // Clear any cookies
      document.cookie.split(';').forEach((c) => {
        document.cookie = c
          .replace(/^ +/, '')
          .replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/');
      });

      // Redirect to login page
      router.push('/login');
    } catch (error) {
      console.error('Sign out error:', error);
    } finally {
      setIsSigningOut(false);
      setIsOpen(false); // Close mobile menu if open
    }
  }, [router, isSigningOut]);

  if (!mounted) return null;

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-slate-50/90 dark:bg-slate-900/90 backdrop-blur-md shadow-sm' : 'bg-transparent'
        }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <svg
              viewBox="0 0 800 600"
              className="w-8 h-8 text-mint-600"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="mintGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" style={{ stopColor: 'currentColor', stopOpacity: 0.6 }} />
                  <stop offset="50%" style={{ stopColor: 'currentColor', stopOpacity: 0.8 }} />
                  <stop offset="100%" style={{ stopColor: 'currentColor', stopOpacity: 0.6 }} />
                </linearGradient>
              </defs>

              <path
                d="M400 300 
                   C 350 200, 250 200, 200 250 
                   C 150 300, 150 400, 200 450 
                   C 250 500, 350 400, 400 300
                   C 450 200, 550 200, 600 250
                   C 650 300, 650 400, 600 450
                   C 550 500, 450 400, 400 300Z"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                className="path-animate-1"
              />

              <path
                d="M400 300 
                   C 350 200, 250 200, 200 250 
                   C 150 300, 150 400, 200 450 
                   C 250 500, 350 400, 400 300
                   C 450 200, 550 200, 600 250
                   C 650 300, 650 400, 600 450
                   C 550 500, 450 400, 400 300Z"
                stroke="url(#mintGradient)"
                strokeWidth="4"
                fill="none"
                className="path-animate-2"
                style={{ filter: 'blur(1px)' }}
              />
            </svg>
            <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-mint-600 to-sky-600 bg-clip-text text-transparent">
              Pathway Infinity
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {showDarkModeToggle && <DarkModeToggle />}
            {session ? (
              <>
                {/* User name and navigation when logged in */}
                <span className="text-gray-700 dark:text-gray-300">
                  Welcome, {session.user.name}!

                </span>
                <Button href="/dashboard" variant="text">
                  Dashboard
                </Button>
                <Button
                  onClick={handleSignOut}
                  variant="outline"
                  className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-950"
                  disabled={isSigningOut}
                >
                  {isSigningOut ? 'Signing out...' : 'Sign out'}
                </Button>
              </>
            ) : (
              <>
                {/* Auth buttons when logged out */}
                <Button href="/login" variant="text">
                  Log in
                </Button>
                <Button href="/signup" variant="primary">
                  Sign up
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-2 md:hidden">
            {showDarkModeToggle && <DarkModeToggle />}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label="Toggle menu"
            >
              <svg
                className="h-6 w-6 text-gray-700 dark:text-gray-300"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
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
              className="md:hidden"
            >
              <div className="px-2 pt-2 pb-3 space-y-1 bg-white dark:bg-slate-800 shadow-lg rounded-b-xl border-t border-mint-100 dark:border-mint-900">
                {session ? (
                  <>
                    <Link
                      href="/dashboard"
                      className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-mint-600 dark:hover:text-mint-400 hover:bg-mint-50 dark:hover:bg-mint-950 transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={handleSignOut}
                      disabled={isSigningOut}
                      className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/30 disabled:opacity-50 transition-colors"
                    >
                      {isSigningOut ? 'Signing out...' : 'Sign out'}
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/login"
                      className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-mint-600 hover:bg-mint-50 transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      Log in
                    </Link>
                    <Link
                      href="/signup"
                      className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-mint-600 hover:bg-mint-50 transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      Sign up
                    </Link>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
