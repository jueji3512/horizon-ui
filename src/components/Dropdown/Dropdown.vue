<template>
  <Popper
    trigger="manual"
    :visible="computedVisible"
    :placement="placement"
    :offset="offset"
    :disabled="disabled"
    :close-on-outside-click="closeOnOutsideClick"
    :close-on-esc="closeOnEsc"
    :to="to"
    :flip="flip"
    :shift="shift"
    :match-width="matchWidth"
    :strategy="strategy"
    :auto-update="autoUpdate"
    :z-index="zIndex"
    @update:visible="handlePopperVisibleUpdate"
  >
    <PopperTrigger
      @mouseenter="handleTriggerMouseEnter"
      @mouseleave="handleTriggerMouseLeave"
      @click="handleTriggerClick"
      @focusin="handleTriggerFocus"
      @focusout="handleTriggerBlur"
      @keydown="handleKeydown"
    >
      <slot name="trigger" :visible="computedVisible" :disabled="disabled" :close="close" />
    </PopperTrigger>

    <PopperContent
      :class="panelClasses"
      @mouseenter="handlePanelMouseEnter"
      @mouseleave="handlePanelMouseLeave"
    >
      <div :style="contentStyle">
        <ScrollArea v-if="hasMaxHeight" ref="scrollAreaRef" :max-height="maxHeight">
          <div
            :id="menuId"
            role="menu"
            :aria-activedescendant="activeItemId"
            :class="menuClasses"
            @keydown="handleKeydown"
          >
            <slot />
          </div>
        </ScrollArea>

        <div
          v-else
          :id="menuId"
          role="menu"
          :aria-activedescendant="activeItemId"
          :class="menuClasses"
          @keydown="handleKeydown"
        >
          <slot />
        </div>
      </div>
    </PopperContent>
  </Popper>
</template>

<script setup lang="ts">
import {
  Comment,
  Fragment,
  Text as TextNode,
  computed,
  nextTick,
  onBeforeUnmount,
  provide,
  ref,
  useId,
  useSlots,
  watch,
  type CSSProperties,
  type VNode,
} from 'vue'
import { Popper, PopperContent, PopperTrigger } from '../Popper'
import { ScrollArea, type ScrollAreaExpose } from '../ScrollArea'
import { cn } from '../../utils'
import DropdownItem from './DropdownItem.vue'
import DropdownGroup from './DropdownGroup.vue'
import { dropdownContextKey } from './context'
import type {
  DropdownItemRegistration,
  DropdownParsedItem,
  DropdownPlacement,
  DropdownStrategy,
  DropdownTrigger,
  DropdownValue,
} from './types'

const props = withDefaults(
  defineProps<{
    visible?: boolean
    trigger?: DropdownTrigger
    placement?: DropdownPlacement
    offset?: number
    disabled?: boolean
    closeOnOutsideClick?: boolean
    closeOnEsc?: boolean
    showDelay?: number
    hideDelay?: number
    to?: string | HTMLElement
    flip?: boolean
    shift?: boolean
    matchWidth?: boolean
    strategy?: DropdownStrategy
    autoUpdate?: boolean
    zIndex?: number
    maxHeight?: number | string
    maxWidth?: number | string
    panelClass?: string
  }>(),
  {
    visible: undefined,
    trigger: 'click',
    placement: 'bottom-start',
    offset: 4,
    disabled: false,
    closeOnOutsideClick: true,
    closeOnEsc: true,
    showDelay: 0,
    hideDelay: 0,
    to: 'body',
    flip: true,
    shift: false,
    matchWidth: false,
    strategy: 'absolute',
    autoUpdate: true,
    zIndex: undefined,
    maxHeight: undefined,
    maxWidth: undefined,
    panelClass: '',
  },
)

const emit = defineEmits<{
  'update:visible': [value: boolean]
  'visible-change': [value: boolean]
  select: [value: DropdownValue]
}>()

const slots = useSlots()
const dropdownId = useId()
const internalVisible = ref(false)
const activeValue = ref<DropdownValue | null>(null)
const activeScrollKey = ref(0)
const scrollAreaRef = ref<ScrollAreaExpose | null>(null)
const registeredItems = ref<Map<string, DropdownItemRegistration>>(new Map())
let showTimer: ReturnType<typeof setTimeout> | null = null
let hideTimer: ReturnType<typeof setTimeout> | null = null

const computedVisible = computed(() =>
  props.visible !== undefined ? props.visible : internalVisible.value,
)

