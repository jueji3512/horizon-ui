<template>
  <!-- default type -->
  <div v-if="type === 'default'" role="group" :class="defaultContainerClasses">
    <slot />
  </div>

  <!-- button type -->
  <div
    v-else
    role="group"
    class="checkbox-group-button"
    :class="buttonContainerClasses"
    @keydown="handleKeydown"
  >
    <slot />
  </div>
</template>

<script lang="ts">
import type { ComputedRef, InjectionKey } from 'vue'

export interface CheckboxGroupContext {
  modelValue: ComputedRef<(string | number)[]>
  type: string
  size: string
  disabled: boolean
  min: number | undefined
  max: number | undefined
  toggle: (value: string | number) => void
  isLimitDisabled: (value: string | number, checked: boolean) => boolean
}

export const checkboxGroupKey: InjectionKey<CheckboxGroupContext> = Symbol('checkboxGroup')
</script>

<script setup lang="ts">
import { computed, provide } from 'vue'
import { cn } from '../../utils'

const props = withDefaults(
  defineProps<{
    modelValue?: (string | number)[]
    type?: 'default' | 'button'
    size?: 'sm' | 'md' | 'lg'
    disabled?: boolean
    direction?: 'horizontal' | 'vertical'
    min?: number
    max?: number
  }>(),
  {
    modelValue: () => [],
    type: 'default',
    size: 'md',
    disabled: false,
    direction: 'vertical',
    min: undefined,
    max: undefined,
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: (string | number)[]]
  change: [value: (string | number)[]]
}>()

const groupModelValue = computed(() => props.modelValue)

function toggle(value: string | number) {
  const arr = [...groupModelValue.value]
  const idx = arr.indexOf(value)
  if (idx === -1) {
    arr.push(value)
  } else {
    arr.splice(idx, 1)
  }
  emit('update:modelValue', arr)
  emit('change', arr)
}

function isLimitDisabled(value: string | number, checked: boolean): boolean {
  const arr = groupModelValue.value
  if (props.max !== undefined && !checked && arr.length >= props.max) return true
  if (props.min !== undefined && checked && arr.length <= props.min) return true
  return false
}

provide(checkboxGroupKey, {
  modelValue: groupModelValue,
  type: props.type,
  size: props.size,
  disabled: props.disabled,
  min: props.min,
  max: props.max,
  toggle,
  isLimitDisabled,
})

// ===== keyboard nav =====

function handleKeydown(e: KeyboardEvent) {
  if (props.type !== 'button') return

  const container = e.currentTarget as HTMLElement
  const checkboxes = container.querySelectorAll<HTMLElement>(
    '[role="checkbox"]:not([disabled])',
  )
  if (!checkboxes?.length) return

  const currentIndex = Array.from(checkboxes).indexOf(document.activeElement as HTMLElement)
  const base = currentIndex === -1 ? 0 : currentIndex

  let nextIndex = -1
  if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
    e.preventDefault()
    nextIndex = (base + 1) % checkboxes.length
  } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
    e.preventDefault()
    nextIndex = (base - 1 + checkboxes.length) % checkboxes.length
  }

  if (nextIndex >= 0) {
    const btn = checkboxes[nextIndex]
    btn.focus()
    btn.click()
  }
}

// ===== container classes =====

const defaultContainerClasses = computed(() =>
  cn(
    'flex',
    props.direction === 'horizontal' ? 'flex-row flex-wrap gap-4' : 'flex-col gap-2',
  ),
)

const buttonSizeClassMap: Record<string, string> = {
  sm: 'rounded',
  md: 'rounded',
  lg: 'rounded',
}

const buttonContainerClasses = computed(() =>
  cn(
    'inline-flex border border-neutral-border overflow-hidden',
    buttonSizeClassMap[props.size],
  ),
)
</script>

<style scoped>
.checkbox-group-button {
  display: inline-flex;
}

.checkbox-group-button > :not(:last-child)[data-selected] {
  border-right-color: var(--color-primary);
}
</style>
