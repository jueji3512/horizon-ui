<template>
  <!-- default variant -->
  <div
    v-if="variant === 'default'"
    v-bind="controlAttrs"
    role="group"
    :class="defaultContainerClasses"
    @focusout="handleFocusOut"
  >
    <slot />
  </div>

  <!-- button variant -->
  <div
    v-else
    v-bind="controlAttrs"
    role="group"
    class="checkbox-group-button"
    :class="buttonContainerClasses"
    @keydown="handleKeydown"
    @focusout="handleFocusOut"
  >
    <slot />
  </div>
</template>

<script lang="ts">
import type { ComputedRef, InjectionKey } from 'vue'

export interface CheckboxGroupContext {
  modelValue: ComputedRef<(string | number)[]>
  variant: ComputedRef<CheckboxGroupVariant>
  size: ComputedRef<CheckboxGroupSize>
  disabled: ComputedRef<boolean>
  min: ComputedRef<number | undefined>
  max: ComputedRef<number | undefined>
  toggle: (value: string | number) => void
  isLimitDisabled: (value: string | number, checked: boolean) => boolean
}

export const checkboxGroupKey: InjectionKey<CheckboxGroupContext> = Symbol('checkboxGroup')

type CheckboxGroupVariant = 'default' | 'button'
type CheckboxGroupSize = 'sm' | 'md' | 'lg'
</script>

<script setup lang="ts">
import { computed, provide } from 'vue'
import { useFormControl } from '../Form'
import { cn } from '../../utils'

const props = withDefaults(
  defineProps<{
    modelValue?: (string | number)[]
    variant?: CheckboxGroupVariant
    size?: CheckboxGroupSize
    disabled?: boolean
    direction?: 'horizontal' | 'vertical'
    min?: number
    max?: number
  }>(),
  {
    modelValue: () => [],
    variant: 'default',
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
const { controlAttrs, effectiveSize, effectiveDisabled, notifyControlChange, notifyControlBlur } =
  useFormControl(props)

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
  notifyControlChange()
}

function isLimitDisabled(value: string | number, checked: boolean): boolean {
  const arr = groupModelValue.value
  if (props.max !== undefined && !checked && arr.length >= props.max) return true
  if (props.min !== undefined && checked && arr.length <= props.min) return true
  return false
}

provide(checkboxGroupKey, {
  modelValue: groupModelValue,
  variant: computed(() => props.variant),
  size: effectiveSize,
  disabled: effectiveDisabled,
  min: computed(() => props.min),
  max: computed(() => props.max),
  toggle,
  isLimitDisabled,
})

// ===== keyboard nav =====

function handleKeydown(e: KeyboardEvent) {
  if (props.variant !== 'button') return

  const container = e.currentTarget as HTMLElement
  const checkboxes = container.querySelectorAll<HTMLElement>('[role="checkbox"]:not([disabled])')
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

function handleFocusOut(e: FocusEvent) {
  const nextTarget = e.relatedTarget as Node | null
  if (nextTarget && (e.currentTarget as HTMLElement).contains(nextTarget)) return
  notifyControlBlur()
}

// ===== container classes =====

const defaultContainerClasses = computed(() =>
  cn('flex', props.direction === 'horizontal' ? 'flex-row flex-wrap gap-4' : 'flex-col gap-2'),
)

const buttonSizeClassMap: Record<string, string> = {
  sm: 'rounded-[var(--round-default)]',
  md: 'rounded-[var(--round-default)]',
  lg: 'rounded-[var(--round-default)]',
}

const buttonContainerClasses = computed(() =>
  cn(
    'inline-flex overflow-hidden border border-[var(--border-color-component)]',
    buttonSizeClassMap[effectiveSize.value],
  ),
)
</script>

<style scoped>
.checkbox-group-button {
  display: inline-flex;
}

.checkbox-group-button > :not(:last-child)[data-selected] {
  border-right-color: var(--color-brand);
}
</style>
