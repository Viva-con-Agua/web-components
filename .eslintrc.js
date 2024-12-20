module.exports = {
    root: true,
    env: {
        node: true,
        es2021: true,
        'vue/setup-compiler-macros': true,
    },
    extends: [
        'eslint:recommended',
        '@vue/prettier',
        '@vue/typescript/recommended',
        'plugin:vue/vue3-essential',
        'plugin:storybook/recommended',
        'plugin:markdown/recommended',
        'plugin:storybook/recommended',
        'plugin:storybook/recommended',
    ],
    parserOptions: {
        ecmaVersion: 2020,
    },
    rules: {
        'no-console': 'warn',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
    },
};
