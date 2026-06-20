# Progress 进度条

Progress 用于展示可量化任务的完成比例。首版只表达确定百分比；如果任务没有可计算的百分比，应先使用 loading 图标或其他反馈方式。

## 线性进度

线性进度条默认不显示标签，适合嵌入表格、卡片和后续 Notification loading 场景。

:::demo 线性进度
progress/example-01
:::

## 环形进度

使用 `variant="circle"` 切换为环形进度。默认环形进度显示百分比标签；设置 `status` 后默认显示状态图标，适合独立展示当前任务完成度。

:::demo 环形进度
progress/example-02
:::

## 结果状态

进度槽统一使用组件背景色 token；`status` 表达任务结果态，不传时使用默认 brand 进度色。线性进度使用填充圆形状态图标，环形进度使用无圆底状态图标。`success`、`warning`、`error` 默认显示状态图标而不是百分比标签；如果需要文案，可以通过 `#label` 自定义。完成语义不会根据 `percent` 自动切换，需要调用方显式传入 `status="success"`。

:::demo 结果状态
progress/example-03
:::

## 自定义颜色

`color` 只覆盖进度填充色，轨道仍使用组件背景色，标签和状态图标仍跟随 `status`。

:::demo 自定义颜色
progress/example-04
:::

## 尺寸

`size` 支持 `sm`、`md`、`lg` 预设，也支持对象式自定义，例如 `:size="{ diameter: 120 }"`。对象字段未传时回退到 `md`：`thickness` 在线性进度中表示轨道高度，在环形进度中表示 stroke 宽度；`labelSize` 表示标签字号 px，状态图标基于同一字号缩放，线性为 `1em`、环形为 `2.4em`；`diameter` 表示环形直径，只对 `variant="circle"` 生效。

:::demo 尺寸
progress/example-05
:::

## 边界值

`percent` 会被限制在 0 到 100 之间。`active` 默认为 `true`，线性和环形进度仅在未设置 `status` 且进度未满时显示流动动画；线性进度在填充区内扫光，环形进度使用渐变 stroke 从起点沿已完成弧线流向当前进度位置。状态进度不显示流动动画。设置 `:active="false"` 可关闭动画。

:::demo 边界值
progress/example-06
:::

## 动态更新

`percent` 是完全受控的数值，可以由轮询、上传回调、任务队列或本地计时器持续更新。线性和环形形态可以共享同一个进度值；任务完成后由调用方显式切换到 `status="success"`。

:::demo 动态更新
progress/example-07
:::

## API

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `variant` | `'line' \| 'circle'` | `'line'` | 进度条形态 |
| `percent` | `number` | `0` | 进度百分比，会限制在 0 到 100 |
| `status` | `'success' \| 'warning' \| 'error'` | - | 结果状态；不传时使用默认 brand 进度色 |
| `size` | `'sm' \| 'md' \| 'lg' \| ProgressSizeConfig` | `'md'` | 尺寸预设或对象式自定义 |
| `active` | `boolean` | `true` | brand 线性和环形进度未满时是否显示流动动画 |
| `color` | `string` | - | 自定义进度填充色 |
| `show-label` | `boolean` | 线性为 `false`，brand 环形为 `true` | 是否显示百分比标签；显示标签时不会同时显示状态图标 |
| `label` | `string` | `${percent}%` | 自定义标签文案 |
| `aria-label` | `string` | - | 无外部标签时的可访问名称 |

```ts
type ProgressSizeConfig = {
  /**
   * line: track height
   * circle: stroke width
   */
  thickness?: number

  /**
   * Label font size in px.
   * Status icon follows the same px size.
   */
  labelSize?: number

  /**
   * Circle diameter in px. Only for variant="circle".
   */
  diameter?: number
}
```

## Slots

| Slot | 说明 |
|------|------|
| `label` | 自定义标签内容。显示 label 时不会同时显示状态图标，slot props 包含 `percent`、`roundedPercent` 与 `status`。 |
