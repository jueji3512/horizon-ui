<template>
  <div
    :id="optionId"
    ref="optionRef"
    role="option"
    :aria-selected="selected"
    :aria-disabled="resolvedDisabled || undefined"
    :data-active="active || undefined"
    :data-selected="selected || undefined"
    :data-disabled="resolvedDisabled || undefined"
    :class="optionClasses"
    @mouseenter="handleMouseEnter"
    @mousedown.prevent
    @click="handleClick"
  >
    <span
      v-if="!resolvedDisabled && selected"
      aria-hidden="true"
      class="pointer-events-none absolute inset-y-0 left-0 w-[3px] bg-brand"
    />
    <span class="min-w-0 flex-1 truncate">
      <slot />
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import { cn } from '../../utils'
import { useSelectContext, useSelectOptionGroupContext } from './context'
import type { SelectSize, SelectValue } from './types'

const props = withDefaults(
  defineProps<{
    value: SelectValue
    label?: string
    disabled?: boolean
  }>(),
  {
    label: '',
    disabled: false,
  },
)

const select = useSelectContext()
const group = useSelectOptionGroupContext()
const optionRef = ref<HTMLElement | null>(null)
let registeredValue: SelectValue | null = null

const resolvedDisabled = computed(() => props.disabled || Boolean(group?.disabled.value))
const selected = computed(() => Boolean(select?.isOptionSelected(props.value)))
const active = computed(() => Boolean(select?.isOptionActive(props.value)))
const optionId = computed(() => select?.getOptionId(props.value))
const size = computed<SelectSize>(() => select?.size.value ?? 'md')

watch(
  () => [props.value, props.label, resolvedDisabled.value, optionRef.value] as const,
  () => {
    syncRegistration()
  },
  { immediate: true, flush: 'post' },
)

onBeforeUnmount(() => {
  if (registeredValue !== null) {
    select?.unregisterOption(registeredValue)
  }
})

function syncRegistration() {
  if (registeredValue !== null && registeredValue !== props.value) {
    select?.unregisterOption(registeredValue)
  }

  select?.registerOption({
    value: props.value,
    label: props.label || String(props.value),
    disabled: resolvedDisabled.value,
    element: optionRef.value,
  })

  registeredValue = props.value
}

function handleMouseEnter() {
  if (resolvedDisabled.value) return
  select?.setActiveValue(props.value)
}

function handleClick() {
  if (resolvedDisabled.value) return
  select?.selectOption(props.value)
}

const optionSizeMap: Record<SelectSize, string> = {
  sm: 'font-body-sm min-h-7 px-2 py-1',
  md: 'font-body-md min-h-8 px-3 py-1.5',
  lg: 'font-body-lg min-h-9 px-3 py-2',
}

const optionClasses = computed(() =>
  cn(
    'relative flex min-w-0 items-center gap-2 transition-colors duration-100 select-none',
    optionSizeMap[size.value],
    group && 'pl-5',
    resolvedDisabled.value
      ? 'cursor-not-allowed text-[var(--text-color-disabled)]'
      : 'cursor-pointer text-[var(--text-color-primary)]',
    !resolvedDisabled.value &&
      !selected.value &&
      active.value &&
      'bg-[var(--bg-color-container-hover)] text-[var(--text-color-primary)]',
    !resolvedDisabled.value &&
      !selected.value &&
      !active.value &&
      'hover:bg-[var(--bg-color-container-hover)]',
    !resolvedDisabled.value && selected.value && 'bg-brand-light font-medium text-brand',
  ),
)
</script>
