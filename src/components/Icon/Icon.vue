<template>
  <i
    class="h-icon"
    :class="sizeClass"
    :style="iconStyle"
    :aria-hidden="!ariaLabel || undefined"
    :aria-label="ariaLabel || undefined"
    v-html="svgContent"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'

type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

const props = withDefaults(
  defineProps<{
    name: string
    size?: IconSize | number
    color?: string
    ariaLabel?: string
  }>(),
  {
    size: 'md',
  },
)

const icons = import.meta.glob('./icons/*.svg', { query: '?raw', eager: true }) as Record<
  string,
  { default: string }
>

const svgContent = computed(() => {
  const key = `./icons/${props.name}.svg`
  return icons[key]?.default ?? ''
})

const sizeMap: Record<IconSize, string> = {
  xs: 'w-3.5 h-3.5',
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
  xl: 'w-7 h-7',
}

const sizeClass = computed(() => {
  if (typeof props.size === 'string') return sizeMap[props.size]
  return ''
})

const iconStyle = computed(() => {
  const s: Record<string, string> = {}
  if (props.color) s.color = props.color
  if (typeof props.size === 'number') {
    s.width = `${props.size}px`
    s.height = `${props.size}px`
  }
  return Object.keys(s).length ? s : undefined
})
</script>

<style scoped>
.h-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.h-icon :deep(svg) {
  width: 100%;
  height: 100%;
  display: block;
}
</style>
