# Button 按钮

按钮用于触发用户操作，表达操作意图。

## 主题 Theme

五种语义主题，`default` 为中性描边式，其余为 Fill 填充式：

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

## 图标 Icon

<DemoBox>
  <div class="flex flex-wrap items-center gap-3">
    <Button prefix-icon="plus">新增</Button>
    <Button suffix-icon="arrow-right">下一步</Button>
    <Button prefix-icon="delete" />
  </div>
</DemoBox>

::: details 查看代码
```html
<Button prefix-icon="plus">新增</Button>
<Button suffix-icon="arrow-right">下一步</Button>
<Button prefix-icon="delete" />
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
  </div>
</DemoBox>

::: details 查看代码
```html
<Button disabled>Default</Button>
<Button theme="brand" disabled>Brand</Button>
<Button theme="success" disabled>Success</Button>
<Button theme="warning" disabled>Warning</Button>
<Button theme="error" disabled>Error</Button>
```
:::

## 加载态 Loading

<DemoBox>
  <div class="flex flex-wrap gap-3">
    <Button loading>保存中</Button>
    <Button theme="error" loading>删除中</Button>
  </div>
</DemoBox>

::: details 查看代码
```html
<Button loading>保存中</Button>
<Button theme="error" loading>删除中</Button>
```
:::

## 胶囊形 Round

<DemoBox>
  <div class="flex flex-wrap items-center gap-3">
    <Button round>Pill</Button>
    <Button round prefix-icon="plus" />
    <Button round theme="success">Success</Button>
    <Button round theme="error">Error</Button>
  </div>
</DemoBox>

::: details 查看代码
```html
<Button round>Pill</Button>
<Button round prefix-icon="plus" />
<Button round theme="success">Success</Button>
<Button round theme="error">Error</Button>
```
:::

## Props

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `theme` | `'default' \| 'brand' \| 'success' \| 'warning' \| 'error'` | `'default'` | 按钮语义主题 |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | 尺寸（24/32/40px） |
| `disabled` | `boolean` | `false` | 禁用态 |
| `loading` | `boolean` | `false` | 加载中，旋转动画 + 禁止交互 |
| `round` | `boolean` | `false` | 胶囊形，icon-only 时自动生效 |
| `prefix-icon` | `string` | — | 文字前图标名 |
| `suffix-icon` | `string` | — | 文字后图标名 |
| `name` | `string` | — | 表单字段名 |
| `value` | `string` | — | 表单提交值 |
| `autofocus` | `boolean` | `false` | 自动聚焦 |

## 事件

| 事件 | 参数 | 说明 |
|------|------|------|
| `click` | `MouseEvent` | 点击触发（disabled / loading 时不触发） |