const hasMaxHeight = computed(() => props.maxHeight !== undefined && props.maxHeight !== '')
const menuId = computed(() => `${dropdownId}-menu`)
const activeItem = computed(
  () => dropdownItems.value.find((item) => item.value === activeValue.value) ?? null,
)
const activeItemId = computed(() =>
  computedVisible.value && activeItem.value ? getItemId(activeItem.value.value) : undefined,
)

const contentStyle = computed<CSSProperties>(() => ({
  maxWidth: resolveLength(props.maxWidth),
}))

const panelClasses = computed(() =>
  cn(
    'overflow-hidden rounded-[var(--round-default)] bg-[var(--bg-color-container)] text-[var(--text-color-primary)] shadow-popper outline-none',
    props.panelClass,
  ),
)

const menuClasses = computed(() => cn('min-w-32 py-1 outline-none'))

provide(dropdownContextKey, {
  activeValue,
  registerItem,
  unregisterItem,
  setActiveValue,
  selectItem,
  getItemId,
  isItemActive,
})

function getItemKey(value: DropdownValue) {
  return `${typeof value}:${String(value)}`
}

function getItemIdSafeKey(value: DropdownValue) {
  return getItemKey(value).replace(/[^A-Za-z0-9_-]/g, '-')
}

function isDropdownItemNode(node: VNode) {
  return node.type === DropdownItem || getComponentName(node) === 'DropdownItem'
}

function isDropdownGroupNode(node: VNode) {
  return node.type === DropdownGroup || getComponentName(node) === 'DropdownGroup'
}

function getComponentName(node: VNode) {
  if (typeof node.type !== 'object' || node.type === null) return ''
  return (
    (node.type as { name?: string; __name?: string }).name ??
    (node.type as { __name?: string }).__name
  )
}

function getBooleanProp(value: unknown) {
  return value === '' || value === true
}

function getNodeChildren(node: VNode): VNode[] {
  if (Array.isArray(node.children)) return node.children as VNode[]

  if (
    typeof node.children === 'object' &&
    node.children !== null &&
    'default' in node.children &&
    typeof node.children.default === 'function'
  ) {
    return node.children.default()
  }

  return []
}

function getSlotText(nodes: VNode[] | undefined): string {
  if (!nodes) return ''

  return nodes
    .map((node) => {
      if (node.type === Comment) return ''
      if (node.type === TextNode && typeof node.children === 'string') return node.children
      if (node.type === Fragment) return getSlotText(getNodeChildren(node))
      if (typeof node.children === 'string') return node.children
      if (Array.isArray(node.children)) return getSlotText(node.children as VNode[])
      return ''
    })
    .join('')
    .trim()
}

function collectItems(
  nodes: VNode[] | undefined,
  items: DropdownParsedItem[] = [],
  inheritedDisabled = false,
) {
  if (!nodes) return items

  nodes.forEach((node) => {
    if (node.type === Comment) return

    if (node.type === Fragment) {
      collectItems(getNodeChildren(node), items, inheritedDisabled)
      return
    }

    if (isDropdownGroupNode(node)) {
      const groupDisabled = inheritedDisabled || getBooleanProp(node.props?.disabled)
      collectItems(getNodeChildren(node), items, groupDisabled)
      return
    }

    if (!isDropdownItemNode(node)) return

    const value = node.props?.value as DropdownValue | undefined
    if (value === undefined || value === null) return

    const label = String(node.props?.label ?? getSlotText(getNodeChildren(node)) ?? value)
    const disabled = inheritedDisabled || getBooleanProp(node.props?.disabled)
    const key = getItemKey(value)

    items.push({
      key,
      value,
      label,
      disabled,
    })
  })

  return items
}

const dropdownItems = computed(() => collectItems(slots.default?.()))
const dropdownItemState = computed(() =>
  dropdownItems.value
    .map(({ value, disabled }) => `${String(value)}:${disabled ? '1' : '0'}`)
    .join('|'),
)

function resolveLength(value: number | string | undefined) {
  if (value === undefined || value === '') return undefined
  return typeof value === 'number' ? `${value}px` : value
}

function registerItem(item: DropdownItemRegistration) {
  const key = getItemKey(item.value)
  const next = new Map(registeredItems.value)
  next.set(key, item)
  registeredItems.value = next
}

function unregisterItem(value: DropdownValue) {
  const key = getItemKey(value)
  const next = new Map(registeredItems.value)
  next.delete(key)
  registeredItems.value = next
}

function getItemId(value: DropdownValue) {
  return `${dropdownId}-item-${getItemIdSafeKey(value)}`
}

function isItemActive(value: DropdownValue) {
  return activeValue.value !== null && value === activeValue.value
}

function setActiveValue(value: DropdownValue) {
  activeValue.value = value
}

