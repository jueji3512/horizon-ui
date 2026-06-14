import { createApp, reactive } from 'vue'
import MessageHost from './MessageHost.vue'
import type {
  MessageApi,
  MessageCloseReason,
  MessageConfig,
  MessageHandle,
  MessageInput,
  MessageKey,
  MessageOptions,
  MessageRecord,
  MessageResolvedConfig,
  MessageState,
  MessageType,
} from './types'

const defaultConfig: MessageResolvedConfig = {
  duration: 3000,
  closable: true,
  max: 5,
  top: 24,
  zIndex: 3000,
}

const noopHandle: MessageHandle = {
  close: () => {},
}

let seed = 0
let hostMounted = false
let hostElement: HTMLDivElement | null = null

const state = reactive<MessageState>({
  messages: [],
  config: { ...defaultConfig },
})

function isDomAvailable() {
  return typeof document !== 'undefined'
}

function ensureHost() {
  if (!isDomAvailable()) return false
  if (hostMounted) return true

  hostElement = document.createElement('div')
  hostElement.setAttribute('data-horizon-message-host', '')
  hostElement.setAttribute('data-horizon-teleport-layer', '')
  document.body.appendChild(hostElement)

  createApp(MessageHost, {
    state,
    onClose: closeMessage,
  }).mount(hostElement)

  hostMounted = true
  return true
}

function normalizeInput(input: MessageInput): MessageOptions {
  return typeof input === 'string' ? { content: input } : input
}

function findMessageIndexByKey(key: MessageKey) {
  return state.messages.findIndex((item) => item.key === key)
}

function clearMessageTimer(message: MessageRecord) {
  if (message.timer) {
    window.clearTimeout(message.timer)
    message.timer = undefined
  }
}

function resetMessageTimer(message: MessageRecord) {
  clearMessageTimer(message)
  if (message.duration <= 0) return

  message.timer = window.setTimeout(() => {
    closeMessage(message.id, 'timeout')
  }, message.duration)
}

function closeMessage(id: number, reason: MessageCloseReason) {
  const index = state.messages.findIndex((item) => item.id === id)
  if (index === -1) return

  const [target] = state.messages.splice(index, 1)
  clearMessageTimer(target)

  // Keep all close paths centralized so future beforeClose timing can be added here.
  void reason
  target.onClose?.()
}

function trimOverflow() {
  const max = Math.max(1, state.config.max)
  while (state.messages.length > max) {
    closeMessage(state.messages[0].id, 'overflow')
  }
}

function createMessage(type: MessageType, input: MessageInput): MessageHandle {
  if (!ensureHost()) return noopHandle

  const options = normalizeInput(input)
  const nextOptions = {
    ...options,
    duration:
      type === 'loading' ? (options.duration ?? 0) : (options.duration ?? state.config.duration),
    closable: options.closable ?? state.config.closable,
  }

  if (nextOptions.key !== undefined) {
    const index = findMessageIndexByKey(nextOptions.key)
    if (index !== -1) {
      const current = state.messages[index]
      clearMessageTimer(current)
      Object.assign(current, {
        type,
        content: nextOptions.content,
        key: nextOptions.key,
        duration: nextOptions.duration,
        closable: nextOptions.closable,
        onClose: nextOptions.onClose,
      })
      resetMessageTimer(current)
      return {
        close: () => closeMessage(current.id, 'api'),
      }
    }
  }

  const record: MessageRecord = {
    id: ++seed,
    type,
    content: nextOptions.content,
    key: nextOptions.key,
    duration: nextOptions.duration,
    closable: nextOptions.closable,
    onClose: nextOptions.onClose,
  }

  state.messages.push(record)
  resetMessageTimer(record)
  trimOverflow()

  return {
    close: () => closeMessage(record.id, 'api'),
  }
}

function applyConfig(options: MessageConfig) {
  Object.assign(state.config, options)
}

export const message: MessageApi = {
  info(input) {
    return createMessage('info', input)
  },
  success(input) {
    return createMessage('success', input)
  },
  warning(input) {
    return createMessage('warning', input)
  },
  error(input) {
    return createMessage('error', input)
  },
  loading(input) {
    return createMessage('loading', input)
  },
  close(key) {
    const index = findMessageIndexByKey(key)
    if (index === -1) return

    closeMessage(state.messages[index].id, 'api')
  },
  closeAll() {
    for (const item of [...state.messages]) {
      closeMessage(item.id, 'api')
    }
  },
  config(options) {
    applyConfig(options)
  },
}
