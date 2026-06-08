<template>
  <div
    v-bind="$attrs"
    :id="menuId"
    ref="menuRef"
    role="menu"
    :aria-label="ariaLabel || undefined"
    :aria-activedescendant="activeItemId"
    :tabindex="disabled ? undefined : 0"
    :data-nested="nested || undefined"
    :class="menuClasses"
    @keydown="handleKeydown"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, provide, ref, useId, watch } from 'vue'
import { cn } from '../../utils'
import { useScrollAreaContext } from '../ScrollArea/context'
import { menuContextKey, useMenuDismissContext, useMenuSubContext } from './context'
import type { MenuItemRegistration, MenuValue } from './types'

defineOptions({ inheritAttrs: false })

const props = withDefaults(
  defineProps<{
    ariaLabel?: string
    loop?: boolean
    disabled?: boolean
    nested?: boolean
  }>(),
  {
    ariaLabel: '',
    loop: true,
    disabled: false,
    nested: false,
  },
)

const emit = defineEmits<{
  select: [value: MenuValue]
}>()

const menuId = useId()
const menuRef = ref<HTMLElement | null>(null)
const activeValue = ref<MenuValue | null>(null)
const registeredItems = ref<Map<string, MenuItemRegistration>>(new Map())
const dismiss = useMenuDismissContext()
const submenu = useMenuSubContext()
const scrollArea = useScrollAreaContext()
let typeaheadBuffer = ''
let typeaheadTimer: ReturnType<typeof setTimeout> | null = null
let pendingScrollFrame: number | null = null

const orderedItems = computed(() =>
  Array.from(registeredItems.value.values()).sort(compareItemsByDomOrder),
)
const enabledItems = computed(() => orderedItems.value.filter((item) => !item.disabled))
const activeItem = computed(
  () => orderedItems.value.find((item) => item.value === activeValue.value) ?? null,
)
const activeItemId = computed(() =>
  activeItem.value ? getItemId(activeItem.value.value) : undefined,
)
const itemState = computed(() =>
  orderedItems.value
    .map((item) => `${getItemKey(item.value)}:${item.disabled ? '1' : '0'}`)
    .join('|'),
)

const menuClasses = computed(() =>
  cn('min-w-32 py-1 outline-none', props.disabled && 'pointer-events-none opacity-60'),
)

function getItemKey(value: MenuValue) {
  return `${typeof value}:${String(value)}`
}

function getItemIdSafeKey(value: MenuValue) {
  return getItemKey(value).replace(/[^A-Za-z0-9_-]/g, '-')
}

function getItemId(value: MenuValue) {
  return `${menuId}-item-${getItemIdSafeKey(value)}`
}

function registerItem(item: MenuItemRegistration) {
  const next = new Map(registeredItems.value)
  next.set(item.key, item)
  registeredItems.value = next
}

function unregisterItem(value: MenuValue) {
  const next = new Map(registeredItems.value)
  next.delete(getItemKey(value))
  registeredItems.value = next
}

function isItemActive(value: MenuValue) {
  return activeValue.value !== null && value === activeValue.value
}

function setActiveValue(value: MenuValue) {
  activeValue.value = value
}

function compareItemsByDomOrder(a: MenuItemRegistration, b: MenuItemRegistration) {
  if (!a.element || !b.element || typeof Node === 'undefined') return 0
  const position = a.element.compareDocumentPosition(b.element)
  if (position & Node.DOCUMENT_POSITION_FOLLOWING) return -1
  if (position & Node.DOCUMENT_POSITION_PRECEDING) return 1
  return 0
}

function getEnabledItems() {
  return enabledItems.value
}

function getFirstEnabledItem() {
  return getEnabledItems()[0] ?? null
}

function getLastEnabledItem() {
  const items = getEnabledItems()
  return items[items.length - 1] ?? null
}

function getNextEnabledItem(direction: 1 | -1) {
  const items = getEnabledItems()
  if (items.length === 0) return null

  const currentIndex = items.findIndex((item) => item.value === activeValue.value)
  if (currentIndex < 0) return direction === 1 ? items[0] : items[items.length - 1]

  const nextIndex = currentIndex + direction
  if (nextIndex >= 0 && nextIndex < items.length) return items[nextIndex]
  if (!props.loop) return items[currentIndex]
  return direction === 1 ? items[0] : items[items.length - 1]
}

function scrollActiveItemIntoView() {
  nextTick(() => {
    const element = activeItem.value?.element
    if (!element) return

    if (pendingScrollFrame !== null && typeof cancelAnimationFrame === 'function') {
      cancelAnimationFrame(pendingScrollFrame)
    }

    const run = () => {
      pendingScrollFrame = null
      scrollElementIntoNearestViewport(element)
    }

    if (typeof requestAnimationFrame === 'function') {
      pendingScrollFrame = requestAnimationFrame(run)
    } else {
      run()
    }
  })
}

