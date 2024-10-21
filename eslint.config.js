
import pluginJs from '@eslint/js';
import pluginVue from 'eslint-plugin-vue';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default [
    { files: ['**/*.{js,mjs,cjs,ts,vue}'] },
    { languageOptions: { globals: globals.browser } },
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    ...pluginVue.configs['flat/recommended'],
    {
        rules: {
            'no-empty-function': 'off',
            'no-console': 'warn',
            'vue/html-indent': 'off',
            'vue/no-v-html': 'off',
            'vue/max-attributes-per-line': 'off',
            'vue/attributes-order': 'off',
            'vue/html-self-closing': 'off',
            'vue/singleline-html-element-content-newline': 'off',
            'vue/html-closing-bracket-newline': 'off',
            '@typescript-eslint/no-empty-function': 'warn',
            '@typescript-eslint/explicit-module-boundary-types': 'warn',
            '@typescript-eslint/no-explicit-any': 'warn',
        },
    },
    { files: ['**/*.vue'], languageOptions: { parserOptions: { parser: tseslint.parser } } },
];
