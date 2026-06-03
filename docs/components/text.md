# Text 文本

文本格式组件，支持语义色和格式标记，默认 14px。

## 语义色

`theme` 支持 6 种语义色。

:::demo 语义色
text/example-01
:::

## 字体规格

Text 默认使用 `font-body-md`。`code` 和 `keyboard` 为行内装饰形态，使用更紧凑的 `font-body-sm`。

| 场景 | Token | 字号 / 行高 |
|------|-------|-------------|
| 默认文本 | `font-body-md` | `14px / 22px` |
| 行内代码 | `font-body-sm` | `12px / 20px` |
| 快捷键 | `font-body-sm` | `12px / 20px` |

## 格式标记

`strong`、`italic`、`underline`、`delete`、`code`、`mark`、`keyboard`，可自由组合。

:::demo 格式标记
text/example-02
:::

## 自定义标签

`tag` 指定渲染的 HTML 标签。

:::demo 自定义标签
text/example-03
:::

## 禁用态

`disabled` 置灰并禁用交互。

:::demo 禁用态
text/example-04
:::

## Props

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `theme` | `'default' \| 'brand' \| 'success' \| 'warning' \| 'error' \| 'secondary'` | `'default'` | 语义主题 |
| `strong` | `boolean` | `false` | 加粗 |
| `italic` | `boolean` | `false` | 斜体 |
| `underline` | `boolean` | `false` | 下划线 |
| `delete` | `boolean` | `false` | 删除线 |
| `code` | `boolean` | `false` | 行内代码样式 |
| `mark` | `boolean \| string` | `false` | 高亮标记，为 `true` 时使用默认高亮色，也可直接传入颜色值 |
| `keyboard` | `boolean` | `false` | 快捷键样式 |
| `disabled` | `boolean` | `false` | 禁用态 |
| `tag` | `string` | `'span'` | 渲染的 HTML 标签 |

## Slots

| 插槽 | 说明 |
|------|------|
| `default` | 文本内容 |
