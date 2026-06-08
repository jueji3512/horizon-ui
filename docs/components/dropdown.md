# Dropdown 下拉菜单

用于从触发器展开一组操作项。首版采用 slot 子组件驱动，通过 `DropdownItem`、`DropdownGroup` 与 `DropdownDivider` 组织菜单；Dropdown 负责触发、定位、菜单 surface、方向键导航与关闭策略。

## 基本用法

通过 `#trigger` 放入触发器，默认插槽放入菜单项；选择菜单项后触发 `select` 并关闭弹层。

:::demo 基本用法
dropdown/example-01
:::

## 禁用状态

菜单项可单独禁用；Dropdown 设置 `disabled` 后不会打开。

:::demo 禁用状态
dropdown/example-02
:::

## 分组与分割线

使用 `DropdownGroup` 和 `DropdownDivider` 组织复杂菜单。

:::demo 分组与分割线
dropdown/example-03
:::

## 触发方式

默认点击触发，也可以使用 `hover`、`focus` 或 `manual`。`trigger` 只决定触发器如何打开或切换菜单；外部点击与 Esc 是否关闭由 `close-on-outside-click` 和 `close-on-esc` 独立控制。

:::demo 触发方式
dropdown/example-04
:::

## 匹配宽度

设置 `match-width` 后，菜单宽度与触发器一致。

:::demo 匹配宽度
dropdown/example-05
:::

## 滚动菜单

设置 `max-height` 后，菜单会通过 ScrollArea 限制高度。

:::demo 滚动菜单
dropdown/example-06
:::

## Props

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `visible` | `boolean` | - | v-model:visible 受控显隐 |
| `trigger` | `'hover' \| 'click' \| 'focus' \| 'manual'` | `'click'` | 触发方式 |
| `placement` | `Placement` | `'bottom-start'` | 弹层位置 |
| `offset` | `number` | `4` | 触发器与菜单间距 |
| `disabled` | `boolean` | `false` | 禁用触发 |
| `close-on-outside-click` | `boolean` | `true` | 点击菜单和触发器外部时关闭 |
| `close-on-esc` | `boolean` | `true` | 按 Esc 时关闭 |
| `show-delay` | `number` | `0` | 显示延时 |
| `hide-delay` | `number` | `0` | 隐藏延时 |
| `to` | `string \| HTMLElement` | `'body'` | Teleport 目标 |
| `flip` | `boolean` | `true` | 空间不足时翻转 |
| `shift` | `boolean` | `false` | 溢出视口时推回可见区域 |
| `match-width` | `boolean` | `false` | 菜单宽度匹配触发器 |
| `strategy` | `'absolute' \| 'fixed'` | `'absolute'` | 定位策略 |
| `auto-update` | `boolean` | `true` | 触发器变化时自动更新定位 |
| `z-index` | `number` | 自动递增 | 弹层层级 |
| `max-height` | `number \| string` | - | 菜单最大高度，设置后使用 ScrollArea |
| `max-width` | `number \| string` | - | 菜单最大宽度 |
| `panel-class` | `string` | `''` | 菜单 surface 额外 class |

## DropdownItem

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `value` | `string \| number` | - | 菜单项值，选择时随 `select` 事件抛出 |
| `label` | `string` | - | 无障碍与内部文本；不传时从默认插槽文本提取 |
| `disabled` | `boolean` | `false` | 禁用菜单项 |
| `icon` | `string` | `''` | 左侧图标名称 |
| `theme` | `'default' \| 'error'` | `'default'` | 菜单项语义主题 |

## DropdownGroup

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `title` | `string` | - | 分组标题 |
| `disabled` | `boolean` | `false` | 禁用组内所有菜单项 |

## Slots

| Slot | 参数 | 说明 |
|------|------|------|
| `trigger` | `{ visible, disabled, close }` | 触发器内容 |
| `default` | - | 菜单子组件 |

## Events

| 事件 | 参数 | 说明 |
|------|------|------|
| `update:visible` | `boolean` | v-model 更新 |
| `visible-change` | `boolean` | 显隐变化 |
| `select` | `string \| number` | 选择菜单项 |
