/** @type {import('eslint').Linter.Config} */
export default  {
    extends: ['next/core-web-vitals'],
    parserOptions: {
        babelOptions: {
            presets: [require.resolve('next/babel')],
        },
    },
};
