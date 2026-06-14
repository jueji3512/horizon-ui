<template>
  <div
    class="h-message pointer-events-auto flex min-h-10 w-max max-w-[calc(100vw-32px)] min-w-72 overflow-hidden rounded-[var(--round-default)] bg-[var(--bg-color-container)] text-[var(--text-color-primary)] shadow-popper ring-1 ring-[var(--border-color-component)]"
    :role="message.type === 'error' ? 'alert' : 'status'"
  >
    <div class="w-[3px] flex-shrink-0" :class="themeClass.rail" />
    <div class="flex min-w-0 flex-1 items-center gap-2 px-3 py-2">
      <Icon
        :name="themeClass.icon"
        class="mt-0.5 text-base"
        :class="[themeClass.iconColor, message.type === 'loading' && 'h-message-icon-loading']"
      />
      <div class="font-body-md min-w-0 flex-1 leading-5 break-words">
        {{ message.content }}
      </div>
      <button
        v-if="message.closable"
        type="button"
        aria-label="关闭提示"
        class="ml-1 flex h-6 w-6 flex-shrink-0 cursor-pointer items-center justify-center rounded-[var(--round-default)] bg-transparent text-[var(--text-color-secondary)] transition-colors duration-200 hover:bg-[var(--bg-color-container-hover)] hover:text-[var(--text-color-primary)] focus-visible:ring-2 focus-visible:ring-brand-focus focus-visible:outline-none active:bg-[var(--bg-color-container-active)]"
        @click="emit('close')"
      >
        <Icon name="close" class="text-sm" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Icon from '../Icon/Icon.vue'
import type { MessageRecord, MessageType } from './types'

const props = defineProps<{
  message: MessageRecord
}>()

const emit = defineEmits<{
  close: []
}>()

interface MessageThemeClass {
  rail: string
  icon: string
  iconColor: string
}

const themeClassMap: Record<MessageType, MessageThemeClass> = {
  info: {
    rail: 'bg-brand',
    icon: 'info',
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

const themeClass = computed(() => themeClassMap[props.message.type])
</script>

<style scoped>
.h-message-icon-loading {
  animation: h-message-spin 1s linear infinite;
}

@keyframes h-message-spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
