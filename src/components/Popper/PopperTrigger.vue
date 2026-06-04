<template>
  <div
    ref="triggerEl"
    class="inline-flex"
    :aria-expanded="ctx.visible.value"
    :aria-controls="ctx.contentId"
    :aria-describedby="resolvedAriaDescribedby"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
    @click="onClick"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed, ref, inject, onMounted, onBeforeUnmount } from 'vue'
import { popperContextKey } from './index'

const props = withDefaults(
  defineProps<{
    ariaDescribedby?: boolean | string
  }>(),
  {
    ariaDescribedby: false,
  },
)

const ctx = inject(popperContextKey)!
if (!ctx) {
  throw new Error('<PopperTrigger> must be used inside <Popper>')
}

const emit = defineEmits<{
  mouseenter: [event: MouseEvent]
  mouseleave: [event: MouseEvent]
  click: [event: MouseEvent]
  focus: [event: FocusEvent]
  focusin: [event: FocusEvent]
  blur: [event: FocusEvent]
  focusout: [event: FocusEvent]
}>()

const triggerEl = ref<HTMLElement>()

const resolvedAriaDescribedby = computed(() => {
  if (typeof props.ariaDescribedby === 'string') return props.ariaDescribedby
  if (props.ariaDescribedby && ctx.visible.value) return ctx.contentId
  return undefined
})

onMounted(() => {
  const el = triggerEl.value
  if (!el) return
  ctx.triggerRef.value = el
  el.addEventListener('focus', onFocus, true)
  el.addEventListener('focusin', onFocusIn)
  el.addEventListener('blur', onBlur, true)
  el.addEventListener('focusout', onFocusOut)
})
onBeforeUnmount(() => {
  const el = triggerEl.value
  el?.removeEventListener('focus', onFocus, true)
  el?.removeEventListener('focusin', onFocusIn)
  el?.removeEventListener('blur', onBlur, true)
  el?.removeEventListener('focusout', onFocusOut)
  ctx.triggerRef.value = undefined
})

function onMouseEnter(event: MouseEvent) {
  if (ctx.trigger.value === 'hover' && !ctx.disabled.value) ctx.show()
  emit('mouseenter', event)
}
function onMouseLeave(event: MouseEvent) {
  if (ctx.trigger.value === 'hover') ctx.hide()
  emit('mouseleave', event)
}
function onClick(event: MouseEvent) {
  if (ctx.trigger.value === 'click' && !ctx.disabled.value) ctx.toggle()
  emit('click', event)
}

function showOnFocusTrigger() {
  if (ctx.trigger.value === 'focus' && !ctx.disabled.value) ctx.show()
}

function isInternalFocusMove(event: FocusEvent) {
  const relatedTarget = event.relatedTarget
  return relatedTarget instanceof Node && Boolean(triggerEl.value?.contains(relatedTarget))
}

function hideOnFocusTrigger() {
  if (ctx.trigger.value === 'focus') ctx.hide()
}

function onFocus(event: FocusEvent) {
  if (isInternalFocusMove(event)) return
  emit('focus', event)
}
function onFocusIn(event: FocusEvent) {
  if (isInternalFocusMove(event)) return
  showOnFocusTrigger()
  emit('focusin', event)
}
function onBlur(event: FocusEvent) {
  if (isInternalFocusMove(event)) return
  emit('blur', event)
}
function onFocusOut(e: FocusEvent) {
  if (isInternalFocusMove(e)) return
  hideOnFocusTrigger()
  emit('focusout', e)
}
</script>
