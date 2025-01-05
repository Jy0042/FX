import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'

export default [
  {
    ignores: ['dist'],
  },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2021,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 12,
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
  },
      },
    },
    settings: {
      react: { version: '18.3' },
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      prettier: 'prettier',
    },
    extends: [
      'eslint:recommended',
      'plugin:react/recommended',
      'prettier',
    ],
    env: {
      browser: true,
      es2021: true,
      node: true,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,
      'react/jsx-no-target-blank': 'off',
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'no-undef': 'error',
      'no-unused-vars': 'warn',
      'no-var': 'warn',
      'prefer-const': 'warn',
      'consistent-return': 'warn',
      'prefer-arrow-callback': 'warn',
      'no-empty-function': 'warn',
      'prefer-template': 'warn',
      'no-console': 'off',
      'no-magic-numbers': 'off',
      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',
      'prettier/prettier': 'warn',
    },
  },
]
