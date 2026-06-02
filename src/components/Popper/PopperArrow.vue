<template>
  <div
    ref="arrowEl"
    class="absolute rotate-45 bg-inherit"
    :style="[arrowGeometryStyle, arrowStyle]"
  />
</template>

<script setup lang="ts">
import { ref, computed, inject, onMounted, onBeforeUnmount, type CSSProperties } from 'vue'
import { popperContextKey } from './index'

const ctx = inject(popperContextKey)
if (!ctx) {
  throw new Error('<PopperArrow> must be used inside <Popper>')
}

const arrowEl = ref<HTMLElement>()

const popperArrowGeometry = {
  size: 8,
  staticOffset: -4,
} as const

const arrowGeometryStyle = {
  width: `${popperArrowGeometry.size}px`,
  height: `${popperArrowGeometry.size}px`,
} satisfies CSSProperties

const staticSideMap = {
  top: 'bottom',
  right: 'left',
  bottom: 'top',
  left: 'right',
} as const

onMounted(() => {
  if (arrowEl.value) {
    ctx.arrowRef.value = arrowEl.value
  }
})
onBeforeUnmount(() => {
  ctx.arrowRef.value = undefined
})

const arrowStyle = computed(() => {
  const data = ctx.middlewareData.value?.arrow
  if (!data) return { visibility: 'hidden' as const }
  const side = (ctx.currentPlacement.value || 'bottom').split('-')[0]
  const staticSide =
    side in staticSideMap ? staticSideMap[side as keyof typeof staticSideMap] : 'top'
  return {
    left: data.x != null ? `${data.x}px` : '',
    top: data.y != null ? `${data.y}px` : '',
    [staticSide]: `${popperArrowGeometry.staticOffset}px`,
  }
})
</script>
