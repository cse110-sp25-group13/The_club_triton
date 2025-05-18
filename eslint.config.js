import js from '@eslint/js';
import globals from 'globals';
import markdown from '@eslint/markdown';
import css from '@eslint/css';
import jsdoc from 'eslint-plugin-jsdoc';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  {
    ignores: ['assets/scripts/js-confetti.browser.js', 'docs/'],
  },
  {
    files: ['**/*.{js,mjs,cjs}'],
    plugins: { js, jsdoc },
    extends: ['js/recommended'],
    rules: {
      'no-undef': ['warn'],
      'no-unused-vars': ['warn'],
      semi: ['error', 'always'],
      'space-infix-ops': ['error', { int32Hint: false }],
      'jsdoc/require-description': 'warn',
      'jsdoc/require-param': 'error',
      'jsdoc/require-param-type': 'error',
      'jsdoc/require-returns': 'error',
      'jsdoc/require-returns-type': 'error',
    },
  },
  {
    files: ['**/*.{js,mjs,cjs}'],
    languageOptions: { globals: globals.browser },
  },
  {
    files: ['**/__tests__/**/*.{js,mjs,cjs}', '**/*.test.{js,mjs,cjs}'],
    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },
  },
  {
    files: ['**/*.css'],
    plugins: { css },
    language: 'css/css',
    extends: ['css/recommended'],
  },
]);
