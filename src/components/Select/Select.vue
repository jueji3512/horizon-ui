<template>
  <Popper
    trigger="manual"
    :visible="isOpen"
    :placement="placement"
    :offset="4"
    :disabled="!canOpen"
    match-width
    :z-index="zIndex"
    @update:visible="handlePopperVisibleUpdate"
  >
    <PopperTrigger class="w-full">
      <div
        v-bind="rootAttrs"
        ref="wrapperRef"
        :class="wrapperClasses"
        @mouseenter="handleMouseEnter"
        @mouseleave="handleMouseLeave"
      >
        <FieldRoot
          v-bind="controlAttrs"
          role="combobox"
          aria-haspopup="listbox"
          :aria-expanded="isOpen"
          :aria-controls="listboxId"
          :aria-activedescendant="activeOptionId"
          :aria-disabled="disabled || undefined"
          :aria-readonly="readonly || undefined"
          :aria-invalid="status === 'error' || undefined"
          :aria-label="resolvedAriaLabel"
          :tabindex="disabled ? undefined : 0"
          :size="size"
          :status="status"
          :disabled="disabled"
          :readonly="readonly"
          :focused="isFocused"
          :active="isOpen"
          :class="fieldClasses"
          @click="handleTriggerClick"
          @focus="handleFocus"
          @blur="handleBlur"
          @keydown="handleKeydown"
        >
          <FieldContent :class="contentClasses">
            <span :class="displayClasses">
              {{ selectedOption ? selectedOption.label : placeholder }}
            </span>
          </FieldContent>

          <FieldSuffix class="relative h-5 w-5 justify-center">
            <FieldAction
              v-if="showClear"
              aria-label="清空"
              @mousedown.prevent
              @click.stop="handleClear"
            >
              <Icon name="close" />
            </FieldAction>

            <Icon v-if="loading" name="loading" class="select-loading" />
            <Icon v-else-if="!showClear" name="chevron-down" :class="chevronClasses" />
          </FieldSuffix>
        </FieldRoot>

        <input
          v-if="name"
          type="hidden"
          :name="name"
          :value="hiddenValue"
          :disabled="disabled || undefined"
        />
      </div>
    </PopperTrigger>

    <PopperContent :class="panelClasses">
      <ScrollArea ref="scrollAreaRef" :max-height="240">
        <div :id="listboxId" role="listbox" :aria-busy="loading || undefined" :class="listClasses">
          <div v-if="loading" role="status" :class="messageClasses">
            <Icon name="loading" class="select-loading" />
            <span>加载中</span>
          </div>

          <template v-else>
            <slot />
            <div v-if="!hasOptions" :class="messageClasses">
              {{ emptyText }}
            </div>
          </template>
        </div>
      </ScrollArea>
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
  provide,
  ref,
  useAttrs,
  useId,
  useSlots,
  watch,
  type VNode,
} from 'vue'
import FieldAction from '../Field/FieldAction.vue'
import FieldContent from '../Field/FieldContent.vue'
import FieldRoot from '../Field/FieldRoot.vue'
import FieldSuffix from '../Field/FieldSuffix.vue'
import Icon from '../Icon/Icon.vue'
import { Popper, PopperContent, PopperTrigger } from '../Popper'
import { ScrollArea, type ScrollAreaExpose } from '../ScrollArea'
import { cn } from '../../utils'
import SelectOption from './SelectOption.vue'
import SelectOptionGroup from './SelectOptionGroup.vue'
import { selectContextKey } from './context'
import type {
  SelectOptionRegistration,
  SelectParsedOption,
  SelectPlacement,
  SelectSize,
  SelectStatus,
  SelectValue,
} from './types'

defineOptions({ inheritAttrs: false })

const props = withDefaults(
  defineProps<{
    modelValue?: SelectValue | null
    placeholder?: string
    size?: SelectSize
    status?: SelectStatus
    disabled?: boolean
    readonly?: boolean
    clearable?: boolean
    loading?: boolean
    emptyText?: string
    name?: string
    ariaLabel?: string
    placement?: SelectPlacement
    zIndex?: number
  }>(),
  {
    modelValue: null,
    placeholder: '请选择',
    size: 'md',
    status: undefined,
    disabled: false,
    readonly: false,
    clearable: false,
    loading: false,
    emptyText: '暂无数据',
    name: '',
    ariaLabel: '',
    placement: 'bottom-start',
    zIndex: undefined,
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: SelectValue | null]
  change: [value: SelectValue | null]
  focus: [e: FocusEvent]
  blur: [e: FocusEvent]
  clear: []
  'visible-change': [value: boolean]
}>()

