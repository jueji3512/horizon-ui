<template>
  <!-- default variant — hidden native input + custom circle -->
  <label v-if="groupVariant === 'default'" :class="defaultClasses">
    <input
      type="radio"
      class="sr-only"
      :name="groupName"
      :value="value"
      :checked="isChecked"
      :disabled="isDisabled"
      @change="handleSelect"
    />
    <span class="radio-circle" :class="circleClasses">
      <span class="radio-dot" :class="dotClasses" />
    </span>
    <span class="font-body-md"
      ><slot>{{ label }}</slot></span
    >
  </label>

  <!-- button variant — self-maintained button, no Button component to avoid transition conflicts -->
  <button
    v-else
    type="button"
    role="radio"
    :aria-checked="isChecked"
    :disabled="isDisabled"
    :data-selected="isChecked || undefined"
    :class="buttonClasses"
    @click="handleSelect"
  >
    <Icon v-if="prefixIcon" :name="prefixIcon" />
    <slot>{{ label }}</slot>
  </button>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue'
import Icon from '../Icon/Icon.vue'
import { cn } from '../../utils'
import type { RadioGroupContext } from './RadioGroup.vue'
import { radioGroupKey } from './RadioGroup.vue'

const props = withDefaults(
  defineProps<{
    value: string | number
    label?: string
    disabled?: boolean
    prefixIcon?: string
  }>(),
  {
    label: '',
    disabled: false,
    prefixIcon: '',
  },
)

const group = inject<RadioGroupContext | null>(radioGroupKey, null)

const isChecked = computed(() => group?.modelValue.value === props.value)
const isDisabled = computed(() => props.disabled || (group?.disabled.value ?? false))
const groupVariant = computed(() => group?.variant.value ?? 'default')
const groupSize = computed(() => group?.size.value ?? 'md')
const groupName = computed(() => group?.name ?? '')

function handleSelect() {
  if (!isDisabled.value && group) {
    group.select(props.value)
  }
}

// ===== default variant classes =====

const circleClasses = computed(() =>
  cn(
    'h-4 w-4',
    'flex flex-shrink-0 items-center justify-center rounded-[var(--round-full)] border border-solid transition-colors duration-200',
    isDisabled.value &&
      'border-[var(--border-color-component)] bg-[var(--bg-color-component-disabled)]',
    !isDisabled.value && isChecked.value && 'border-brand',
    !isDisabled.value &&
      !isChecked.value &&
      'border-[var(--border-color-component)] hover:border-brand',
  ),
)

const dotClasses = computed(() =>
  cn(
    'h-2 w-2',
    'rounded-[var(--round-full)] transition-all duration-200',
    isChecked.value ? 'scale-100 opacity-100' : 'scale-0 opacity-0',
    isDisabled.value && isChecked.value ? 'bg-[var(--text-color-disabled)]' : 'bg-brand',
  ),
)

const defaultClasses = computed(() =>
  cn(
    'font-body-md inline-flex items-center gap-2 select-none',
    isDisabled.value ? 'cursor-not-allowed text-[var(--text-color-disabled)]' : 'cursor-pointer',
  ),
)

// ===== button variant classes =====
// Heights and padding aligned with Button component.

const buttonSizeMap: Record<string, string> = {
  sm: 'h-[var(--comp-size-sm)] px-[var(--padding-x-2)] font-body-sm gap-1',
  md: 'h-[var(--comp-size-md)] px-[var(--padding-x-4)] font-body-md gap-1.5',
  lg: 'h-[var(--comp-size-lg)] px-[var(--padding-x-4)] font-body-lg gap-2',
}

const buttonClasses = computed(() =>
  cn(
    'inline-flex flex-1 items-center justify-center font-medium whitespace-nowrap',
    'border-r border-[var(--border-color-component)] last:border-r-0',
    buttonSizeMap[groupSize.value],
    isChecked.value && !isDisabled.value && 'bg-brand text-[var(--text-color-inverse)]',
    !isChecked.value &&
      !isDisabled.value &&
      'bg-[var(--bg-color-container)] text-[var(--text-color-primary)] hover:text-brand',
    isDisabled.value &&
      isChecked.value &&
      'cursor-not-allowed border-brand-disabled bg-brand-disabled text-[var(--text-color-inverse)]',
    isDisabled.value &&
      !isChecked.value &&
      'cursor-not-allowed bg-[var(--bg-color-component-disabled)] text-[var(--text-color-disabled)]',
  ),
)
</script>

<style scoped>
.radio-circle {
  position: relative;
}

.radio-dot {
  position: absolute;
  inset: 0;
  margin: auto;
}
</style>
