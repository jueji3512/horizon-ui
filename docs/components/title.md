# Title 标题

标题组件，6 级标题 + 语义色。

## 等级

`level` 对应 `h1`~`h6`，字号参照 TDesign。

<Title :level="1">一级标题 (36px / h1)</Title>
<Title :level="2">二级标题 (28px / h2)</Title>
<Title :level="3">三级标题 (24px / h3)</Title>
<Title :level="4">四级标题 (20px / h4)</Title>
<Title :level="5">五级标题 (18px / h5)</Title>
<Title :level="6">六级标题 (16px / h6)</Title>

::: details 查看代码
```html
<Title :level="1">一级标题 (36px / h1)</Title>
<Title :level="2">二级标题 (28px / h2)</Title>
<Title :level="3">三级标题 (24px / h3)</Title>
<Title :level="4">四级标题 (20px / h4)</Title>
<Title :level="5">五级标题 (18px / h5)</Title>
<Title :level="6">六级标题 (16px / h6)</Title>
```
:::

## 语义色

`type` 支持 6 种语义色。

<Title :level="1">default 默认标题</Title>
<Title :level="2" type="primary">primary 主色标题</Title>
<Title :level="3" type="success">success 成功标题</Title>
<Title :level="4" type="warning">warning 警告标题</Title>
<Title :level="5" type="danger">danger 危险标题</Title>
<Title :level="6" type="muted">muted 辅助标题</Title>

::: details 查看代码
```html
<Title :level="1">default 默认标题</Title>
<Title :level="2" type="primary">primary 主色标题</Title>
<Title :level="3" type="success">success 成功标题</Title>
<Title :level="4" type="warning">warning 警告标题</Title>
<Title :level="5" type="danger">danger 危险标题</Title>
<Title :level="6" type="muted">muted 辅助标题</Title>
```
:::

## 高亮

`mark` 给标题加高亮背景，`true` 使用默认黄色，也可直接传颜色值。

<Title :level="2" mark>高亮标题（默认色）</Title>
<Title :level="2" mark="#a5d6ff">高亮标题（自定义色）</Title>

::: details 查看代码
```html
<Title :level="2" mark>高亮标题（默认色）</Title>
<Title :level="2" mark="#a5d6ff">高亮标题（自定义色）</Title>
```
:::

## 溢出省略

`ellipsis` 单行溢出显示省略号。

<div style="max-width: 400px;">
  <Title :level="3" ellipsis>这是一个非常长的标题会在容器宽度不够时自动截断显示省略号末尾表示溢出</Title>
</div>

::: details 查看代码
```html
<div style="max-width: 400px;">
  <Title :level="3" ellipsis>这是一个非常长的标题会在容器宽度不够时自动截断显示省略号末尾表示溢出</Title>
</div>
```
:::

## Props

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `level` | `1 \| 2 \| 3 \| 4 \| 5 \| 6` | `1` | 标题等级 |
| `type` | `'default' \| 'primary' \| 'success' \| 'warning' \| 'danger' \| 'muted'` | `'default'` | 语义色 |
| `mark` | `boolean \| string` | `false` | 高亮标记，为 `true` 时使用默认高亮色，也可直接传入颜色值 |
| `ellipsis` | `boolean` | `false` | 单行溢出省略号 |
