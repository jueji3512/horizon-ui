# DropdownMenu 下拉菜单

DropdownMenu 是 `Popover + Menu` 的菜单型预设，用于从按钮、头像或其他触发器打开一组动作命令。它负责触发、定位、关闭衔接和菜单浮层 surface；菜单内容必须显式写入 `Menu`。

## 基础用法

使用 `DropdownMenuTrigger` 声明触发器，使用 `DropdownMenuContent` 放置显式 `Menu`。

:::demo 基础用法
dropdown-menu/example-01
:::

## 勾选设置

`MenuCheckboxItem` 默认选择后不关闭菜单，适合连续调整视图设置。

:::demo 勾选设置
dropdown-menu/example-02
:::

## 单选设置

`MenuRadioGroup` 适合菜单中的密度、排序方式等单选模式。

:::demo 单选设置
dropdown-menu/example-03
:::

## 子菜单

`MenuSub` 可以在 DropdownMenu 中表达动作层级。

:::demo 子菜单
dropdown-menu/example-04
:::

## 受控模式

DropdownMenu 使用 `v-model:open` 管理开关状态，公开状态命名与 Popover 保持一致。

:::demo 受控模式
dropdown-menu/example-05
:::

## Props

### DropdownMenu

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `open` | `boolean` | - | `v-model:open` 受控开关 |
| `trigger` | `'click' \| 'hover' \| 'focus' \| 'manual'` | `'click'` | 触发方式 |
| `placement` | `Placement` | `'bottom-start'` | 浮层位置 |
| `offset` | `number` | `4` | 触发器与菜单间距 |
| `open-delay` | `number` | `0` | 打开延时 |
| `close-delay` | `number` | `0` | 关闭延时 |
| `disabled` | `boolean` | `false` | 禁用触发 |
| `close-on-outside-click` | `boolean` | `true` | 点击外部时关闭 |
| `close-on-esc` | `boolean` | `true` | 按 Esc 时关闭 |
| `return-focus-on-close` | `boolean` | `true` | 关闭后焦点回到触发器 |
| `to` | `string \| HTMLElement` | `'body'` | Teleport 目标 |
| `flip` | `boolean` | `true` | 空间不足时自动翻转 |
| `shift` | `boolean` | `false` | 空间不足时沿视口吸边 |
| `match-width` | `boolean` | `false` | 菜单宽度匹配触发器 |
| `strategy` | `'absolute' \| 'fixed'` | `'absolute'` | Floating UI 定位策略 |
| `auto-update` | `boolean` | `true` | 打开后自动更新定位 |
| `z-index` | `number` | - | 自定义浮层层级 |

### DropdownMenuTrigger

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `as-child` | `boolean` | `false` | 将触发属性合并到唯一子节点 |

### DropdownMenuContent

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `panel-class` | `string` | `''` | 菜单 surface 额外 class |
| `min-width` | `number \| string` | - | 最小宽度 |
| `max-width` | `number \| string` | - | 最大宽度 |

## 边界

- `DropdownMenu` 只承载显式 `Menu`，不作为任意内容浮层。
- 任意内容浮层使用 Popover。
- 导航菜单后续使用 NavigationMenu。
- 右键菜单后续使用 ContextMenu，并复用 Menu 内容原语。
