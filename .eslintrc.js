/**
 * ESLint configuration for Pathway Infinity
 * 
 * This is the legacy configuration file which is maintained for compatibility.
 * The main ESLint configuration is in eslint.config.js (flat config format)
 * which is the recommended approach for Next.js 15 projects.
 */

module.exports = {
    root: true,
    extends: ['next/core-web-vitals'],
    env: {
        browser: true,
        node: true,
        es6: true,
    },
    globals: {
        process: true,
        React: true,
    },
    rules: {
        'no-unused-vars': 'warn',
        'no-console': ['warn', { allow: ['warn', 'error'] }],
        'react/prop-types': 'off',
        'react/react-in-jsx-scope': 'off',
        'jsx-a11y/alt-text': 'warn',
        'jsx-a11y/aria-props': 'warn',
        'import/no-unresolved': 'off',
        'react/no-unescaped-entities': 'off',
        'no-undef': 'error',
    },
};
