# Input 输入框

用于文本输入，支持密码、清空、图标等功能。

## 基本用法

`v-model` 绑定值。

:::demo 基本用法
input/example-01
:::

## 密码类型

设置 `type="password"` 并启用 `show-password` 显示密码切换按钮。

:::demo 密码类型
input/example-02
:::

## 尺寸 Size

`sm` / `md` (默认) / `lg` 三档。

:::demo 尺寸 Size
input/example-03
:::

## 可清空

设置 `clearable`，输入内容后显示清空按钮。

:::demo 可清空
input/example-04
:::

## 禁用与只读

:::demo 禁用与只读
input/example-05
:::

## 图标

`prefix-icon` 和 `suffix-icon` 设置前后图标。

:::demo 图标
input/example-06
:::

## 状态 Status

`status` 设置校验状态，影响边框颜色。

:::demo 状态 Status
input/example-07
:::

## 字数限制

`maxlength` 限制最大字符数，`show-word-limit` 显示字数统计。

:::demo 字数限制
input/example-08
:::

## Props

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `model-value` | `string \| number` | `''` | v-model 绑定值 |
| `type` | `'text' \| 'password' \| 'number'` | `'text'` | 输入框类型 |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | 尺寸 |
| `placeholder` | `string` | `''` | 占位文本 |
| `disabled` | `boolean` | `false` | 禁用 |
| `readonly` | `boolean` | `false` | 只读 |
| `status` | `'error' \| 'warning' \| 'success'` | — | 校验状态 |
| `clearable` | `boolean` | `false` | 可清空 |
| `show-password` | `boolean` | `false` | 密码显隐切换 |
| `prefix-icon` | `string` | `''` | 前缀图标名 |
| `suffix-icon` | `string` | `''` | 后缀图标名 |
| `maxlength` | `number` | — | 最大字符数 |
| `show-word-limit` | `boolean` | `false` | 显示字数统计 |
| `name` | `string` | `''` | 原生 name |
| `autofocus` | `boolean` | `false` | 原生 autofocus |
| `autocomplete` | `string` | `''` | 原生 autocomplete |
| `aria-label` | `string` | `''` | 无障碍标签 |

## Events

| 事件 | 参数 | 说明 |
|------|------|------|
| `update:model-value` | `string \| number` | v-model 更新 |
| `input` | `(value, event)` | 输入时触发 |
| `change` | `(value, event)` | 值改变且失焦时触发 |
| `focus` | `FocusEvent` | 聚焦时触发 |
| `blur` | `FocusEvent` | 失焦时触发 |
| `clear` | — | 点击清空按钮时触发 |
| `enter` | `KeyboardEvent` | 按下 Enter 时触发 |

## Slots

| 插槽 | 说明 |
|------|------|
| `prefix` | 输入框内部前缀内容 |
| `suffix` | 输入框内部后缀内容 |
