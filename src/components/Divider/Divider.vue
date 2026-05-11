<template>
  <div
    v-if="direction === 'horizontal' && $slots.default"
    role="separator"
    aria-orientation="horizontal"
    class="flex items-center my-4"
  >
    <span :class="['border-t', lineClass, align === 'left' ? 'w-6 shrink-0' : 'flex-1']" />
    <span :class="['shrink-0 px-3 text-sm', plain ? 'text-neutral-muted' : 'text-neutral-text']">
      <slot />
    </span>
    <span :class="['border-t', lineClass, align === 'right' ? 'w-6 shrink-0' : 'flex-1']" />
  </div>

  <div
    v-else-if="direction === 'horizontal'"
    role="separator"
    aria-orientation="horizontal"
    :class="['border-t my-4', lineClass]"
  />

  <div
    v-else
    role="separator"
    aria-orientation="vertical"
    :class="['inline-block align-middle mx-4 border-l h-[1em]', lineClass]"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '../../utils'

type DividerDirection = 'horizontal' | 'vertical'
type DividerType = 'solid' | 'dashed'
type DividerAlign = 'left' | 'center' | 'right'

const props = withDefaults(
  defineProps<{
    direction?: DividerDirection
    type?: DividerType
    align?: DividerAlign
    plain?: boolean
  }>(),
  {
    direction: 'horizontal',
    type: 'solid',
    align: 'center',
    plain: false,
  },
)

const lineClass = computed(() =>
  cn('border-neutral-border', props.type === 'dashed' && 'border-dashed'),
)
</script>
