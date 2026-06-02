# Callout 标注

语义标注盒子，用于在文档中展示提示、警告等补充信息。

## 主题 Theme

四种语义主题：`brand`、`success`、`warning`、`error`。

<DemoBox>
  <Callout>brand — 这是一条信息提示，用于展示辅助说明。</Callout>
  <Callout theme="success">success — 操作已成功完成，数据已保存到服务器。</Callout>
  <Callout theme="warning">warning — 该操作不可逆，请确认后再继续。</Callout>
  <Callout theme="error">error — 服务器连接失败，请检查网络后重试。</Callout>
</DemoBox>

::: details 查看代码
```html
<Callout>brand — 这是一条信息提示，用于展示辅助说明。</Callout>
<Callout theme="success">success — 操作已成功完成，数据已保存到服务器。</Callout>
<Callout theme="warning">warning — 该操作不可逆，请确认后再继续。</Callout>
<Callout theme="error">error — 服务器连接失败，请检查网络后重试。</Callout>
```
:::

## 标题

`title` prop 或 `title` slot 设置标题。

<DemoBox>
  <Callout theme="brand" title="提示">这是带标题的信息标注。</Callout>
  <Callout theme="warning" title="注意">这是带标题的警告标注。</Callout>
</DemoBox>

::: details 查看代码
```html
<Callout theme="brand" title="提示">这是带标题的信息标注。</Callout>
<Callout theme="warning" title="注意">这是带标题的警告标注。</Callout>
```
:::

## 尺寸规格

Callout 使用组件内部结构尺寸，左侧色条和内容内边距不新增全局 token。

| 部位 | 规格 | 说明 |
|------|------|------|
| 左侧色条 | `4px` | 用于强化语义主题 |
| 内容区域 | 左右 `16px`，上下 `12px` | 保证正文和标题有稳定呼吸感 |
| 外层圆角 | `--round-default` | 跟随组件通用圆角 token |

## Props

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `theme` | `'brand' \| 'success' \| 'warning' \| 'error'` | `'brand'` | 语义主题 |
| `title` | `string` | `''` | 标题文字，为空时不显示标题 |

## Slots

| 插槽 | 说明 |
|------|------|
| `default` | 正文内容 |
| `title` | 自定义标题（优先级高于 `title` prop） |
