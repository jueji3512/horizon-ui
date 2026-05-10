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
    <Icon v-if="loading" name="loading" :size="iconSize" class="btn-loading" />
    <template v-else>
      <span v-if="computedPrefixIcon || $slots['prefix-icon']" class="btn-icon">
        <slot name="prefix-icon">
          <Icon :name="computedPrefixIcon" :size="iconSize" />
        </slot>
      </span>
      <slot />
      <span v-if="suffixIcon || $slots['suffix-icon']" class="btn-icon">
        <slot name="suffix-icon">
          <Icon :name="suffixIcon" :size="iconSize" />
        </slot>
      </span>
    </template>
  </button>
</template>

<script setup lang="ts">
import { computed, useSlots, useAttrs } from 'vue'
import Icon from '../Icon/Icon.vue'
import { cn } from '../../utils'

type ButtonType = 'primary' | 'outline' | 'danger' | 'ghost' | 'link'
type ButtonSize = 'sm' | 'md' | 'lg'

const props = withDefaults(
  defineProps<{
    type?: ButtonType
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
    type: 'primary',
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

const iconSizeMap: Record<ButtonSize, number> = { sm: 14, md: 16, lg: 18 }
const iconSize = computed(() => iconSizeMap[props.size])

const sizeMap: Record<ButtonSize, string> = {
  sm: 'h-6 px-2 text-xs rounded gap-1',
  md: 'h-8 px-4 text-sm rounded gap-1.5',
  lg: 'h-10 px-4 text-base rounded gap-2',
}

const roundSizeMap: Record<ButtonSize, string> = {
  sm: 'rounded-full p-0 h-6 w-6',
  md: 'rounded-full p-0 h-8 w-8',
  lg: 'rounded-full p-0 h-10 w-10',
}

const variantMap: Record<ButtonType, string> = {
  primary: 'bg-primary text-white hover:bg-primary-hover active:bg-primary-active',
  outline:
    'bg-white border border-neutral-border text-neutral-heading hover:bg-neutral-surface hover:border-neutral-muted active:bg-neutral-subtle',
  danger: 'bg-danger text-white hover:bg-danger-hover active:bg-danger-active',
  ghost: 'text-neutral-text hover:bg-neutral-subtle active:bg-neutral-border',
  link: 'text-primary hover:text-primary-hover hover:underline p-0 min-w-0',
}

const disabledMap: Record<ButtonType, string> = {
  primary: 'bg-primary/40 text-white/90 cursor-not-allowed',
  outline: 'bg-white border border-neutral-border text-neutral-text/60 cursor-not-allowed',
  danger: 'bg-danger/40 text-white/90 cursor-not-allowed',
  ghost: 'text-neutral-muted cursor-not-allowed',
  link: 'text-neutral-muted cursor-not-allowed',
}

const classes = computed(() =>
  cn(
    'h-btn',
    'inline-flex items-center justify-center font-medium transition-colors duration-200',
    sizeMap[props.size],
    (props.round || isIconOnly.value) && sizeMap[props.size].replace(/rounded\S*/, 'rounded-full'),
    isIconOnly.value && roundSizeMap[props.size],
    props.disabled || props.loading ? disabledMap[props.type] : variantMap[props.type],
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
