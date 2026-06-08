# Menu 菜单

Menu 是动作与命令菜单的内容原语，用于表达一组可执行命令、可勾选设置、单选设置和子菜单。导航类组件后续由 NavigationMenu 承担，Menu 不提供路由选中态或 `selectedKeys`。

## 基础用法

普通菜单项选择后会触发 `select` 事件。

:::demo 基础用法
menu/example-01
:::

## 勾选菜单项

`MenuCheckboxItem` 用于菜单里的独立开关项，默认选择后不关闭外层菜单。

:::demo 勾选菜单项
menu/example-02
:::

## 单选菜单项

`MenuRadioGroup` 与 `MenuRadioItem` 用于菜单里的单选设置，例如密度、排序方式或导出格式。

:::demo 单选菜单项
menu/example-03
:::

## 子菜单

`MenuSub` 用于动作层级，例如“导出为”或“移动到”。如果是表单值选择或层级数据选择，应使用 Select、Cascader 或 TreeSelect。

:::demo 子菜单
menu/example-04
:::

## 关闭行为

普通 `MenuItem` 默认选择后关闭外层菜单；`MenuCheckboxItem` 和 `MenuRadioItem` 默认不关闭，可通过 `close-on-select` 覆盖。

:::demo 关闭行为
menu/example-05
:::

## Props

### Menu

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `aria-label` | `string` | `''` | 菜单无障碍名称 |
| `loop` | `boolean` | `true` | 方向键是否循环 |
| `disabled` | `boolean` | `false` | 禁用整个菜单 |

### MenuItem

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `value` | `string \| number` | - | 菜单项值 |
| `label` | `string` | - | typeahead 与无障碍标签 |
| `disabled` | `boolean` | `false` | 禁用项 |
| `icon` | `string` | `''` | 左侧图标 |
| `theme` | `'default' \| 'error'` | `'default'` | 语义主题 |
| `close-on-select` | `boolean` | `true` | 选择后是否关闭外层浮层 |

### MenuCheckboxItem

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `checked` | `boolean` | `false` | `v-model:checked` 勾选状态 |
| `close-on-select` | `boolean` | `false` | 选择后是否关闭外层浮层 |

### MenuRadioGroup

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `model-value` | `string \| number \| null` | `null` | `v-model` 单选值 |
| `label` | `string` | `''` | 分组标签 |

### MenuSub

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `open-delay` | `number` | `0` | 打开延时 |
| `close-delay` | `number` | `120` | 关闭延时 |

## Keyboard

| 按键 | 行为 |
|------|------|
| `ArrowDown` / `ArrowUp` | 移动 active 项 |
| `Home` / `End` | 跳到首个 / 最后一个可用项 |
| `Enter` / `Space` | 触发 active 项 |
| `ArrowRight` | 打开 active 子菜单 |
| `ArrowLeft` | 在子菜单内返回上一级 |
| `Escape` | 关闭当前菜单浮层 |
