module.exports = {
    extends: ['airbnb-base'],
    rules: {
        'no-param-reassign': ['error', { props: false }],
        'no-use-before-define': ['error', { functions: false, classes: false }],
        'arrow-body-style': 0,
        radix: ['error', 'as-needed'],
        'jest/no-disabled-tests': 'warn',
        'jest/no-focused-tests': 'error',
        'jest/no-identical-title': 'error',
        'jest/prefer-to-have-length': 'warn',
        'jest/valid-expect': 'error',
        'linebreak-style': 0,
        'implicit-arrow-linebreak': 0,
        'arrow-parens': 0,
        'comma-dangle': 0,
        'operator-linebreak': 0,
        'object-curly-newline': 0,
        parserOptions: {
            ecmaVersion: 2017,
        },
        'function-paren-newline': 0,
        'space-before-function-paren': 0,
        quotes: 0,
        'func-names': 0,
        'no-console': 0,
    },
    overrides: [
        {
            files: ['index.js'],
            rules: {
                'global-require': 'off',
            },
        },
    ],
    plugins: ['jest'],
};
