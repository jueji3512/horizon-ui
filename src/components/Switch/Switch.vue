<template>
  <label :class="switchClasses">
    <input
      type="checkbox"
      class="sr-only"
      :checked="modelValue"
      :disabled="disabled || loading"
      :name="name"
      :aria-label="ariaLabel || undefined"
      @change="handleToggle"
    />
    <span :class="trackClasses">
      <span :class="thumbClasses">
        <Icon v-if="loading" name="loading" :class="['animate-spin', iconClassMap[props.size]]" />
      </span>
    </span>
  </label>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Icon from '../Icon/Icon.vue'
import { cn } from '../../utils'

type SwitchSize = 'sm' | 'md' | 'lg'

const props = withDefaults(
  defineProps<{
    modelValue?: boolean
    size?: SwitchSize
    disabled?: boolean
    loading?: boolean
    name?: string
    ariaLabel?: string
  }>(),
  {
    modelValue: false,
    size: 'md',
    disabled: false,
    loading: false,
    name: '',
    ariaLabel: '',
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  change: [value: boolean]
}>()

function handleToggle() {
  if (props.disabled || props.loading) return
  const next = !props.modelValue
  emit('update:modelValue', next)
  emit('change', next)
}

const sizeMap: Record<SwitchSize, { track: string; thumb: string; thumbActive: string }> = {
  sm: { track: 'w-[26px] h-4', thumb: 'w-[10px] h-[10px]', thumbActive: 'translate-x-[10px]' },
  md: { track: 'w-8 h-5', thumb: 'w-[14px] h-[14px]', thumbActive: 'translate-x-3' },
  lg: { track: 'w-[39px] h-6', thumb: 'w-[18px] h-[18px]', thumbActive: 'translate-x-[15px]' },
}

const iconClassMap: Record<SwitchSize, string> = {
  sm: 'text-[8px]',
  md: 'text-[10px]',
  lg: 'text-xs',
}
const isDisabled = computed(() => props.disabled || props.loading)

const switchClasses = computed(() =>
  cn(
    'inline-flex items-center align-middle select-none',
    isDisabled.value ? 'cursor-not-allowed' : 'cursor-pointer',
  ),
)

const trackClasses = computed(() =>
  cn(
    'relative flex items-center rounded-[var(--round-full)] transition-colors duration-200',
    sizeMap[props.size].track,
    props.modelValue && !isDisabled.value && 'bg-brand',
    props.modelValue && isDisabled.value && 'bg-brand-disabled',
    !props.modelValue &&
      (isDisabled.value
        ? 'bg-[var(--bg-color-component-disabled)]'
        : 'bg-[var(--bg-color-component)]'),
  ),
)

const thumbClasses = computed(() =>
  cn(
    'absolute top-[3px] left-[3px] flex items-center justify-center rounded-[var(--round-full)] bg-[var(--bg-color-container)] text-brand shadow-sm transition-transform duration-200',
    sizeMap[props.size].thumb,
    isDisabled.value && 'text-[var(--text-color-disabled)]',
    props.modelValue ? sizeMap[props.size].thumbActive : 'translate-x-0',
  ),
)
</script>
