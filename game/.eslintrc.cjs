/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-essential',
    '@vue/eslint-config-typescript/recommended',
    'plugin:prettier/recommended',
  ],
  env: {
    'vue/setup-compiler-macros': true,
  },
  rules: {
    // enable additional rules
    indent: ['error', 2],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    'no-empty': 'warn',
    'no-cond-assign': ['error', 'always'],
    'vue/multi-word-component-names': 'off',
    'typescript-eslint/no-explicit-any': 'off',
  },
};
