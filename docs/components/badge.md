# Badge 徽标

叠加式徽标组件，用于在子元素右上角显示标记（圆点、数字或文字）。

## 基本用法

`dot` 圆点模式、`value` 数字模式、`value` 文字模式。

<DemoBox>
  <div class="flex gap-8 items-center">
    <Badge dot type="danger">
      <div class="w-10 h-10 bg-neutral-subtle rounded-lg" />
    </Badge>
    <Badge :value="5" type="danger">
      <div class="w-10 h-10 bg-neutral-subtle rounded-lg" />
    </Badge>
    <Badge value="新" type="primary">
      <div class="w-10 h-10 bg-neutral-subtle rounded-lg" />
    </Badge>
  </div>
</DemoBox>

::: details 查看代码
```html
<Badge dot type="danger">
  <div class="w-10 h-10 bg-neutral-subtle rounded-lg" />
</Badge>
<Badge :value="5" type="danger">
  <div class="w-10 h-10 bg-neutral-subtle rounded-lg" />
</Badge>
<Badge value="新" type="primary">
  <div class="w-10 h-10 bg-neutral-subtle rounded-lg" />
</Badge>
```
:::

## 主题

`type` 支持 5 种语义色：`default`、`primary`、`danger`、`success`、`warning`。

<DemoBox>
  <div class="flex gap-8 items-center">
    <Badge :value="1" type="default">
      <div class="w-10 h-10 bg-neutral-subtle rounded-lg" />
    </Badge>
    <Badge :value="2" type="primary">
      <div class="w-10 h-10 bg-neutral-subtle rounded-lg" />
    </Badge>
    <Badge :value="3" type="danger">
      <div class="w-10 h-10 bg-neutral-subtle rounded-lg" />
    </Badge>
    <Badge :value="4" type="success">
      <div class="w-10 h-10 bg-neutral-subtle rounded-lg" />
    </Badge>
    <Badge :value="5" type="warning">
      <div class="w-10 h-10 bg-neutral-subtle rounded-lg" />
    </Badge>
  </div>
</DemoBox>

::: details 查看代码
```html
<Badge :value="1" type="default">
  <div class="w-10 h-10 bg-neutral-subtle rounded-lg" />
</Badge>
<Badge :value="2" type="primary">
  <div class="w-10 h-10 bg-neutral-subtle rounded-lg" />
</Badge>
<Badge :value="3" type="danger">
  <div class="w-10 h-10 bg-neutral-subtle rounded-lg" />
</Badge>
<Badge :value="4" type="success">
  <div class="w-10 h-10 bg-neutral-subtle rounded-lg" />
</Badge>
<Badge :value="5" type="warning">
  <div class="w-10 h-10 bg-neutral-subtle rounded-lg" />
</Badge>
```
:::

## 最大值

`max` 控制数字溢出上限（默认 99），超过时显示 "{max}+"。

<DemoBox>
  <div class="flex gap-8 items-center">
    <Badge :value="50">
      <div class="w-10 h-10 bg-neutral-subtle rounded-lg" />
    </Badge>
    <Badge :value="100">
      <div class="w-10 h-10 bg-neutral-subtle rounded-lg" />
    </Badge>
    <Badge :value="200" :max="99">
      <div class="w-10 h-10 bg-neutral-subtle rounded-lg" />
    </Badge>
  </div>
</DemoBox>

::: details 查看代码
```html
<Badge :value="50">
  <div class="w-10 h-10 bg-neutral-subtle rounded-lg" />
</Badge>
<Badge :value="100">
  <div class="w-10 h-10 bg-neutral-subtle rounded-lg" />
</Badge>
<Badge :value="200" :max="99">
  <div class="w-10 h-10 bg-neutral-subtle rounded-lg" />
</Badge>
```
:::

## 显示零值

`show-zero` 控制值为 0 时是否显示标记。默认不显示。

<DemoBox>
  <div class="flex gap-8 items-center">
    <Badge :value="0">
      <div class="w-10 h-10 bg-neutral-subtle rounded-lg" />
    </Badge>
    <Badge :value="0" show-zero>
      <div class="w-10 h-10 bg-neutral-subtle rounded-lg" />
    </Badge>
  </div>
