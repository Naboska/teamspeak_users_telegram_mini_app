import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import importPlugin from 'eslint-plugin-import';
import prettierConfig from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier/recommended';

export default tseslint.config(
  {
    ignores: ['dist'],
  },
  prettierPlugin,
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      ...importPlugin.flatConfigs.recommended.plugins,
    },
    rules: {
      ...prettierConfig.rules,
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],

      'prettier/prettier': [
        'warn',
        {
          printWidth: 120,
          arrowParens: 'avoid',
          trailingComma: 'es5',
          tabWidth: 2,
          singleQuote: true,
        },
      ],

      'no-console': 'warn',
      'no-debugger': 'error',
      'no-nested-ternary': 'error',

      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/no-var-requires': 'off',
      '@typescript-eslint/no-empty-interface': 'off',
      '@typescript-eslint/ban-types': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',

      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      'import/no-named-as-default': 0,
      'import/default': 'off',
      'import/export': 'off',
      'import/order': [
        'warn',
        {
          groups: ['builtin', 'index', 'external', 'internal', 'parent', 'sibling'],
          'newlines-between': 'always',
          pathGroups: [
            {
              pattern: '@/**',
              group: 'external',
              position: 'after',
            },
          ],
        },
      ],
      'sort-imports': [
        'warn',
        {
          ignoreDeclarationSort: true,
        },
      ],
    },
  }
);
