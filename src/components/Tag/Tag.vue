<template>
  <span
    :class="tagClasses"
    :style="tagStyle"
    @click="handleClick"
  >
    <Icon v-if="prefixIcon" :name="prefixIcon" :size="iconSizeValue" />
    <span :class="textSpanClasses"><slot /></span>
    <button
      v-if="closable"
      type="button"
      class="tag-close opacity-70 hover:opacity-100"
      :style="{ width: iconSizeValue + 'px', height: iconSizeValue + 'px' }"
      :disabled="disabled"
      aria-label="关闭"
      @click.stop="handleClose"
    >
      <Icon name="close" :size="iconSizeValue" />
    </button>
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Icon from '../Icon/Icon.vue'
import { cn } from '../../utils'

type TagType = 'default' | 'primary' | 'danger' | 'success' | 'warning'
type TagTheme = 'light' | 'dark' | 'outline'
type TagSize = 'sm' | 'md' | 'lg'

interface CheckedProps {
  type?: TagType
  theme?: TagTheme
  color?: string
}

const props = withDefaults(
  defineProps<{
    type?: TagType
    theme?: TagTheme
    size?: TagSize
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
    type: 'default',
    theme: 'light',
    size: 'md',
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

type ThemeColorKey = `${TagTheme}-${TagType}`

const themeColorMap: Record<ThemeColorKey, string> = {
  'light-default': 'border border-transparent bg-neutral-subtle text-neutral-text',
  'light-primary': 'border border-transparent bg-primary-light text-primary',
  'light-danger': 'border border-transparent bg-danger-light text-danger',
  'light-success': 'border border-transparent bg-success-light text-success',
  'light-warning': 'border border-transparent bg-warning-light text-warning',
  'dark-default': 'border border-transparent bg-neutral-muted text-white',
  'dark-primary': 'border border-transparent bg-primary text-white',
  'dark-danger': 'border border-transparent bg-danger text-white',
  'dark-success': 'border border-transparent bg-success text-white',
  'dark-warning': 'border border-transparent bg-warning text-white',
  'outline-default': 'bg-transparent border border-neutral-muted text-neutral-text',
  'outline-primary': 'bg-transparent border border-primary text-primary',
  'outline-danger': 'bg-transparent border border-danger text-danger',
  'outline-success': 'bg-transparent border border-success text-success',
  'outline-warning': 'bg-transparent border border-warning text-warning',
}

const sizeMap: Record<TagSize, { wrapper: string; iconSize: number }> = {
  sm: { wrapper: 'h-5 text-[11px] px-1.5 gap-0.5', iconSize: 10 },
  md: { wrapper: 'h-6 text-[12px] px-2 gap-0.5', iconSize: 12 },
  lg: { wrapper: 'h-7 text-[13px] px-2.5 gap-1', iconSize: 14 },
}

const iconSizeValue = computed(() => sizeMap[props.size].iconSize)

// ---- effective props for checkable checked/unchecked ----

const effectiveTheme = computed(() =>
  props.checkable && props.checked && props.checkedProps?.theme
    ? props.checkedProps.theme
    : props.theme,
)

const effectiveType = computed(() =>
  props.checkable && props.checked && props.checkedProps?.type
    ? props.checkedProps.type
    : props.type,
)

const effectiveColor = computed(() =>
  props.checkable && props.checked && props.checkedProps?.color !== undefined
    ? props.checkedProps.color
    : props.color,
)

const effectiveColorKey = computed<ThemeColorKey>(
  () => `${effectiveTheme.value}-${effectiveType.value}`,
)

// ---- custom color style helper ----

function hexToRgb(hex: string) {
  const v = parseInt(hex.replace('#', ''), 16)
  return { r: (v >> 16) & 255, g: (v >> 8) & 255, b: v & 255 }
}

function isLightColor(hex: string): boolean {
  const { r, g, b } = hexToRgb(hex)
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255 > 0.6
}

function buildColorStyle(c: string, theme: TagTheme): Record<string, string> {
  if (theme === 'light') {
    return { backgroundColor: c + '1A', color: c }
  }
  if (theme === 'dark') {
    return { backgroundColor: c, color: isLightColor(c) ? '#1e293b' : '#ffffff' }
  }
  // outline
  return { backgroundColor: 'transparent', border: `1px solid ${c}`, color: c }
}

// ---- classes & style ----

const tagClasses = computed(() =>
  cn(
    'inline-flex items-center rounded leading-none font-medium transition-colors duration-150',
    sizeMap[props.size].wrapper,
    props.disabled && 'opacity-50 cursor-not-allowed',
    props.round && 'rounded-full',
    props.maxWidth && 'truncate',
    props.checkable && 'cursor-pointer select-none',
    !effectiveColor.value && themeColorMap[effectiveColorKey.value],
  ),
)

const tagStyle = computed(() => {
  const styles: Record<string, string> = {}
  if (props.maxWidth) {
    styles.maxWidth = typeof props.maxWidth === 'number' ? `${props.maxWidth}px` : props.maxWidth
  }
  if (effectiveColor.value) {
    Object.assign(styles, buildColorStyle(effectiveColor.value, effectiveTheme.value))
  }
  return Object.keys(styles).length ? styles : undefined
})

const textSpanClasses = computed(() =>
  cn(
    !props.checkable && !props.disabled && 'cursor-text',
  ),
)
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
</style>
