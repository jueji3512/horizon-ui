<template>
  <div
    :id="itemId"
    ref="itemRef"
    role="menuitem"
    :aria-disabled="resolvedDisabled || undefined"
    :data-active="active || undefined"
    :data-disabled="resolvedDisabled || undefined"
    :data-theme="theme"
    :class="itemClasses"
    @mouseenter="handleMouseEnter"
    @mousedown.prevent
    @click="handleClick"
  >
    <Icon v-if="icon" :name="icon" class="text-base" />
    <span class="min-w-0 flex-1 truncate">
      <slot />
    </span>
    <span v-if="$slots.suffix" class="ml-3 inline-flex shrink-0 items-center">
      <slot name="suffix" />
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import Icon from '../Icon/Icon.vue'
import { cn } from '../../utils'
import { useDropdownContext, useDropdownGroupContext } from './context'
import type { DropdownItemTheme, DropdownValue } from './types'

const props = withDefaults(
  defineProps<{
    value: DropdownValue
    label?: string
    disabled?: boolean
    icon?: string
    theme?: DropdownItemTheme
  }>(),
  {
    label: '',
    disabled: false,
    icon: '',
    theme: 'default',
  },
)

const dropdown = useDropdownContext()
const group = useDropdownGroupContext()
const itemRef = ref<HTMLElement | null>(null)
let registeredValue: DropdownValue | null = null

const resolvedDisabled = computed(() => props.disabled || Boolean(group?.disabled.value))
const active = computed(() => Boolean(dropdown?.isItemActive(props.value)))
const itemId = computed(() => dropdown?.getItemId(props.value))

watch(
  () => [props.value, props.label, resolvedDisabled.value, itemRef.value] as const,
  () => {
    syncRegistration()
  },
  { immediate: true, flush: 'post' },
)

onBeforeUnmount(() => {
  if (registeredValue !== null) {
    dropdown?.unregisterItem(registeredValue)
  }
})

function syncRegistration() {
  if (registeredValue !== null && registeredValue !== props.value) {
    dropdown?.unregisterItem(registeredValue)
  }

  dropdown?.registerItem({
    value: props.value,
    label: props.label || String(props.value),
    disabled: resolvedDisabled.value,
    element: itemRef.value,
  })

  registeredValue = props.value
}

function handleMouseEnter() {
  if (resolvedDisabled.value) return
  dropdown?.setActiveValue(props.value)
}

function handleClick() {
  if (resolvedDisabled.value) return
  dropdown?.selectItem(props.value)
}

const itemClasses = computed(() =>
  cn(
    'font-body-md relative flex min-w-0 items-center gap-2 px-3 py-1.5 transition-colors duration-100 select-none',
    'min-h-8 outline-none',
    resolvedDisabled.value
      ? 'cursor-not-allowed text-[var(--text-color-disabled)]'
      : 'cursor-pointer',
    !resolvedDisabled.value &&
      props.theme === 'default' &&
      'text-[var(--text-color-primary)] hover:bg-[var(--bg-color-container-hover)]',
    !resolvedDisabled.value &&
      props.theme === 'default' &&
      active.value &&
      'bg-[var(--bg-color-container-hover)]',
    !resolvedDisabled.value &&
      props.theme === 'error' &&
      'text-error hover:bg-error-light hover:text-error-hover',
    !resolvedDisabled.value &&
      props.theme === 'error' &&
      active.value &&
      'bg-error-light text-error-hover',
  ),
)
</script>
