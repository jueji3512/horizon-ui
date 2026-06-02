<template>
  <component :is="tag" :class="classes" :style="markStyle">
    <span v-if="ellipsis" class="block truncate"><slot /></span>
    <slot v-else />
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '../../utils'

type TitleLevel = 1 | 2 | 3 | 4 | 5 | 6
type TitleTheme = 'default' | 'brand' | 'success' | 'warning' | 'error' | 'secondary'

const props = withDefaults(
  defineProps<{
    level?: TitleLevel
    theme?: TitleTheme
    mark?: boolean | string
    ellipsis?: boolean
  }>(),
  {
    level: 1,
    theme: 'default',
    mark: false,
    ellipsis: false,
  },
)

const tag = computed(() => `h${props.level}`)

const levelMap: Record<TitleLevel, string> = {
  1: 'font-title-1',
  2: 'font-title-2',
  3: 'font-title-3',
  4: 'font-title-4',
  5: 'font-title-5',
  6: 'font-title-6',
}

const themeColorMap: Record<TitleTheme, string> = {
  default: 'text-[var(--text-color-primary)]',
  brand: 'text-brand',
  success: 'text-success',
  warning: 'text-warning',
  error: 'text-error',
  secondary: 'text-[var(--text-color-secondary)]',
}

const markStyle = computed(() =>
  typeof props.mark === 'string' ? { backgroundColor: props.mark } : undefined,
)

const classes = computed(() =>
  cn(
    levelMap[props.level],
    themeColorMap[props.theme],
    props.mark && typeof props.mark !== 'string' && 'bg-warning-light',
  ),
)
</script>
