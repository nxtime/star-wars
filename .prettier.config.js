/**
 * Prettier configuration
 * @type {import('prettier').Config}
 */
export default {
  // Specify line length
  printWidth: 100,
  tabWidth: 2,
  useTabs: false,
  semi: true,
  singleQuote: true,
  jsxSingleQuote: false,
  trailingComma: 'all',
  bracketSpacing: true,
  bracketSameLine: false,
  arrowParens: 'avoid',
  endOfLine: 'lf',
  overrides: [
    {
      files: ['*.scss', '*.css'],
      options: {
        singleQuote: false,
      },
    },
    {
      files: ['*.module.scss'],
      options: {
        singleQuote: false,
      },
    },
    {
      files: ['*.json', '*.jsonc'],
      options: {
        tabWidth: 2,
        singleQuote: false,
      },
    },
    {
      files: ['*.md'],
      options: {
        proseWrap: 'always',
      },
    },
  ],
};

