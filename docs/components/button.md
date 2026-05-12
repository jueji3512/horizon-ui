# Button 按钮

按钮用于触发用户操作，表达操作意图。

## 变体 Types

五种变体，除 `outline` 外均为 Fill 填充式：

<DemoBox>
  <div class="flex flex-wrap gap-3">
    <Button>Primary</Button>
    <Button type="outline">Outline</Button>
    <Button type="danger">Danger</Button>
    <Button type="ghost">Ghost</Button>
    <Button type="link">Link</Button>
  </div>
</DemoBox>

::: details 查看代码
```html
<Button>Primary</Button>
<Button type="outline">Outline</Button>
<Button type="danger">Danger</Button>
<Button type="ghost">Ghost</Button>
<Button type="link">Link</Button>
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
    <Button disabled>Primary</Button>
    <Button type="outline" disabled>Outline</Button>
    <Button type="danger" disabled>Danger</Button>
    <Button type="ghost" disabled>Ghost</Button>
    <Button type="link" disabled>Link</Button>
  </div>
</DemoBox>

::: details 查看代码
```html
<Button disabled>Primary</Button>
<Button type="outline" disabled>Outline</Button>
<Button type="danger" disabled>Danger</Button>
<Button type="ghost" disabled>Ghost</Button>
<Button type="link" disabled>Link</Button>
```
:::

## 加载态 Loading

<DemoBox>
  <div class="flex flex-wrap gap-3">
    <Button loading>保存中</Button>
    <Button type="outline" loading>提交</Button>
  </div>
</DemoBox>

::: details 查看代码
```html
<Button loading>保存中</Button>
<Button type="outline" loading>提交</Button>
```
:::

## 胶囊形 Round

<DemoBox>
  <div class="flex flex-wrap items-center gap-3">
    <Button round>Pill</Button>
    <Button round prefix-icon="plus" />
    <Button round type="danger">Danger</Button>
    <Button round type="outline">Outline</Button>
  </div>
</DemoBox>

::: details 查看代码
```html
<Button round>Pill</Button>
<Button round prefix-icon="plus" />
<Button round type="danger">Danger</Button>
<Button round type="outline">Outline</Button>
```
:::

## Props

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `type` | `'primary' \| 'outline' \| 'danger' \| 'ghost' \| 'link'` | `'primary'` | 按钮变体 |
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
