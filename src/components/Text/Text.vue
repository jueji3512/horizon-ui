<template>
  <component :is="tag" :class="classes" :style="markStyle">
    <slot />
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '../../utils'

type TextTheme = 'default' | 'brand' | 'success' | 'warning' | 'error' | 'secondary'

const props = withDefaults(
  defineProps<{
    theme?: TextTheme
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
    theme: 'default',
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

const themeColorMap: Record<TextTheme, string> = {
  default: 'text-[var(--text-color-primary)]',
  brand: 'text-brand',
  success: 'text-success',
  warning: 'text-warning',
  error: 'text-error',
  secondary: 'text-[var(--text-color-secondary)]',
}

const disabledColorMap: Record<TextTheme, string> = {
  default: 'text-[var(--text-color-disabled)]',
  brand: 'text-brand-disabled',
  success: 'text-success-disabled',
  warning: 'text-warning-disabled',
  error: 'text-error-disabled',
  secondary: 'text-[var(--text-color-disabled)]',
}

const markStyle = computed(() =>
  typeof props.mark === 'string' ? { backgroundColor: props.mark } : undefined,
)

const classes = computed(() =>
  cn(
    'font-body-md',
    !props.disabled && themeColorMap[props.theme],
    props.strong && 'font-bold',
    props.italic && 'italic',
    props.delete && 'line-through',
    !props.delete && props.underline && 'underline',
    props.code &&
      'font-body-sm rounded-[var(--round-default)] border border-[var(--border-color-component)] bg-[var(--bg-color-secondarycontainer)] px-[var(--padding-x-2)]',
    !props.code && props.mark && typeof props.mark !== 'string' && 'bg-warning-light',
    !props.code &&
      !props.mark &&
      props.keyboard &&
      'font-body-sm rounded-[var(--round-default)] border border-[var(--border-color-component)] bg-[var(--bg-color-inner)] px-[var(--padding-x-2)] py-0.5 shadow-[inset_0_-1px_0_var(--border-color-divider)]',
    props.disabled && cn(disabledColorMap[props.theme], 'cursor-not-allowed select-none'),
  ),
)
</script>
