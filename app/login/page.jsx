// Login page
'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import AnimatedBackground from '../components/AnimatedBackground';
import { AuthForm } from '../components/AuthForm';


export default function LoginPage() {
  return (
    <>
      <AnimatedBackground />
      <div className="min-h-screen flex flex-col items-center justify-center px-4 py-16 relative">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Welcome Back
          </h1>
          <p className="text-sky-700 max-w-md mx-auto">
            Log in to track your career exploration progress and save your favorite pathways.
          </p>
        </motion.div>

        <AuthForm mode="login" />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8 text-sky-700"
        >
          Don&apos;t have an account?{' '}
          <Link
            href="/signup"
            className="text-mint-600 hover:text-mint-700 hover:underline font-medium"
          >
            Sign up here
          </Link>
        </motion.p>
      </div>
    </>
  );
}