</DemoBox>

::: details 查看代码
```html
<Badge :value="0">
  <div class="w-10 h-10 bg-neutral-subtle rounded-lg" />
</Badge>
<Badge :value="0" show-zero>
  <div class="w-10 h-10 bg-neutral-subtle rounded-lg" />
</Badge>
```
:::

## 偏移量

`offset` 接收 `[x, y]` 元组（单位 px），微调标记相对位置。

<DemoBox>
  <div class="flex gap-8 items-center">
    <Badge :value="5">
      <div class="w-10 h-10 bg-neutral-subtle rounded-lg" />
    </Badge>
    <Badge :value="5" :offset="[6, -6]">
      <div class="w-10 h-10 bg-neutral-subtle rounded-lg" />
    </Badge>
    <Badge :value="5" :offset="[-6, 6]">
      <div class="w-10 h-10 bg-neutral-subtle rounded-lg" />
    </Badge>
  </div>
</DemoBox>

::: details 查看代码
```html
<Badge :value="5">
  <div class="w-10 h-10 bg-neutral-subtle rounded-lg" />
</Badge>
<Badge :value="5" :offset="[6, -6]">
  <div class="w-10 h-10 bg-neutral-subtle rounded-lg" />
</Badge>
<Badge :value="5" :offset="[-6, 6]">
  <div class="w-10 h-10 bg-neutral-subtle rounded-lg" />
</Badge>
```
:::

## 自定义颜色

`color` 设置自定义背景色，优先级高于 `type`。

<DemoBox>
  <div class="flex gap-8 items-center">
    <Badge :value="5" type="danger">
      <div class="w-10 h-10 bg-neutral-subtle rounded-lg" />
    </Badge>
    <Badge :value="5" color="#8b5cf6">
      <div class="w-10 h-10 bg-neutral-subtle rounded-lg" />
    </Badge>
    <Badge dot color="#ec4899">
      <div class="w-10 h-10 bg-neutral-subtle rounded-lg" />
    </Badge>
  </div>
</DemoBox>

::: details 查看代码
```html
<Badge :value="5" type="danger">
  <div class="w-10 h-10 bg-neutral-subtle rounded-lg" />
</Badge>
<Badge :value="5" color="#8b5cf6">
  <div class="w-10 h-10 bg-neutral-subtle rounded-lg" />
</Badge>
<Badge dot color="#ec4899">
  <div class="w-10 h-10 bg-neutral-subtle rounded-lg" />
</Badge>
```
:::

## 隐藏

`hidden` 隐藏标记，仅保留子元素。

<DemoBox>
  <div class="flex gap-8 items-center">
    <Badge :value="5">
      <div class="w-10 h-10 bg-neutral-subtle rounded-lg" />
    </Badge>
    <Badge :value="5" hidden>
      <div class="w-10 h-10 bg-neutral-subtle rounded-lg" />
    </Badge>
  </div>
</DemoBox>

::: details 查看代码
```html
<Badge :value="5">
  <div class="w-10 h-10 bg-neutral-subtle rounded-lg" />
</Badge>
<Badge :value="5" hidden>
  <div class="w-10 h-10 bg-neutral-subtle rounded-lg" />
</Badge>
```
:::

## Props

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `value` | `string \| number` | `''` | 显示内容，数字时受 max 溢出控制 |
| `dot` | `boolean` | `false` | 圆点模式，忽略 value |
| `type` | `'default' \| 'primary' \| 'danger' \| 'success' \| 'warning'` | `'danger'` | 语义色 |
| `max` | `number` | `99` | 数字溢出上限 |
| `show-zero` | `boolean` | `false` | value 为 0 时是否显示 |
| `offset` | `[number, number]` | `[0, 0]` | 水平/垂直偏移量（px） |
| `color` | `string` | `''` | 自定义背景色，优先级高于 type |
| `hidden` | `boolean` | `false` | 隐藏标记 |
