/** @type {import('eslint').Linter.Config} */
module.exports = {
    extends: ['next/core-web-vitals'],
    parserOptions: {
        babelOptions: {
            presets: [require.resolve('next/babel')],
        },
    },
};
