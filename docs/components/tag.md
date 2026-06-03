# Tag 标签

用于标记、分类和筛选。`theme` 控制语义色，`variant` 控制视觉样式。

## 基本用法

:::demo 基本用法
tag/example-01
:::

## 视觉样式

`variant` 支持 `light`、`dark`、`outline`。

:::demo 视觉样式
tag/example-02
:::

## 可关闭

:::demo 可关闭
tag/example-03
:::

## 可选择

:::demo 可选择
tag/example-04
:::

## 圆角

:::demo 圆角
tag/example-05
:::

## 图标

:::demo 图标
tag/example-06
:::

## 自定义颜色

:::demo 自定义颜色
tag/example-07
:::

## 禁用

:::demo 禁用
tag/example-08
:::

## Props

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `theme` | `'default' \| 'brand' \| 'success' \| 'warning' \| 'error'` | `'default'` | 语义主题 |
| `variant` | `'light' \| 'dark' \| 'outline'` | `'light'` | 视觉样式 |
| `closable` | `boolean` | `false` | 是否可关闭 |
| `checkable` | `boolean` | `false` | 是否可选择 |
| `checked` | `boolean` | - | 选中态 |
| `disabled` | `boolean` | `false` | 禁用 |
| `round` | `boolean` | `false` | 胶囊圆角 |
| `prefix-icon` | `string` | `''` | 前置图标名 |
| `max-width` | `number \| string` | - | 最大宽度，超出省略 |
| `color` | `string` | `''` | 自定义颜色，替换语义主题 |
| `checked-props` | `{ theme?, variant?, color? }` | `{}` | 选中态覆盖 |

## Events

| 事件 | 参数 | 说明 |
|------|------|------|
| `click` | `MouseEvent` | 点击 Tag 时触发 |
| `close` | `MouseEvent` | 关闭时触发 |
| `update:checked` | `boolean` | checkable 选中态切换 |
