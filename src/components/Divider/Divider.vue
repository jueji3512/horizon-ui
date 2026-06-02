<template>
  <div
    v-if="direction === 'horizontal' && $slots.default"
    role="separator"
    aria-orientation="horizontal"
    :class="dividerGeometryMap.labeledRoot"
  >
    <span
      :class="[
        dividerGeometryMap.line,
        lineClass,
        align === 'left' ? dividerGeometryMap.edgeLine : 'flex-1',
      ]"
    />
    <span
      :class="[
        dividerGeometryMap.label,
        plain ? 'text-[var(--text-color-secondary)]' : 'text-[var(--text-color-primary)]',
      ]"
    >
      <slot />
    </span>
    <span
      :class="[
        dividerGeometryMap.line,
        lineClass,
        align === 'right' ? dividerGeometryMap.edgeLine : 'flex-1',
      ]"
    />
  </div>

  <div
    v-else-if="direction === 'horizontal'"
    role="separator"
    aria-orientation="horizontal"
    :class="[dividerGeometryMap.horizontalRoot, lineClass]"
  />

  <div
    v-else
    role="separator"
    aria-orientation="vertical"
    :class="[dividerGeometryMap.verticalRoot, lineClass]"
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

const dividerGeometryMap = {
  labeledRoot: 'my-4 flex items-center',
  horizontalRoot: 'my-4 border-t',
  verticalRoot: 'mx-4 inline-block h-[1em] border-l align-middle',
  line: 'border-t',
  edgeLine: 'w-6 shrink-0',
  label: 'font-body-md shrink-0 px-3',
} as const

const lineClass = computed(() =>
  cn('border-[var(--border-color-divider)]', props.type === 'dashed' && 'border-dashed'),
)
</script>
