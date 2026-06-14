<template>
  <div
    class="pointer-events-none fixed left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
    :style="hostStyle"
    aria-live="polite"
    aria-atomic="false"
  >
    <TransitionGroup name="h-message" tag="div" class="flex flex-col items-center gap-2">
      <MessageItem
        v-for="item in state.messages"
        :key="item.id"
        :message="item"
        @close="emitClose(item.id, 'close')"
      />
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import MessageItem from './MessageItem.vue'
import type { MessageCloseReason, MessageState } from './types'

const props = defineProps<{
  state: MessageState
}>()

const emit = defineEmits<{
  close: [id: number, reason: MessageCloseReason]
}>()

const hostStyle = computed(() => ({
  top: `${props.state.config.top}px`,
  zIndex: String(props.state.config.zIndex),
}))

function emitClose(id: number, reason: MessageCloseReason) {
  emit('close', id, reason)
}
</script>

<style scoped>
.h-message-enter-active,
.h-message-leave-active,
.h-message-move {
  transition:
    opacity var(--duration-fast) ease,
    transform var(--duration-fast) ease;
}

.h-message-enter-from,
.h-message-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

.h-message-leave-active {
  position: absolute;
}
</style>
