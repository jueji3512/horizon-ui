# Divider 分割线

分隔内容区域，支持横向/纵向、实线/虚线，可嵌入文字。

## 基础用法

横向分割线，默认实线。

<div class="space-y-4">
  <div>内容区域一</div>
  <Divider />
  <div>内容区域二</div>
</div>

::: details 查看代码
```html
<div>内容区域一</div>
<Divider />
<div>内容区域二</div>
```
:::

## 虚线

`type="dashed"` 设置虚线样式。

<div class="space-y-4">
  <div>内容区域一</div>
  <Divider type="dashed" />
  <div>内容区域二</div>
</div>

::: details 查看代码
```html
<Divider type="dashed" />
```
:::

## 带文字

默认插槽嵌入文字，`align` 控制文字位置。

<div class="space-y-4">
  <Divider>居中文字</Divider>
  <Divider align="left">左对齐文字</Divider>
  <Divider align="right">右对齐文字</Divider>
</div>

::: details 查看代码
```html
<Divider>居中文字</Divider>
<Divider align="left">左对齐文字</Divider>
<Divider align="right">右对齐文字</Divider>
```
:::

## 朴素文字

`plain` 使文字颜色更浅。

<div class="space-y-4">
  <Divider>普通文字</Divider>
  <Divider plain>朴素文字</Divider>
</div>

::: details 查看代码
```html
<Divider>普通文字</Divider>
<Divider plain>朴素文字</Divider>
```
:::

## 纵向分割

`direction="vertical"` 生成纵向分割线，常用于行内元素分隔。

<div class="flex items-center gap-1 h-8">
  <span>文本</span>
  <Divider direction="vertical" />
  <a href="#">链接</a>
  <Divider direction="vertical" />
  <a href="#">链接</a>
</div>

::: details 查看代码
```html
<div class="flex items-center gap-1 h-8">
  <span>文本</span>
  <Divider direction="vertical" />
  <a href="#">链接</a>
  <Divider direction="vertical" />
  <a href="#">链接</a>
</div>
```
:::

## Props

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `direction` | `'horizontal' \| 'vertical'` | `'horizontal'` | 分割线方向 |
| `type` | `'solid' \| 'dashed'` | `'solid'` | 线型 |
| `align` | `'left' \| 'center' \| 'right'` | `'center'` | 文字位置，无文字时忽略 |
| `plain` | `boolean` | `false` | 朴素模式，文字颜色更浅 |

## Slots

| 插槽 | 说明 |
|------|------|
| `default` | 分隔线内嵌的文字或图标，仅 horizontal 方向有效 |
