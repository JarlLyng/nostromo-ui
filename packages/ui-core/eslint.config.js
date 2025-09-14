// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import js from '@eslint/js';
import typescript from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';

export default [js.configs.recommended, {
  files: ['**/*.{ts,tsx}'],
  languageOptions: {
    parser: typescriptParser,
    parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      ecmaFeatures: {
        jsx: true,
      },
    },
    globals: {
      document: 'readonly',
      window: 'readonly',
      console: 'readonly',
      HTMLDivElement: 'readonly',
      HTMLButtonElement: 'readonly',
      HTMLInputElement: 'readonly',
      HTMLImageElement: 'readonly',
      HTMLHeadingElement: 'readonly',
      HTMLParagraphElement: 'readonly',
      KeyboardEvent: 'readonly',
    },
  },
  plugins: {
    '@typescript-eslint': typescript,
    'react': react,
    'react-hooks': reactHooks,
  },
  rules: {
    ...typescript.configs.recommended.rules,
    ...react.configs.recommended.rules,
    ...reactHooks.configs.recommended.rules,
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-empty-object-type': 'off',
    'no-undef': 'off', // TypeScript handles this
    'react-hooks/rules-of-hooks': 'off', // Disable for Storybook stories
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
}, {
  files: ['**/*.stories.{ts,tsx}'],
  rules: {
    'react-hooks/rules-of-hooks': 'off',
  },
}, {
  ignores: ['dist/**', 'node_modules/**', 'storybook-static/**'],
}, ...storybook.configs["flat/recommended"]];
