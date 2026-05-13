<template>
  <span class="inline-flex relative">
    <slot />
    <sup
      v-if="showBadge"
      class="absolute top-0 right-0 flex items-center justify-center font-semibold text-white leading-none"
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

type BadgeType = 'default' | 'primary' | 'danger' | 'success' | 'warning'

const props = withDefaults(
  defineProps<{
    value?: string | number
    dot?: boolean
    type?: BadgeType
    max?: number
    showZero?: boolean
    hidden?: boolean
    offset?: [number, number]
    color?: string
  }>(),
  {
    value: '',
    dot: false,
    type: 'danger',
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

const typeColorMap: Record<BadgeType, string> = {
  default: 'bg-neutral-muted',
  primary: 'bg-primary',
  danger: 'bg-danger',
  success: 'bg-success',
  warning: 'bg-warning',
}

const badgeClasses = computed(() =>
  cn(
    props.dot
      ? 'w-1.5 h-1.5 rounded-full'
      : 'min-w-[18px] h-[18px] text-[11px] rounded-full px-1.5',
    !props.color && typeColorMap[props.type],
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
