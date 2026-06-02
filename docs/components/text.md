# Text 文本

文本格式组件，支持语义色和格式标记，默认 14px。

## 语义色

`theme` 支持 6 种语义色。

<DemoBox>
  <div class="flex flex-wrap gap-3">
    <Text>default 正文</Text>
    <Text theme="brand">brand 品牌</Text>
    <Text theme="success">success 成功</Text>
    <Text theme="warning">warning 警告</Text>
    <Text theme="error">error 错误</Text>
    <Text theme="secondary">secondary 辅助</Text>
  </div>
</DemoBox>

::: details 查看代码
```html
<Text>default 正文</Text>
<Text theme="brand">brand 品牌</Text>
<Text theme="success">success 成功</Text>
<Text theme="warning">warning 警告</Text>
<Text theme="error">error 错误</Text>
<Text theme="secondary">secondary 辅助</Text>
```
:::

## 字体规格

Text 默认使用 `font-body-md`。`code` 和 `keyboard` 为行内装饰形态，使用更紧凑的 `font-body-sm`。

| 场景 | Token | 字号 / 行高 |
|------|-------|-------------|
| 默认文本 | `font-body-md` | `14px / 22px` |
| 行内代码 | `font-body-sm` | `12px / 20px` |
| 快捷键 | `font-body-sm` | `12px / 20px` |

## 格式标记

`strong`、`italic`、`underline`、`delete`、`code`、`mark`、`keyboard`，可自由组合。

<DemoBox>
  <div class="flex flex-wrap items-baseline gap-3">
    <Text strong>strong 加粗</Text>
    <Text italic>italic 斜体</Text>
    <Text underline>underline 下划线</Text>
    <Text delete>delete 删除线</Text>
    <Text code>code 代码</Text>
    <Text mark>mark 高亮</Text>
    <Text keyboard>Ctrl + S</Text>
  </div>

  <div class="flex flex-wrap items-baseline gap-3" style="margin-top:12px;">
    <Text strong italic underline>组合：粗+斜+下划线</Text>
    <Text theme="error" delete strong>⚠ 重要通知已失效</Text>
  </div>
</DemoBox>

::: details 查看代码
```html
<Text strong>strong 加粗</Text>
<Text italic>italic 斜体</Text>
<Text underline>underline 下划线</Text>
<Text delete>delete 删除线</Text>
<Text code>code 代码</Text>
<Text mark>mark 高亮</Text>
<Text keyboard>Ctrl + S</Text>

<Text strong italic underline>组合：粗+斜+下划线</Text>
<Text theme="error" delete strong>⚠ 重要通知已失效</Text>
```
:::

## 自定义标签

`tag` 指定渲染的 HTML 标签。

<DemoBox>
  <div class="flex flex-wrap gap-3">
    <Text tag="p">渲染为 &lt;p&gt; 标签</Text>
    <Text tag="div">渲染为 &lt;div&gt; 标签</Text>
    <Text tag="label">渲染为 &lt;label&gt; 标签</Text>
  </div>
</DemoBox>

::: details 查看代码
```html
<Text tag="p">渲染为 &lt;p&gt; 标签</Text>
<Text tag="div">渲染为 &lt;div&gt; 标签</Text>
<Text tag="label">渲染为 &lt;label&gt; 标签</Text>
```
:::

## 禁用态

`disabled` 置灰并禁用交互。

<DemoBox>
  <div class="flex flex-wrap gap-3">
    <Text disabled>禁用的文本</Text>
    <Text theme="brand" disabled>禁用的品牌文本</Text>
    <Text theme="success" disabled>禁用的成功文本</Text>
    <Text theme="warning" disabled>禁用的警告文本</Text>
    <Text theme="error" disabled>禁用的错误文本</Text>
  </div>
</DemoBox>

::: details 查看代码
```html
<Text disabled>禁用的文本</Text>
<Text theme="brand" disabled>禁用的品牌文本</Text>
<Text theme="success" disabled>禁用的成功文本</Text>
<Text theme="warning" disabled>禁用的警告文本</Text>
<Text theme="error" disabled>禁用的错误文本</Text>
```
:::

## Props

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `theme` | `'default' \| 'brand' \| 'success' \| 'warning' \| 'error' \| 'secondary'` | `'default'` | 语义主题 |
| `strong` | `boolean` | `false` | 加粗 |
| `italic` | `boolean` | `false` | 斜体 |
| `underline` | `boolean` | `false` | 下划线 |
| `delete` | `boolean` | `false` | 删除线 |
| `code` | `boolean` | `false` | 行内代码样式 |
| `mark` | `boolean \| string` | `false` | 高亮标记，为 `true` 时使用默认高亮色，也可直接传入颜色值 |
| `keyboard` | `boolean` | `false` | 快捷键样式 |
| `disabled` | `boolean` | `false` | 禁用态 |
| `tag` | `string` | `'span'` | 渲染的 HTML 标签 |

## Slots

| 插槽 | 说明 |
|------|------|
| `default` | 文本内容 |
