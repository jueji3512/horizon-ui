<template>
  <div
    ref="triggerEl"
    class="inline-flex"
    :aria-expanded="ctx.visible.value"
    :aria-controls="ctx.contentId"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
    @click="onClick"
    @focusin="onFocusIn"
    @focusout="onFocusOut"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { ref, inject, onMounted, onBeforeUnmount } from 'vue'
import { popperContextKey } from './index'

const ctx = inject(popperContextKey)!
if (!ctx) {
  throw new Error('<PopperTrigger> must be used inside <Popper>')
}

const triggerEl = ref<HTMLElement>()

onMounted(() => {
  if (triggerEl.value) {
    ctx.triggerRef.value = triggerEl.value
  }
})
onBeforeUnmount(() => {
  ctx.triggerRef.value = undefined
})

function onMouseEnter() {
  if (ctx.trigger.value === 'hover' && !ctx.disabled.value) ctx.show()
}
function onMouseLeave() {
  if (ctx.trigger.value === 'hover') ctx.hide()
}
function onClick() {
  if (ctx.trigger.value === 'click' && !ctx.disabled.value) ctx.toggle()
}
function onFocusIn() {
  if (ctx.trigger.value === 'focus' && !ctx.disabled.value) ctx.show()
}
function onFocusOut() {
  if (ctx.trigger.value === 'focus') ctx.hide()
}
</script>
