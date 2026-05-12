# Callout 标注

语义标注盒子，用于在文档中展示提示、警告等补充信息。

## 类型

五种语义类型：`note`、`info`、`success`、`warning`、`danger`。

<DemoBox>
  <Callout type="note">note — 这是一条普通备注信息，用于补充说明。</Callout>
  <Callout type="info">info — 这是一条信息提示，用于展示辅助说明。</Callout>
  <Callout type="success">success — 操作已成功完成，数据已保存到服务器。</Callout>
  <Callout type="warning">warning — 该操作不可逆，请确认后再继续。</Callout>
  <Callout type="danger">danger — 服务器连接失败，请检查网络后重试。</Callout>
</DemoBox>

::: details 查看代码
```html
<Callout type="note">note — 这是一条普通备注信息，用于补充说明。</Callout>
<Callout type="info">info — 这是一条信息提示，用于展示辅助说明。</Callout>
<Callout type="success">success — 操作已成功完成，数据已保存到服务器。</Callout>
<Callout type="warning">warning — 该操作不可逆，请确认后再继续。</Callout>
<Callout type="danger">danger — 服务器连接失败，请检查网络后重试。</Callout>
```
:::

## 标题

`title` prop 或 `title` slot 设置标题。

<DemoBox>
  <Callout type="info" title="提示">这是带标题的信息标注。</Callout>
  <Callout type="warning" title="注意">这是带标题的警告标注。</Callout>
</DemoBox>

::: details 查看代码
```html
<Callout type="info" title="提示">这是带标题的信息标注。</Callout>
<Callout type="warning" title="注意">这是带标题的警告标注。</Callout>
```
:::

## Props

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `type` | `'note' \| 'info' \| 'success' \| 'warning' \| 'danger'` | `'note'` | 语义类型 |
| `title` | `string` | `''` | 标题文字，为空时不显示标题 |

## Slots

| 插槽 | 说明 |
|------|------|
| `default` | 正文内容 |
| `title` | 自定义标题（优先级高于 `title` prop） |
