<template>
  <div
    class="h-notification pointer-events-auto flex w-full overflow-hidden rounded-[var(--round-default)] bg-[var(--bg-color-container)] text-[var(--text-color-primary)] shadow-popper ring-1 ring-[var(--border-color-component)]"
    :role="notificationRole"
  >
    <div class="w-[3px] flex-shrink-0" :class="themeClass.rail" />

    <div class="min-w-0 flex-1 px-4 py-3">
      <div class="flex min-w-0 items-start gap-3">
        <Icon
          :name="themeClass.icon"
          class="mt-0.5 flex-shrink-0 text-lg"
          :class="[themeClass.iconColor, visualType === 'loading' && 'h-notification-icon-loading']"
        />

        <div class="min-w-0 flex-1">
          <div class="font-body-md font-medium break-words text-[var(--text-color-primary)]">
            {{ notification.title }}
          </div>
          <div
            v-if="notification.content"
            class="font-body-sm mt-1 leading-5 break-words text-[var(--text-color-secondary)]"
          >
            {{ notification.content }}
          </div>
        </div>

        <button
          v-if="notification.closable"
          type="button"
          aria-label="关闭通知"
          class="-mr-1 flex h-6 w-6 flex-shrink-0 cursor-pointer items-center justify-center rounded-[var(--round-default)] bg-transparent text-[var(--text-color-secondary)] transition-colors duration-200 hover:bg-[var(--bg-color-container-hover)] hover:text-[var(--text-color-primary)] focus-visible:ring-2 focus-visible:ring-brand-focus focus-visible:outline-none active:bg-[var(--bg-color-container-active)]"
          @click="emit('close')"
        >
          <Icon name="close" class="text-sm" />
        </button>
      </div>

      <div v-if="notification.progress" class="mt-3">
        <Progress
          :percent="notification.progress.percent"
          :status="notification.progress.status"
          :size="{ thickness: 4, labelSize: 12 }"
          show-label
          aria-label="通知任务进度"
        />
      </div>

      <div v-if="notification.action" class="mt-3 flex justify-end">
        <button
          type="button"
          class="font-body-sm cursor-pointer rounded-[var(--round-default)] bg-transparent px-2 py-1 font-medium text-brand transition-colors duration-200 hover:bg-brand-light focus-visible:ring-2 focus-visible:ring-brand-focus focus-visible:outline-none active:bg-brand-light"
          @click="notification.action.onClick"
        >
          {{ notification.action.label }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Icon from '../Icon/Icon.vue'
import Progress from '../Progress/Progress.vue'
import type { ProgressStatus } from '../Progress'
import type { NotificationRecord, NotificationType } from './types'

const props = defineProps<{
  notification: NotificationRecord
}>()

const emit = defineEmits<{
  close: []
}>()

interface NotificationThemeClass {
  rail: string
  icon: string
  iconColor: string
}

type NotificationVisualType = NotificationType | ProgressStatus

const themeClassMap: Record<NotificationVisualType, NotificationThemeClass> = {
  info: {
    rail: 'bg-brand',
    icon: 'notification',
    iconColor: 'text-brand',
  },
  success: {
    rail: 'bg-success',
    icon: 'circle-check',
    iconColor: 'text-success',
  },
  warning: {
    rail: 'bg-warning',
    icon: 'triangle-alert',
    iconColor: 'text-warning',
  },
  error: {
    rail: 'bg-error',
    icon: 'circle-close',
    iconColor: 'text-error',
  },
  loading: {
    rail: 'bg-brand',
    icon: 'loading',
    iconColor: 'text-brand',
  },
}

const visualType = computed<NotificationVisualType>(() => {
  if (props.notification.type === 'loading' && props.notification.progress?.status) {
    return props.notification.progress.status
  }

  return props.notification.type
})
const themeClass = computed(() => themeClassMap[visualType.value])
const notificationRole = computed(() => (visualType.value === 'error' ? 'alert' : 'status'))
</script>

<style scoped>
.h-notification-icon-loading {
  animation: h-notification-spin 1s linear infinite;
}

@keyframes h-notification-spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
