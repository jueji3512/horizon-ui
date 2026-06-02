<!-- Local SVG icons are bundled from ./icons at build time; svgContent is never user input. -->
<!-- eslint-disable vue/no-v-html -->
<template>
  <i
    class="h-icon"
    :style="iconStyle"
    :aria-hidden="!ariaLabel || undefined"
    :aria-label="ariaLabel || undefined"
    v-html="svgContent"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  name: string
  color?: string
  ariaLabel?: string
}>()

const icons = import.meta.glob('./icons/*.svg', { query: '?raw', eager: true }) as Record<
  string,
  { default: string }
>

const svgContent = computed(() => {
  const key = `./icons/${props.name}.svg`
  return icons[key]?.default ?? ''
})

const iconStyle = computed(() => {
  const s: Record<string, string> = {}
  if (props.color) s.color = props.color
  return Object.keys(s).length ? s : undefined
})
</script>

<style scoped>
.h-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 1em;
  height: 1em;
}

.h-icon :deep(svg) {
  width: 100%;
  height: 100%;
  display: block;
}
</style>
