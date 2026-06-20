# Notification 通知

Notification 用于展示较持久、结构化的全局通知，适合任务状态、系统提醒和需要标题 / 正文的信息反馈。它只提供命令式 API，不提供用户态组件；同一个 `key` 的通知会更新已有项并重置关闭计时。

Notification 使用固定宽度卡片，桌面端宽度为 360px，窄屏下会收缩到视口内。标题、正文和进度文案变化时只发生内部换行，不改变通知宽度。

## 基础用法

调用不同状态方法即可在页面四角显示通知。默认位置为右上角。

:::demo 基础用法
notification/example-01
:::

## Loading 进度

`notification.loading()` 默认 `duration: 0`，适合配合 `key` 持续更新任务进度。`progress` 表示任务完成度，内部使用线性 `Progress`；`progress.status` 会直接传给 `Progress`，用于在同一条 loading 通知里表达成功、警告或错误结果，并保留进度条。

:::demo Loading 进度
notification/example-02
:::

## 通知位置

通过 `placement` 可以指定通知出现的位置，支持四个角落。

:::demo 通知位置
notification/example-03
:::

## 持久通知

传入 `duration: 0` 可以保留通知；用户可以点击关闭按钮，也可以通过 `notification.close(key)` 或返回的 handle 主动关闭。

:::demo 持久通知
notification/example-04
:::

## 全局配置

`notification.config()` 可调整默认时长、是否显示关闭按钮、最大数量、边距、层级和默认位置。

:::demo 全局配置
notification/example-05
:::

## API

| 方法 | 参数 | 说明 |
|------|------|------|
| `notification.info` | `string \| NotificationOptions` | 显示信息通知 |
| `notification.success` | `string \| NotificationOptions` | 显示成功通知 |
| `notification.warning` | `string \| NotificationOptions` | 显示警告通知 |
| `notification.error` | `string \| NotificationOptions` | 显示错误通知 |
| `notification.loading` | `string \| NotificationOptions` | 显示加载通知，默认 `duration: 0` |
| `notification.close` | `string \| number` | 关闭指定 `key` 的通知 |
| `notification.closeAll` | `()` | 关闭所有当前通知 |
| `notification.config` | `NotificationConfig` | 合并全局配置 |

## NotificationOptions

| 字段 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `title` | `string` | - | 通知标题 |
| `content` | `string` | - | 通知正文 |
| `key` | `string \| number` | - | 通知唯一标识，同 `key` 会更新已有通知 |
| `duration` | `number` | `4500` | 自动关闭时长，单位毫秒；`0` 表示不自动关闭 |
| `closable` | `boolean` | `true` | 是否显示关闭按钮 |
| `placement` | `'top-left' \| 'top-right' \| 'bottom-left' \| 'bottom-right'` | `'top-right'` | 通知位置 |
| `progress` | `{ percent: number; status?: ProgressStatus }` | - | 任务进度配置，`status` 复用 `Progress` 状态 |
| `action` | `{ label: string; onClick: () => void }` | - | 右下角操作按钮 |
| `onClose` | `() => void` | - | 通知关闭后的回调 |

## NotificationConfig

| 字段 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `duration` | `number` | `4500` | 普通通知默认自动关闭时长 |
| `closable` | `boolean` | `true` | 默认是否显示关闭按钮 |
| `max` | `number` | `4` | 最大通知数量，超出时关闭最早的通知 |
| `top` | `number` | `24` | 顶部位置距离视口的像素值 |
| `bottom` | `number` | `24` | 底部位置距离视口的像素值 |
| `zIndex` | `number` | `3000` | Notification host 层级 |
| `placement` | `'top-left' \| 'top-right' \| 'bottom-left' \| 'bottom-right'` | `'top-right'` | 默认通知位置 |
