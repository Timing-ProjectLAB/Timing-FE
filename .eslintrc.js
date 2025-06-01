module.exports = {
  root: true,
  extends: [
    'airbnb',
    'airbnb-typescript',
    'eslint:recommended',
    '@react-native',
    'prettier',
  ],
  plugins: [
    '@react-native',
    '@typescript-eslint',
    '@typescript-eslint/eslint-plugin',
    'jsx-a11y',
    'import',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['./tsconfig.json'],
  },
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/require-default-props': 'off',
    '@typescript-eslint/naming-convention': 'off',
    'react-hooks/exhaustive-deps': 'off',
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
  },
};