# Popover 弹出层

Popover 是通用的非模态浮层外壳，用于承载筛选器、说明卡片、轻量表单和其他任意交互内容。它只负责触发、定位、显隐和关闭策略，不定义菜单项或选择语义。

## 基础用法

使用 `PopoverTrigger` 放置触发器，使用 `PopoverContent` 放置浮层内容。`as-child` 会把触发器属性合并到真实子组件上。

:::demo 基础用法
popover/example-01
:::

## 触发方式

`trigger` 支持 `click`、`hover`、`focus` 和 `manual`。

:::demo 触发方式
popover/example-02
:::

## 自定义内容

Popover 可以放入表单、说明文本、状态卡片等任意内容；菜单语义应交给 Menu。

:::demo 自定义内容
popover/example-03
:::

## 嵌套浮层

Popover 会注册子浮层，点击子浮层内容不会误关父级；Esc 优先关闭最内层浮层。

:::demo 嵌套浮层
popover/example-04
:::

## 受控模式

使用 `v-model:open` 和 `trigger="manual"` 可以完全控制浮层开关。

:::demo 受控模式
popover/example-05
:::

## Props

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `open` | `boolean` | - | `v-model:open` 受控开关 |
| `trigger` | `'click' \| 'hover' \| 'focus' \| 'manual'` | `'click'` | 触发方式 |
| `placement` | `Placement` | `'bottom'` | 浮层位置 |
| `offset` | `number` | `8` | 触发器与浮层间距 |
| `open-delay` | `number` | `0` | 打开延时 |
| `close-delay` | `number` | `0` | 关闭延时 |
| `disabled` | `boolean` | `false` | 禁用触发 |
| `close-on-outside-click` | `boolean` | `true` | 点击浮层外部时关闭 |
| `close-on-esc` | `boolean` | `true` | 按 Esc 时关闭 |
| `return-focus-on-close` | `boolean` | `true` | 关闭时回到触发器焦点 |
| `to` | `string \| HTMLElement` | `'body'` | Teleport 目标 |
| `flip` | `boolean` | `true` | 空间不足时翻转 |
| `shift` | `boolean` | `false` | 溢出视口时推回可见区域 |
| `match-width` | `boolean` | `false` | 浮层宽度匹配触发器 |
| `strategy` | `'absolute' \| 'fixed'` | `'absolute'` | 定位策略 |
| `auto-update` | `boolean` | `true` | 触发器变化时自动更新定位 |
| `z-index` | `number` | - | 自定义层级 |

## PopoverTrigger

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `as-child` | `boolean` | `false` | 将触发器属性合并到唯一子节点 |
| `aria-haspopup` | `string` | `'dialog'` | 触发器 `aria-haspopup` |

## PopoverContent

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `panel-class` | `string` | `''` | 浮层 surface 额外 class |

## Events

| 事件 | 参数 | 说明 |
|------|------|------|
| `update:open` | `boolean` | `v-model:open` 更新 |
| `open-change` | `boolean` | 开关状态变化 |
