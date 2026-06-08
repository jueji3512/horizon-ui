<template>
  <div
    role="group"
    :aria-label="title"
    :aria-disabled="disabled || undefined"
    :data-disabled="disabled || undefined"
    class="min-w-0"
  >
    <div :class="titleClasses">
      {{ title }}
    </div>
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed, provide } from 'vue'
import { cn } from '../../utils'
import { selectOptionGroupContextKey, useSelectContext } from './context'
import type { SelectSize } from './types'

const props = withDefaults(
  defineProps<{
    title: string
    disabled?: boolean
  }>(),
  {
    disabled: false,
  },
)

provide(selectOptionGroupContextKey, {
  disabled: computed(() => props.disabled),
})

const select = useSelectContext()
const size = computed<SelectSize>(() => select?.size.value ?? 'md')

const groupTitleSizeMap: Record<SelectSize, string> = {
  sm: 'font-body-sm px-2 pt-2 pb-1',
  md: 'font-body-sm px-3 pt-2 pb-1',
  lg: 'font-body-md px-3 pt-2.5 pb-1',
}

const titleClasses = computed(() =>
  cn(
    'min-w-0 truncate text-[var(--text-color-secondary)] select-none',
    groupTitleSizeMap[size.value],
    props.disabled && 'text-[var(--text-color-disabled)]',
  ),
)
</script>
