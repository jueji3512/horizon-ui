<template>
  <span :class="tagClasses" :style="tagStyle" @click="handleClick">
    <Icon v-if="prefixIcon" :name="prefixIcon" />
    <span :class="textSpanClasses"><slot /></span>
    <button
      v-if="closable"
      type="button"
      class="tag-close opacity-70 hover:opacity-100 disabled:cursor-not-allowed"
      :disabled="disabled"
      aria-label="关闭"
      @click.stop="handleClose"
    >
      <Icon name="close" />
    </button>
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Icon from '../Icon/Icon.vue'
import { cn } from '../../utils'

type TagTheme = 'default' | 'brand' | 'success' | 'warning' | 'error'
type TagVariant = 'light' | 'dark' | 'outline'

interface CheckedProps {
  theme?: TagTheme
  variant?: TagVariant
  color?: string
}

const props = withDefaults(
  defineProps<{
    theme?: TagTheme
    variant?: TagVariant
    closable?: boolean
    checkable?: boolean
    checked?: boolean
    disabled?: boolean
    round?: boolean
    prefixIcon?: string
    maxWidth?: number | string
    color?: string
    checkedProps?: CheckedProps
  }>(),
  {
    theme: 'default',
    variant: 'light',
    closable: false,
    checkable: false,
    checked: undefined,
    disabled: false,
    round: false,
    prefixIcon: '',
    maxWidth: undefined,
    color: '',
    checkedProps: () => ({}),
  },
)

const emit = defineEmits<{
  click: [e: MouseEvent]
  close: [e: MouseEvent]
  'update:checked': [value: boolean]
}>()

function handleClick(e: MouseEvent) {
  if (props.disabled) return
  if (props.checkable) {
    emit('update:checked', !props.checked)
  }
  emit('click', e)
}

function handleClose(e: MouseEvent) {
  if (props.disabled) return
  emit('close', e)
}

type ThemeColorKey = `${TagVariant}-${TagTheme}`

const themeColorMap: Record<ThemeColorKey, string> = {
  'light-default':
    'border border-transparent bg-[var(--bg-color-secondarycontainer)] text-[var(--text-color-primary)]',
  'light-brand': 'border border-transparent bg-brand-light text-brand',
  'light-success': 'border border-transparent bg-success-light text-success',
  'light-warning': 'border border-transparent bg-warning-light text-warning',
  'light-error': 'border border-transparent bg-error-light text-error',
  'dark-default':
    'border border-transparent bg-[var(--bg-color-secondarycomponent-active)] text-[var(--text-color-inverse)]',
  'dark-brand': 'border border-transparent bg-brand text-[var(--text-color-inverse)]',
  'dark-success': 'border border-transparent bg-success text-[var(--text-color-inverse)]',
  'dark-warning': 'border border-transparent bg-warning text-[var(--text-color-inverse)]',
  'dark-error': 'border border-transparent bg-error text-[var(--text-color-inverse)]',
  'outline-default':
    'bg-transparent border border-[var(--border-color-component)] text-[var(--text-color-primary)]',
  'outline-brand': 'bg-transparent border border-brand text-brand',
  'outline-success': 'bg-transparent border border-success text-success',
  'outline-warning': 'bg-transparent border border-warning text-warning',
  'outline-error': 'bg-transparent border border-error text-error',
}

const effectiveVariant = computed(() =>
  props.checkable && props.checked && props.checkedProps?.variant
    ? props.checkedProps.variant
    : props.variant,
)

const effectiveTheme = computed(() =>
  props.checkable && props.checked && props.checkedProps?.theme
    ? props.checkedProps.theme
    : props.theme,
)

const effectiveColor = computed(() =>
  props.checkable && props.checked && props.checkedProps?.color !== undefined
    ? props.checkedProps.color
    : props.color,
)

const effectiveColorKey = computed<ThemeColorKey>(
  () => `${effectiveVariant.value}-${effectiveTheme.value}`,
)

function hexToRgb(hex: string) {
  const v = parseInt(hex.replace('#', ''), 16)
  return { r: (v >> 16) & 255, g: (v >> 8) & 255, b: v & 255 }
}

function isLightColor(hex: string): boolean {
  const { r, g, b } = hexToRgb(hex)
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255 > 0.6
}

function buildColorStyle(c: string, variant: TagVariant): Record<string, string> {
  if (variant === 'light') {
    return { backgroundColor: c + '1A', color: c }
  }
  if (variant === 'dark') {
    return {
      backgroundColor: c,
      color: isLightColor(c) ? 'var(--text-color-primary)' : 'var(--text-color-inverse)',
    }
  }
  return { backgroundColor: 'transparent', border: `1px solid ${c}`, color: c }
}

const tagClasses = computed(() =>
  cn(
    'font-body-sm inline-flex h-6 items-center gap-2 rounded-[var(--round-default)] px-2 font-medium transition-colors duration-150',
    props.disabled &&
      'cursor-not-allowed border border-[var(--border-color-component)] bg-[var(--bg-color-component-disabled)] text-[var(--text-color-disabled)]',
    props.round && 'rounded-[var(--round-full)]',
    props.maxWidth && 'truncate',
    props.checkable && !props.disabled && 'cursor-pointer select-none',
    !props.disabled && !effectiveColor.value && themeColorMap[effectiveColorKey.value],
  ),
)

const tagStyle = computed(() => {
  const styles: Record<string, string> = {}
  if (props.maxWidth) {
    styles.maxWidth = typeof props.maxWidth === 'number' ? `${props.maxWidth}px` : props.maxWidth
  }
  if (!props.disabled && effectiveColor.value) {
    Object.assign(styles, buildColorStyle(effectiveColor.value, effectiveVariant.value))
  }
  return Object.keys(styles).length ? styles : undefined
})

const textSpanClasses = computed(() => cn(!props.checkable && !props.disabled && 'cursor-text'))
</script>

<style scoped>
.tag-close {
  appearance: none;
  background: none;
  border: none;
  padding: 0;
  margin: 0;
  font: inherit;
  color: inherit;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex-shrink: 0;
  transition: color 0.15s;
}

.tag-close:disabled {
  cursor: not-allowed;
}
</style>
