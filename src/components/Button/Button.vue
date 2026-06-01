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
type ButtonSize = 'sm' | 'md' | 'lg'

const props = withDefaults(
  defineProps<{
    theme?: ButtonTheme
    size?: ButtonSize
    disabled?: boolean
    loading?: boolean
    round?: boolean
    icon?: string
    prefixIcon?: string
    suffixIcon?: string
    name?: string
    value?: string
    autofocus?: boolean
  }>(),
  {
    theme: 'default',
    size: 'md',
    disabled: false,
    loading: false,
    round: false,
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

const sizeMap: Record<ButtonSize, string> = {
  sm: 'h-[var(--comp-size-sm)] px-[calc(var(--padding-x-2)-1px)] font-body-sm rounded-[var(--round-default)] gap-1',
  md: 'h-[var(--comp-size-md)] px-[calc(var(--padding-x-4)-1px)] font-body-md rounded-[var(--round-default)] gap-1.5',
  lg: 'h-[var(--comp-size-lg)] px-[calc(var(--padding-x-6)-1px)] font-body-lg rounded-[var(--round-default)] gap-2',
}

const roundSizeMap: Record<ButtonSize, string> = {
  sm: 'rounded-[var(--round-full)] p-0 h-[var(--comp-size-sm)] w-[var(--comp-size-sm)]',
  md: 'rounded-[var(--round-full)] p-0 h-[var(--comp-size-md)] w-[var(--comp-size-md)]',
  lg: 'rounded-[var(--round-full)] p-0 h-[var(--comp-size-lg)] w-[var(--comp-size-lg)]',
}

const variantMap: Record<ButtonTheme, string> = {
  default:
    'bg-[var(--bg-color-component)] border-[var(--border-color-component)] text-[var(--text-color-primary)] hover:bg-[var(--bg-color-component-hover)] active:bg-[var(--bg-color-component-active)]',
  brand:
    'bg-brand border-brand text-[var(--text-color-inverse)] hover:bg-brand-hover hover:border-brand-hover active:bg-brand-active active:border-brand-active',
  success:
    'bg-success border-success text-[var(--text-color-inverse)] hover:bg-success-hover hover:border-success-hover active:bg-success-active active:border-success-active',
  warning:
    'bg-warning border-warning text-[var(--text-color-inverse)] hover:bg-warning-hover hover:border-warning-hover active:bg-warning-active active:border-warning-active',
  error:
    'bg-error border-error text-[var(--text-color-inverse)] hover:bg-error-hover hover:border-error-hover active:bg-error-active active:border-error-active',
}

const disabledMap: Record<ButtonTheme, string> = {
  default:
    'bg-[var(--bg-color-component-disabled)] border-[var(--border-color-component)] text-[var(--text-color-disabled)] cursor-not-allowed',
  brand:
    'bg-brand-disabled border-brand-disabled text-[var(--text-color-inverse)] cursor-not-allowed',
  success:
    'bg-success-disabled border-success-disabled text-[var(--text-color-inverse)] cursor-not-allowed',
  warning:
    'bg-warning-disabled border-warning-disabled text-[var(--text-color-inverse)] cursor-not-allowed',
  error:
    'bg-error-disabled border-error-disabled text-[var(--text-color-inverse)] cursor-not-allowed',
}

const classes = computed(() =>
  cn(
    'inline-flex items-center justify-center font-medium border transition-colors duration-200',
    sizeMap[props.size],
    (props.round || isIconOnly.value) &&
      sizeMap[props.size].replace(
        /rounded-\[var\(--round-default\)\]/,
        'rounded-[var(--round-full)]',
      ),
    isIconOnly.value && roundSizeMap[props.size],
    props.disabled || props.loading ? disabledMap[props.theme] : variantMap[props.theme],
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
