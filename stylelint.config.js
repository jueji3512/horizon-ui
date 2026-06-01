export default {
  extends: ['stylelint-config-standard-vue'],
  ignoreFiles: [
    'node_modules/**',
    'dist/**',
    'docs/.vitepress/cache/**',
    'docs/.vitepress/dist/**',
  ],
  rules: {
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: [
          'apply',
          'config',
          'custom-variant',
          'layer',
          'plugin',
          'reference',
          'source',
          'theme',
          'utility',
          'variant',
        ],
      },
    ],
    'property-no-vendor-prefix': [
      true,
      {
        ignoreProperties: ['-moz-appearance', '-webkit-appearance', '-webkit-text-fill-color'],
      },
    ],
  },
}