function scrollElementIntoNearestViewport(element: HTMLElement) {
  if (scrollArea) {
    scrollArea.scrollToElement(element, { block: 'nearest' })
    return
  }

  const viewport = menuRef.value
  if (!viewport) return

  const itemRect = element.getBoundingClientRect()
  const viewportRect = viewport.getBoundingClientRect()

  if (itemRect.top < viewportRect.top) {
    viewport.scrollTop -= viewportRect.top - itemRect.top
  } else if (itemRect.bottom > viewportRect.bottom) {
    viewport.scrollTop += itemRect.bottom - viewportRect.bottom
  }
}

function setActiveItem(item: MenuItemRegistration | null) {
  activeValue.value = item?.value ?? null
  scrollActiveItemIntoView()
}

function moveActiveItem(direction: 1 | -1) {
  setActiveItem(getNextEnabledItem(direction))
}

function requestClose() {
  dismiss?.close()
}

function selectItem(value: MenuValue) {
  const item = registeredItems.value.get(getItemKey(value))
  if (!item || item.disabled) return

  if (item.kind === 'subtrigger') {
    item.openSubmenu?.()
    return
  }

  item.select()
  emit('select', item.value)

  if (item.closeOnSelect) {
    requestClose()
  }
}

function selectActiveItem() {
  const item = activeItem.value
  if (!item) return
  selectItem(item.value)
}

function openActiveSubmenu() {
  const item = activeItem.value
  if (!item || item.disabled || item.kind !== 'subtrigger') return false
  if (!item.openSubmenu) return false
  item.openSubmenu()
  return true
}

function clearTypeahead() {
  if (typeaheadTimer) {
    clearTimeout(typeaheadTimer)
    typeaheadTimer = null
  }
  typeaheadBuffer = ''
}

function handleTypeahead(event: KeyboardEvent) {
  if (event.key.length !== 1 || event.altKey || event.ctrlKey || event.metaKey) return false

  typeaheadBuffer += event.key.toLowerCase()
  if (typeaheadTimer) clearTimeout(typeaheadTimer)
  typeaheadTimer = setTimeout(() => {
    typeaheadBuffer = ''
    typeaheadTimer = null
  }, 700)

  const match = getEnabledItems().find((item) =>
    item.label.toLowerCase().startsWith(typeaheadBuffer),
  )
  if (match) {
    event.preventDefault()
    setActiveItem(match)
  }

  return true
}

function handleKeydown(event: KeyboardEvent) {
  if (props.disabled) return

  if (event.key === 'ArrowDown') {
    event.preventDefault()
    moveActiveItem(1)
    return
  }

  if (event.key === 'ArrowUp') {
    event.preventDefault()
    moveActiveItem(-1)
    return
  }

  if (event.key === 'Home') {
    event.preventDefault()
    setActiveItem(getFirstEnabledItem())
    return
  }

  if (event.key === 'End') {
    event.preventDefault()
    setActiveItem(getLastEnabledItem())
    return
  }

  if (event.key === 'ArrowRight') {
    if (openActiveSubmenu()) event.preventDefault()
    return
  }

  if (event.key === 'ArrowLeft' && props.nested) {
    event.preventDefault()
    submenu?.closeSubmenu({ restoreFocus: true })
    return
  }

  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault()
    selectActiveItem()
    return
  }

  if (event.key === 'Escape') {
    event.preventDefault()
    if (props.nested) {
      submenu?.closeSubmenu({ restoreFocus: true })
    } else {
      requestClose()
    }
    return
  }

  handleTypeahead(event)
}

watch(
  () => itemState.value,
  () => {
    const items = getEnabledItems()
    if (items.length === 0) {
      activeValue.value = null
      return
    }

    if (!items.some((item) => item.value === activeValue.value)) {
      activeValue.value = items[0]?.value ?? null
    }
  },
)

provide(menuContextKey, {
  activeValue,
  registerItem,
  unregisterItem,
  setActiveValue,
  selectItem,
  getItemId,
  isItemActive,
  requestClose,
})

onMounted(() => {
  nextTick(() => {
    if (activeValue.value === null) {
      activeValue.value = getFirstEnabledItem()?.value ?? null
    }
  })
})

onBeforeUnmount(() => {
  clearTypeahead()
  if (pendingScrollFrame !== null && typeof cancelAnimationFrame === 'function') {
    cancelAnimationFrame(pendingScrollFrame)
  }
})
</script>
