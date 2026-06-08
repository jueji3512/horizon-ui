<template>
  <Popover v-model:open="open" trigger="manual" placement="right-start" :offset="-2">
    <slot />
  </Popover>
</template>

<script setup lang="ts">
import { nextTick, onBeforeUnmount, provide, ref } from 'vue'
import { Popover } from '../Popover'
import { menuSubContextKey } from './context'

const props = withDefaults(
  defineProps<{
    openDelay?: number
    closeDelay?: number
  }>(),
  {
    openDelay: 0,
    closeDelay: 120,
  },
)

const open = ref(false)
const triggerElement = ref<HTMLElement | null>(null)
let openTimer: ReturnType<typeof setTimeout> | null = null
let closeTimer: ReturnType<typeof setTimeout> | null = null

function clearOpenTimer() {
  if (openTimer) {
    clearTimeout(openTimer)
    openTimer = null
  }
}

function clearCloseTimer() {
  if (closeTimer) {
    clearTimeout(closeTimer)
    closeTimer = null
  }
}

function clearTimers() {
  clearOpenTimer()
  clearCloseTimer()
}

function focusTrigger() {
  nextTick(() => {
    const parentMenu = triggerElement.value?.closest('[role="menu"]')
    if (parentMenu instanceof HTMLElement) {
      parentMenu.focus()
    } else {
      triggerElement.value?.focus()
    }
  })
}

function openSubmenu() {
  clearCloseTimer()
  if (open.value) return

  if (props.openDelay > 0) {
    clearOpenTimer()
    openTimer = setTimeout(() => {
      openTimer = null
      open.value = true
    }, props.openDelay)
  } else {
    open.value = true
  }
}

function closeSubmenu(options: { restoreFocus?: boolean; immediate?: boolean } = {}) {
  clearOpenTimer()
  if (!open.value && !closeTimer) return

  const close = () => {
    closeTimer = null
    open.value = false
    if (options.restoreFocus) focusTrigger()
  }

  if (!options.immediate && props.closeDelay > 0) {
    clearCloseTimer()
    closeTimer = setTimeout(close, props.closeDelay)
  } else {
    clearCloseTimer()
    close()
  }
}

function setTriggerElement(element: HTMLElement | null) {
  triggerElement.value = element
}

provide(menuSubContextKey, {
  open,
  openSubmenu,
  closeSubmenu,
  setTriggerElement,
})

defineExpose({
  open,
  openSubmenu,
  closeSubmenu,
  setTriggerElement,
})

onBeforeUnmount(() => {
  clearTimers()
})
</script>
