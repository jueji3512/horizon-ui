<template>
  <!-- default type — hidden native input + custom circle -->
  <label v-if="groupType === 'default'" :class="defaultClasses">
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

  <!-- button type — self-maintained button, no Button component to avoid transition conflicts -->
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
const isDisabled = computed(() => props.disabled || (group?.disabled ?? false))
const groupType = computed(() => group?.type ?? 'default')
const groupSize = computed(() => group?.size ?? 'md')
const groupName = computed(() => group?.name ?? '')

function handleSelect() {
  if (!isDisabled.value && group) {
    group.select(props.value)
  }
}

// ===== default type classes =====

const circleClasses = computed(() =>
  cn(
    'w-4 h-4',
    'rounded-[var(--round-full)] border border-solid flex-shrink-0 flex items-center justify-center transition-colors duration-200',
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
    'w-2 h-2',
    'rounded-[var(--round-full)] transition-all duration-200',
    isChecked.value ? 'scale-100 opacity-100' : 'scale-0 opacity-0',
    isDisabled.value && isChecked.value ? 'bg-[var(--text-color-disabled)]' : 'bg-brand',
  ),
)

const defaultClasses = computed(() =>
  cn(
    'inline-flex items-center gap-2 select-none font-body-md',
    isDisabled.value ? 'cursor-not-allowed opacity-60' : 'cursor-pointer',
  ),
)

// ===== button type classes =====
// Heights and padding aligned with Button component.

const buttonSizeMap: Record<string, string> = {
  sm: 'h-[var(--comp-size-sm)] px-2 font-body-sm gap-1',
  md: 'h-[var(--comp-size-md)] px-4 font-body-md gap-1.5',
  lg: 'h-[var(--comp-size-lg)] px-4 font-body-lg gap-2',
}

const buttonClasses = computed(() =>
  cn(
    'flex-1 inline-flex items-center justify-center font-medium whitespace-nowrap',
    'border-r border-[var(--border-color-component)] last:border-r-0',
    buttonSizeMap[groupSize.value],
    isChecked.value && !isDisabled.value && 'bg-brand text-[var(--text-color-inverse)]',
    !isChecked.value &&
      !isDisabled.value &&
      'bg-[var(--bg-color-container)] text-[var(--text-color-primary)] hover:text-brand',
    isDisabled.value &&
      isChecked.value &&
      'bg-brand text-[var(--text-color-inverse)] opacity-60 cursor-not-allowed',
    isDisabled.value &&
      !isChecked.value &&
      'bg-[var(--bg-color-component-disabled)] text-[var(--text-color-disabled)] cursor-not-allowed',
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
