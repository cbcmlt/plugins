// ESLint Flat-Config für den Tisch-Konfigurator.
// Übernimmt die verbindlichen Sicherheitsregeln der MB-Vorgaben (R_XX, OWASP).

import js from '@eslint/js';
import prettier from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default [
  {
    ignores: ['dist', 'node_modules', 'coverage'],
  },
  js.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: import.meta.dirname,
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      import: importPlugin,
    },
    rules: {
      // Sicherheitsrelevant (verbindlich, R_XX):
      'no-eval': 'error',
      'no-new-func': 'error',
      'no-restricted-syntax': [
        'error',
        {
          selector: "AssignmentExpression[left.property.name='innerHTML']",
          message: 'Dynamisches innerHTML ist verboten (XSS-Risiko, R_XX).',
        },
        {
          selector: "AssignmentExpression[left.property.name='outerHTML']",
          message: 'Dynamisches outerHTML ist verboten (XSS-Risiko, R_XX).',
        },
      ],
      'no-console': ['warn', { allow: ['warn', 'error', 'info'] }],
      // Type-Imports:
      '@typescript-eslint/consistent-type-imports': 'warn',
      // Reihenfolge der Imports:
      'import/order': [
        'warn',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          'newlines-between': 'always',
          alphabetize: { order: 'asc' },
        },
      ],
    },
  },
  {
    // Test- und Konfigurationsdateien: kein Typed-Linting nötig.
    files: ['**/*.test.ts', '**/*.test.tsx', '**/__tests__/**', '*.config.{ts,mjs,js}'],
    ...tseslint.configs.disableTypeChecked,
  },
  prettier,
];
