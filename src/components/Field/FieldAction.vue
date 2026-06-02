<template>
  <button
    v-bind="$attrs"
    :type="type"
    :disabled="effectiveDisabled || undefined"
    :data-active="active || undefined"
    :class="actionClasses"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '../../utils'
import { useFieldContext } from './context'

defineOptions({ inheritAttrs: false })

const props = withDefaults(
  defineProps<{
    type?: 'button' | 'submit' | 'reset'
    disabled?: boolean
    active?: boolean
  }>(),
  {
    type: 'button',
    disabled: false,
    active: false,
  },
)

const field = useFieldContext()
const effectiveDisabled = computed(() => props.disabled || Boolean(field?.disabled.value))

const actionClasses = computed(() =>
  cn(
    'field-action inline-flex h-5 w-5 shrink-0 cursor-pointer items-center justify-center rounded-[var(--round-default)] border-none bg-transparent p-0 text-[var(--text-color-secondary)] transition-colors duration-100',
    'hover:text-[var(--text-color-primary)] focus-visible:ring-2 focus-visible:ring-brand-focus focus-visible:outline-none',
    'disabled:cursor-not-allowed disabled:text-[var(--text-color-disabled)]',
    props.active && !effectiveDisabled.value && 'text-[var(--text-color-primary)]',
  ),
)
</script>

<style scoped>
.field-action {
  appearance: none;
  font: inherit;
  line-height: 0;
}
</style>
