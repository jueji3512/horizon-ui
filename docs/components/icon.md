# Icon 图标

基于 SVG 的图标组件，支持尺寸、颜色自定义。共 46 个常用图标，点击卡片即可复制图标名。

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

## 尺寸 Sizes

预设五档或自定义像素值：

<DemoBox>
  <div class="flex flex-wrap items-end gap-4">
    <Icon name="star" size="xs" />
    <Icon name="star" size="sm" />
    <Icon name="star" size="md" />
    <Icon name="star" size="lg" />
    <Icon name="star" size="xl" />
  </div>
</DemoBox>

::: details 查看代码
```html
<Icon name="star" size="xs" />     <!-- 14px -->
<Icon name="star" size="sm" />     <!-- 16px -->
<Icon name="star" size="md" />     <!-- 20px -->
<Icon name="star" size="lg" />     <!-- 24px -->
<Icon name="star" size="xl" />     <!-- 28px -->
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
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| number` | `'md'` | 尺寸（预设 14~28px，或自定义像素值） |
| `color` | `string` | — | 覆盖颜色 |
| `aria-label` | `string` | — | 无障碍标签 |
