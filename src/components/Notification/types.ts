import type { ProgressStatus } from '../Progress'

export type NotificationType = 'info' | 'success' | 'warning' | 'error' | 'loading'

export type NotificationPlacement = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'

export type NotificationKey = string | number

export type NotificationCloseReason = 'timeout' | 'close' | 'api' | 'overflow'

export interface NotificationProgressConfig {
  percent: number
  status?: ProgressStatus
}

export interface NotificationAction {
  label: string
  onClick: () => void
}

export interface NotificationOptions {
  title: string
  content?: string
  key?: NotificationKey
  duration?: number
  closable?: boolean
  placement?: NotificationPlacement
  progress?: NotificationProgressConfig
  action?: NotificationAction
  onClose?: () => void
}

export interface NotificationConfig {
  duration?: number
  closable?: boolean
  max?: number
  top?: number
  bottom?: number
  zIndex?: number
  placement?: NotificationPlacement
}

export interface NotificationHandle {
  close: () => void
}

export type NotificationInput = string | NotificationOptions

export interface NotificationApi {
  info: (input: NotificationInput) => NotificationHandle
  success: (input: NotificationInput) => NotificationHandle
  warning: (input: NotificationInput) => NotificationHandle
  error: (input: NotificationInput) => NotificationHandle
  loading: (input: NotificationInput) => NotificationHandle
  close: (key: NotificationKey) => void
  closeAll: () => void
  config: (options: NotificationConfig) => void
}

export interface NotificationRecord extends Required<
  Pick<NotificationOptions, 'title' | 'closable' | 'placement'>
> {
  id: number
  type: NotificationType
  content?: string
  key?: NotificationKey
  duration: number
  progress?: NotificationProgressConfig
  action?: NotificationAction
  onClose?: () => void
  timer?: number
}

export type NotificationResolvedConfig = Required<NotificationConfig>

export interface NotificationState {
  notifications: NotificationRecord[]
  config: NotificationResolvedConfig
}
