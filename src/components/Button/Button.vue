<template>
  <button
    type="button"
    :disabled="disabled || loading"
    :name="name || undefined"
    :value="value || undefined"
    :autofocus="autofocus"
    :aria-label="computedAriaLabel"
    :aria-busy="loading || undefined"
    :class="classes"
    @click="handleClick"
  >
    <Icon v-if="loading" name="loading" class="btn-loading" />
    <template v-else>
      <span v-if="computedPrefixIcon || $slots['prefix-icon']" class="btn-icon">
        <slot name="prefix-icon">
          <Icon :name="computedPrefixIcon" />
        </slot>
      </span>
      <slot />
      <span v-if="suffixIcon || $slots['suffix-icon']" class="btn-icon">
        <slot name="suffix-icon">
          <Icon :name="suffixIcon" />
        </slot>
      </span>
    </template>
  </button>
</template>

<script setup lang="ts">
import { computed, useSlots, useAttrs } from 'vue'
import Icon from '../Icon/Icon.vue'
import { cn } from '../../utils'

type ButtonTheme = 'default' | 'brand' | 'success' | 'warning' | 'error'
type ButtonVariant = 'solid' | 'outline'
type ButtonSize = 'sm' | 'md' | 'lg'
type ButtonShape = 'rectangle' | 'round' | 'circle' | 'square'

const props = withDefaults(
  defineProps<{
    theme?: ButtonTheme
    variant?: ButtonVariant
    size?: ButtonSize
    disabled?: boolean
    loading?: boolean
    shape?: ButtonShape
    icon?: string
    prefixIcon?: string
    suffixIcon?: string
    name?: string
    value?: string
    autofocus?: boolean
  }>(),
  {
    theme: 'default',
    variant: 'solid',
    size: 'md',
    disabled: false,
    loading: false,
    shape: 'rectangle',
    icon: '',
    prefixIcon: '',
    suffixIcon: '',
    name: '',
    value: '',
    autofocus: false,
  },
)

const emit = defineEmits<{
  click: [e: MouseEvent]
}>()

const slots = useSlots()
const attrs = useAttrs()

function handleClick(e: MouseEvent) {
  if (!props.disabled && !props.loading) {
    emit('click', e)
  }
}

const computedPrefixIcon = computed(() => props.prefixIcon || props.icon)
const hasContent = computed(() => !!slots.default)
const isIconOnly = computed(() => !hasContent.value && !!computedPrefixIcon.value)
const computedAriaLabel = computed(() => {
  if (attrs['aria-label']) return attrs['aria-label'] as string
  if (isIconOnly.value) return computedPrefixIcon.value
  return undefined
})

const rectangleSizeMap: Record<ButtonSize, string> = {
  sm: 'h-[var(--comp-size-sm)] px-[7px] font-body-sm rounded-[var(--round-default)] gap-1',
  md: 'h-[var(--comp-size-md)] px-[15px] font-body-md rounded-[var(--round-default)] gap-1.5',
  lg: 'h-[var(--comp-size-lg)] px-[23px] font-body-lg rounded-[var(--round-default)] gap-2',
}

const roundSizeMap: Record<ButtonSize, string> = {
  sm: 'h-[var(--comp-size-sm)] rounded-[var(--round-full)] px-[7px] font-body-sm gap-1',
  md: 'h-[var(--comp-size-md)] rounded-[var(--round-full)] px-[15px] font-body-md gap-1.5',
  lg: 'h-[var(--comp-size-lg)] rounded-[var(--round-full)] px-[23px] font-body-lg gap-2',
}

const squareSizeMap: Record<ButtonSize, string> = {
  sm: 'h-[var(--comp-size-sm)] w-[var(--comp-size-sm)] rounded-[var(--round-default)] p-0 font-body-sm',
  md: 'h-[var(--comp-size-md)] w-[var(--comp-size-md)] rounded-[var(--round-default)] p-0 font-body-md',
  lg: 'h-[var(--comp-size-lg)] w-[var(--comp-size-lg)] rounded-[var(--round-default)] p-0 font-body-lg',
}

const circleSizeMap: Record<ButtonSize, string> = {
  sm: 'rounded-[var(--round-full)] p-0 h-[var(--comp-size-sm)] w-[var(--comp-size-sm)]',
  md: 'rounded-[var(--round-full)] p-0 h-[var(--comp-size-md)] w-[var(--comp-size-md)]',
  lg: 'rounded-[var(--round-full)] p-0 h-[var(--comp-size-lg)] w-[var(--comp-size-lg)]',
}

const shapeSizeMap: Record<ButtonShape, Record<ButtonSize, string>> = {
  rectangle: rectangleSizeMap,
  round: roundSizeMap,
  square: squareSizeMap,
  circle: circleSizeMap,
}

