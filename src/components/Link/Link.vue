<template>
  <a
    :aria-disabled="disabled || undefined"
    :class="classes"
    @click="handleClick"
  >
    <Icon v-if="prefixIcon" :name="prefixIcon" :size="iconSize" />
    <slot />
    <Icon v-if="suffixIcon" :name="suffixIcon" :size="iconSize" />
  </a>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Icon from '../Icon/Icon.vue'
import { cn } from '../../utils'

type LinkType = 'default' | 'primary' | 'danger' | 'warning' | 'success'
type LinkUnderline = 'always' | 'hover' | 'never'
type LinkSize = 'sm' | 'md' | 'lg'

const props = withDefaults(
  defineProps<{
    type?: LinkType
    underline?: LinkUnderline
    size?: LinkSize
    disabled?: boolean
    prefixIcon?: string
    suffixIcon?: string
  }>(),
  {
    type: 'default',
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
  sm: 'text-xs gap-1',
  md: 'text-sm gap-1',
  lg: 'text-base gap-1.5',
}

const iconSizeMap: Record<LinkSize, number> = { sm: 12, md: 14, lg: 16 }

const iconSize = computed(() => iconSizeMap[props.size])

const typeColorMap: Record<LinkType, string> = {
  default: 'text-neutral-heading',
  primary: 'text-primary hover:text-primary-hover',
  danger: 'text-danger hover:text-danger-hover',
  warning: 'text-warning hover:text-warning-hover',
  success: 'text-success hover:text-success-hover',
}

const underlineMap: Record<LinkUnderline, string> = {
  always: 'border-b border-current',
  hover: 'border-b border-transparent hover:border-current',
  never: '',
}

const disabledColorMap: Record<LinkType, string> = {
  default: 'text-neutral-muted/65',
  primary: 'text-primary/50',
  danger: 'text-danger/50',
  warning: 'text-warning/50',
  success: 'text-success/50',
}

function handleClick(e: MouseEvent) {
  if (!props.disabled) {
    emit('click', e)
  }
}

const classes = computed(() =>
  cn(
    'inline-flex items-center transition-colors duration-150 cursor-pointer [text-decoration:none]',
    sizeMap[props.size],
    props.disabled
      ? disabledColorMap[props.type]
      : typeColorMap[props.type],
    props.disabled
      ? 'cursor-not-allowed border-transparent pointer-events-none'
      : underlineMap[props.underline],
  ),
)
</script>
