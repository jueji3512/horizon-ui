# Button 按钮

按钮用于触发用户操作，表达操作意图。

## 主题 Theme

`theme` 控制语义色，默认使用 `solid` 填充形态。

<DemoBox>
  <div class="flex flex-wrap gap-3">
    <Button>Default</Button>
    <Button theme="brand">Brand</Button>
    <Button theme="success">Success</Button>
    <Button theme="warning">Warning</Button>
    <Button theme="error">Error</Button>
  </div>
</DemoBox>

::: details 查看代码
```html
<Button>Default</Button>
<Button theme="brand">Brand</Button>
<Button theme="success">Success</Button>
<Button theme="warning">Warning</Button>
<Button theme="error">Error</Button>
```
:::

## 形态 Variant

`solid` 用于强调操作，`outline` 用于轻量操作或组合输入中的动作按钮。

<DemoBox>
  <div class="flex flex-wrap gap-3">
    <Button variant="solid">Solid</Button>
    <Button variant="solid" theme="brand">Brand</Button>
    <Button variant="outline">Outline</Button>
    <Button variant="outline" theme="brand">Brand</Button>
    <Button variant="outline" theme="error">Error</Button>
  </div>
</DemoBox>

::: details 查看代码
```html
<Button variant="solid">Solid</Button>
<Button variant="solid" theme="brand">Brand</Button>
<Button variant="outline">Outline</Button>
<Button variant="outline" theme="brand">Brand</Button>
<Button variant="outline" theme="error">Error</Button>
```
:::

## 尺寸 Sizes

<DemoBox>
  <div class="flex flex-wrap items-end gap-3">
    <Button size="sm">Small</Button>
    <Button size="md">Medium</Button>
    <Button size="lg">Large</Button>
  </div>
</DemoBox>

::: details 查看代码
```html
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>
```
:::

## 形状 Shape

`rectangle` 是默认矩形按钮；`round` 为胶囊按钮；`square` 与 `circle` 适合图标按钮。

<DemoBox>
  <div class="flex flex-wrap items-center gap-3">
    <Button shape="rectangle">Rectangle</Button>
    <Button shape="round">Round</Button>
    <Button shape="square" variant="outline" icon="plus" aria-label="新增" />
    <Button shape="circle" theme="brand" icon="plus" aria-label="新增" />
  </div>
</DemoBox>

::: details 查看代码
```html
<Button shape="rectangle">Rectangle</Button>
<Button shape="round">Round</Button>
<Button shape="square" variant="outline" icon="plus" aria-label="新增" />
<Button shape="circle" theme="brand" icon="plus" aria-label="新增" />
```
:::

## 图标 Icon

<DemoBox>
  <div class="flex flex-wrap items-center gap-3">
    <Button prefix-icon="plus">新增</Button>
    <Button suffix-icon="arrow-right">下一步</Button>
    <Button shape="square" variant="outline" icon="delete" aria-label="删除" />
    <Button shape="circle" theme="error" icon="delete" aria-label="删除" />
  </div>
</DemoBox>

::: details 查看代码
```html
<Button prefix-icon="plus">新增</Button>
<Button suffix-icon="arrow-right">下一步</Button>
<Button shape="square" variant="outline" icon="delete" aria-label="删除" />
<Button shape="circle" theme="error" icon="delete" aria-label="删除" />
```
:::

## 禁用态 Disabled

<DemoBox>
  <div class="flex flex-wrap gap-3">
    <Button disabled>Default</Button>
    <Button theme="brand" disabled>Brand</Button>
    <Button theme="success" disabled>Success</Button>
    <Button theme="warning" disabled>Warning</Button>
    <Button theme="error" disabled>Error</Button>
    <Button variant="outline" disabled>Outline</Button>
  </div>
</DemoBox>

::: details 查看代码
```html
<Button disabled>Default</Button>
<Button theme="brand" disabled>Brand</Button>
<Button theme="success" disabled>Success</Button>
<Button theme="warning" disabled>Warning</Button>
<Button theme="error" disabled>Error</Button>
<Button variant="outline" disabled>Outline</Button>
```
:::

## 加载态 Loading

<DemoBox>
  <div class="flex flex-wrap gap-3">
    <Button loading>保存中</Button>
    <Button theme="error" loading>删除中</Button>
    <Button variant="outline" loading>处理中</Button>
  </div>
</DemoBox>

::: details 查看代码
```html
<Button loading>保存中</Button>
<Button theme="error" loading>删除中</Button>
<Button variant="outline" loading>处理中</Button>
```
:::

## Props

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `theme` | `'default' \| 'brand' \| 'success' \| 'warning' \| 'error'` | `'default'` | 按钮语义主题 |
| `variant` | `'solid' \| 'outline'` | `'solid'` | 视觉形态 |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | 尺寸（24/32/40px） |
| `shape` | `'rectangle' \| 'round' \| 'circle' \| 'square'` | `'rectangle'` | 按钮形状 |
| `disabled` | `boolean` | `false` | 禁用态 |
| `loading` | `boolean` | `false` | 加载中，旋转动画 + 禁止交互 |
| `icon` | `string` | — | 图标按钮或文字前图标名 |
| `prefix-icon` | `string` | — | 文字前图标名 |
| `suffix-icon` | `string` | — | 文字后图标名 |
| `name` | `string` | — | 表单字段名 |
| `value` | `string` | — | 表单提交值 |
| `autofocus` | `boolean` | `false` | 自动聚焦 |

## 事件

| 事件 | 参数 | 说明 |
|------|------|------|
| `click` | `MouseEvent` | 点击触发（disabled / loading 时不触发） |
