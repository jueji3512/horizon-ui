<template>
  <div
    :id="itemId"
    ref="itemRef"
    :role="roleValue"
    :aria-disabled="resolvedDisabled || undefined"
    :aria-checked="ariaChecked"
    :data-active="active || undefined"
    :data-disabled="resolvedDisabled || undefined"
    :data-kind="kind"
    :data-theme="theme"
    :class="itemClasses"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    @mousedown.prevent
    @click="handleClick"
  >
    <span v-if="hasIndicator" :class="indicatorClasses">
      <slot name="indicator">
        <Icon v-if="kind === 'checkbox' && checked" name="check" class="text-sm" />
        <span
          v-else-if="kind === 'radio' && checked"
          class="h-1.5 w-1.5 rounded-[var(--round-full)] bg-brand"
        />
      </slot>
    </span>

    <Icon v-else-if="icon" :name="icon" class="text-base" />

    <span class="min-w-0 flex-1 truncate">
      <slot />
    </span>

    <span
      v-if="$slots.suffix"
      class="ml-3 inline-flex shrink-0 items-center text-[var(--text-color-secondary)]"
    >
      <slot name="suffix" />
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import Icon from '../Icon/Icon.vue'
import { cn } from '../../utils'
import { useMenuContext, useMenuGroupContext } from './context'
import type { MenuItemKind, MenuItemTheme, MenuValue } from './types'

const props = withDefaults(
  defineProps<{
    value: MenuValue
    label?: string
    disabled?: boolean
    icon?: string
    theme?: MenuItemTheme
    kind?: MenuItemKind
    checked?: boolean
    closeOnSelect?: boolean
    openSubmenu?: () => void
    setSubmenuTriggerElement?: (element: HTMLElement | null) => void
  }>(),
  {
    label: '',
    disabled: false,
    icon: '',
    theme: 'default',
    kind: 'item',
    checked: false,
    closeOnSelect: undefined,
  },
)

const emit = defineEmits<{
  select: []
  mouseenter: [event: MouseEvent]
  mouseleave: [event: MouseEvent]
}>()

const menu = useMenuContext()
const group = useMenuGroupContext()
const itemRef = ref<HTMLElement | null>(null)
let registeredValue: MenuValue | null = null

const resolvedDisabled = computed(() => props.disabled || Boolean(group?.disabled.value))
const active = computed(() => Boolean(menu?.isItemActive(props.value)))
const itemId = computed(() => menu?.getItemId(props.value))
const hasIndicator = computed(() => props.kind === 'checkbox' || props.kind === 'radio')
const roleValue = computed(() => {
  if (props.kind === 'checkbox') return 'menuitemcheckbox'
  if (props.kind === 'radio') return 'menuitemradio'
  return 'menuitem'
})
const ariaChecked = computed(() =>
  props.kind === 'checkbox' || props.kind === 'radio' ? props.checked : undefined,
)
const resolvedCloseOnSelect = computed(() => {
  if (props.closeOnSelect !== undefined) return props.closeOnSelect
  return props.kind === 'item'
})

watch(
  () =>
    [
      props.value,
      props.label,
      props.kind,
      resolvedDisabled.value,
      resolvedCloseOnSelect.value,
      props.openSubmenu,
      itemRef.value,
    ] as const,
  () => {
    syncRegistration()
  },
  { immediate: true, flush: 'post' },
)

onBeforeUnmount(() => {
  if (registeredValue !== null) {
    menu?.unregisterItem(registeredValue)
  }
  props.setSubmenuTriggerElement?.(null)
})

function syncRegistration() {
  if (registeredValue !== null && registeredValue !== props.value) {
    menu?.unregisterItem(registeredValue)
  }

  menu?.registerItem({
    key: `${typeof props.value}:${String(props.value)}`,
    value: props.value,
    label: props.label || String(props.value),
    disabled: resolvedDisabled.value,
    element: itemRef.value,
    kind: props.kind,
    closeOnSelect: resolvedCloseOnSelect.value,
    select: () => emit('select'),
    openSubmenu: props.openSubmenu,
  })

  props.setSubmenuTriggerElement?.(itemRef.value)
  registeredValue = props.value
}

function handleMouseEnter(event: MouseEvent) {
  if (resolvedDisabled.value) return
  menu?.setActiveValue(props.value)
  emit('mouseenter', event)
}

function handleMouseLeave(event: MouseEvent) {
  if (resolvedDisabled.value) return
  emit('mouseleave', event)
}

function handleClick() {
  if (resolvedDisabled.value) return
  menu?.selectItem(props.value)
}

const indicatorClasses = computed(() =>
  cn('indicator inline-flex h-4 w-4 shrink-0 items-center justify-center text-brand'),
)

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
