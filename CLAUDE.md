# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Horizon UI — 简约现代企业级 Vue 3 组件库。基于 Tailwind CSS v4 (OKLCH) + VitePress 文档站点。完全 TypeScript strict 模式。

## Dev Commands

```bash
npm run dev          # 启动 VitePress 文档开发服务器 (默认 :5173)
npm run build        # VitePress 生产构建
npm run preview      # 预览生产构建
npm run typecheck    # TypeScript 类型检查 (vue-tsc --noEmit)
npm run lint         # ESLint 检查
npm run lint:fix     # ESLint 自动修复
npm run format       # Prettier 格式化
npm run format:check # Prettier 格式检查 (CI)
```

## Architecture

```
docs/                          # VitePress 文档站点
├── .vitepress/
│   ├── config.ts              # 站点配置（nav, sidebar, @ alias, tailwindcss plugin）
│   └── theme/
│       ├── index.ts           # 自定义主题：注册全局组件，引入 horizon.css + vitepress.css
│       ├── vitepress.css      # VitePress 适配样式（.h-btn revert-layer, 折叠代码块美化）
│       └── components/
│           └── IconGrid.vue   # 图标展示网格（搜索 + 点击复制）
├── index.md                   # 首页
├── guide/
│   ├── colors.md              # 色彩系统文档
│   └── typography.md          # 字体系统文档
└── components/
    ├── button.md              # Button 组件文档
    ├── icon.md                # Icon 组件文档
    └── radio.md               # Radio 组件文档

src/
├── components/
│   ├── index.ts               # 组件库入口（export Button, Icon, Radio, RadioGroup）
│   ├── Button/
│   │   └── Button.vue         # 按钮组件（5 variants, 3 sizes, loading/round/icon）
│   ├── Icon/
│   │   ├── Icon.vue           # SVG 图标组件（import.meta.glob 自动发现）
│   │   └── icons/             # 47 个 SVG 图标（currentColor）
│   └── Radio/
│       ├── Radio.vue          # 单选项（default/button 双模式）
│       └── RadioGroup.vue     # 容器组件（provide/inject, button 类型滑动指示器）
├── utils/
│   ├── cn.ts                  # cn() = twMerge(clsx(inputs))，无需自定义色注册
│   └── index.ts               # barrel export
├── styles/
│   └── horizon.css            # Tailwind v4 入口 + @theme 语义令牌 + @layer base
└── shims-vue.d.ts             # Vue/Vite 模块声明

.eslintrc 无（使用 eslint.config.js flat config）
prettier.config.js             # Prettier 配置（semi: false, singleQuote: true, trailingComma: all）
.vscode/settings.json          # formatOnSave + ESLint auto-fix
```

## Design System

样式入口 `src/styles/horizon.css`，使用 Tailwind CSS v4 CSS-first 配置：

- **`@import "tailwindcss"`** — Tailwind v4 入口
- **`@source "../../src"`** — 告诉 Tailwind 扫描 src/ 目录的 class 用法
- **`@theme { }`** — 定义语义化设计令牌（CSS 变量），引向 Tailwind 原生 OKLCH 颜色
- **`:root { }`** — 重复 @theme 变量作为 VitePress 构建时的 fallback

### 语义色令牌（→ OKLCH 原生色）

| 语义色 | 映射 |
|--------|------|
| `primary` | `blue-600/700/800/100` |
| `danger` | `red-500/600/700/100` |
| `success` | `emerald-500/600/700/100` |
| `warning` | `amber-500/600/700/100` |
| `info` | `sky-500/600/700/100` |
| `neutral` | `slate-50/100/200/400/600/800` |

语义色用于组件样式：`bg-primary`, `text-neutral-heading`, `border-neutral-border` 等。

## Component Specs

所有交互组件统一使用 sm/md/lg 三档尺寸，**md 为默认尺寸**。尺寸参照 TDesign 规格。

### cn() 工具 (`src/utils/cn.ts`)

```ts
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
export function cn(...inputs: ClassValue[]): string { return twMerge(clsx(inputs)) }
```

- tailwind-merge v3 自动识别 @theme 自定义语义色，无需 `extendTailwindMerge` 注册
- `cn()` 接受 `string | boolean | null | undefined`，过滤假值，去重冲突 class

### Button (`src/components/Button/Button.vue`)

```typescript
type ButtonType = 'primary' | 'outline' | 'danger' | 'ghost' | 'link'
type ButtonSize = 'sm' | 'md' | 'lg'
```

Props: `type`, `size`, `disabled`, `loading`, `round`, `prefixIcon`, `suffixIcon`, `name`, `value`, `autofocus`
Events: `click` (disabled/loading 时不触发)

- 五种变体，除 outline 外均为 Fill 填充式
- 尺寸：sm=24px(h-6), md=32px(h-8), lg=40px(h-10)，padding px-2/px-4/px-4，圆角统一 rounded
- iconSizeMap: sm=14, md=16, lg=18
- icon-only 自动圆形：`isIconOnly` 触发 roundSizeMap（固定 h-*/w-* 保证正圆）
- loading 态使用 `<Icon name="loading">` + CSS spin 动画
- CSS class: `h-btn`（用于 VitePress revert-layer 选择器）

### Icon (`src/components/Icon/Icon.vue`)

```typescript
type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
```

Props: `name`, `size` (IconSize | number), `color`, `ariaLabel`

