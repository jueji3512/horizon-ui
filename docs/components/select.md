# Select 选择器

用于从固定候选项中选择一个值。首版采用 slot 子组件驱动，通过 `SelectOption` 与 `SelectOptionGroup` 声明选项；数据源便捷写法后续再单独评估。

## 基本用法

`v-model` 绑定 `string | number | null` 值。

:::demo 基本用法
select/example-01
:::

## 尺寸 Size

`sm` / `md`（默认）/ `lg` 三档。

:::demo 尺寸 Size
select/example-02
:::

## 可清空

设置 `clearable`，有值时悬停选择器显示清空按钮，清空后值为 `null`。

:::demo 可清空
select/example-03
:::

## 禁用与只读

禁用态不可聚焦、不可展开；只读态可聚焦但不可展开或修改。

:::demo 禁用与只读
select/example-04
:::

## 状态 Status

`status` 设置校验状态，影响边框和聚焦 ring。

:::demo 状态 Status
select/example-05
:::

## 禁用选项

单个选项可通过 `disabled` 禁止选择。

:::demo 禁用选项
select/example-06
:::

## 分组选项

`SelectOptionGroup` 渲染分组标题，分组自身不可选；设置 `disabled` 会禁用组内所有选项。

:::demo 分组选项
select/example-08
:::

## 加载与空状态

`loading` 展示加载状态；没有可用 `SelectOption` 时展示 `empty-text`。

:::demo 加载与空状态
select/example-07
:::

## Props

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `model-value` | `string \| number \| null` | `null` | v-model 绑定值 |
| `placeholder` | `string` | `'请选择'` | 占位文本 |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | 尺寸 |
| `status` | `'error' \| 'warning' \| 'success'` | - | 校验状态 |
| `disabled` | `boolean` | `false` | 禁用 |
| `readonly` | `boolean` | `false` | 只读 |
| `clearable` | `boolean` | `false` | 可清空 |
| `loading` | `boolean` | `false` | 加载状态 |
| `empty-text` | `string` | `'暂无数据'` | 空状态文本 |
| `name` | `string` | `''` | 隐藏 input 的 name |
| `aria-label` | `string` | `''` | 无障碍标签 |
| `placement` | `Placement` | `'bottom-start'` | 弹层位置 |
| `z-index` | `number` | 自动递增 | 弹层 z-index |

## SelectOption

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `value` | `string \| number` | - | 选项值，需唯一 |
| `label` | `string` | - | 触发器展示与无障碍文本；不传时从默认插槽文本提取 |
| `disabled` | `boolean` | `false` | 禁用选项 |

## SelectOptionGroup

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `title` | `string` | - | 分组标题 |
| `disabled` | `boolean` | `false` | 禁用组内所有选项 |

## Events

| 事件 | 参数 | 说明 |
|------|------|------|
| `update:model-value` | `string \| number \| null` | v-model 更新 |
| `change` | `string \| number \| null` | 值变化时触发 |
| `focus` | `FocusEvent` | 聚焦 |
| `blur` | `FocusEvent` | 失焦 |
| `clear` | - | 点击清空按钮时触发 |
| `visible-change` | `boolean` | 展开状态变化 |
