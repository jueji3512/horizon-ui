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
    <span class="text-sm"><slot>{{ label }}</slot></span>
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
    <Icon v-if="prefixIcon" :name="prefixIcon" :size="iconSizeValue" />
    <slot>{{ label }}</slot>
  </button>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue'
import Icon from '../Icon/Icon.vue'
import { cn } from '../../utils'
import type { RadioGroupContext } from './RadioGroup.vue'
import { radioGroupKey } from './RadioGroup.vue'

const props = withDefaults(defineProps<{
  value: string | number
  label?: string
  disabled?: boolean
  prefixIcon?: string
}>(), {
  label: '',
  disabled: false,
  prefixIcon: '',
})

const group = inject<RadioGroupContext | null>(radioGroupKey, null)

const isChecked = computed(() => group?.modelValue.value === props.value)
const isDisabled = computed(() => props.disabled || (group?.disabled ?? false))
const groupType = computed(() => group?.type ?? 'default')
const groupSize = computed(() => group?.size ?? 'md')
const groupName = computed(() => group?.name ?? '')

const iconSizeMap: Record<string, number> = { sm: 12, md: 14, lg: 16 }
const iconSizeValue = computed(() => iconSizeMap[groupSize.value])

function handleSelect() {
  if (!isDisabled.value && group) {
    group.select(props.value)
  }
}

// ===== default type classes =====

const circleClasses = computed(() =>
  cn(
    'w-4 h-4',
    'rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-colors duration-200',
    isDisabled.value && 'border-neutral-border bg-neutral-subtle',
    !isDisabled.value && isChecked.value && 'border-primary',
    !isDisabled.value && !isChecked.value && 'border-neutral-border hover:border-neutral-muted',
  ),
)

const dotClasses = computed(() =>
  cn(
    'w-2 h-2',
    'rounded-full transition-all duration-200',
    isChecked.value ? 'scale-100 opacity-100' : 'scale-0 opacity-0',
    isDisabled.value && isChecked.value ? 'bg-neutral-muted' : 'bg-primary',
  ),
)

const defaultClasses = computed(() =>
  cn(
    'inline-flex items-center gap-2 select-none text-sm',
    isDisabled.value ? 'cursor-not-allowed opacity-60' : 'cursor-pointer',
  ),
)

// ===== button type classes =====
// Heights and padding aligned with Button component.

const buttonSizeMap: Record<string, string> = {
  sm: 'h-6 px-2 text-xs gap-1',
  md: 'h-8 px-4 text-sm gap-1.5',
  lg: 'h-10 px-4 text-base gap-2',
}

const buttonClasses = computed(() =>
  cn(
    'flex-1 inline-flex items-center justify-center font-medium whitespace-nowrap',
    'border-r border-neutral-border last:border-r-0',
    buttonSizeMap[groupSize.value],
    isChecked.value && !isDisabled.value && 'bg-primary text-white hover:bg-primary-700',
    !isChecked.value && !isDisabled.value && 'bg-white text-neutral-text hover:bg-neutral-subtle',
    isDisabled.value && 'bg-neutral-subtle text-neutral-muted opacity-60 cursor-not-allowed',
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
