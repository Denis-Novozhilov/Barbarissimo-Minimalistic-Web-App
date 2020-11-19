module.exports = {
    env: {
        browser: true,
        es2021: true
    },
    extends: [
        `standard`
    ],
    parserOptions: {
        ecmaVersion: 12,
        sourceType: `module`
    },
    rules: {
        semi: [1, `always`],
        // eslint eol-last: ['error', 'always'],
        'eol-last': 0,
        indent: [`error`, 4],
        quotes: [`error`, `backtick`]
    }
};