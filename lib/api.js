'use client';

/**
 * API service using Axios for making HTTP requests
 * Provides a consistent interface for all API calls in the application
 */

import axios from 'axios';

// Create a base axios instance with common configuration
const api = axios.create({
    baseURL: '',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add response interceptor for error handling
api.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error('API Error:', error?.response?.data || error.message);
        return Promise.reject(error);
    }
);

/**
 * Auth related API calls
 */
export const authApi = {
    /**
     * Register a new user
     * @param {Object} userData - User registration data
     * @returns {Promise<Object>} Registered user data
     */
    signup: async (userData) => {

        try {

            const { data } = await api.post('/api/auth/signup', userData);
            return data;

        } catch (error) {
            throw new Error(error?.response?.data?.error || 'Failed to sign up');
        }
    },

    /**
     * Login with credentials (handled by NextAuth)
     * @param {Object} credentials - User login credentials
     * @returns {Promise<Object>} Authentication result
     */
    login: async (credentials) => {

        try {
        
            const { data } = await api.post('/api/auth/login', credentials);
            
            return data;
        
        } catch (error) {
            throw new Error(error?.response?.data?.error || 'Failed to log in');
        }
    },
};

/**
 * Quiz related API calls
 */
export const quizApi = {
    /**
     * Analyze quiz answers and get school matches
     * @param {Object} payload - Quiz answers and optional school data
     * @returns {Promise<Object>} Analysis results and matching schools
     */
    analyze: async (payload) => {
        try {
            const { data } = await api.post('/api/quiz/analyze', payload);
            return data;
        } catch (error) {
            throw new Error(error?.response?.data?.error || 'Failed to analyze quiz results');
        }
    },
};

/**
 * Schools related API calls
 */
export const schoolsApi = {
    /**
     * Get all schools from Airtable
     * @returns {Promise<Array>} Array of schools
     */
    getAll: async () => {
        try {
            const { data } = await api.get('/api/schools');
            return data.schools;
        } catch (error) {
            throw new Error(error?.response?.data?.error || 'Failed to fetch schools');
        }
    },    /**
     * Get filtered schools based on quiz answers
     * @param {Object} answers - Quiz answers to filter by
     * @returns {Promise<Array>} Array of matching schools
     */
    getFiltered: async (answers) => {
        try {
            // eslint-disable-next-line no-console
            console.log('Fetching filtered schools with answers:', answers);

            const { data } = await api.post('/api/schools', { answers });

            if (!data || !data.schools) {
                // eslint-disable-next-line no-console
                console.warn('API response missing schools data:', data);
                return [];
            }

            // eslint-disable-next-line no-console
            console.log(`Received ${data.schools.length} schools from API`);

            return data.schools;
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error('Error fetching filtered schools:', error);

            const errorMessage = error?.response?.data?.error ||
                error?.response?.data?.details ||
                error?.message ||
                'Failed to fetch filtered schools';

            throw new Error(errorMessage);
        }
    }
};
