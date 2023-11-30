module.exports = {
  env: {
    browser: true,
    es2021: true,
    'react-native/react-native': true,
  },
  extends: ['plugin:react/recommended', 'airbnb', 'prettier'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', 'react-native', 'eslint-plugin-tsdoc', 'prettier'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      extends: ['plugin:react/recommended', 'airbnb', 'prettier'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: ['./tsconfig.json'],
      },
      plugins: ['react', 'react-native', '@typescript-eslint', 'eslint-plugin-tsdoc', 'prettier'],

      files: ['*.js', '*.jsx', '*.ts', '*.tsx'],
      rules: {
        'tsdoc/syntax': 'warn',
        'no-use-before-define': ['error', { functions: true, classes: true, variables: false }],
        'react/jsx-props-no-spreading': 'off',
        'react/react-in-jsx-scope': 'off',
        'react/jsx-uses-react': 'off',
        'linebreak-style': ['error', 'unix'],
        'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx', 'ts', 'tsx'] }],
        // 'react/function-component-definiton': [
        //   2,
        //   { namedComponents: 'arrow-function', unnamedComponents: 'arrow-function' },
        // ],
        'import/extensions': [
          'error',
          'ignorePackages',
          {
            js: 'never',
            jsx: 'never',
            ts: 'never',
            tsx: 'never',
          },
        ],
        'prettier/prettier': [
          'error',
          {
            endOfLine: 'lf',
          },
        ],
      },
    },
  ],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.native.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  ignorePatterns: ['node_modules/*'],
};
