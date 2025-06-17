import js from '@eslint/js';
import nextJs from '@next/eslint-plugin-next';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import reactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  {
    ignores: ['.next/**/*', 'out/**/*', 'dist/**/*', 'build/**/*'],
  },
  js.configs.recommended,
  {
    files: ['**/*.{js,jsx,mjs,cjs,ts,tsx}'],
    plugins: {
      '@next/next': nextJs,
      'jsx-a11y': jsxA11y,
      'react-hooks': reactHooks,
    },
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module', globals: {
        ...globals.node,
        ...globals.browser,
        ...globals.es2021,
        React: true,
        JSX: true,
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {      // Common rules
      'no-unused-vars': 'off', // Temporarily disabled for development
      'no-console': 'off', // Allow console usage in development
      'no-undef': 'error',

      // Next.js specific rules
      '@next/next/no-html-link-for-pages': 'error',
      '@next/next/no-img-element': 'warn',

      // JSX specific rules
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off', 'jsx-a11y/alt-text': 'warn',
      'jsx-a11y/aria-props': 'warn',

      // React Hooks rules
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
    },
  },
];
