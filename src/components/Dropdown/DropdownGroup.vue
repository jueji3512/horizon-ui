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
import { dropdownGroupContextKey } from './context'

const props = withDefaults(
  defineProps<{
    title: string
    disabled?: boolean
  }>(),
  {
    disabled: false,
  },
)

provide(dropdownGroupContextKey, {
  disabled: computed(() => props.disabled),
})

const titleClasses = computed(() =>
  cn(
    'font-body-sm min-w-0 px-3 pt-2 pb-1 text-[var(--text-color-secondary)] select-none',
    props.disabled && 'text-[var(--text-color-disabled)]',
  ),
)
</script>
