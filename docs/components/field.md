# Field 输入域

> **底层组件** — 为 Input、InputNumber、Select、DatePicker、TagInput 等输入域组件提供外壳、尺寸、状态、布局和基础动作位。

Field 不替代 Input，也不处理业务值模型、弹出层、选项渲染或日期面板。它更像 Popper：提供一组公开 primitive，让组件库内部和使用者都能组合出稳定的输入域结构。

## 基本结构

`FieldRoot` 承载输入域 surface，`FieldNativeInput` 只包装原生输入框的基础样式和事件。

:::demo 基本结构
field/example-01
:::

## 尺寸与状态

Field 使用组件尺寸 token 和功能色 ring，状态由上层组件传入。

:::demo 尺寸与状态
field/example-02
:::

## 前后缀与动作位

`FieldPrefix` / `FieldSuffix` 负责稳定的辅助区布局，`FieldAction` 用于清空、展开、密码显隐等可点击动作。

:::demo 前后缀与动作位
field/example-03
:::

## 固有尺寸

FieldRoot 的高度跟随 `--comp-size-sm/md/lg`；FieldAction 使用输入域内部动作位规格，不直接映射为输入域整体高度。

| 部位 | 规格 | 说明 |
|------|------|------|
| FieldRoot sm / md / lg | `24px` / `32px` / `40px` | 通过组件尺寸 token 控制整体输入域高度 |
| FieldAction | `20 × 20px` | 用于清空、展开、密码显隐等输入域内部动作 |

## 多值输入

多选 Select、TreeSelect 和 TagInput 可以用 `multiline` + `FieldContent` 承载 Tag wrap，搜索输入框仍由上层控制。

:::demo 多值输入
field/example-04
:::

## 范围分段

`FieldSegment` 用于 DateRangePicker、TimeRangePicker、范围数值输入等场景。外层 FieldRoot 仍负责整体边框和 ring；分段在内部输入聚焦时会显示 active 视觉，上层也可以在弹层打开等受控场景传入 `active`。

:::demo 范围分段
field/example-05
:::

## 组合输入

`FieldGroup` 只负责组合容器，具体按钮、addon、分割线和业务行为由上层组件决定。

:::demo 组合输入
field/example-06
:::

## Props

### FieldRoot

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | 输入域尺寸 |
| `status` | `'error' \| 'warning' \| 'success'` | — | 校验状态 |
| `disabled` | `boolean` | `false` | 禁用输入域 |
| `readonly` | `boolean` | `false` | 只读输入域 |
| `focused` | `boolean` | `false` | 聚焦视觉状态 |
| `active` | `boolean` | `false` | 激活/展开视觉状态 |
| `multiline` | `boolean` | `false` | 多行或多值输入域 |

### FieldNativeInput

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `model-value` | `string \| number` | `''` | v-model 绑定值 |
| `type` | `string` | `'text'` | 原生 input type |
| `placeholder` | `string` | `''` | 占位文本 |
| `disabled` | `boolean` | `false` | 禁用 |
| `readonly` | `boolean` | `false` | 只读 |
| `maxlength` | `number` | — | 最大字符数 |
| `name` | `string` | `''` | 原生 name |
| `autofocus` | `boolean` | `false` | 原生 autofocus |
| `autocomplete` | `string` | `''` | 原生 autocomplete |
| `aria-label` | `string` | `''` | 无障碍标签 |

### FieldContent

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `multiline` | `boolean` | 继承 FieldRoot | 多行或多值内容布局 |
| `tag` | `'span' \| 'div'` | 根据 `multiline` 推导 | 渲染标签 |

### FieldPrefix / FieldSuffix

无专用 Props。未声明属性会透传到外层 `span`，外部 `class` 后置合并，可用于补充图标尺寸、单位文本或自定义辅助内容。

### FieldAction

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | 原生 button type |
| `disabled` | `boolean` | `false` | 禁用动作位；也会继承 FieldRoot disabled |
| `active` | `boolean` | `false` | 激活动作位文本色 |

### FieldGroup

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `disabled` | `boolean` | `false` | 组合容器禁用视觉和鼠标状态 |

### FieldSegment

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `tag` | `'span' \| 'div' \| 'button'` | `'span'` | 渲染标签；为 `button` 时自动补 `type="button"` |
| `active` | `boolean` | `false` | 激活分段文本色 |
| `disabled` | `boolean` | `false` | 禁用分段；也会继承 FieldRoot disabled |
| `readonly` | `boolean` | `false` | 只读分段交互视觉 |

## Events

### FieldNativeInput

`FieldNativeInput` 会把未声明的属性和原生事件透传到内部 `input`，因此可以直接监听
`@input`、`@change`、`@focus`、`@blur`、`@keydown` 等原生事件。

| 事件 | 参数 | 说明 |
|------|------|------|
| `update:model-value` | `string` | v-model 更新 |
| `enter` | `KeyboardEvent` | 按下 Enter 时额外触发 |
