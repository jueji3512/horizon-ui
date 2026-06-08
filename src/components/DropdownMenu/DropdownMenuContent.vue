<template>
  <PopoverContent :panel-class="contentClasses" :style="contentStyle">
    <slot />
  </PopoverContent>
</template>

<script setup lang="ts">
import { computed, inject, provide, type CSSProperties } from 'vue'
import { PopoverContent, popoverContextKey } from '../Popover'
import { menuDismissContextKey } from '../Menu'
import { cn } from '../../utils'

const props = withDefaults(
  defineProps<{
    panelClass?: string
    maxWidth?: number | string
    minWidth?: number | string
  }>(),
  {
    panelClass: '',
    maxWidth: undefined,
    minWidth: undefined,
  },
)

const popover = inject(popoverContextKey)
if (!popover) {
  throw new Error('<DropdownMenuContent> must be used inside <DropdownMenu>')
}

function resolveLength(value: number | string | undefined) {
  if (value === undefined || value === '') return undefined
  return typeof value === 'number' ? `${value}px` : value
}

const contentStyle = computed<CSSProperties>(() => ({
  maxWidth: resolveLength(props.maxWidth),
  minWidth: resolveLength(props.minWidth),
}))

const contentClasses = computed(() =>
  cn(
    'overflow-hidden rounded-[var(--round-default)] bg-[var(--bg-color-container)] text-[var(--text-color-primary)] shadow-popper outline-none',
    props.panelClass,
  ),
)

provide(menuDismissContextKey, {
  close: () => popover.close({ restoreFocus: true }),
})
</script>
