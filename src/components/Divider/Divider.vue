<template>
  <div
    v-if="direction === 'horizontal' && $slots.default"
    role="separator"
    aria-orientation="horizontal"
    class="my-4 flex items-center"
  >
    <span :class="['border-t', lineClass, align === 'left' ? 'w-6 shrink-0' : 'flex-1']" />
    <span
      :class="[
        'font-body-md shrink-0 px-[var(--padding-x-3)]',
        plain ? 'text-[var(--text-color-secondary)]' : 'text-[var(--text-color-primary)]',
      ]"
    >
      <slot />
    </span>
    <span :class="['border-t', lineClass, align === 'right' ? 'w-6 shrink-0' : 'flex-1']" />
  </div>

  <div
    v-else-if="direction === 'horizontal'"
    role="separator"
    aria-orientation="horizontal"
    :class="['my-4 border-t', lineClass]"
  />

  <div
    v-else
    role="separator"
    aria-orientation="vertical"
    :class="['mx-4 inline-block h-[1em] border-l align-middle', lineClass]"
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
  cn('border-[var(--border-color-divider)]', props.type === 'dashed' && 'border-dashed'),
)
</script>
