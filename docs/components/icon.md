# Icon 图标

基于 SVG 的图标组件，默认尺寸为 `1em`，可跟随当前字号变化。当前内置 96 个常用图标，点击卡片即可复制图标名。

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

## 图标规范

- 内置 SVG 使用统一的 24x24 viewBox，并继承 `currentColor`。
- SVG 源文件不写死 `width` / `height`，由 `Icon` 组件的 `1em` 尺寸和外部字号控制。
- 本地图标以 Lucide outline 风格重整，保持原文件名与现有 `name` 调用不变。
- 新增或替换图标后运行 `npm run check:icons`，确保结构符合规范。

## Props

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `name` | `string` | — | 图标名（对应 SVG 文件名） |
| `color` | `string` | — | 覆盖颜色 |
| `aria-label` | `string` | — | 无障碍标签 |
