import { defineConfig } from 'vitepress'
import { fileURLToPath, URL } from 'node:url'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  title: 'Horizon UI',
  description: '简约现代企业级 Vue 3 组件库',
  lang: 'zh-CN',

  themeConfig: {
    nav: [
      { text: '指南', link: '/guide/colors' },
      { text: '组件', link: '/components/button' },
    ],

    sidebar: {
      '/guide/': [
        {
          text: '设计指南',
          items: [
            { text: '色彩系统', link: '/guide/colors' },
            { text: '字体系统', link: '/guide/typography' },
          ],
        },
      ],
      '/components/': [
        {
          text: '组件',
          items: [
            { text: 'Button 按钮', link: '/components/button' },
            { text: 'Icon 图标', link: '/components/icon' },
            { text: 'Checkbox 多选框', link: '/components/checkbox' },
            { text: 'Radio 单选框', link: '/components/radio' },
            { text: 'Text 文本', link: '/components/text' },
            { text: 'Title 标题', link: '/components/title' },
            { text: 'Callout 标注', link: '/components/callout' },
            { text: 'Tooltip 文字提示', link: '/components/tooltip' },
          ],
        },
      ],
    },

    socialLinks: [{ icon: 'github', link: 'https://github.com' }],

    search: {
      provider: 'local',
    },

    footer: {
      message: 'Horizon UI Design System · Version 1.0.0',
    },
  },

  vite: {
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('../../src', import.meta.url)),
      },
    },
    plugins: [tailwindcss() as any],
  },
})
