import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import vuePlugin from 'eslint-plugin-vue'
import prettierConfig from 'eslint-config-prettier/flat'
import globals from 'globals'

export default tseslint.config(
  {
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      'docs/.vitepress/cache/**',
      'docs/.vitepress/dist/**',
    ],
  },

  {
    languageOptions: {
      globals: globals.browser,
    },
  },

  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...vuePlugin.configs['flat/essential'],
  ...vuePlugin.configs['flat/strongly-recommended'],
  prettierConfig,

  {
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports', fixStyle: 'inline-type-imports' },
      ],
      'vue/multi-word-component-names': 'off',
      'vue/no-reserved-component-names': 'off',
      'vue/require-default-prop': 'off',
      'vue/no-v-html': 'warn',
      'vue/block-order': ['error', { order: ['template', 'script', 'style'] }],
    },
  },

  {
    files: ['scripts/**/*.mjs'],
    languageOptions: {
      globals: globals.node,
    },
  },

  {
    files: ['**/*.vue'],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser,
      },
    },
  },

  {
    files: ['**/*.d.ts', 'docs/.vitepress/config.ts'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
    },
  },
)
