<template>
  <div role="presentation" :class="labelClasses">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '../../utils'

const props = withDefaults(
  defineProps<{
    disabled?: boolean
  }>(),
  {
    disabled: false,
  },
)

const labelClasses = computed(() =>
  cn(
    'font-body-sm min-w-0 px-3 pt-2 pb-1 text-[var(--text-color-secondary)] select-none',
    props.disabled && 'text-[var(--text-color-disabled)]',
  ),
)
</script>
