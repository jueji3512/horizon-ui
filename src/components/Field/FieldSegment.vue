<template>
  <component
    :is="tag"
    v-bind="$attrs"
    :type="tag === 'button' ? 'button' : undefined"
    :disabled="tag === 'button' && effectiveDisabled ? true : undefined"
    :data-active="active || undefined"
    :data-disabled="effectiveDisabled || undefined"
    :class="segmentClasses"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '../../utils'
import { useFieldContext } from './context'

defineOptions({ inheritAttrs: false })

const props = withDefaults(
  defineProps<{
    tag?: 'span' | 'div' | 'button'
    active?: boolean
    disabled?: boolean
    readonly?: boolean
  }>(),
  {
    tag: 'span',
    active: false,
    disabled: false,
    readonly: false,
  },
)

const field = useFieldContext()
const effectiveDisabled = computed(() => props.disabled || Boolean(field?.disabled.value))

const segmentClasses = computed(() =>
  cn(
    'field-segment inline-flex min-w-0 flex-1 items-center px-3 text-[var(--text-color-primary)] transition-colors duration-150 outline-none',
    props.active && !effectiveDisabled.value && 'text-brand',
    props.readonly && !effectiveDisabled.value && 'cursor-pointer',
    effectiveDisabled.value && 'cursor-not-allowed text-[var(--text-color-disabled)]',
  ),
)
</script>

<style scoped>
.field-segment {
  font: inherit;
}
</style>
