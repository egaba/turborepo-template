# ESLint Flat Config & Prettier

Composable ESLint config package and Prettier patterns.

## Shared Config Package

```javascript
// packages/eslint-config-custom/eslint.config.js
const js = require('@eslint/js')
const tsPlugin = require('@typescript-eslint/eslint-plugin')
const tsParser = require('@typescript-eslint/parser')
const importPlugin = require('eslint-plugin-import')
const reactPlugin = require('eslint-plugin-react')
const reactHooksPlugin = require('eslint-plugin-react-hooks')
const jestPlugin = require('eslint-plugin-jest')
const nextPlugin = require('@next/eslint-plugin-next')
const eslintConfigPrettier = require('eslint-config-prettier')

const baseConfig = {
  plugins: { import: importPlugin, react: reactPlugin, 'react-hooks': reactHooksPlugin },
  rules: {
    ...js.configs.recommended.rules,
    'no-unused-vars': ['error', { args: 'none', varsIgnorePattern: '^_' }],
    'prefer-const': 'error',
    'object-shorthand': 'error',
    'import/order': ['error', {
      groups: [['type'], ['external', 'builtin'], ['internal', 'parent', 'sibling', 'index']],
      'newlines-between': 'always',
    }],
  },
}

const typescriptConfig = {
  files: ['**/*.ts', '**/*.tsx'],
  plugins: { '@typescript-eslint': tsPlugin },
  languageOptions: { parser: tsParser },
  rules: {
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['error', { args: 'none', varsIgnorePattern: '^_' }],
  },
}

const jestConfig = {
  files: ['**/*.test.{js,jsx,ts,tsx}', '**/*.spec.{js,jsx,ts,tsx}', '**/mocks/**/*'],
  plugins: { jest: jestPlugin },
  languageOptions: { globals: { ...require('globals').jest } },
}

const nextConfig = {
  plugins: { '@next/next': nextPlugin },
  rules: { ...nextPlugin.configs.recommended.rules, ...nextPlugin.configs['core-web-vitals'].rules },
}

module.exports = {
  base: baseConfig,
  typescript: typescriptConfig,
  jest: jestConfig,
  next: nextConfig,
  recommended: [baseConfig, typescriptConfig, jestConfig, eslintConfigPrettier],
}
```

## App Composition

```javascript
// apps/my-app/eslint.config.js
const { recommended, next } = require('@my-org/eslint-config-custom')

module.exports = [
  ...recommended,
  next,
  { ignores: ['node_modules/', '.next/'] },
]
```

## Prettier Config

```javascript
// .prettierrc.js (root)
module.exports = {
  semi: false,
  singleQuote: true,
  trailingComma: 'all',
  printWidth: 100,
  overrides: [
    { files: '*.json', options: { printWidth: 200 } },
    { files: '*.md', options: { proseWrap: 'always' } },
  ],
}
```
