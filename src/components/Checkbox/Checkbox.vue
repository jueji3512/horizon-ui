<template>
  <!-- default type -->
  <label v-if="groupType === 'default'" :class="defaultClasses">
    <input
      type="checkbox"
      class="sr-only"
      :checked="isChecked"
      :disabled="computedDisabled"
      @change="handleToggle"
    />
    <span class="checkbox-box" :class="boxClasses">
      <!-- indeterminate dash -->
      <svg
        v-if="isIndeterminate"
        viewBox="0 0 12 12"
        class="checkbox-icon"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
      >
        <path d="M2 6h8" />
      </svg>
      <!-- checkmark -->
      <svg
        v-else-if="isChecked"
        viewBox="0 0 12 12"
        class="checkbox-icon"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M2 6l3 3 5-6" />
      </svg>
    </span>
    <slot>{{ label }}</slot>
  </label>

  <!-- button type -->
  <button
    v-else
    type="button"
    role="checkbox"
    :aria-checked="isIndeterminate ? 'mixed' : isChecked"
    :disabled="computedDisabled"
    :data-selected="isChecked || undefined"
    :class="buttonClasses"
    @click="handleToggle"
  >
    <Icon v-if="prefixIcon" :name="prefixIcon" :size="iconSizeValue" />
    <slot>{{ label }}</slot>
  </button>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue'
import Icon from '../Icon/Icon.vue'
import { cn } from '../../utils'
import type { CheckboxGroupContext } from './CheckboxGroup.vue'
import { checkboxGroupKey } from './CheckboxGroup.vue'

const props = withDefaults(defineProps<{
  value?: string | number
  label?: string
  checked?: boolean
  disabled?: boolean
  indeterminate?: boolean
  prefixIcon?: string
}>(), {
  value: undefined,
  label: '',
  checked: false,
  disabled: false,
  indeterminate: false,
  prefixIcon: '',
})

const emit = defineEmits<{
  'update:checked': [value: boolean]
  change: [value: boolean]
}>()

const group = inject<CheckboxGroupContext | null>(checkboxGroupKey, null)

const groupType = computed(() => group?.type ?? 'default')
const groupSize = computed(() => group?.size ?? 'md')

const isChecked = computed(() => {
  if (group && props.value !== undefined) return group.modelValue.value.includes(props.value)
  return props.checked
})

const isIndeterminate = computed(() => !isChecked.value && props.indeterminate)

const limitDisabled = computed(() => {
  if (!group || props.value === undefined) return false
  return group.isLimitDisabled(props.value, isChecked.value)
})

const computedDisabled = computed(() =>
  props.disabled || (group?.disabled ?? false) || limitDisabled.value,
)

const iconSizeMap: Record<string, number> = { sm: 12, md: 14, lg: 16 }
const iconSizeValue = computed(() => iconSizeMap[groupSize.value])

function handleToggle() {
  if (computedDisabled.value) return

  if (group && props.value !== undefined) {
    group.toggle(props.value)
  } else {
    emit('update:checked', !props.checked)
    emit('change', !props.checked)
  }
}

// ===== default type classes =====

const boxClasses = computed(() =>
  cn(
    'w-4 h-4 rounded-sm border-2 flex-shrink-0 flex items-center justify-center transition-colors duration-200',
    computedDisabled.value && !isIndeterminate.value && 'border-neutral-border bg-neutral-subtle text-neutral-muted',
    !computedDisabled.value && isChecked.value && 'border-primary bg-primary text-white',
    !computedDisabled.value && isIndeterminate.value && 'border-primary bg-primary text-white',
    !computedDisabled.value && !isChecked.value && !isIndeterminate.value && 'border-neutral-border bg-white hover:border-primary',
  ),
)

const defaultClasses = computed(() =>
  cn(
    'inline-flex items-center gap-2 select-none text-sm',
    computedDisabled.value ? 'cursor-not-allowed opacity-60' : 'cursor-pointer',
  ),
)

// ===== button type classes =====

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
    isChecked.value && !computedDisabled.value && 'bg-primary text-white hover:bg-primary-700',
    !isChecked.value && !computedDisabled.value && 'bg-white text-neutral-text hover:bg-neutral-subtle',
    computedDisabled.value && 'bg-neutral-subtle text-neutral-muted opacity-60 cursor-not-allowed',
  ),
)
</script>

<style scoped>
.checkbox-box {
  position: relative;
}

.checkbox-icon {
  width: 75%;
  height: 75%;
}
</style>