const attrs = useAttrs()
const slots = useSlots()
const selectId = useId()
const wrapperRef = ref<HTMLElement | null>(null)
const scrollAreaRef = ref<ScrollAreaExpose | null>(null)
const isOpen = ref(false)
const isFocused = ref(false)
const isHovered = ref(false)
const activeValue = ref<SelectValue | null>(null)
const activeScrollKey = ref(0)
const registeredOptions = ref<Map<string, SelectOptionRegistration>>(new Map())

const rootAttrs = computed(() => {
  const { class: className, style } = attrs
  return { class: className, style }
})

const controlAttrs = computed(() => {
  const { class: _class, style: _style, 'aria-label': _ariaLabel, ...controlOnlyAttrs } = attrs
  return controlOnlyAttrs
})

function getOptionKey(value: SelectValue) {
  return `${typeof value}:${String(value)}`
}

function getOptionIdSafeKey(value: SelectValue) {
  return getOptionKey(value).replace(/[^A-Za-z0-9_-]/g, '-')
}

function isSelectOptionNode(node: VNode) {
  return node.type === SelectOption || getComponentName(node) === 'SelectOption'
}

function isSelectOptionGroupNode(node: VNode) {
  return node.type === SelectOptionGroup || getComponentName(node) === 'SelectOptionGroup'
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

function collectOptions(
  nodes: VNode[] | undefined,
  options: SelectParsedOption[] = [],
  inheritedDisabled = false,
) {
  if (!nodes) return options

  nodes.forEach((node) => {
    if (node.type === Comment) return

    if (node.type === Fragment) {
      collectOptions(getNodeChildren(node), options, inheritedDisabled)
      return
    }

    if (isSelectOptionGroupNode(node)) {
      const groupDisabled = inheritedDisabled || getBooleanProp(node.props?.disabled)
      collectOptions(getNodeChildren(node), options, groupDisabled)
      return
    }

    if (!isSelectOptionNode(node)) return

    const value = node.props?.value as SelectValue | undefined
    if (value === undefined || value === null) return

    const label = String(node.props?.label ?? getSlotText(getNodeChildren(node)) ?? value)
    const disabled = inheritedDisabled || getBooleanProp(node.props?.disabled)
    const key = getOptionKey(value)

    options.push({
      key,
      value,
      label,
      disabled,
    })
  })

  return options
}

const optionListItems = computed(() => collectOptions(slots.default?.()))
const hasOptions = computed(() => optionListItems.value.length > 0)

const selectedOption = computed(
  () => optionListItems.value.find((item) => item.value === props.modelValue) ?? null,
)

const selectableOptionState = computed(() =>
  optionListItems.value
    .map(({ value, disabled }) => `${String(value)}:${disabled ? '1' : '0'}`)
    .join('|'),
)

const canOpen = computed(() => !props.disabled && !props.readonly)
const hasValue = computed(() => props.modelValue !== null && props.modelValue !== undefined)
const showClear = computed(
  () => props.clearable && canOpen.value && hasValue.value && isHovered.value && !props.loading,
)
const listboxId = computed(() => `${selectId}-listbox`)
const optionIdPrefix = computed(() => `${selectId}-option`)
const activeOption = computed(
  () => optionListItems.value.find((item) => item.value === activeValue.value) ?? null,
)
const activeOptionId = computed(() => {
  if (!isOpen.value || !activeOption.value || props.loading) return undefined
  return getOptionId(activeOption.value.value)
})

const resolvedAriaLabel = computed(() => {
  if (props.ariaLabel) return props.ariaLabel
  const attrLabel = attrs['aria-label']
  return typeof attrLabel === 'string' ? attrLabel : undefined
})

const hiddenValue = computed(() => (props.modelValue === null ? '' : String(props.modelValue)))

provide(selectContextKey, {
  selectedValue: computed(() => props.modelValue ?? null),
  activeValue,
  size: computed(() => props.size),
  registerOption,
  unregisterOption,
  setActiveValue,
  selectOption,
  getOptionId,
  isOptionSelected,
  isOptionActive,
})

function registerOption(option: SelectOptionRegistration) {
  const key = getOptionKey(option.value)
  const next = new Map(registeredOptions.value)
  next.set(key, option)
  registeredOptions.value = next
}

function unregisterOption(value: SelectValue) {
  const key = getOptionKey(value)
  const next = new Map(registeredOptions.value)
  next.delete(key)
  registeredOptions.value = next
}

function getOptionId(value: SelectValue) {
  return `${optionIdPrefix.value}-${getOptionIdSafeKey(value)}`
}

function isOptionSelected(value: SelectValue) {
  return props.modelValue !== null && value === props.modelValue
}

function isOptionActive(value: SelectValue) {
  return activeValue.value !== null && value === activeValue.value
}

function focusTrigger() {
  const trigger = wrapperRef.value?.querySelector<HTMLElement>('[role="combobox"]')
  trigger?.focus()
}

function setOpen(value: boolean) {
  if (value && !canOpen.value) return
  if (isOpen.value === value) return

  isOpen.value = value
  if (value) {
    syncActiveOption({ scroll: true })
  }
  emit('visible-change', value)
}

function handlePopperVisibleUpdate(value: boolean) {
  setOpen(value)
}

function handleTriggerClick() {
  if (!canOpen.value) return
  setOpen(!isOpen.value)
}

function handleMouseEnter() {
  isHovered.value = true
}

function handleMouseLeave() {
  isHovered.value = false
}

function handleFocus(e: FocusEvent) {
  if (isFocused.value) return
  isFocused.value = true
  emit('focus', e)
}

function handleBlur(e: FocusEvent) {
  const nextTarget = e.relatedTarget as Node | null
  if (nextTarget && wrapperRef.value?.contains(nextTarget)) return

  isFocused.value = false
  setOpen(false)
  emit('blur', e)
}

function handleClear() {
  if (!showClear.value) return

  emit('update:modelValue', null)
  emit('change', null)
  emit('clear')
  setOpen(false)
  nextTick(focusTrigger)
}

function selectOption(value: SelectValue) {
  const option = optionListItems.value.find((item) => item.value === value)
  if (!option || option.disabled) return

  if (option.value !== props.modelValue) {
    emit('update:modelValue', option.value)
    emit('change', option.value)
  }

  setOpen(false)
  nextTick(focusTrigger)
}

function setActiveValue(value: SelectValue) {
  activeValue.value = value
}

function getEnabledOptions() {
  return optionListItems.value.filter((option) => !option.disabled)
}

function getFirstEnabledOption() {
  return getEnabledOptions()[0] ?? null
}

function getLastEnabledOption() {
  const options = getEnabledOptions()
  return options[options.length - 1] ?? null
}

function getSelectedOption() {
  const option = optionListItems.value.find((item) => item.value === props.modelValue)
  return option && !option.disabled ? option : null
}

function getNextEnabledOption(direction: 1 | -1) {
  const options = getEnabledOptions()
  if (options.length === 0) return null

  const currentIndex = options.findIndex((option) => option.value === activeValue.value)
  const nextIndex =
    currentIndex < 0
      ? direction === 1
        ? 0
        : options.length - 1
      : (currentIndex + direction + options.length) % options.length

  return options[nextIndex] ?? null
}

function syncActiveOption(options: { scroll?: boolean } = {}) {
  if (props.loading) {
    activeValue.value = null
    return
  }

  activeValue.value = getSelectedOption()?.value ?? getFirstEnabledOption()?.value ?? null
  if (options.scroll) activeScrollKey.value += 1
}

function moveActiveOption(direction: 1 | -1) {
  activeValue.value = getNextEnabledOption(direction)?.value ?? null
  activeScrollKey.value += 1
}

function scrollActiveOption() {
  const option = activeOption.value
  if (!option) return

  nextTick(() => {
    const element = registeredOptions.value.get(option.key)?.element
    if (!element) return
    scrollAreaRef.value?.scrollToElement(element, { block: 'nearest' })
  })
}

function selectActiveOption() {
  const option = activeOption.value
  if (!option || option.disabled) return
  selectOption(option.value)
}

function handleKeydown(e: KeyboardEvent) {
  if (props.disabled) return

  if (e.key === 'Tab') {
    setOpen(false)
    return
  }

  if (e.key === 'Escape') {
    if (isOpen.value) {
      e.preventDefault()
      setOpen(false)
    }
    return
  }

  if (props.readonly) return

  if (e.key === 'ArrowDown') {
    e.preventDefault()
    if (!isOpen.value) {
      setOpen(true)
    } else {
      moveActiveOption(1)
    }
    return
  }

  if (e.key === 'ArrowUp') {
    if (!isOpen.value) return
    e.preventDefault()
    moveActiveOption(-1)
    return
  }

  if (e.key === 'Home') {
    if (!isOpen.value) return
    e.preventDefault()
    activeValue.value = getFirstEnabledOption()?.value ?? null
    activeScrollKey.value += 1
    return
  }

  if (e.key === 'End') {
    if (!isOpen.value) return
    e.preventDefault()
    activeValue.value = getLastEnabledOption()?.value ?? null
    activeScrollKey.value += 1
    return
  }

  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault()
    if (!isOpen.value) {
      setOpen(true)
    } else {
      selectActiveOption()
    }
  }
}