- SVG 自动发现：`import.meta.glob('./icons/*.svg', { query: '?raw', eager: true })`
- 新图标放入 `icons/` 目录后重启 dev server 即可使用，无需手动注册
- SVG 必须用 `currentColor` 才能响应 `color` prop
- 预设尺寸: xs=14px, sm=16px, md=20px, lg=24px, xl=28px

### Radio (`src/components/Radio/`)

双组件架构，通过 `provide/inject` 共享状态：

**RadioGroup:**

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `modelValue` | `string \| number` | — | v-model |
| `type` | `'default' \| 'button'` | `'default'` | 显示样式 |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | 尺寸（仅 button 类型） |
| `disabled` | `boolean` | `false` | 整组禁用 |
| `direction` | `'horizontal' \| 'vertical'` | `'horizontal'` | 排列方向（default 类型） |

Events: `update:modelValue`, `change`

**Radio:**

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `value` | `string \| number` | **必填** | 该选项值 |
| `label` | `string` | `''` | 标签文本 |
| `disabled` | `boolean` | `false` | 禁用 |
| `prefixIcon` | `string` | `''` | 前缀图标（button 类型） |

- **default 类型**：隐藏 `<input type="radio">` 做 a11y 底层 + 自定义圆圈（固定 16px）+ 内点 scale 动画，无 size prop 影响
- **button 类型**：按钮组，高度对齐 Button（h-6/h-8/h-10），自维护样式不用 Button 组件。无垂直排列支持。键盘 Arrow 键导航。
- button 类型键盘导航：Arrow 键切换并立即选中
- 禁用态：default 圆圈 `bg-neutral-border border-neutral-muted`；button `text-neutral-muted opacity-60`

### Checkbox (`src/components/Checkbox/`)

双组件架构，通过 `provide/inject` 共享状态：

**CheckboxGroup:**

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `modelValue` | `(string \| number)[]` | `[]` | v-model 选中值数组 |
| `type` | `'default' \| 'button'` | `'default'` | 显示样式 |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | 尺寸（仅 button 类型） |
| `disabled` | `boolean` | `false` | 整组禁用 |
| `direction` | `'horizontal' \| 'vertical'` | `'vertical'` | 排列方向（default 类型） |
| `min` | `number` | — | 最少选中项数 |
| `max` | `number` | — | 最多选中项数 |

Events: `update:modelValue`, `change`

**Checkbox:**

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `value` | `string \| number` | — | 在 Group 中的值 |
| `label` | `string` | `''` | 标签文本 |
| `checked` | `boolean` | `false` | 独立使用时的 v-model |
| `disabled` | `boolean` | `false` | 禁用 |
| `indeterminate` | `boolean` | `false` | 半选态（横线） |
| `prefixIcon` | `string` | `''` | 前缀图标（button 类型） |

- **default 类型**：隐藏 `<input type="checkbox">` + 自定义方框（固定 16px / w-4 h-4 / rounded-sm）+ 勾号/横线 SVG
- **button 类型**：同 Radio 按钮组，选中 `bg-primary text-white`，高度对齐 Button
- **独立使用**：无 CheckboxGroup 时用 `v-model:checked`，boolean 值
- **min/max**：达到限制时自动禁用对应项（max 禁用未选中，min 禁用已选中）
- button 类型键盘导航：Arrow 键切换

## Styling Rules

- 组件样式使用 Tailwind utility classes，写在 `<template>` 中
- 组件特定 CSS 写在 `<style scoped>` 中
- 不硬编码颜色/间距值，使用语义 CSS 变量或 Tailwind token
- VitePress 适配样式写在 `docs/.vitepress/theme/vitepress.css`
- **`.h-btn { all: revert-layer; }`** — 所有使用 `<button>` 元素的组件必须加 `h-btn` 类，否则 VitePress 非分层 button reset 覆盖 Tailwind `@layer utilities`
- 文档代码块统一使用 `::: details 查看代码` 可折叠块
- 文档中 `<script setup>` 只能有一个，所有 demo 的 `ref` 写在同一块中

## Known Pitfalls

1. **import.meta.glob 只在 dev server 启动时扫描** — 新增 SVG 图标后需重启 `npm run dev`
2. **VitePress 构建缓存** — 构建失败时尝试删除 `docs/.vitepress/cache` 和 `docs/.vitepress/dist`
3. **@theme 变量在 VitePress 构建时可能不输出** — 需要在 `:root {}` 块中重复定义作为 fallback
4. **node_modules 偶尔损坏** — 构建报错且原因不明时，删除 `node_modules` 重新 `npm install`
5. **`@source` 指令必不可少** — 没有它 Tailwind v4 不会扫描 src/ 目录，组件 class 不会生成 CSS
6. **SVG 必须 currentColor** — 设计工具导出的 SVG 含硬编码 hex 色值，必须替换为 `currentColor`，否则 color prop 无效
7. **`<script setup>` 不能 export** — 需要导出类型/常量时，加一个 `<script lang="ts">` 块（非 setup），示例见 RadioGroup.vue
8. **所有 `<button>` 元素需 `h-btn` 类** — 否则 VitePress base.css 的 `button { padding: 0; border: 0; }` 会覆盖 Tailwind 工具类
9. **tailwind-merge 无需自定义色注册** — v3 按 `bg-*`/`text-*` 前缀归类，自动处理 `@theme` 自定义语义色
