# Icon 图标

基于 SVG 的图标组件，默认尺寸为 `1em`，可跟随当前字号变化。共 46 个常用图标，点击卡片即可复制图标名。

## 基本用法

:::demo 基本用法
icon/example-01
:::

## 尺寸

图标默认宽高为 `1em`，可通过父级字号或外部 class / style 调整。

:::demo 尺寸
icon/example-02
:::

## 颜色 Color

通过 `color` prop 或继承父级 CSS `color`：

:::demo 颜色 Color
icon/example-03
:::

## 全部图标

<IconGrid />

## Props

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `name` | `string` | — | 图标名（对应 SVG 文件名） |
| `color` | `string` | — | 覆盖颜色 |
| `aria-label` | `string` | — | 无障碍标签 |
