<template>
  <a :aria-disabled="disabled || undefined" :class="classes" @click="handleClick">
    <Icon v-if="prefixIcon" :name="prefixIcon" />
    <slot />
    <Icon v-if="suffixIcon" :name="suffixIcon" />
  </a>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Icon from '../Icon/Icon.vue'
import { cn } from '../../utils'

type LinkTheme = 'default' | 'brand' | 'success' | 'warning' | 'error'
type LinkUnderline = 'always' | 'hover' | 'never'
type LinkSize = 'sm' | 'md' | 'lg'

const props = withDefaults(
  defineProps<{
    theme?: LinkTheme
    underline?: LinkUnderline
    size?: LinkSize
    disabled?: boolean
    prefixIcon?: string
    suffixIcon?: string
  }>(),
  {
    theme: 'default',
    underline: 'hover',
    size: 'md',
    disabled: false,
    prefixIcon: '',
    suffixIcon: '',
  },
)

const emit = defineEmits<{
  click: [e: MouseEvent]
}>()

const sizeMap: Record<LinkSize, string> = {
  sm: 'font-body-sm gap-1',
  md: 'font-body-md gap-1',
  lg: 'font-body-lg gap-1.5',
}

const themeColorMap: Record<LinkTheme, string> = {
  default: 'text-[var(--text-color-primary)]',
  brand: 'text-brand hover:text-brand-hover',
  success: 'text-success hover:text-success-hover',
  warning: 'text-warning hover:text-warning-hover',
  error: 'text-error hover:text-error-hover',
}

const underlineMap: Record<LinkUnderline, string> = {
  always: 'border-b border-current',
  hover: 'border-b border-transparent hover:border-current',
  never: '',
}

const disabledColorMap: Record<LinkTheme, string> = {
  default: 'text-[var(--text-color-disabled)]',
  brand: 'text-brand/50',
  success: 'text-success/50',
  warning: 'text-warning/50',
  error: 'text-error/50',
}

function handleClick(e: MouseEvent) {
  if (!props.disabled) {
    emit('click', e)
  }
}

const classes = computed(() =>
  cn(
    'inline-flex items-center transition-colors duration-150 [text-decoration:none]',
    sizeMap[props.size],
    props.disabled
      ? cn(disabledColorMap[props.theme], 'cursor-not-allowed border-transparent')
      : cn(themeColorMap[props.theme], underlineMap[props.underline], 'cursor-pointer'),
  ),
)
</script>
