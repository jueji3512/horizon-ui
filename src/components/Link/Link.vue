<template>
  <a
    :href="resolvedHref"
    :target="target || undefined"
    :rel="resolvedRel"
    :aria-disabled="disabled || undefined"
    :class="classes"
    @click="handleClick"
  >
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
    href?: string
    target?: string
    rel?: string
    prefixIcon?: string
    suffixIcon?: string
  }>(),
  {
    theme: 'default',
    underline: 'hover',
    size: 'md',
    disabled: false,
    href: '',
    target: '',
    rel: '',
    prefixIcon: '',
    suffixIcon: '',
  },
)

const emit = defineEmits<{
  click: [e: MouseEvent]
}>()

const linkSizeMap: Record<LinkSize, string> = {
  sm: 'font-body-sm gap-1',
  md: 'font-body-md gap-1',
  lg: 'font-body-lg gap-1.5',
}

const linkThemeColorMap: Record<LinkTheme, string> = {
  default: 'text-[var(--text-color-primary)]',
  brand: 'text-brand hover:text-brand-hover',
  success: 'text-success hover:text-success-hover',
  warning: 'text-warning hover:text-warning-hover',
  error: 'text-error hover:text-error-hover',
}

const linkUnderlineMap: Record<LinkUnderline, string> = {
  always: 'border-b border-current',
  hover: 'border-b border-transparent hover:border-current',
  never: '',
}

const linkDisabledColorMap: Record<LinkTheme, string> = {
  default: 'text-[var(--text-color-disabled)]',
  brand: 'text-brand-disabled',
  success: 'text-success-disabled',
  warning: 'text-warning-disabled',
  error: 'text-error-disabled',
}

const resolvedHref = computed(() => (props.disabled ? undefined : props.href || undefined))

const resolvedRel = computed(
  () => props.rel || (props.target === '_blank' ? 'noopener noreferrer' : undefined),
)

function handleClick(e: MouseEvent) {
  if (props.disabled) {
    e.preventDefault()
    e.stopImmediatePropagation()
    return
  }

  emit('click', e)
}

const classes = computed(() =>
  cn(
    'inline-flex items-center transition-colors duration-150 [text-decoration:none]',
    linkSizeMap[props.size],
    props.disabled
      ? cn(linkDisabledColorMap[props.theme], 'cursor-not-allowed border-transparent')
      : cn(linkThemeColorMap[props.theme], linkUnderlineMap[props.underline], 'cursor-pointer'),
  ),
)
</script>
