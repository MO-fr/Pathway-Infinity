'use client';

import AnimatedBackground from '@/components/AnimatedBackground';
import { AuthForm } from '@/components/AuthForm';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function SignupPage() {
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
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-blue-600">
            Create Your Account
          </h1>
          <p className="text-blue-700 max-w-md mx-auto">
            Sign up to start discovering trade schools and career paths matched to your skills and interests.
          </p>
        </motion.div>

        <AuthForm mode="signup" />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8 space-y-4 text-center"
        >
          <p className="text-blue-700">
            Already have an account?{' '}
            <Link
              href="/login"
              className="text-mint-600 hover:text-mint-700 hover:underline font-medium"
            >
              Log in here
            </Link>
          </p>

        </motion.div>
      </div>
    </>
  );
}
