# Form 表单

Form / FormItem 用于组织企业后台里的字段录入、校验和字段级状态。

首版默认采用左侧 label 的企业表单模型：`labelAlign="right"`，`labelWidth=120`，label 文字右对齐，控件区下方保留一行状态文案位置。

## 基本用法

`help` 不渲染在控件下方，它会作为 label 问号提示的默认内容。控件下方的消息行只显示 `message` 或校验状态文案，并默认保留高度，避免校验后页面跳动。

:::demo 基本用法
form/example-01
:::

## Label 对齐

`labelAlign` 支持 `right`、`left`、`top`。`right` 是默认值，`left/right` 都使用左侧 label 区，`top` 不使用 `labelWidth`。

:::demo Label 对齐
form/example-02
:::

## 校验

Form 内置轻量校验能力，支持 `required`、同步/异步 `validator` 和 `trigger`。默认触发为 `change` 与 `blur`。

:::demo 校验
form/example-03
:::

## Props

### Form

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `model` | `Record<string, unknown>` | - | 表单数据 |
| `rules` | `FormRules` | `{}` | 表单校验规则 |
| `labelAlign` | `'left' \| 'right' \| 'top'` | `'right'` | label 对齐方式 |
| `labelWidth` | `number \| string` | `120` | 左侧 label 区宽度 |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | 表单控件默认尺寸 |
| `disabled` | `boolean` | `false` | 禁用表单内控件 |
| `readonly` | `boolean` | `false` | 只读表单内控件 |
| `showStatusIcon` | `boolean` | `true` | 是否显示内置状态图标 |

### FormItem

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `name` | `string \| Array<string \| number>` | - | 字段路径，支持 `user.email` 与 `['user', 'email']` |
| `label` | `string` | `''` | label 文案 |
| `required` | `boolean` | `false` | 是否显示必填星号并加入 required 规则 |
| `rules` | `FormRule \| FormRule[]` | - | 字段级校验规则 |
| `help` | `string` | `''` | label 问号提示内容，不进入消息行 |
| `message` | `string` | `''` | 手动状态文案 |
| `status` | `'error' \| 'warning' \| 'success'` | - | 手动状态 |
| `tip` | `string` | `''` | label 问号提示内容，优先级高于 `help` |
| `labelAlign` | `'left' \| 'right' \| 'top'` | 继承 Form | 单项覆盖 label 对齐 |
| `labelWidth` | `number \| string` | 继承 Form | 单项覆盖 label 宽度 |
| `showStatusIcon` | `boolean` | 继承 Form | 单项覆盖状态图标显示 |

## FormRule

| 字段 | 类型 | 说明 |
|------|------|------|
| `required` | `boolean` | 是否必填 |
| `message` | `string` | 校验失败文案 |
| `trigger` | `'change' \| 'blur' \| Array<'change' \| 'blur'>` | 触发时机，默认 change + blur |
| `validator` | `(value, model) => boolean \| string \| Error \| void \| Promise<...>` | 自定义同步/异步校验 |

## Expose

| 方法 | 参数 | 说明 |
|------|------|------|
| `validate` | - | 校验所有字段 |
| `validateField` | `name` | 校验单个字段，`['user', 'email']` 会被视为一个字段路径 |
| `validateFields` | `names?` | 校验多个字段；不传时校验所有字段 |
| `resetField` | `name` | 重置单个字段值并清除校验 |
| `resetFields` | `names?` | 重置多个字段值并清除校验；不传时重置所有字段 |
| `clearValidateField` | `name` | 清除单个字段校验状态 |
| `clearValidate` | `names?` | 清除多个字段校验状态；不传时清除所有字段 |

## Slots

| 插槽 | 说明 |
|------|------|
| `FormItem#label` | 自定义 label 内容 |
| `FormItem#tip` | 自定义问号提示内容 |
| `FormItem#message` | 自定义状态消息行 |
| `FormItem#action` | 字段右侧操作区 |
