# Badge 徽标

叠加式徽标组件，用于在子元素右上角显示圆点、数字或短文本。

## 基本用法

<DemoBox>
  <div class="flex items-center gap-8">
    <Badge dot theme="error">
      <div class="h-10 w-10 rounded-[var(--round-2)] bg-[var(--bg-color-secondarycontainer)]" />
    </Badge>
    <Badge :value="5" theme="error">
      <div class="h-10 w-10 rounded-[var(--round-2)] bg-[var(--bg-color-secondarycontainer)]" />
    </Badge>
    <Badge value="新" theme="brand">
      <div class="h-10 w-10 rounded-[var(--round-2)] bg-[var(--bg-color-secondarycontainer)]" />
    </Badge>
  </div>
</DemoBox>

::: details 查看代码
```html
<Badge dot theme="error">...</Badge>
<Badge :value="5" theme="error">...</Badge>
<Badge value="新" theme="brand">...</Badge>
```
:::

## 尺寸规格

Badge 使用组件自身的圆点、胶囊和定位几何规格，不直接映射为 `--comp-size-sm/md/lg`。

| 类型 | 尺寸 | 说明 |
|------|------|------|
| 圆点 | `6 × 6px` | `dot` 模式，使用 `round-full` |
| 数字 / 文本 | `20px` 高、`16px` 最小宽度、左右 `6px` 内边距 | 使用 `font-body-sm` 和 `round-full` |
| 默认锚点 | 子元素右上角中心 | 可通过 `offset` 按 px 微调 |

## 主题

`theme` 支持 `default`、`brand`、`success`、`warning`、`error`。

<DemoBox>
  <div class="flex items-center gap-8">
    <Badge :value="1" theme="default"><div class="h-10 w-10 rounded-[var(--round-2)] bg-[var(--bg-color-secondarycontainer)]" /></Badge>
    <Badge :value="2" theme="brand"><div class="h-10 w-10 rounded-[var(--round-2)] bg-[var(--bg-color-secondarycontainer)]" /></Badge>
    <Badge :value="3" theme="success"><div class="h-10 w-10 rounded-[var(--round-2)] bg-[var(--bg-color-secondarycontainer)]" /></Badge>
    <Badge :value="4" theme="warning"><div class="h-10 w-10 rounded-[var(--round-2)] bg-[var(--bg-color-secondarycontainer)]" /></Badge>
    <Badge :value="5" theme="error"><div class="h-10 w-10 rounded-[var(--round-2)] bg-[var(--bg-color-secondarycontainer)]" /></Badge>
  </div>
</DemoBox>

::: details 查看代码
```html
<Badge :value="1" theme="default">...</Badge>
<Badge :value="2" theme="brand">...</Badge>
<Badge :value="3" theme="success">...</Badge>
<Badge :value="4" theme="warning">...</Badge>
<Badge :value="5" theme="error">...</Badge>
```
:::

## 最大值

`max` 控制数字溢出上限，超过时显示 `{max}+`。

<DemoBox>
  <div class="flex items-center gap-8">
    <Badge :value="50"><div class="h-10 w-10 rounded-[var(--round-2)] bg-[var(--bg-color-secondarycontainer)]" /></Badge>
    <Badge :value="100"><div class="h-10 w-10 rounded-[var(--round-2)] bg-[var(--bg-color-secondarycontainer)]" /></Badge>
    <Badge :value="200" :max="99"><div class="h-10 w-10 rounded-[var(--round-2)] bg-[var(--bg-color-secondarycontainer)]" /></Badge>
  </div>
</DemoBox>

## 显示零值

<DemoBox>
  <div class="flex items-center gap-8">
    <Badge :value="0"><div class="h-10 w-10 rounded-[var(--round-2)] bg-[var(--bg-color-secondarycontainer)]" /></Badge>
    <Badge :value="0" show-zero><div class="h-10 w-10 rounded-[var(--round-2)] bg-[var(--bg-color-secondarycontainer)]" /></Badge>
  </div>
</DemoBox>

## 偏移量

<DemoBox>
  <div class="flex items-center gap-8">
    <Badge :value="5"><div class="h-10 w-10 rounded-[var(--round-2)] bg-[var(--bg-color-secondarycontainer)]" /></Badge>
    <Badge :value="5" :offset="[6, -6]"><div class="h-10 w-10 rounded-[var(--round-2)] bg-[var(--bg-color-secondarycontainer)]" /></Badge>
    <Badge :value="5" :offset="[-6, 6]"><div class="h-10 w-10 rounded-[var(--round-2)] bg-[var(--bg-color-secondarycontainer)]" /></Badge>
  </div>
</DemoBox>

## 自定义颜色

`color` 通过内联样式覆盖主题背景色。

<DemoBox>
  <div class="flex items-center gap-8">
    <Badge :value="5" theme="error"><div class="h-10 w-10 rounded-[var(--round-2)] bg-[var(--bg-color-secondarycontainer)]" /></Badge>
    <Badge :value="5" color="#8b5cf6"><div class="h-10 w-10 rounded-[var(--round-2)] bg-[var(--bg-color-secondarycontainer)]" /></Badge>
    <Badge dot color="#ec4899"><div class="h-10 w-10 rounded-[var(--round-2)] bg-[var(--bg-color-secondarycontainer)]" /></Badge>
  </div>
</DemoBox>

## 隐藏

<DemoBox>
  <div class="flex items-center gap-8">
    <Badge :value="5"><div class="h-10 w-10 rounded-[var(--round-2)] bg-[var(--bg-color-secondarycontainer)]" /></Badge>
    <Badge :value="5" hidden><div class="h-10 w-10 rounded-[var(--round-2)] bg-[var(--bg-color-secondarycontainer)]" /></Badge>
  </div>
</DemoBox>

## Props

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `value` | `string \| number` | `''` | 显示内容，数字时可受 `max` 控制 |
| `dot` | `boolean` | `false` | 圆点模式 |
| `theme` | `'default' \| 'brand' \| 'success' \| 'warning' \| 'error'` | `'error'` | 语义主题 |
| `max` | `number` | `99` | 数字溢出上限 |
| `show-zero` | `boolean` | `false` | `value` 为 `0` 时是否显示 |
| `offset` | `[number, number]` | `[0, 0]` | 水平/垂直偏移量，单位 px |
| `color` | `string` | `''` | 自定义背景色，优先级高于 `theme` |
| `hidden` | `boolean` | `false` | 隐藏徽标 |
