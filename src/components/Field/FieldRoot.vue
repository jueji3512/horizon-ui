<template>
  <div
    v-bind="rootAttrs"
    :class="rootClasses"
    :data-size="size"
    :data-status="status || undefined"
    :data-disabled="disabled || undefined"
    :data-readonly="readonly || undefined"
    :data-focused="visualFocused || undefined"
    :data-active="active || undefined"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed, provide, useAttrs } from 'vue'
import { cn } from '../../utils'
import { fieldContextKey } from './context'
import type { FieldSize, FieldStatus } from './types'

defineOptions({ inheritAttrs: false })

const props = withDefaults(
  defineProps<{
    size?: FieldSize
    status?: FieldStatus
    disabled?: boolean
    readonly?: boolean
    focused?: boolean
    active?: boolean
    multiline?: boolean
  }>(),
  {
    size: 'md',
    status: undefined,
    disabled: false,
    readonly: false,
    focused: false,
    active: false,
    multiline: false,
  },
)

const attrs = useAttrs()

provide(fieldContextKey, {
  size: computed(() => props.size),
  disabled: computed(() => props.disabled),
  readonly: computed(() => props.readonly),
  multiline: computed(() => props.multiline),
})

const visualFocused = computed(() => !props.disabled && (props.focused || props.active))

const rootAttrs = computed(() => {
  const { class: _class, ...rest } = attrs
  return rest
})

const textSizeMap: Record<FieldSize, string> = {
  sm: 'font-body-sm',
  md: 'font-body-md',
  lg: 'font-body-lg',
}

const heightMap: Record<FieldSize, string> = {
  sm: 'h-[var(--comp-size-sm)]',
  md: 'h-[var(--comp-size-md)]',
  lg: 'h-[var(--comp-size-lg)]',
}

const minHeightMap: Record<FieldSize, string> = {
  sm: 'min-h-[var(--comp-size-sm)]',
  md: 'min-h-[var(--comp-size-md)]',
  lg: 'min-h-[var(--comp-size-lg)]',
}

const statusBorderMap: Record<FieldStatus, string> = {
  error: 'border-error',
  warning: 'border-warning',
  success: 'border-success',
}

const statusRingMap: Record<FieldStatus, string> = {
  error: 'ring-2 ring-error-focus',
  warning: 'ring-2 ring-warning-focus',
  success: 'ring-2 ring-success-focus',
}

const statusFocusWithinMap: Record<FieldStatus, string> = {
  error: 'focus-within:ring-2 focus-within:ring-error-focus',
  warning: 'focus-within:ring-2 focus-within:ring-warning-focus',
  success: 'focus-within:ring-2 focus-within:ring-success-focus',
}

const rootClasses = computed(() =>
  cn(
    'relative flex w-full min-w-0 rounded-[var(--round-default)] border bg-[var(--bg-color-container)] text-[var(--text-color-primary)] transition-colors duration-150',
    'items-center',
    textSizeMap[props.size],
    props.multiline ? minHeightMap[props.size] : heightMap[props.size],
    props.disabled &&
      'cursor-not-allowed border-[var(--border-color-component)] bg-[var(--bg-color-component-disabled)] text-[var(--text-color-disabled)]',
    props.readonly && !props.disabled && 'cursor-pointer',
    props.status &&
      !props.disabled &&
      cn(
        statusBorderMap[props.status],
        visualFocused.value ? statusRingMap[props.status] : statusFocusWithinMap[props.status],
      ),
    !props.status &&
      !props.disabled &&
      visualFocused.value &&
      'border-brand ring-2 ring-brand-focus',
    !props.status &&
      !props.disabled &&
      !visualFocused.value &&
      'border-[var(--border-color-component)] focus-within:border-brand focus-within:ring-2 focus-within:ring-brand-focus hover:border-brand',
    attrs.class as Parameters<typeof cn>[number],
  ),
)
</script>
