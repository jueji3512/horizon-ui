import { createApp, reactive } from 'vue'
import NotificationHost from './NotificationHost.vue'
import type {
  NotificationApi,
  NotificationCloseReason,
  NotificationConfig,
  NotificationHandle,
  NotificationInput,
  NotificationKey,
  NotificationOptions,
  NotificationRecord,
  NotificationResolvedConfig,
  NotificationState,
  NotificationType,
} from './types'

const defaultConfig: NotificationResolvedConfig = {
  duration: 4500,
  closable: true,
  max: 4,
  top: 24,
  bottom: 24,
  zIndex: 3000,
  placement: 'top-right',
}

const noopHandle: NotificationHandle = {
  close: () => {},
}

let seed = 0
let hostMounted = false
let hostElement: HTMLDivElement | null = null

const state = reactive<NotificationState>({
  notifications: [],
  config: { ...defaultConfig },
})

function isDomAvailable() {
  return typeof document !== 'undefined'
}

function ensureHost() {
  if (!isDomAvailable()) return false
  if (hostMounted) return true

  hostElement = document.createElement('div')
  hostElement.setAttribute('data-horizon-notification-host', '')
  hostElement.setAttribute('data-horizon-teleport-layer', '')
  document.body.appendChild(hostElement)

  createApp(NotificationHost, {
    state,
    onClose: closeNotification,
  }).mount(hostElement)

  hostMounted = true
  return true
}

function normalizeInput(input: NotificationInput): NotificationOptions {
  return typeof input === 'string' ? { title: input } : input
}

function findNotificationIndexByKey(key: NotificationKey) {
  return state.notifications.findIndex((item) => item.key === key)
}

function clearNotificationTimer(notification: NotificationRecord) {
  if (notification.timer) {
    window.clearTimeout(notification.timer)
    notification.timer = undefined
  }
}

function resetNotificationTimer(notification: NotificationRecord) {
  clearNotificationTimer(notification)
  if (notification.duration <= 0) return

  notification.timer = window.setTimeout(() => {
    closeNotification(notification.id, 'timeout')
  }, notification.duration)
}

function closeNotification(id: number, reason: NotificationCloseReason) {
  const index = state.notifications.findIndex((item) => item.id === id)
  if (index === -1) return

  const [target] = state.notifications.splice(index, 1)
  clearNotificationTimer(target)

  void reason
  target.onClose?.()
}

function trimOverflow() {
  const max = Math.max(1, state.config.max)
  while (state.notifications.length > max) {
    closeNotification(state.notifications[0].id, 'overflow')
  }
}

function resolveNotificationOptions(type: NotificationType, input: NotificationInput) {
  const options = normalizeInput(input)

  return {
    ...options,
    duration:
      type === 'loading' ? (options.duration ?? 0) : (options.duration ?? state.config.duration),
    closable: options.closable ?? state.config.closable,
    placement: options.placement ?? state.config.placement,
  }
}

function createNotification(type: NotificationType, input: NotificationInput): NotificationHandle {
  if (!ensureHost()) return noopHandle

  const nextOptions = resolveNotificationOptions(type, input)

  if (nextOptions.key !== undefined) {
    const index = findNotificationIndexByKey(nextOptions.key)
    if (index !== -1) {
      const current = state.notifications[index]
      clearNotificationTimer(current)
      Object.assign(current, {
        type,
        title: nextOptions.title,
        content: nextOptions.content,
        key: nextOptions.key,
        duration: nextOptions.duration,
        closable: nextOptions.closable,
        placement: nextOptions.placement,
        progress: nextOptions.progress,
        action: nextOptions.action,
        onClose: nextOptions.onClose,
      })
      resetNotificationTimer(current)
      return {
        close: () => closeNotification(current.id, 'api'),
      }
    }
  }

  const record: NotificationRecord = {
    id: ++seed,
    type,
    title: nextOptions.title,
    content: nextOptions.content,
    key: nextOptions.key,
    duration: nextOptions.duration,
    closable: nextOptions.closable,
    placement: nextOptions.placement,
    progress: nextOptions.progress,
    action: nextOptions.action,
    onClose: nextOptions.onClose,
  }

  state.notifications.push(record)
  resetNotificationTimer(record)
  trimOverflow()

  return {
    close: () => closeNotification(record.id, 'api'),
  }
}

function applyConfig(options: NotificationConfig) {
  Object.assign(state.config, options)
}

export const notification: NotificationApi = {
  info(input) {
    return createNotification('info', input)
  },
  success(input) {
    return createNotification('success', input)
  },
  warning(input) {
    return createNotification('warning', input)
  },
  error(input) {
    return createNotification('error', input)
  },
  loading(input) {
    return createNotification('loading', input)
  },
  close(key) {
    const index = findNotificationIndexByKey(key)
    if (index === -1) return

    closeNotification(state.notifications[index].id, 'api')
  },
  closeAll() {
    for (const item of [...state.notifications]) {
      closeNotification(item.id, 'api')
    }
  },
  config(options) {
    applyConfig(options)
  },
}