const solidThemeMap: Record<ButtonTheme, string> = {
  default:
    'border-[var(--border-color-component)] bg-[var(--bg-color-component)] text-[var(--text-color-primary)] hover:bg-[var(--bg-color-component-hover)] active:bg-[var(--bg-color-component-active)]',
  brand:
    'border-brand bg-brand text-[var(--text-color-inverse)] hover:border-brand-hover hover:bg-brand-hover active:border-brand-active active:bg-brand-active',
  success:
    'border-success bg-success text-[var(--text-color-inverse)] hover:border-success-hover hover:bg-success-hover active:border-success-active active:bg-success-active',
  warning:
    'border-warning bg-warning text-[var(--text-color-inverse)] hover:border-warning-hover hover:bg-warning-hover active:border-warning-active active:bg-warning-active',
  error:
    'border-error bg-error text-[var(--text-color-inverse)] hover:border-error-hover hover:bg-error-hover active:border-error-active active:bg-error-active',
}

const outlineThemeMap: Record<ButtonTheme, string> = {
  default:
    'border-[var(--border-color-component)] bg-[var(--bg-color-container)] text-[var(--text-color-primary)] hover:bg-[var(--bg-color-container-hover)] active:bg-[var(--bg-color-container-active)]',
  brand:
    'border-brand bg-[var(--bg-color-container)] text-brand hover:border-brand-hover hover:bg-brand-light hover:text-brand-hover active:border-brand-active active:bg-brand-focus active:text-brand-active',
  success:
    'border-success bg-[var(--bg-color-container)] text-success hover:border-success-hover hover:bg-success-light hover:text-success-hover active:border-success-active active:bg-success-focus active:text-success-active',
  warning:
    'border-warning bg-[var(--bg-color-container)] text-warning hover:border-warning-hover hover:bg-warning-light hover:text-warning-hover active:border-warning-active active:bg-warning-focus active:text-warning-active',
  error:
    'border-error bg-[var(--bg-color-container)] text-error hover:border-error-hover hover:bg-error-light hover:text-error-hover active:border-error-active active:bg-error-focus active:text-error-active',
}

const variantThemeMap: Record<ButtonVariant, Record<ButtonTheme, string>> = {
  solid: solidThemeMap,
  outline: outlineThemeMap,
}

const neutralDisabledClasses =
  'cursor-not-allowed border-[var(--border-color-component)] bg-[var(--bg-color-component-disabled)] text-[var(--text-color-disabled)]'

const solidDisabledMap: Record<ButtonTheme, string> = {
  default: neutralDisabledClasses,
  brand:
    'cursor-not-allowed border-brand-disabled bg-brand-disabled text-[var(--text-color-inverse)]',
  success:
    'cursor-not-allowed border-success-disabled bg-success-disabled text-[var(--text-color-inverse)]',
  warning:
    'cursor-not-allowed border-warning-disabled bg-warning-disabled text-[var(--text-color-inverse)]',
  error:
    'cursor-not-allowed border-error-disabled bg-error-disabled text-[var(--text-color-inverse)]',
}

const outlineDisabledMap: Record<ButtonTheme, string> = {
  default: neutralDisabledClasses,
  brand: neutralDisabledClasses,
  success: neutralDisabledClasses,
  warning: neutralDisabledClasses,
  error: neutralDisabledClasses,
}

const disabledMap: Record<ButtonVariant, Record<ButtonTheme, string>> = {
  solid: solidDisabledMap,
  outline: outlineDisabledMap,
}

const focusRingMap: Record<ButtonTheme, string> = {
  default: 'focus-visible:ring-brand-focus',
  brand: 'focus-visible:ring-brand-focus',
  success: 'focus-visible:ring-success-focus',
  warning: 'focus-visible:ring-warning-focus',
  error: 'focus-visible:ring-error-focus',
}

const classes = computed(() =>
  cn(
    'inline-flex items-center justify-center border font-medium whitespace-nowrap transition-colors duration-200 select-none focus-visible:ring-2 focus-visible:outline-none',
    shapeSizeMap[props.shape][props.size],
    focusRingMap[props.theme],
    props.disabled || props.loading
      ? disabledMap[props.variant][props.theme]
      : variantThemeMap[props.variant][props.theme],
    props.disabled || props.loading ? 'cursor-not-allowed' : 'cursor-pointer',
  ),
)
</script>

<style scoped>
.btn-icon {
  display: inline-flex;
  align-items: center;
}

.btn-loading {
  animation: btn-spin 1s linear infinite;
}

@keyframes btn-spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
