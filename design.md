# Design System · Horizon UI

> 简约现代企业级 Vue 组件库设计系统  
> 基于 Tailwind CSS v4 · 版本 1.0.0

**令牌定义文件**：[src/styles/horizon.css](src/styles/horizon.css) — 所有设计令牌通过 Tailwind v4 `@theme` 指令定义，同时生成工具类和 CSS 自定义属性。

---

## 目录

1. [设计理念与原则](#1-设计理念与原则)
2. [色彩系统](#2-色彩系统)
3. [字体系统](#3-字体系统)
4. [间距与尺寸系统](#4-间距与尺寸系统)
5. [圆角系统](#5-圆角系统)
6. [阴影与层级系统](#6-阴影与层级系统)
7. [动效系统](#7-动效系统)
8. [断点与响应式](#8-断点与响应式)
9. [组件尺寸规范](#9-组件尺寸规范)
10. [图标规范](#10-图标规范)
11. [布局栅格](#11-布局栅格)
12. [Design Tokens 速查表](#12-design-tokens-速查表)

---

## 1. 设计理念与原则

### 1.1 核心理念

**Horizon UI** 遵循「少即是多」的简约现代主义设计哲学。剔除冗余装饰，保留内容本质，让界面如地平线般清晰、开阔、富有秩序感。

### 1.2 设计原则

| 原则 | 说明 |
|---|---|
| **清晰 Clarity** | 信息层级分明，操作意图明确，无歧义 |
| **克制 Restraint** | 色彩、阴影、动效的使用有明确目的，杜绝滥用 |
| **一致 Consistency** | 所有组件遵循同一套 Token，行为可预测 |
| **高效 Efficiency** | 企业级场景优先——批量操作、键盘导航、数据密集展示 |
| **包容 Inclusive** | WCAG 2.1 AA 级对比度标准，支持键盘与屏幕阅读器 |

### 1.3 设计语言关键词

`简约` `秩序` `通透` `精准` `克制` `专业`

---

## 2. 色彩系统

> 色彩令牌基于 Tailwind CSS 色阶，命名采用 `{color}-{scale}` 格式。

### 2.1 主色 · Primary

选取 **Blue** 系列作为品牌主色，传递专业、可靠、沉稳的品牌气质。

| Token | Tailwind 对应 | HEX | 用途 |
|---|---|---|---|
| `--color-primary-50` | blue-50 | `#eff6ff` | 浅色背景、信息提示背景 |
| `--color-primary-100` | blue-100 | `#dbeafe` | 选中态背景、标签背景 |
| `--color-primary-200` | blue-200 | `#bfdbfe` | 边框强调、进度条底色 |
| `--color-primary-300` | blue-300 | `#93c5fd` | 次要装饰色 |
| `--color-primary-400` | blue-400 | `#60a5fa` | 聚焦环、辅助高亮 |
| **`--color-primary-500`** | **blue-500** | **`#3b82f6`** | **主色·默认态** |
| `--color-primary-600` | blue-600 | `#2563eb` | 主色·悬停态 (hover) |
| `--color-primary-700` | blue-700 | `#1d4ed8` | 主色·按下态 (active) |
| `--color-primary-800` | blue-800 | `#1e40af` | 深色背景上的主色 |
| `--color-primary-900` | blue-900 | `#1e3a8a` | 文字链接深色 |

### 2.2 中性色 · Neutral

选取 **Slate** 系列作为中性色，色调偏冷，与 Blue 主色协调，营造理性克制的界面氛围。

| Token | Tailwind 对应 | HEX | 用途 |
|---|---|---|---|
| `--color-neutral-50` | slate-50 | `#f8fafc` | 页面底色、表头背景 |
| `--color-neutral-100` | slate-100 | `#f1f5f9` | 卡片背景、禁用态背景 |
| `--color-neutral-200` | slate-200 | `#e2e8f0` | 分割线、边框 |
| `--color-neutral-300` | slate-300 | `#cbd5e1` | 占位符、禁用文字 |
| `--color-neutral-400` | slate-400 | `#94a3b8` | 次要文字、辅助图标 |
| `--color-neutral-500` | slate-500 | `#64748b` | 正文次要文字 |
| `--color-neutral-600` | slate-600 | `#475569` | 正文文字 |
| `--color-neutral-700` | slate-700 | `#334155` | 标题文字 |
| `--color-neutral-800` | slate-800 | `#1e293b` | 重要标题 |
| `--color-neutral-900` | slate-900 | `#0f172a` | 一级标题、强调文字 |

### 2.3 语义色 · Semantic

用于传达状态、反馈与情感。

| 语义 | Token 前缀 | Tailwind 来源 | 500 色值 | 用途 |
|---|---|---|---|---|
| **成功 Success** | `--color-success-*` | Emerald | `#10b981` | 成功状态、正向操作 |
| **警告 Warning** | `--color-warning-*` | Amber | `#f59e0b` | 警告提示、需注意 |
| **危险 Danger** | `--color-danger-*` | Red | `#ef4444` | 错误、删除、危险操作 |
| **信息 Info** | `--color-info-*` | Sky | `#0ea5e9` | 信息提示、帮助引导 |

> 每个语义色均包含 50/100/200/300/400/**500**/600/700/800/900 完整色阶，其中 100 用于浅色背景，500 为默认态，600 为 hover，700 为 active。

### 2.4 扩展色 · Extended

用于数据可视化、标签分类等场景。

| Token | Tailwind 来源 | 500 色值 |
|---|---|---|
| `--color-purple-500` | Purple | `#a855f7` |
| `--color-pink-500` | Pink | `#ec4899` |
| `--color-orange-500` | Orange | `#f97316` |
| `--color-teal-500` | Teal | `#14b8a6` |
| `--color-indigo-500` | Indigo | `#6366f1` |

### 2.5 色彩使用规范

- **对比度**：正文文字与背景对比度 ≥ 4.5:1；大号文字 ≥ 3:1。
- **主色占比**：单页面主色面积不超过总色彩面积的 15%。
- **语义色**：一种状态仅使用一个语义色，避免 Success + Info 同时指示同一信息。
- **灰度先行**：先使用中性色完成黑白灰稿，再逐步引入主色与语义色。

---

## 3. 字体系统

### 3.1 字体家族

| 层级 | 字体栈 | Tailwind Class |
|---|---|---|
| **正文/UI** | `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif` | `font-sans` |
| **等宽/代码** | `'JetBrains Mono', 'Fira Code', 'Cascadia Code', Consolas, monospace` | `font-mono` |

### 3.2 字体大小与行高

> 基于 Tailwind CSS 字体尺寸，1rem = 16px。

| Token | Tailwind | 字号 | 行高 | 字重 | 用途 |
|---|---|---|---|---|---|
| `--text-xs` | `text-xs` | 0.75rem (12px) | 1rem (16px) | 400 | 辅助说明、标签、角标 |
| `--text-sm` | `text-sm` | 0.875rem (14px) | 1.25rem (20px) | 400 | 次要正文、表内文字 |
| `--text-base` | `text-base` | 1rem (16px) | 1.5rem (24px) | 400 | **默认正文** |
| `--text-lg` | `text-lg` | 1.125rem (18px) | 1.75rem (28px) | 500 | 小标题、卡片标题 |
| `--text-xl` | `text-xl` | 1.25rem (20px) | 1.75rem (28px) | 600 | 模块标题 |
| `--text-2xl` | `text-2xl` | 1.5rem (24px) | 2rem (32px) | 600 | 页面标题 |
| `--text-3xl` | `text-3xl` | 1.875rem (30px) | 2.25rem (36px) | 700 | 一级页面标题 |
| `--text-4xl` | `text-4xl` | 2.25rem (36px) | 2.5rem (40px) | 700 | Hero 标题 |

### 3.3 字重档位

| Token | Tailwind | 数值 | 用途 |
|---|---|---|---|
| `--font-normal` | `font-normal` | 400 | 正文 |
| `--font-medium` | `font-medium` | 500 | 强调文字、小标题 |
| `--font-semibold` | `font-semibold` | 600 | 标题 |
| `--font-bold` | `font-bold` | 700 | 重要标题、Hero |

---

## 4. 间距与尺寸系统

> 基础单位 **1 unit = 4px = 0.25rem**，与 Tailwind spacing scale 完全对齐。

### 4.1 间距阶梯

| Token | Tailwind | 值 | 用途 |
|---|---|---|---|
| `--space-0` | `0` | 0px | 无间距 |
| `--space-1` | `1` | 4px | 极小间距、图标与文字间距 |
| `--space-2` | `2` | 8px | 紧凑间距、标签内边距 |
| `--space-3` | `3` | 12px | 默认内边距、表单间距 |
| `--space-4` | `4` | 16px | 标准间距、卡片内边距 |
| `--space-5` | `5` | 20px | 宽松间距 |
| `--space-6` | `6` | 24px | 模块间距、对话框内边距 |
| `--space-8` | `8` | 32px | 区块间距 |
| `--space-10` | `10` | 40px | 大区块间距 |
| `--space-12` | `12` | 48px | 页面级间距 |
| `--space-16` | `16` | 64px | 页面留白、Hero 区 |

### 4.2 组件内边距规范

| 组件尺寸 | 水平内边距 | 垂直内边距 | Tailwind |
|---|---|---|---|
| xs | `--space-2` (8px) | `--space-1` (4px) | `px-2 py-1` |
| sm | `--space-3` (12px) | `--space-1.5` (6px) | `px-3 py-1.5` |
| md | `--space-4` (16px) | `--space-2` (8px) | `px-4 py-2` |
| lg | `--space-5` (20px) | `--space-2.5` (10px) | `px-5 py-2.5` |
| xl | `--space-6` (24px) | `--space-3` (12px) | `px-6 py-3` |

---

## 5. 圆角系统

> 统一使用 Tailwind CSS border-radius 值。

| Token | Tailwind | 值 | 适用场景 |
|---|---|---|---|
| `--radius-none` | `rounded-none` | 0px | 表格、分割线 |
| `--radius-sm` | `rounded-sm` | 2px | 小型标签、内嵌元素 |
| `--radius-md` | `rounded-md` | 6px | 输入框（默认）、下拉菜单 |
| `--radius-lg` | `rounded-lg` | 8px | **按钮（默认）**、卡片、面板 |
| `--radius-xl` | `rounded-xl` | 12px | 对话框、弹窗、大卡片 |
| `--radius-2xl` | `rounded-2xl` | 16px | 特大面板、Hero 卡片 |
| `--radius-full` | `rounded-full` | 9999px | 胶囊按钮、头像、徽章 |

### 5.1 圆角选用规则

- **交互组件**（按钮、输入框、下拉菜单）：默认 `--radius-lg` (8px)
- **容器组件**（卡片、面板）：默认 `--radius-xl` (12px)
- **叠加层**（对话框、抽屉、弹出面板）：默认 `--radius-xl` (12px)
- **数据表格**：`--radius-none` 或 `--radius-sm`，表头与内容统一

---

## 6. 阴影与层级系统

### 6.1 阴影令牌

> 基于 Tailwind CSS box-shadow，颜色使用 `slate-900` 的 alpha 通道。

| Token | Tailwind | 值 | Z-Index | 用途 |
|---|---|---|---|---|
| `--shadow-none` | `shadow-none` | `none` | — | 无阴影 |
| `--shadow-xs` | — | `0 1px 2px 0 rgba(15, 23, 42, 0.04)` | — | 极细微阴影、卡片默认态 |
| `--shadow-sm` | `shadow-sm` | `0 1px 3px 0 rgba(15, 23, 42, 0.06)` | 10 | 卡片悬停、轻微浮起 |
| `--shadow-md` | `shadow-md` | `0 4px 6px -1px rgba(15, 23, 42, 0.07), 0 2px 4px -2px rgba(15, 23, 42, 0.05)` | 20 | 下拉菜单、弹出面板 |
| `--shadow-lg` | `shadow-lg` | `0 10px 15px -3px rgba(15, 23, 42, 0.08), 0 4px 6px -4px rgba(15, 23, 42, 0.04)` | 30 | 对话框 |
| `--shadow-xl` | `shadow-xl` | `0 20px 25px -5px rgba(15, 23, 42, 0.1), 0 8px 10px -6px rgba(15, 23, 42, 0.04)` | 40 | 抽屉、模态框 |
| `--shadow-2xl` | `shadow-2xl` | `0 25px 50px -12px rgba(15, 23, 42, 0.15)` | 50 | 最高层级浮层 |

### 6.2 层级 (Z-Index) 规范

| 层级 | Z-Index | 组件 |
|---|---|---|
| 基底 | 0 | 页面内容 |
| 浮起 | 10 | 卡片悬停、表格固定列 |
| 下拉 | 20 | Dropdown、Select、DatePicker 弹出 |
| 粘性 | 30 | Sticky 表头、固定导航 |
| 遮罩 | 40 | 对话框遮罩层 |
| 模态 | 50 | 对话框、抽屉内容 |
| 通知 | 60 | Toast、Notification |
| 最高 | 70 | Tooltip、Popover（始终可见） |

---

## 7. 动效系统

### 7.1 缓动函数

| Token | 值 | 用途 |
|---|---|---|
| `--ease-linear` | `cubic-bezier(0, 0, 1, 1)` | 匀速、进度条 |
| `--ease-in` | `cubic-bezier(0.4, 0, 1, 1)` | 进入、出现 |
| `--ease-out` | `cubic-bezier(0, 0, 0.2, 1)` | 退出、消失 |
| `--ease-in-out` | `cubic-bezier(0.4, 0, 0.2, 1)` | 标准过渡（推荐） |

### 7.2 持续时长

| Token | 值 | 用途 |
|---|---|---|
| `--duration-instant` | 100ms | 瞬时反馈、hover 颜色切换 |
| `--duration-fast` | 150ms | 按钮 hover、图标微动效 |
| `--duration-normal` | 200ms | **标准过渡**、开关、展开/收起 |
| `--duration-slow` | 300ms | 对话框进出、抽屉滑入 |
| `--duration-gentle` | 500ms | 页面切换、大范围动画 |

### 7.3 动效原则

- **有目的**：动效服务于信息传达，非纯装饰
- **快速响应**：微交互 ≤ 200ms，避免拖沓
- **尊重偏好**：响应 `prefers-reduced-motion`，为偏好减弱的用户关闭非必要动画

---

## 8. 断点与响应式

> 采用移动优先 (Mobile First) 策略，断点与 Tailwind 默认断点完全一致。

| Token | Tailwind | 最小宽度 | 典型设备 |
|---|---|---|---|
| `--breakpoint-sm` | `sm` | 640px | 大屏手机 |
| `--breakpoint-md` | `md` | 768px | 平板 |
| `--breakpoint-lg` | `lg` | 1024px | 小型桌面 |
| `--breakpoint-xl` | `xl` | 1280px | 标准桌面 |
| `--breakpoint-2xl` | `2xl` | 1536px | 大屏桌面 |

### 8.1 容器最大宽度

| 断点 | `max-width` |
|---|---|
| 默认 (100%) | 100% |
| sm | 640px |
| md | 768px |
| lg | 1024px |
| xl | 1280px |
| 2xl | 1536px |

---

## 9. 组件尺寸规范

### 9.1 标准尺寸档位

> 所有交互组件统一使用以下尺寸档位。

| 尺寸 | 高度 | 字号 | 圆角 | 适用场景 |
|---|---|---|---|---|
| **xs** | 24px (`h-6`) | `--text-xs` | `--radius-md` | 密集表格操作、小标签 |
| **sm** | 32px (`h-8`) | `--text-sm` | `--radius-lg` | 紧凑表单、工具栏 |
| **md** ★ | 40px (`h-10`) | `--text-sm` | `--radius-lg` | **默认尺寸**、标准按钮/输入框 |
| **lg** | 48px (`h-12`) | `--text-base` | `--radius-lg` | 强调按钮、登录页 |
| **xl** | 56px (`h-14`) | `--text-base` | `--radius-xl` | Hero 按钮、CTA |

> ★ = 默认尺寸

### 9.2 按钮 · Button

| 属性 | 规范 |
|---|---|
| 最小宽度 | 填充按钮：`64px`；图标按钮：等于高度 |
| 内边距 | 见 [4.2 组件内边距规范](#42-组件内边距规范) |
| 圆角 | `--radius-lg` (8px)，胶囊变体使用 `--radius-full` |
| 字重 | `--font-medium` (500) |
| 图标间距 | 图标与文字间距 `--space-2` (8px) |

**变体**：`Primary Fill` `Primary Outline` `Neutral Outline` `Danger Fill` `Ghost` `Link`

### 9.3 输入框 · Input

| 属性 | 规范 |
|---|---|
| 高度 | 同标准尺寸档位，默认 40px |
| 圆角 | `--radius-lg` (8px) |
| 边框 | 默认 `1px solid --color-neutral-200` |
| 聚焦边框 | `2px solid --color-primary-400`（使用 ring 实现，不改变布局） |
| 内边距 | 默认 `px-4 py-2` |
| 占位符颜色 | `--color-neutral-300` |

### 9.4 卡片 · Card

| 属性 | 规范 |
|---|---|
| 内边距 | `--space-6` (24px) |
| 圆角 | `--radius-xl` (12px) |
| 边框 | `1px solid --color-neutral-200`，无边框变体使用 `--shadow-xs` 替代 |
| 间距 | 卡片之间 `--space-6` (24px) |

### 9.5 对话框 · Dialog

| 属性 | 规范 |
|---|---|
| 最小宽度 | 400px (sm: 320px, lg: 560px, xl: 720px) |
| 内边距 | `--space-8` (32px) |
| 圆角 | `--radius-xl` (12px) |
| 阴影 | `--shadow-xl` |
| 遮罩 | `rgba(15, 23, 42, 0.5)`，模糊 `backdrop-blur-sm` |

### 9.6 表格 · Table

| 属性 | 规范 |
|---|---|
| 行高 | 默认 48px (`h-12`)，紧凑 40px (`h-10`)，宽松 56px (`h-14`) |
| 单元格内边距 | 默认 `px-4 py-3`，紧凑 `px-3 py-2` |
| 圆角 | `--radius-none`，包裹容器可选 `--radius-lg` |
| 表头背景 | `--color-neutral-50` |
| 分割线 | `1px solid --color-neutral-200` |
| 行悬停 | 背景 `--color-neutral-50` |
| 行选中 | 背景 `--color-primary-50` |

### 9.7 标签/徽章 · Tag / Badge

| 属性 | 规范 |
|---|---|
| 尺寸 | sm: 20px, md: 24px, lg: 28px |
| 内边距 | sm: `px-1.5 py-0`, md: `px-2 py-0.5`, lg: `px-2.5 py-1` |
| 圆角 | `--radius-full` (胶囊形) |
| 字号 | 统一使用 `--text-xs` |

---

## 10. 图标规范

### 10.1 图标尺寸

| Token | 尺寸 | 用途 |
|---|---|---|
| `--icon-sm` | 14px | 标签内图标、角标 |
| `--icon-md` | 18px | **默认图标尺寸**、按钮内图标 |
| `--icon-lg` | 22px | 独立图标按钮、导航图标 |
| `--icon-xl` | 28px | 空状态、功能入口 |

### 10.2 图标风格

- **线框风格** (Stroke)：默认使用，线宽 1.5px-2px，简洁轻盈
- **填充风格** (Fill)：用于选中态、强调态
- **图标库推荐**：Lucide Icons / Heroicons（与 Tailwind 生态天然契合）

### 10.3 图标使用规范

- 按钮内图标尺寸 = 字号 × 1.2，视觉对齐
- 图标与文字间距 = `--space-2` (8px)
- 独立图标按钮需有明确的 aria-label

---

## 11. 布局栅格

### 11.1 栅格参数

| 属性 | 值 |
|---|---|
| 列数 | 12 列 |
| 列间距 (gutter) | `--space-6` (24px)，响应式下可为 `--space-4` |
| 行间距 | `--space-6` (24px) |
| 容器内边距 | `--space-4` (16px) 起，大屏 `--space-8` (32px) |

### 11.2 常用布局模板

| 布局 | 列分布 | 适用 |
|---|---|---|
| 两栏 1:1 | 6 + 6 | 对比内容 |
| 两栏 2:1 | 8 + 4 | 内容 + 侧栏 |
| 两栏 3:1 | 9 + 3 | 宽内容 + 窄侧栏 |
| 三栏均分 | 4 + 4 + 4 | 数据卡片、特性展示 |
| 四栏均分 | 3 + 3 + 3 + 3 | 数据指标面板 |

---

## 12. Design Tokens 速查表

### 12.1 Design Tokens 速查

所有令牌定义在 `src/styles/tailwind.css` 的 `@theme` 块中（Tailwind v4 CSS-first 配置）。

```css
@theme {
  /* ========== 主色 Primary (Blue) ========== */
  --color-primary-50:  #eff6ff;
  --color-primary-100: #dbeafe;
  --color-primary-200: #bfdbfe;
  --color-primary-300: #93c5fd;
  --color-primary-400: #60a5fa;
  --color-primary-500: #3b82f6;  /* 默认 */
  --color-primary-600: #2563eb;  /* hover */
  --color-primary-700: #1d4ed8;  /* active */
  --color-primary-800: #1e40af;
  --color-primary-900: #1e3a8a;

  /* ========== 中性色 Neutral (Slate) ========== */
  --color-neutral-50:  #f8fafc;
  --color-neutral-100: #f1f5f9;
  --color-neutral-200: #e2e8f0;
  --color-neutral-300: #cbd5e1;
  --color-neutral-400: #94a3b8;
  --color-neutral-500: #64748b;
  --color-neutral-600: #475569;
  --color-neutral-700: #334155;
  --color-neutral-800: #1e293b;
  --color-neutral-900: #0f172a;

  /* ========== 语义色 Semantic ========== */
  --color-success-500: #10b981;
  --color-warning-500: #f59e0b;
  --color-danger-500:  #ef4444;
  --color-info-500:    #0ea5e9;

  /* ========== 字体 ========== */
  --font-sans:  'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --font-mono:  'JetBrains Mono', 'Fira Code', Consolas, monospace;

  --text-xs:   0.75rem;   /* 12px */
  --text-sm:   0.875rem;  /* 14px */
  --text-base: 1rem;      /* 16px */
  --text-lg:   1.125rem;  /* 18px */
  --text-xl:   1.25rem;   /* 20px */
  --text-2xl:  1.5rem;    /* 24px */
  --text-3xl:  1.875rem;  /* 30px */
  --text-4xl:  2.25rem;   /* 36px */

  /* ========== 字重 ========== */
  --font-normal:   400;
  --font-medium:   500;
  --font-semibold: 600;
  --font-bold:     700;

  /* ========== 间距 ========== */
  --space-0:  0px;
  --space-1:  0.25rem;  /* 4px */
  --space-2:  0.5rem;   /* 8px */
  --space-3:  0.75rem;  /* 12px */
  --space-4:  1rem;     /* 16px */
  --space-5:  1.25rem;  /* 20px */
  --space-6:  1.5rem;   /* 24px */
  --space-8:  2rem;     /* 32px */
  --space-10: 2.5rem;   /* 40px */
  --space-12: 3rem;     /* 48px */
  --space-16: 4rem;     /* 64px */

  /* ========== 圆角 ========== */
  --radius-none: 0px;
  --radius-sm:   0.125rem;  /* 2px */
  --radius-md:   0.375rem;  /* 6px */
  --radius-lg:   0.5rem;    /* 8px */
  --radius-xl:   0.75rem;   /* 12px */
  --radius-2xl:  1rem;      /* 16px */
  --radius-full: 9999px;

  /* ========== 阴影 ========== */
  --shadow-xs:  0 1px 2px 0 rgba(15, 23, 42, 0.04);
  --shadow-sm:  0 1px 3px 0 rgba(15, 23, 42, 0.06);
  --shadow-md:  0 4px 6px -1px rgba(15, 23, 42, 0.07);
  --shadow-lg:  0 10px 15px -3px rgba(15, 23, 42, 0.08);
  --shadow-xl:  0 20px 25px -5px rgba(15, 23, 42, 0.10);
  --shadow-2xl: 0 25px 50px -12px rgba(15, 23, 42, 0.15);

  /* ========== 动效 ========== */
  --ease-in-out:    cubic-bezier(0.4, 0, 0.2, 1);
  --duration-fast:  150ms;
  --duration-normal: 200ms;
  --duration-slow:  300ms;
  --duration-gentle: 500ms;

  /* ========== 断点 (参考) ========== */
  /* sm: 640px, md: 768px, lg: 1024px, xl: 1280px, 2xl: 1536px */
}