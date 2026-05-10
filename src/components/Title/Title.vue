<template>
  <component :is="tag" :class="cn(classes, 'h-title')" :style="markStyle">
    <span v-if="ellipsis" class="truncate"><slot /></span>
    <slot v-else />
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '../../utils'

type TitleLevel = 1 | 2 | 3 | 4 | 5 | 6
type TitleType = 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'muted'

const props = withDefaults(
  defineProps<{
    level?: TitleLevel
    type?: TitleType
    mark?: boolean | string
    ellipsis?: boolean
  }>(),
  {
    level: 1,
    type: 'default',
    mark: false,
    ellipsis: false,
  },
)

const tag = computed(() => `h${props.level}`)

const levelMap: Record<TitleLevel, string> = {
  1: 'text-4xl font-semibold',
  2: 'text-3xl font-semibold',
  3: 'text-2xl font-semibold',
  4: 'text-xl font-medium',
  5: 'text-lg font-medium',
  6: 'text-base font-medium',
}

const typeColorMap: Record<TitleType, string> = {
  default: 'text-neutral-heading',
  primary: 'text-primary',
  success: 'text-success',
  warning: 'text-warning',
  danger: 'text-danger',
  muted: 'text-neutral-muted',
}

const markStyle = computed(() =>
  typeof props.mark === 'string' ? { backgroundColor: props.mark } : undefined,
)

const classes = computed(() =>
  cn(
    levelMap[props.level],
    typeColorMap[props.type],
    props.mark && typeof props.mark !== 'string' && 'bg-warning-light',
  ),
)
</script>
