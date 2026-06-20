<template>
  <div
    v-for="placement in notificationPlacements"
    :key="placement"
    class="pointer-events-none fixed flex w-[min(360px,calc(100vw-32px))] flex-col gap-3"
    :class="getPlacementClasses(placement)"
    :style="getPlacementStyle(placement)"
    aria-live="polite"
    aria-atomic="false"
  >
    <TransitionGroup
      name="h-notification"
      tag="div"
      :class="[
        'relative flex w-full gap-3',
        placement.startsWith('bottom') ? 'flex-col-reverse' : 'flex-col',
      ]"
    >
      <NotificationItem
        v-for="item in placementGroups[placement]"
        :key="item.id"
        :notification="item"
        @close="emitClose(item.id, 'close')"
      />
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import NotificationItem from './NotificationItem.vue'
import type { NotificationCloseReason, NotificationPlacement, NotificationState } from './types'

const props = defineProps<{
  state: NotificationState
}>()

const emit = defineEmits<{
  close: [id: number, reason: NotificationCloseReason]
}>()

const notificationPlacements = [
  'top-left',
  'top-right',
  'bottom-left',
  'bottom-right',
] as const satisfies readonly NotificationPlacement[]

const placementGroups = computed<Record<NotificationPlacement, typeof props.state.notifications>>(
  () => ({
    'top-left': props.state.notifications.filter((item) => item.placement === 'top-left'),
    'top-right': props.state.notifications.filter((item) => item.placement === 'top-right'),
    'bottom-left': props.state.notifications.filter((item) => item.placement === 'bottom-left'),
    'bottom-right': props.state.notifications.filter((item) => item.placement === 'bottom-right'),
  }),
)

function getPlacementClasses(placement: NotificationPlacement) {
  return [
    placement.endsWith('left') ? 'left-4 items-start' : 'right-4 items-end',
    placement.startsWith('top') ? 'top-0' : 'bottom-0',
  ]
}

function getPlacementStyle(placement: NotificationPlacement) {
  return {
    [placement.startsWith('top') ? 'top' : 'bottom']: `${
      placement.startsWith('top') ? props.state.config.top : props.state.config.bottom
    }px`,
    zIndex: String(props.state.config.zIndex),
  }
}

function emitClose(id: number, reason: NotificationCloseReason) {
  emit('close', id, reason)
}
</script>

<style scoped>
.h-notification-enter-active,
.h-notification-leave-active,
.h-notification-move {
  transition:
    opacity var(--duration-fast) ease,
    transform var(--duration-fast) ease;
}

.h-notification-enter-from,
.h-notification-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

.h-notification-leave-active {
  position: absolute;
}
</style>
