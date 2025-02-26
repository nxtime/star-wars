import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import importPlugin from 'eslint-plugin-import';
import prettierRecommended from 'eslint-config-prettier';

// Create our shared settings object
const commonSettings = {
  'import/resolver': {
    typescript: {
      alwaysTryTypes: true,
      project: './tsconfig.json',
      // Add cache to improve performance
      cache: true
    },
    // Limit extensions to what you actually use
    node: {
      extensions: ['.js', '.jsx', '.ts', '.tsx']
    }
  },
  // Add this to optimize performance
  'import/cache': {
    lifetime: 300, // 5 minutes cache
  }
};

export default tseslint.config(
  // Base configs
  js.configs.recommended,
  ...tseslint.configs.recommended,

  // Core ESLint config
  {
    ignores: ['dist/', 'build/', 'node_modules/', '**/*.d.ts', '**/*.module.scss.d.ts'],
    languageOptions: {
      ecmaVersion: 2023,
      sourceType: 'module',
      globals: {
        document: 'readonly',
        navigator: 'readonly',
        window: 'readonly',
        console: 'readonly',
        module: 'readonly',
        process: 'readonly',
      },
      // Use projectService instead of project for better handling of TypeScript projects
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        projectService: true, // Use this instead of project to fix the reference issue
        // project: './tsconfig.json', // Remove this line
      },
    },
    settings: commonSettings,
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
  },

  // TypeScript files config
  {
    files: ['**/*.ts', '**/*.tsx'],
    plugins: {
      '@typescript-eslint': tseslint.plugin,
    },
    rules: {
      // Airbnb-inspired TypeScript rules
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-non-null-assertion': 'warn',
      'no-undef': 'off', // TypeScript already checks this
    },
  },

  // React files config
  {
    files: ['**/*.jsx', '**/*.tsx'],
    plugins: {
      'react': reactPlugin,
      'react-hooks': reactHooksPlugin,
      'jsx-a11y': jsxA11yPlugin,
    },
    rules: {
      // Airbnb-inspired React rules
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react/jsx-props-no-spreading': 'off',
      'react/require-default-props': 'off',
      'react/function-component-definition': [
        'error',
        {
          namedComponents: 'arrow-function',
          unnamedComponents: 'arrow-function',
        },
      ],
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'jsx-a11y/anchor-is-valid': 'warn',
      'jsx-a11y/click-events-have-key-events': 'warn',
      'jsx-a11y/no-static-element-interactions': 'warn',
    },
  },

  // JavaScript/TypeScript shared rules
  {
    files: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx'],
    plugins: {
      'import': importPlugin,
    },
    rules: {
      // Spacing for readability
      'padding-line-between-statements': [
        'error',
        { blankLine: 'always', prev: 'function', next: '*' },
        { blankLine: 'always', prev: '*', next: 'function' },
        { blankLine: 'always', prev: 'import', next: '*' },
        { blankLine: 'any', prev: 'import', next: 'import' },
      ],

      // Airbnb-inspired rules
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'prefer-const': 'error',
      'no-var': 'error',
      'no-param-reassign': 'error',
      'no-unused-expressions': 'error',
      'camelcase': ['error', { properties: 'never' }],
      'spaced-comment': ['error', 'always'],
      'eqeqeq': ['error', 'always'],

      // Import plugin rules
      'import/prefer-default-export': 'off',
      'import/extensions': [
        'off'
        // 'error',
        // 'ignorePackages',
        // {
        //   js: 'never',
        //   jsx: 'never',
        //   ts: 'never',
        //   tsx: 'never',
        // },
      ],
      // 'import/order': [
      //   'error',
      //   {
      //     groups: [
      //       ['builtin', 'external'],
      //       'internal',
      //       ['parent', 'sibling', 'index'],
      //     ],
      //     'newlines-between': 'always',
      //   },
      // ],
      // 'import/no-extraneous-dependencies': [
      //   'error',
      //   {
      //     devDependencies: [
      //       '**/*.test.{ts,tsx}',
      //       '**/*.spec.{ts,tsx}',
      //       './vite.config.ts',
      //       './vitest.config.ts',
      //       './jest.config.js',
      //       './src/setupTests.ts',
      //     ],
      //   },
      // ],
    },
  },

  // Config files
  {
    files: ['vite.config.ts', 'vitest.config.ts', '*.config.js'],
    rules: {
      'import/no-extraneous-dependencies': 'off',
    },
  },

  // Prettier config
  prettierRecommended
);
