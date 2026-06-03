# Divider 分割线

分隔内容区域，支持横向/纵向、实线/虚线，可嵌入文字。

## 基础用法

横向分割线，默认实线。

:::demo 基础用法
divider/example-01
:::

## 虚线

`type="dashed"` 设置虚线样式。

:::demo 虚线
divider/example-02
:::

## 带文字

默认插槽嵌入文字，`align` 控制文字位置。

:::demo 带文字
divider/example-03
:::

## 朴素文字

`plain` 使文字颜色更浅。

:::demo 朴素文字
divider/example-04
:::

## 纵向分割

`direction="vertical"` 生成纵向分割线，常用于行内元素分隔。

:::demo 纵向分割
divider/example-05
:::

## 尺寸规格

Divider 使用组件内部结构尺寸，线条、文字间距和纵向高度不新增全局 token。

| 场景 | 规格 | 说明 |
|------|------|------|
| 横向无文字 | 上下外间距 `16px`，线宽 `1px` | 对应 `my-4 border-t` |
| 横向带文字 | 文字左右间距 `12px` | 对应标签区域 `px-3` |
| 左 / 右对齐文字 | 靠边短线 `24px` | 另一侧线段自适应撑满 |
| 纵向分割 | 左右外间距 `16px`，高度 `1em`，线宽 `1px` | 跟随所在行文字尺寸 |

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
