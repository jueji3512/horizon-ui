# Link 链接

文字链接组件，用于页面内导航或外部跳转。

## 主题 Theme

`theme` 支持 5 种语义色。

<DemoBox>
  <div class="flex flex-wrap gap-4">
    <Link>default 默认</Link>
    <Link theme="brand">brand 品牌</Link>
    <Link theme="success">success 成功</Link>
    <Link theme="warning">warning 警告</Link>
    <Link theme="error">error 错误</Link>
  </div>
</DemoBox>

::: details 查看代码
```html
<Link>default 默认</Link>
<Link theme="brand">brand 品牌</Link>
<Link theme="success">success 成功</Link>
<Link theme="warning">warning 警告</Link>
<Link theme="error">error 错误</Link>
```
:::

## 下划线

`underline` 控制下划线行为：`always` 始终显示，`hover` 悬浮显示（默认），`never` 从不显示。

<DemoBox>
  <div class="flex flex-wrap gap-4">
    <Link underline="always">始终下划线</Link>
    <Link underline="hover">悬浮下划线</Link>
    <Link underline="never">无下划线</Link>
  </div>
</DemoBox>

::: details 查看代码
```html
<Link underline="always">始终下划线</Link>
<Link underline="hover">悬浮下划线</Link>
<Link underline="never">无下划线</Link>
```
:::

## 图标

`prefix-icon` 和 `suffix-icon` 在文字前后插入图标。

<DemoBox>
  <div class="flex flex-wrap gap-4">
    <Link prefix-icon="link">前置图标</Link>
    <Link suffix-icon="arrow-right">后置图标</Link>
  </div>
</DemoBox>

::: details 查看代码
```html
<Link prefix-icon="link">前置图标</Link>
<Link suffix-icon="arrow-right">后置图标</Link>
```
:::

## 尺寸

`size` 支持 `sm`（12px）、`md`（14px，默认）、`lg`（16px）。

<DemoBox>
  <div class="flex flex-col gap-3">
    <div class="flex gap-4">
      <Link size="sm">小号链接</Link>
      <Link size="sm" prefix-icon="plus">小号图标</Link>
    </div>
    <div class="flex gap-4">
      <Link size="md">中号链接</Link>
      <Link size="md" prefix-icon="plus">中号图标</Link>
    </div>
    <div class="flex gap-4">
      <Link size="lg">大号链接</Link>
      <Link size="lg" prefix-icon="plus">大号图标</Link>
    </div>
  </div>
</DemoBox>

::: details 查看代码
```html
<Link size="sm">小号链接</Link>
<Link size="md">中号链接</Link>
<Link size="lg">大号链接</Link>
```
:::

## 禁用态

`disabled` 使链接变为不可交互的灰色。

<DemoBox>
  <div class="flex flex-wrap gap-4">
    <Link disabled>禁用链接</Link>
    <Link theme="brand" disabled>品牌禁用</Link>
    <Link theme="error" disabled>错误禁用</Link>
  </div>
</DemoBox>

::: details 查看代码
```html
<Link disabled>禁用链接</Link>
<Link theme="brand" disabled>品牌禁用</Link>
<Link theme="error" disabled>错误禁用</Link>
```
:::

## Props

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `theme` | `'default' \| 'brand' \| 'success' \| 'warning' \| 'error'` | `'default'` | 语义主题 |
| `underline` | `'always' \| 'hover' \| 'never'` | `'hover'` | 下划线行为 |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | 尺寸 |
| `disabled` | `boolean` | `false` | 禁用态 |
| `prefix-icon` | `string` | — | 前置图标名 |
| `suffix-icon` | `string` | — | 后置图标名 |

## Events

| 事件 | 参数 | 说明 |
|------|------|------|
| `click` | `MouseEvent` | 点击触发（disabled 时不触发） |
