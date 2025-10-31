// Auth Form component
'use client';

import { motion } from 'framer-motion';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Button from './Button';
export function AuthForm({ mode = 'login' }) {

  const router = useRouter();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    ...(mode === 'signup' && { name: '' }),
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {

    e.preventDefault();
    setIsLoading(true);

    // Validation
    const newErrors = {};

    if (!formData.email) {

      newErrors.email = 'Email is required';
    }
    else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {

      newErrors.password = 'Password is required';
    }
    else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (mode === 'signup' && !formData.name) {
      newErrors.name = 'Name is required';
    }

    if (Object.keys(newErrors).length > 0) {

      setErrors(newErrors);
      setIsLoading(false);

      return;

    }

    try {

      if (mode === 'signup') {

        // Import the authApi from lib/api
        const { authApi } = await import('../lib/api');

        await authApi.signup(formData);
        // Axios errors will be caught in the catch block

        // Automatically sign in after successful signup
        const signInResult = await signIn('credentials', {
          redirect: false,
          email: formData.email,
          password: formData.password,
        });

        if (signInResult?.error) {
          throw new Error(signInResult.error);
        }

        router.push('/dashboard');

      } else {

        // Login mode
        const result = await signIn('credentials', {
          redirect: false,
          email: formData.email,
          password: formData.password,
        });

        if (result?.error) {

          setErrors({ auth: 'Invalid credentials' });

        } else {

          router.push('/dashboard');
        }
      }

    } catch (error) {

      console.error('Auth error:', error);
      setErrors({ auth: error.message });

    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <motion.form
        key={mode} // Add key prop to ensure proper re-rendering
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        onSubmit={handleSubmit}
        className="space-y-6 bg-slate-50/80 dark:bg-slate-800/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-mint-100 dark:border-slate-700"
      >
        {mode === 'signup' && (
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-sky-700 dark:text-sky-400">
              Name
            </label>            <input
              type="text"
              name="name"
              id="name"
              autoComplete="name"
              value={formData.name || ''}
              onChange={handleChange}
              suppressHydrationWarning
              className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 dark:bg-slate-700 dark:text-white px-3 py-2 shadow-sm focus:border-mint-500 focus:outline-none focus:ring-1 focus:ring-mint-500"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name}</p>
            )}
          </div>
        )}

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-sky-700 dark:text-sky-400">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
            suppressHydrationWarning
            className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 dark:bg-slate-700 dark:text-white px-3 py-2 shadow-sm focus:border-mint-500 focus:outline-none focus:ring-1 focus:ring-mint-500"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email}</p>
          )}
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-sky-700 dark:text-sky-400">
            Password
          </label>
          <div className="relative mt-1">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              suppressHydrationWarning
              autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
              value={formData.password}
              onChange={handleChange}
              className="block w-full rounded-md border border-gray-300 dark:border-gray-600 dark:bg-slate-700 dark:text-white px-3 py-2 pr-10 shadow-sm focus:border-mint-500 focus:outline-none focus:ring-1 focus:ring-mint-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 flex items-center pr-3"
            >
              {showPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-500 hover:text-mint-600">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-500 hover:text-mint-600">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              )}
            </button>
          </div>
          {errors.password && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.password}</p>
          )}
        </div>

        {errors.auth && (
          <div className="rounded-md bg-red-50 dark:bg-red-900/30 p-4">
            <p className="text-sm text-red-600 dark:text-red-400">{errors.auth}</p>
          </div>
        )}

        <Button
          type="submit"
          variant="primary"
          className="w-full"
          disabled={isLoading}
        >
          {isLoading ? 'Please wait...' : mode === 'signup' ? 'Sign up' : 'Log in'}
        </Button>
      </motion.form>
    </div>
  );
}
