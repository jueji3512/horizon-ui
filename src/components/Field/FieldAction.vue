<template>
  <button
    v-bind="actionAttrs"
    :type="type"
    :disabled="effectiveDisabled || undefined"
    :data-active="active || undefined"
    :class="actionClasses"
    :style="actionStyle"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed, useAttrs, type CSSProperties, type StyleValue } from 'vue'
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
const attrs = useAttrs()
const effectiveDisabled = computed(() => props.disabled || Boolean(field?.disabled.value))

const actionAttrs = computed(() => {
  const { class: _class, style: _style, ...rest } = attrs
  return rest
})

const fieldActionGeometryMap = {
  root: 'h-5 w-5 p-0',
} as const

const fieldActionGeometryStyle = {
  width: '1.25rem',
  height: '1.25rem',
  padding: '0',
} satisfies CSSProperties

const actionStyle = computed<StyleValue>(() => [
  fieldActionGeometryStyle,
  attrs.style as StyleValue,
])

const actionClasses = computed(() =>
  cn(
    fieldActionGeometryMap.root,
    'field-action inline-flex shrink-0 cursor-pointer items-center justify-center rounded-[var(--round-default)] border-none bg-transparent p-0 text-[var(--text-color-secondary)] transition-colors duration-100',
    'hover:text-[var(--text-color-primary)] focus-visible:ring-2 focus-visible:ring-brand-focus focus-visible:outline-none',
    'disabled:cursor-not-allowed disabled:text-[var(--text-color-disabled)]',
    props.active && !effectiveDisabled.value && 'text-[var(--text-color-primary)]',
    attrs.class as Parameters<typeof cn>[number],
  ),
)
</script>

<style scoped>
.field-action {
  appearance: none;
  width: 1.25rem;
  height: 1.25rem;
  padding: 0;
  font: inherit;
  line-height: 0;
}
</style>