watch(
  () => [props.disabled, props.readonly] as const,
  ([disabled, readonly]) => {
    if (disabled || readonly) {
      setOpen(false)
    }
  },
)

watch(
  () => props.modelValue,
  () => {
    if (isOpen.value) syncActiveOption({ scroll: true })
  },
)

watch(
  () => selectableOptionState.value,
  () => {
    if (isOpen.value) syncActiveOption({ scroll: true })
  },
)

watch(
  () => activeScrollKey.value,
  () => {
    scrollActiveOption()
  },
)

const wrapperClasses = computed(() =>
  cn(
    'inline-flex w-full min-w-0 align-middle',
    props.disabled && 'cursor-not-allowed',
    props.readonly && !props.disabled && 'cursor-default',
  ),
)

const fieldClasses = computed(() =>
  cn(canOpen.value && 'cursor-pointer', props.readonly && !props.disabled && 'cursor-default'),
)

const contentPaddingMap: Record<SelectSize, string> = {
  sm: 'pl-2 pr-1',
  md: 'pl-3 pr-1',
  lg: 'pl-3 pr-1',
}

const contentClasses = computed(() => cn('min-w-0', contentPaddingMap[props.size]))

const displayClasses = computed(() =>
  cn(
    'block min-w-0 flex-1 truncate',
    selectedOption.value
      ? 'text-[var(--text-color-primary)]'
      : 'text-[var(--text-color-placeholder)]',
  ),
)

