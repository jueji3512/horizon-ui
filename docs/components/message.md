# Message 全局提示

Message 是短暂的全局 toast，用于反馈一次操作的结果或进度。它只提供命令式 API，不提供用户态组件；同一个 `key` 的消息会更新已有项并重置关闭计时。

## 基础用法

调用不同状态方法即可在页面顶部居中显示提示。

:::demo 基础用法
message/example-01
:::

## Loading 替换

`message.loading()` 默认 `duration: 0`，适合配合 `key` 在异步流程结束后替换为成功或失败状态。

:::demo Loading 替换
message/example-02
:::

## 持久提示

传入 `duration: 0` 可以保留提示；用户可以点提示右侧的关闭按钮，也可以通过返回的 handle 主动关闭。

:::demo 持久提示
message/example-03
:::

## 指定关闭

只有设置了 `key` 的消息可以通过 `message.close(key)` 关闭；找不到对应消息时不会产生副作用。

:::demo 指定关闭
message/example-04
:::

## 全局配置

`message.config()` 可调整默认时长、是否显示关闭按钮、最大堆叠数量、顶部距离和层级。

:::demo 全局配置
message/example-05
:::

## API

| 方法 | 参数 | 说明 |
|------|------|------|
| `message.info` | `string \| MessageOptions` | 显示信息提示 |
| `message.success` | `string \| MessageOptions` | 显示成功提示 |
| `message.warning` | `string \| MessageOptions` | 显示警告提示 |
| `message.error` | `string \| MessageOptions` | 显示错误提示 |
| `message.loading` | `string \| MessageOptions` | 显示加载提示，默认 `duration: 0` |
| `message.close` | `string \| number` | 关闭指定 `key` 的消息 |
| `message.closeAll` | `()` | 关闭所有当前消息 |
| `message.config` | `MessageConfig` | 合并全局配置 |

## MessageOptions

| 字段 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `content` | `string` | - | 提示文本 |
| `key` | `string \| number` | - | 消息唯一标识，同 `key` 会更新已有消息 |
| `duration` | `number` | `3000` | 自动关闭时长，单位毫秒；`0` 表示不自动关闭 |
| `closable` | `boolean` | `true` | 是否显示关闭按钮 |
| `onClose` | `() => void` | - | 消息关闭后的回调 |

## MessageConfig

| 字段 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `duration` | `number` | `3000` | 普通消息默认自动关闭时长 |
| `closable` | `boolean` | `true` | 默认是否显示关闭按钮 |
| `max` | `number` | `5` | 最大堆叠数量，超出时关闭最早的消息 |
| `top` | `number` | `24` | 距离视口顶部的像素值 |
| `zIndex` | `number` | `3000` | Message host 层级 |