function clearTimers() {
  if (showTimer) {
    clearTimeout(showTimer)
    showTimer = null
  }
  if (hideTimer) {
    clearTimeout(hideTimer)
    hideTimer = null
  }
}

function setVisible(value: boolean) {
  if (props.disabled && value) return
  if (computedVisible.value === value) return

  internalVisible.value = value
  if (value) syncActiveItem({ scroll: true })
  emit('update:visible', value)
  emit('visible-change', value)
}

function show() {
  if (props.disabled) return
  clearTimers()
  if (props.showDelay > 0) {
    showTimer = setTimeout(() => {
      setVisible(true)
    }, props.showDelay)
  } else {
    setVisible(true)
  }
}

function hide() {
  clearTimers()
  if (props.hideDelay > 0) {
    hideTimer = setTimeout(() => {
      setVisible(false)
    }, props.hideDelay)
  } else {
    setVisible(false)
  }
}

function close() {
  clearTimers()
  setVisible(false)
}

function toggle() {
  if (computedVisible.value) {
    close()
  } else {
    show()
  }
}

function handlePopperVisibleUpdate(value: boolean) {
  if (!value) clearTimers()
  setVisible(value)
}

function handleTriggerMouseEnter() {
  if (props.trigger === 'hover') show()
}

function handleTriggerMouseLeave() {
  if (props.trigger === 'hover') hide()
}

function handleTriggerClick() {
  if (props.trigger === 'click') toggle()
}

function handleTriggerFocus() {
  if (props.trigger === 'focus') show()
}

function handleTriggerBlur() {
  if (props.trigger === 'focus') hide()
}

function handlePanelMouseEnter() {
  if (props.trigger !== 'hover') return
  clearTimers()
  setVisible(true)
}

function handlePanelMouseLeave() {
  if (props.trigger === 'hover') hide()
}

function getEnabledItems() {
  return dropdownItems.value.filter((item) => !item.disabled)
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
  const nextIndex =
    currentIndex < 0
      ? direction === 1
        ? 0
        : items.length - 1
      : (currentIndex + direction + items.length) % items.length

  return items[nextIndex] ?? null
}

function syncActiveItem(options: { scroll?: boolean } = {}) {
  activeValue.value = getFirstEnabledItem()?.value ?? null
  if (options.scroll) activeScrollKey.value += 1
}

function moveActiveItem(direction: 1 | -1) {
  activeValue.value = getNextEnabledItem(direction)?.value ?? null
  activeScrollKey.value += 1
}

function scrollActiveItem() {
  const item = activeItem.value
  if (!item) return

  nextTick(() => {
    const element = registeredItems.value.get(item.key)?.element
    if (!element) return
    scrollAreaRef.value?.scrollToElement(element, { block: 'nearest' })
  })
}

function selectItem(value: DropdownValue) {
  const item = dropdownItems.value.find((entry) => entry.value === value)
  if (!item || item.disabled) return

  emit('select', item.value)
  close()
}

function selectActiveItem() {
  const item = activeItem.value
  if (!item || item.disabled) return
  selectItem(item.value)
}

function handleKeydown(event: KeyboardEvent) {
  if (props.disabled) return

  if (event.key === 'Escape') {
    if (!computedVisible.value) return
    if (!props.closeOnEsc) return
    event.preventDefault()
    close()
    return
  }

  if (event.key === 'Tab') {
    close()
    return
  }

  if (event.key === 'ArrowDown') {
    event.preventDefault()
    if (!computedVisible.value) {
      show()
    } else {
      moveActiveItem(1)
    }
    return
  }

  if (event.key === 'ArrowUp') {
    event.preventDefault()
    if (!computedVisible.value) {
      show()
    } else {
      moveActiveItem(-1)
    }
    return
  }

  if (event.key === 'Home') {
    if (!computedVisible.value) return
    event.preventDefault()
    activeValue.value = getFirstEnabledItem()?.value ?? null
    activeScrollKey.value += 1
    return
  }

  if (event.key === 'End') {
    if (!computedVisible.value) return
    event.preventDefault()
    activeValue.value = getLastEnabledItem()?.value ?? null
    activeScrollKey.value += 1
    return
  }

  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault()
    if (!computedVisible.value) {
      show()
    } else {
      selectActiveItem()
    }
  }
}

watch(
  () => props.disabled,
  (disabled) => {
    if (disabled) {
      clearTimers()
      setVisible(false)
    }
  },
)

watch(
  () => dropdownItemState.value,
  () => {
    if (computedVisible.value) syncActiveItem({ scroll: true })
  },
)

watch(
  () => activeScrollKey.value,
  () => {
    scrollActiveItem()
  },
)

onBeforeUnmount(() => {
  clearTimers()
})
</script>
