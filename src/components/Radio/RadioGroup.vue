<template>
  <!-- default type -->
  <div v-if="type === 'default'" role="radiogroup" :class="defaultContainerClasses">
    <slot />
  </div>

  <!-- button type -->
  <div
    v-else
    role="radiogroup"
    class="radio-group-button"
    :class="buttonContainerClasses"
    @keydown="handleKeydown"
  >
    <slot />
  </div>
</template>

<script lang="ts">
import type { ComputedRef, InjectionKey } from 'vue'

export interface RadioGroupContext {
  modelValue: ComputedRef<string | number | undefined>
  type: string
  size: string
  disabled: boolean
  name: string
  select: (value: string | number) => void
}

export const radioGroupKey: InjectionKey<RadioGroupContext> = Symbol('radioGroup')
</script>

<script setup lang="ts">
import { computed, provide, useId } from 'vue'
import { cn } from '../../utils'

const props = withDefaults(
  defineProps<{
    modelValue?: string | number
    type?: 'default' | 'button'
    size?: 'sm' | 'md' | 'lg'
    disabled?: boolean
    direction?: 'horizontal' | 'vertical'
  }>(),
  {
    modelValue: undefined,
    type: 'default',
    size: 'md',
    disabled: false,
    direction: 'horizontal',
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
  change: [value: string | number]
}>()

const name = useId()

const groupModelValue = computed(() => props.modelValue)

function select(value: string | number) {
  emit('update:modelValue', value)
  emit('change', value)
}

provide(radioGroupKey, {
  modelValue: groupModelValue,
  type: props.type,
  size: props.size,
  disabled: props.disabled,
  name,
  select,
})

// ===== button type: keyboard nav =====

function handleKeydown(e: KeyboardEvent) {
  if (props.type !== 'button') return

  const container = e.currentTarget as HTMLElement
  const radios = container.querySelectorAll<HTMLElement>(
    '[role="radio"]:not([disabled])',
  )
  if (!radios?.length) return

  const currentIndex = Array.from(radios).indexOf(document.activeElement as HTMLElement)
  const base = currentIndex === -1 ? 0 : currentIndex

  let nextIndex = -1
  if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
    e.preventDefault()
    nextIndex = (base + 1) % radios.length
  } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
    e.preventDefault()
    nextIndex = (base - 1 + radios.length) % radios.length
  }

  if (nextIndex >= 0) {
    const btn = radios[nextIndex]
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
.radio-group-button {
  display: inline-flex;
}

.radio-group-button > :not(:last-child)[data-selected] {
  border-right-color: var(--color-primary);
}
</style>
