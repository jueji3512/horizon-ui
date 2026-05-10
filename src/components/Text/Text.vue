<template>
  <component :is="tag" :class="classes" :style="markStyle">
    <slot />
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '../../utils'

type TextType = 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'muted'

const props = withDefaults(
  defineProps<{
    type?: TextType
    strong?: boolean
    italic?: boolean
    underline?: boolean
    delete?: boolean
    code?: boolean
    mark?: boolean | string
    keyboard?: boolean
    disabled?: boolean
    tag?: string
  }>(),
  {
    type: 'default',
    strong: false,
    italic: false,
    underline: false,
    delete: false,
    code: false,
    mark: false,
    keyboard: false,
    disabled: false,
    tag: 'span',
  },
)

const typeColorMap: Record<TextType, string> = {
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
    'text-sm',
    !props.disabled && typeColorMap[props.type],
    props.strong && 'font-bold',
    props.italic && 'italic',
    props.delete && 'line-through',
    !props.delete && props.underline && 'underline',
    props.code && 'font-mono bg-neutral-subtle px-1 py-0.5 rounded text-xs',
    !props.code && props.mark && typeof props.mark !== 'string' && 'bg-warning-light',
    !props.code && !props.mark && props.keyboard &&
      'font-mono text-xs border border-neutral-border rounded px-1 py-0.5 bg-neutral-surface shadow-[inset_0_-1px_0_#e2e8f0]',
    props.disabled && 'text-neutral-muted cursor-not-allowed select-none',
  ),
)
</script>
