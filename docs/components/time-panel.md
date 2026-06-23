# TimePanel 时间面板

TimePanel 是公开底层时间列面板，只负责小时、分钟、秒、毫秒和 AM/PM 的列选择。它不处理日期、自由输入解析、范围选择、浮层触发、输入框状态、确认操作或表单接入；这些能力留给后续上层输入组件组合。

视觉上它使用轻浮层 surface，不给列增加盒状边框，靠列间距和选中块表达结构。选中项为实心 brand，hover / focus 为浅 brand，禁用项使用 disabled text。

## 基本用法

默认 `format` 为 `HH:mm`，点击选项会立即提交 `update:modelValue` 和 `change`。

:::demo 基本用法
time-panel/example-01
:::

## 格式与步长

`format` 决定显示列：包含 `ss` 时显示秒列，包含 `SSS` 时显示毫秒列。`steps` 默认为 `[1, 1, 1, 1]`，分别控制小时、分钟、秒、毫秒步长；隐藏列对应步长会被忽略。

:::demo 格式与步长
time-panel/example-02
:::

## 12 小时制与暴露方法

`hh:mm A`、`hh:mm:ss A` 和 `hh:mm:ss:SSS A` 会显示 12 小时列与 AM/PM 列，并按当前格式输出值。TimePanel 不渲染 Now、Clear、OK 或 Cancel 操作；上层组件可以通过 Expose 方法组合这些操作。

:::demo 12 小时制与暴露方法
time-panel/example-03
:::

## 禁用时间

通过 `disabledTime` 可以按列禁用 hour、minute、second、millisecond 或 meridiem。回调会收到当前候选值的上下文，便于组合多列规则。

:::demo 禁用时间
time-panel/example-04
:::

## 支持格式

| 格式 | 显示列 | 输出示例 |
| --- | --- | --- |
| `HH:mm` | hour、minute | `14:30` |
| `HH:mm:ss` | hour、minute、second | `14:30:05` |
| `HH:mm:ss:SSS` | hour、minute、second、millisecond | `14:30:05:120` |
| `hh:mm A` | hour、minute、meridiem | `02:30 PM` |
| `hh:mm:ss A` | hour、minute、second、meridiem | `02:30:05 PM` |
| `hh:mm:ss:SSS A` | hour、minute、second、millisecond、meridiem | `02:30:05:120 PM` |

## API

### Props

| Prop | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `modelValue` | `string \| null` | `null` | 受控值，必须符合当前 `format` |
| `format` | `TimePanelFormat` | `'HH:mm'` | 控制输出格式和显示列 |
| `steps` | `[number, number, number, number]` | `[1, 1, 1, 1]` | 小时、分钟、秒、毫秒步长 |
| `disabledTime` | `TimePanelDisabledTime` | - | 禁用某一列的候选项 |
| `aria-label` | `string` | `'Time panel'` | 面板可访问名称 |

### Events

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| `update:modelValue` | `string \| null` | 外部值更新 |
| `change` | `string \| null` | 已提交的值变化 |

### Expose

| 方法 | 返回值 | 说明 |
| --- | --- | --- |
| `focus()` | `void` | 聚焦面板根节点 |
| `scrollToActive(behavior?)` | `void` | 将已选项滚动到视口中心 |
| `getValue()` | `string \| null` | 获取当前格式化值 |
| `getParts()` | `TimePanelValueParts \| null` | 获取当前时间拆分值 |
| `setValue(value)` | `string \| null` | 按当前格式设置值；无效值会清空选择 |
| `setNow()` | `string` | 按当前格式和步长设置当前时间 |
| `clear()` | `null` | 清空当前选择 |

### 类型

```ts
type TimePanelFormat =
  | 'HH:mm'
  | 'HH:mm:ss'
  | 'HH:mm:ss:SSS'
  | 'hh:mm A'
  | 'hh:mm:ss A'
  | 'hh:mm:ss:SSS A'

type TimePanelUnit = 'hour' | 'minute' | 'second' | 'millisecond' | 'meridiem'
type TimePanelSteps = [number, number, number, number]

type TimePanelDisabledTime = (
  unit: TimePanelUnit,
  value: number | 'AM' | 'PM',
  context: TimePanelDisabledTimeContext,
) => boolean
```

## 键盘

面板聚焦后，`ArrowUp` / `ArrowDown` 在当前列移动，`ArrowLeft` / `ArrowRight` 切换列，`Home` / `End` 到列首尾，`Enter` 选择当前项。
