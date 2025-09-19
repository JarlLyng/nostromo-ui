import js from '@eslint/js';
import typescript from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';

export default [js.configs.recommended, {
  files: ['**/*.{ts,tsx}'],
  languageOptions: {
    parser: typescriptParser,
    parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    globals: {
      document: 'readonly',
      window: 'readonly',
      console: 'readonly',
    },
  },
  plugins: {
    '@typescript-eslint': typescript,
  },
  rules: {
    ...typescript.configs.recommended.rules,
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-empty-object-type': 'off',
    'no-undef': 'off', // TypeScript handles this
  },
}, {
  ignores: ['dist/**', 'node_modules/**'],
}];