const chevronClasses = computed(() =>
  cn(
    'text-[var(--text-color-secondary)] transition-transform duration-150',
    isOpen.value && 'rotate-180 text-[var(--text-color-primary)]',
    props.disabled && 'text-[var(--text-color-disabled)]',
  ),
)

const panelSizeMap: Record<SelectSize, string> = {
  sm: 'font-body-sm',
  md: 'font-body-md',
  lg: 'font-body-lg',
}

const panelClasses = computed(() =>
  cn(
    'overflow-hidden rounded-[var(--round-default)] bg-[var(--bg-color-container)] text-[var(--text-color-primary)] shadow-popper outline-none',
    panelSizeMap[props.size],
  ),
)

const listClasses = computed(() => cn('py-1'))

const messageSizeMap: Record<SelectSize, string> = {
  sm: 'font-body-sm min-h-7 px-2 py-1',
  md: 'font-body-md min-h-8 px-3 py-1.5',
  lg: 'font-body-lg min-h-9 px-3 py-2',
}

const messageClasses = computed(() =>
  cn(
    'flex items-center gap-2 text-[var(--text-color-secondary)] select-none',
    messageSizeMap[props.size],
  ),
)
</script>

<style scoped>
.select-loading {
  animation: select-spin 1s linear infinite;
}

@keyframes select-spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
