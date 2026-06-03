# Tooltip 文字提示

鼠标悬停、聚焦或点击时显示的文本提示浮层，基于 Popper 定位基座实现。

## 基础用法

`content` prop 传入文本，默认 `hover` 触发。

:::demo 基础用法
tooltip/example-01
:::

## 尺寸规格

Tooltip 使用自身的浮层 surface 和箭头几何规格，不直接映射为 `--comp-size-sm/md/lg`。

| 部位 | 规格 | 说明 |
|------|------|------|
| 浮层 | 最大宽度 `240px`、左右 `8px`、上下 `4px` | 使用 `font-body-sm`、`round-default` 和 `shadow-popper` |
| 箭头 | `8 × 8px` 旋转方块 | 由 `PopperArrow` 提供，背景色跟随 Tooltip 主题 |
| 间距 | 默认 `10px` | 通过 `offset` 控制浮层与触发元素距离 |

## 触发方式

`trigger` 支持 `hover`（默认）、`click`、`focus`、`manual`。

:::demo 触发方式
tooltip/example-02
:::

## 方位

`placement` 支持 12 个方向，Popper 自动 flip 防溢出。

:::demo 方位
tooltip/example-03
:::

## 主题 Theme

`theme` 支持 5 种：`default`（默认深色）、`brand`、`success`、`warning`、`error`。

:::demo 主题 Theme
tooltip/example-04
:::

## 自定义内容

使用 `content` 插槽传入 HTML 或组件。

:::demo 自定义内容
tooltip/example-05
:::

## 延迟

`showDelay` 和 `hideDelay` 控制显示/隐藏延迟（毫秒）。

:::demo 延迟
tooltip/example-06
:::

## 受控模式

`v-model:visible` + `trigger="manual"` 完全控制显示状态。

:::demo 受控模式
tooltip/example-07
:::

## 禁用态

`disabled` 阻止 tooltip 显示。

:::demo 禁用态
tooltip/example-08
:::

## Props

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `content` | `string` | `''` | 提示文本 |
| `placement` | `'top' \| 'top-start' \| 'top-end' \| 'bottom' \| 'bottom-start' \| 'bottom-end' \| 'left' \| 'left-start' \| 'left-end' \| 'right' \| 'right-start' \| 'right-end'` | `'top'` | 12 方位，Popper 自动 flip |
| `trigger` | `'hover' \| 'click' \| 'focus' \| 'manual'` | `'hover'` | 触发方式 |
| `theme` | `'default' \| 'brand' \| 'success' \| 'warning' \| 'error'` | `'default'` | 主题类型 |
| `show-arrow` | `boolean` | `true` | 箭头 |
| `offset` | `number` | `10` | 距触发元素的偏移 (px) |
| `show-delay` | `number` | `0` | 显示延迟 (ms) |
| `hide-delay` | `number` | `0` | 隐藏延迟 (ms) |
| `disabled` | `boolean` | `false` | 禁用 |
| `visible` | `boolean` | — | v-model:visible 受控 |
| `z-index` | `number` | — | 自定义层级 |

## Slots

| 插槽 | 说明 |
|------|------|
| `default` | 触发元素 |
| `content` | 自定义提示内容（替代 `content` prop） |

## Events

| 事件 | 参数 | 说明 |
|------|------|------|
| `update:visible` | `boolean` | v-model:visible 更新 |
