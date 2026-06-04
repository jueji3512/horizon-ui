<template>
  <label :class="switchClasses">
    <input
      type="checkbox"
      role="switch"
      class="peer sr-only"
      :checked="modelValue"
      :disabled="disabled || loading"
      :name="name"
      :aria-label="ariaLabel || undefined"
      :aria-checked="modelValue"
      @change="handleToggle"
    />
    <span :class="trackClasses">
      <span :class="thumbClasses">
        <Icon
          v-if="loading"
          name="loading"
          :class="['animate-spin', switchGeometryMap[props.size].loadingIcon]"
        />
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

type SwitchGeometry = {
  track: string
  thumb: string
  thumbPosition: string
  checkedTranslate: string
  loadingIcon: string
}

const switchGeometryMap: Record<SwitchSize, SwitchGeometry> = {
  sm: {
    track: 'h-4 w-[26px]',
    thumb: 'h-[10px] w-[10px]',
    thumbPosition: 'top-[3px] left-[3px]',
    checkedTranslate: 'translate-x-[10px]',
    loadingIcon: 'text-[8px]',
  },
  md: {
    track: 'h-5 w-8',
    thumb: 'h-3 w-3',
    thumbPosition: 'top-1 left-1',
    checkedTranslate: 'translate-x-3',
    loadingIcon: 'text-[10px]',
  },
  lg: {
    track: 'h-6 w-10',
    thumb: 'h-3.5 w-3.5',
    thumbPosition: 'top-[5px] left-[5px]',
    checkedTranslate: 'translate-x-4',
    loadingIcon: 'text-xs',
  },
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
    'relative flex items-center rounded-[var(--round-full)] transition-colors duration-200 peer-focus-visible:ring-2 peer-focus-visible:ring-brand-focus',
    switchGeometryMap[props.size].track,
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
    'absolute flex items-center justify-center rounded-[var(--round-full)] bg-[var(--bg-color-container)] text-brand shadow-sm transition-transform duration-200',
    switchGeometryMap[props.size].thumb,
    switchGeometryMap[props.size].thumbPosition,
    isDisabled.value && 'text-[var(--text-color-disabled)]',
    props.modelValue ? switchGeometryMap[props.size].checkedTranslate : 'translate-x-0',
  ),
)
</script>
