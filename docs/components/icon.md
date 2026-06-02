# Icon 图标

基于 SVG 的图标组件，默认尺寸为 `1em`，可跟随当前字号变化。共 46 个常用图标，点击卡片即可复制图标名。

## 基本用法

<DemoBox>
  <div class="flex flex-wrap items-center gap-4">
    <Icon name="settings" />
    <Icon name="search" />
    <Icon name="edit" />
    <Icon name="delete" />
    <Icon name="plus" />
    <Icon name="check" />
  </div>
</DemoBox>

::: details 查看代码
```html
<Icon name="settings" />
<Icon name="search" />
<Icon name="edit" />
<Icon name="delete" />
<Icon name="plus" />
<Icon name="check" />
```
:::

## 尺寸

图标默认宽高为 `1em`，可通过父级字号或外部 class / style 调整。

<DemoBox>
  <div class="flex flex-wrap items-end gap-4">
    <Icon name="star" class="text-sm" />
    <Icon name="star" class="text-base" />
    <Icon name="star" class="text-xl" />
    <Icon name="star" style="font-size: 28px" />
  </div>
</DemoBox>

::: details 查看代码
```html
<Icon name="star" class="text-sm" />
<Icon name="star" class="text-base" />
<Icon name="star" class="text-xl" />
<Icon name="star" style="font-size: 28px" />
```
:::

## 颜色 Color

通过 `color` prop 或继承父级 CSS `color`：

<DemoBox>
  <div class="flex flex-wrap items-center gap-4">
    <Icon name="heart" />
    <Icon name="heart" color="#ef4444" />
    <Icon name="heart" color="#3b82f6" />
    <Icon name="heart" color="#10b981" />
    <Icon name="heart" color="#f59e0b" />
  </div>
</DemoBox>

::: details 查看代码
```html
<Icon name="heart" />
<Icon name="heart" color="#ef4444" />
<Icon name="heart" color="#3b82f6" />
<Icon name="heart" color="#10b981" />
<Icon name="heart" color="#f59e0b" />
```
:::

## 全部图标

<IconGrid />

## Props

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `name` | `string` | — | 图标名（对应 SVG 文件名） |
| `color` | `string` | — | 覆盖颜色 |
| `aria-label` | `string` | — | 无障碍标签 |
