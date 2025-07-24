/**
 * Authentication utilities for Pathway Infinity
 * Handles user authentication, token management, and password security
 */

import { compare, hash } from 'bcryptjs';
import { sign, verify } from 'jsonwebtoken';
import { cookies } from 'next/headers';

// Hash password before storing
export async function hashPassword(password) {
  return await hash(password, 12);
}

// Verify password during login
export async function verifyPassword(password, hashedPassword) {
  return await compare(password, hashedPassword);
}

// Generate JWT token for authenticated sessions
export function createAuthToken(userId) {
  return sign(
    { userId },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
}

// Verify JWT token from requests
export function verifyAuthToken(token) {
  try {
    return verify(token, process.env.JWT_SECRET);
  } catch {
    return null;
  }
}

// Get auth token from cookies
export function getAuthToken() {
  const cookieStore = cookies();
  return cookieStore.get('auth-token')?.value ?? null;
}

// Set auth token in cookies
export function setAuthToken(token) {
  const cookieStore = cookies();
  cookieStore.set('auth-token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 // 7 days
  });
}
