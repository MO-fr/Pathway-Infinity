// Auth Form component
'use client';

import { motion } from 'framer-motion';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Button from '../../components/Button';

export function AuthForm({ mode = 'login' }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    ...(mode === 'signup' && { name: '' }),
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Validation
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
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
        const res = await fetch('/api/auth/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error || 'Failed to sign up');
        }

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
        className="space-y-6 bg-slate-50/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-mint-100"
      >
        {mode === 'signup' && (
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-sky-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              autoComplete="name"
              value={formData.name || ''}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-mint-500 focus:outline-none focus:ring-1 focus:ring-mint-500"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name}</p>
            )}
          </div>
        )}

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-sky-700">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-mint-500 focus:outline-none focus:ring-1 focus:ring-mint-500"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email}</p>
          )}
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-sky-700">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
            value={formData.password}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-mint-500 focus:outline-none focus:ring-1 focus:ring-mint-500"
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-600">{errors.password}</p>
          )}
        </div>

        {errors.auth && (
          <div className="rounded-md bg-red-50 p-4">
            <p className="text-sm text-red-600">{errors.auth}</p>
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
