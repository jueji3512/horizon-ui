<template>
  <div :class="classes">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '../../utils'

type SpaceDirection = 'horizontal' | 'vertical'
type SpaceSize = 'sm' | 'md' | 'lg'
type SpaceAlign = 'start' | 'end' | 'center' | 'baseline' | 'stretch'

const props = withDefaults(
  defineProps<{
    direction?: SpaceDirection
    size?: SpaceSize
    align?: SpaceAlign
    wrap?: boolean
  }>(),
  {
    direction: 'horizontal',
    size: 'md',
    align: 'center',
    wrap: false,
  },
)

const gapMap: Record<SpaceSize, string> = {
  sm: 'gap-2',
  md: 'gap-4',
  lg: 'gap-6',
}

const alignMap: Record<SpaceAlign, string> = {
  start: 'items-start',
  end: 'items-end',
  center: 'items-center',
  baseline: 'items-baseline',
  stretch: 'items-stretch',
}

const classes = computed(() =>
  cn(
    'flex',
    props.direction === 'horizontal' ? 'flex-row' : 'flex-col',
    gapMap[props.size],
    alignMap[props.align],
    props.wrap && 'flex-wrap',
  ),
)
</script>
