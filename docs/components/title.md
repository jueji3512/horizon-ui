# Title 标题

标题组件，6 级标题 + 语义色。

## 等级

`level` 对应 `h1`~`h6`，字号使用 Horizon 的 `font-title-*` token。

:::demo 等级
title/example-01
:::

## 字体规格

| Level | Token | 字重 / 字号 / 行高 |
|-------|-------|-------------------|
| `1` | `font-title-1` | `600 / 36px / 44px` |
| `2` | `font-title-2` | `600 / 28px / 36px` |
| `3` | `font-title-3` | `600 / 24px / 32px` |
| `4` | `font-title-4` | `600 / 18px / 26px` |
| `5` | `font-title-5` | `600 / 16px / 24px` |
| `6` | `font-title-6` | `600 / 14px / 22px` |

## 语义色

`theme` 支持 6 种语义色。

:::demo 语义色
title/example-02
:::

## 高亮

`mark` 给标题加高亮背景，`true` 使用默认黄色，也可直接传颜色值。

:::demo 高亮
title/example-03
:::

## 溢出省略

`ellipsis` 单行溢出显示省略号。

:::demo 溢出省略
title/example-04
:::

## Props

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `level` | `1 \| 2 \| 3 \| 4 \| 5 \| 6` | `1` | 标题等级 |
| `theme` | `'default' \| 'brand' \| 'success' \| 'warning' \| 'error' \| 'secondary'` | `'default'` | 语义主题 |
| `mark` | `boolean \| string` | `false` | 高亮标记，为 `true` 时使用默认高亮色，也可直接传入颜色值 |
| `ellipsis` | `boolean` | `false` | 单行溢出省略号 |
