<template>
  <span class="relative inline-flex">
    <slot />
    <sup
      v-if="showBadge"
      class="absolute top-0 right-0 flex items-center justify-center text-[var(--text-color-inverse)]"
      :class="badgeClasses"
      :style="badgeStyle"
    >
      <template v-if="!props.dot">{{ displayValue }}</template>
    </sup>
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '../../utils'

type BadgeTheme = 'default' | 'brand' | 'success' | 'warning' | 'error'

const props = withDefaults(
  defineProps<{
    value?: string | number
    dot?: boolean
    theme?: BadgeTheme
    max?: number
    showZero?: boolean
    hidden?: boolean
    offset?: [number, number]
    color?: string
  }>(),
  {
    value: '',
    dot: false,
    theme: 'error',
    max: 99,
    showZero: false,
    hidden: false,
    offset: () => [0, 0],
    color: '',
  },
)

const isNumber = computed(() => typeof props.value === 'number')

const showBadge = computed(() => {
  if (props.hidden) return false
  if (props.dot) return true
  if (isNumber.value && props.value === 0 && !props.showZero) return false
  return true
})

const displayValue = computed(() => {
  if (props.dot) return ''
  if (isNumber.value && (props.value as number) > props.max) return `${props.max}+`
  return String(props.value)
})

const themeColorMap: Record<BadgeTheme, string> = {
  default: 'bg-[var(--bg-color-secondarycomponent-active)]',
  brand: 'bg-brand',
  success: 'bg-success',
  warning: 'bg-warning',
  error: 'bg-error',
}

const badgeGeometryMap = {
  dot: 'h-1.5 w-1.5 rounded-[var(--round-full)]',
  content: 'font-body-sm h-5 min-w-4 rounded-[var(--round-full)] px-1.5',
} as const

const badgeClasses = computed(() =>
  cn(
    props.dot ? badgeGeometryMap.dot : badgeGeometryMap.content,
    !props.color && themeColorMap[props.theme],
  ),
)

const badgeStyle = computed(() => {
  const [x, y] = props.offset
  const style: Record<string, string> = {
    transform: `translate(calc(50% + ${x}px), calc(-50% + ${y}px))`,
  }
  if (props.color) {
    style.backgroundColor = props.color
  }
  return style
})
</script>
