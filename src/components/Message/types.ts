export type MessageType = 'info' | 'success' | 'warning' | 'error' | 'loading'

export type MessageKey = string | number

export type MessageCloseReason = 'timeout' | 'close' | 'api' | 'overflow'

export interface MessageOptions {
  content: string
  key?: MessageKey
  duration?: number
  closable?: boolean
  onClose?: () => void
}

export interface MessageConfig {
  duration?: number
  closable?: boolean
  max?: number
  top?: number
  zIndex?: number
}

export interface MessageHandle {
  close: () => void
}

export type MessageInput = string | MessageOptions

export interface MessageApi {
  info: (input: MessageInput) => MessageHandle
  success: (input: MessageInput) => MessageHandle
  warning: (input: MessageInput) => MessageHandle
  error: (input: MessageInput) => MessageHandle
  loading: (input: MessageInput) => MessageHandle
  close: (key: MessageKey) => void
  closeAll: () => void
  config: (options: MessageConfig) => void
}

export interface MessageRecord extends Required<Pick<MessageOptions, 'content' | 'closable'>> {
  id: number
  type: MessageType
  key?: MessageKey
  duration: number
  onClose?: () => void
  timer?: number
}

export type MessageResolvedConfig = Required<MessageConfig>

export interface MessageState {
  messages: MessageRecord[]
  config: MessageResolvedConfig
}
