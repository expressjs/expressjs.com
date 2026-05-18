import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintAstroPlugin from 'eslint-plugin-astro';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import eslintConfigPrettier from 'eslint-config-prettier';
import globals from 'globals';
import { globalIgnores } from 'eslint/config';

export default [
  // Global ignores
  globalIgnores(['dist/*', '.astro/*', 'node_modules/*', 'package-lock.json']),
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    ignores: ['dist/', '.astro/', 'node_modules/', 'package-lock.json'],
  },

  // Base ESLint recommended rules
  eslint.configs.recommended,

  // TypeScript ESLint recommended rules
  ...tseslint.configs.recommended,

  // Astro files
  ...eslintAstroPlugin.configs.recommended,
  ...eslintAstroPlugin.configs['jsx-a11y-recommended'],

  // JSX Accessibility for non-Astro files
  {
    files: ['**/*.{jsx,tsx}'],
    plugins: {
      'jsx-a11y': jsxA11y,
    },
    rules: jsxA11y.configs.recommended.rules,
  },

  // Prettier - keep as last to override conflicting rules
  eslintConfigPrettier,
];
