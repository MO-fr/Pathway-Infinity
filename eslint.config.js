// @ts-check

import js from '@eslint/js';
import nextJs from '@next/eslint-plugin-next';

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
    js.configs.recommended,
    {
        files: ['**/*.{js,jsx,mjs,cjs,ts,tsx}'],
        plugins: {
            '@next/next': nextJs,
        },
        languageOptions: {
            ecmaVersion: 2022,
            sourceType: 'module',
            globals: {
                // Node.js globals
                process: 'readonly',
                module: 'readonly',
                require: 'readonly',
                __dirname: 'readonly',
                __filename: 'readonly',
                console: 'readonly',
                global: 'readonly',
                Buffer: 'readonly',
                URL: 'readonly',

                // Browser globals
                window: 'readonly',
                document: 'readonly',
                navigator: 'readonly',
                localStorage: 'readonly',
                sessionStorage: 'readonly',

                // React globals
                React: 'readonly',
                JSX: 'readonly',
            },
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
            },
        },
        rules: {
            // Common rules
            'no-unused-vars': 'warn',
            'no-console': ['warn', { allow: ['warn', 'error'] }],
            'no-undef': 'error',

            // Next.js specific rules
            '@next/next/no-html-link-for-pages': 'error',
            '@next/next/no-img-element': 'warn',

            // JSX specific rules
            'react/prop-types': 'off',
            'react/react-in-jsx-scope': 'off',
            'jsx-a11y/alt-text': 'warn',
            'jsx-a11y/aria-props': 'warn',
        },
        settings: {
            react: {
                version: 'detect',
            },
        },
    },
];
