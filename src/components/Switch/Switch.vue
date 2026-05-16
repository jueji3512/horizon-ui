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
        <Icon v-if="loading" name="loading" :size="loadingIconSize" class="animate-spin" />
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

const sizeMap: Record<SwitchSize, { track: string; thumb: string; thumbActive: string; iconSize: number }> = {
  sm: { track: 'w-7 h-4', thumb: 'w-3 h-3', thumbActive: 'translate-x-3', iconSize: 10 },
  md: { track: 'w-10 h-5', thumb: 'w-4 h-4', thumbActive: 'translate-x-5', iconSize: 12 },
  lg: { track: 'w-[52px] h-6', thumb: 'w-5 h-5', thumbActive: 'translate-x-7', iconSize: 14 },
}

const switchClasses = computed(() =>
  cn(
    'inline-flex items-center align-middle select-none',
    props.disabled || props.loading ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
  ),
)

const trackClasses = computed(() =>
  cn(
    'rounded-full transition-colors duration-200 relative flex items-center',
    sizeMap[props.size].track,
    props.modelValue ? 'bg-primary' : 'bg-neutral-border',
  ),
)

const thumbClasses = computed(() =>
  cn(
    'rounded-full bg-white shadow-sm absolute left-0.5 flex items-center justify-center transition-transform duration-200 text-primary',
    sizeMap[props.size].thumb,
    props.modelValue ? sizeMap[props.size].thumbActive : 'translate-x-0',
  ),
)

const loadingIconSize = computed(() => sizeMap[props.size].iconSize)
</script>
