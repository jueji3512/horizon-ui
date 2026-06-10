import { defineConfig, postcssIsolateStyles } from 'vitepress'
import { fileURLToPath, URL } from 'node:url'
import tailwindcss from '@tailwindcss/vite'
import { createDemoContainer } from './plugins/demo'

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
            { text: 'Field 输入域体系', link: '/guide/field-system' },
          ],
        },
      ],
      '/components/': [
        {
          text: '组件',
          items: [
            { text: 'Button 按钮', link: '/components/button' },
            { text: 'Icon 图标', link: '/components/icon' },
            { text: 'Link 链接', link: '/components/link' },
            { text: 'Badge 徽标', link: '/components/badge' },
            { text: 'Checkbox 多选框', link: '/components/checkbox' },
            { text: 'Radio 单选框', link: '/components/radio' },
            { text: 'Text 文本', link: '/components/text' },
            { text: 'Title 标题', link: '/components/title' },
            { text: 'Callout 标注', link: '/components/callout' },
            { text: 'Divider 分割线', link: '/components/divider' },
            { text: 'Tooltip 文字提示', link: '/components/tooltip' },
            { text: 'Popover 弹出层', link: '/components/popover' },
            { text: 'Menu 菜单', link: '/components/menu' },
            { text: 'Switch 开关', link: '/components/switch' },
            { text: 'Input 输入框', link: '/components/input' },
            { text: 'InputNumber 数字输入框', link: '/components/inputnumber' },
            { text: 'Select 选择器', link: '/components/select' },
            { text: 'Form 表单', link: '/components/form' },
            { text: 'DropdownMenu 下拉菜单', link: '/components/dropdown-menu' },
            { text: 'Tag 标签', link: '/components/tag' },
            { text: 'Space 间距', link: '/components/space' },
          ],
        },
        {
          text: '底层组件',
          items: [
            { text: 'Field 输入域', link: '/components/field' },
            { text: 'Popper 弹出定位引擎', link: '/components/popper' },
            { text: 'ScrollArea 滚动区域', link: '/components/scrollarea' },
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

  markdown: {
    theme: {
      light: 'github-light',
      dark: 'github-dark',
    },
    config(md) {
      createDemoContainer(md)
    },
  },

  vite: {
    css: {
      postcss: {
        plugins: [
          postcssIsolateStyles({
            includeFiles: [/base\.css$/, /vp-doc\.css$/],
            prefix: ':not(:where(.vp-raw, .vp-raw *, .shadow-popper, .shadow-popper *))',
          }),
        ],
      },
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('../../src', import.meta.url)),
      },
    },
    plugins: [tailwindcss() as any],
  },
})
