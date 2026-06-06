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
      <SelectOptionList
        :items="optionListItems"
        :selected-value="modelValue"
        :active-index="activeIndex"
        :size="size"
        :loading="loading"
        :empty-text="emptyText"
        :listbox-id="listboxId"
        :option-id-prefix="optionIdPrefix"
        @active="setActiveIndex"
        @select="handleOptionSelect"
      />
    </PopperContent>
  </Popper>
</template>

<script setup lang="ts">
import { computed, nextTick, ref, useAttrs, useId, watch } from 'vue'
import FieldAction from '../Field/FieldAction.vue'
import FieldContent from '../Field/FieldContent.vue'
import FieldRoot from '../Field/FieldRoot.vue'
import FieldSuffix from '../Field/FieldSuffix.vue'
import Icon from '../Icon/Icon.vue'
import { Popper, PopperContent, PopperTrigger } from '../Popper'
import { cn } from '../../utils'
import SelectOptionList from './SelectOptionList.vue'
import type {
  SelectOption,
  SelectOptionGroup,
  SelectOptionItem,
  SelectPlacement,
  SelectSize,
  SelectStatus,
  SelectValue,
} from './types'

defineOptions({ inheritAttrs: false })

const props = withDefaults(
  defineProps<{
    modelValue?: SelectValue | null
    options?: SelectOption[]
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
    options: () => [],
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

interface SelectOptionListOptionItem {
  type: 'option'
  key: string
  option: SelectOptionItem
  optionIndex: number
  disabled: boolean
}

interface SelectOptionListGroupItem {
  type: 'group'
  key: string
  title: string
  disabled: boolean
  children: SelectOptionListOptionItem[]
}

type SelectOptionListItem = SelectOptionListOptionItem | SelectOptionListGroupItem

const attrs = useAttrs()
const selectId = useId()
const wrapperRef = ref<HTMLElement | null>(null)
const isOpen = ref(false)
const isFocused = ref(false)
const isHovered = ref(false)
const activeIndex = ref(-1)

const rootAttrs = computed(() => {
  const { class: className, style } = attrs
  return { class: className, style }
})

const controlAttrs = computed(() => {
  const { class: _class, style: _style, 'aria-label': _ariaLabel, ...controlOnlyAttrs } = attrs
  return controlOnlyAttrs
})

function isSelectOptionGroup(option: SelectOption): option is SelectOptionGroup {
  return 'children' in option
}

const optionListItems = computed<SelectOptionListItem[]>(() => {
  const items: SelectOptionListItem[] = []
  let optionIndex = 0

  props.options.forEach((option, index) => {
    if (isSelectOptionGroup(option)) {
      if (option.children.length === 0) return

      const groupDisabled = Boolean(option.disabled)
      const children = option.children.map((child, childIndex) => {
        const item: SelectOptionListOptionItem = {
          type: 'option',
          key: `group-${index}-option-${childIndex}-${String(child.value)}`,
          option: child,
          optionIndex,
          disabled: groupDisabled || Boolean(child.disabled),
        }
        optionIndex += 1
        return item
      })

      items.push({
        type: 'group',
        key: `group-${index}-${option.title}`,
        title: option.title,
        disabled: groupDisabled,
        children,
      })
      return
    }

    items.push({
      type: 'option',
      key: `option-${index}-${String(option.value)}`,
      option,
      optionIndex,
      disabled: Boolean(option.disabled),
    })
    optionIndex += 1
  })

  return items
})

const selectableOptions = computed<SelectOptionListOptionItem[]>(() =>
  optionListItems.value.flatMap((item) => (item.type === 'group' ? item.children : [item])),
)

const selectedOption = computed(
  () => selectableOptions.value.find((item) => item.option.value === props.modelValue)?.option,
)

const canOpen = computed(() => !props.disabled && !props.readonly)
const hasValue = computed(() => props.modelValue !== null && props.modelValue !== undefined)
const showClear = computed(
  () => props.clearable && canOpen.value && hasValue.value && isHovered.value && !props.loading,
)
const listboxId = computed(() => `${selectId}-listbox`)
const optionIdPrefix = computed(() => `${selectId}-option`)
const activeOptionId = computed(() => {
  if (!isOpen.value || activeIndex.value < 0 || props.loading) return undefined
  return `${optionIdPrefix.value}-${activeIndex.value}`
})

const resolvedAriaLabel = computed(() => {
  if (props.ariaLabel) return props.ariaLabel
  const attrLabel = attrs['aria-label']
  return typeof attrLabel === 'string' ? attrLabel : undefined
})

const hiddenValue = computed(() => (props.modelValue === null ? '' : String(props.modelValue)))

function focusTrigger() {
  const trigger = wrapperRef.value?.querySelector<HTMLElement>('[role="combobox"]')
  trigger?.focus()
}

function setOpen(value: boolean) {
  if (value && !canOpen.value) return
  if (isOpen.value === value) return

  isOpen.value = value
  if (value) {
    syncActiveOption()
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

function handleOptionSelect(option: SelectOptionItem) {
  if (option.disabled) return

  if (option.value !== props.modelValue) {
    emit('update:modelValue', option.value)
    emit('change', option.value)
  }

  setOpen(false)
  nextTick(focusTrigger)
}

function setActiveIndex(index: number) {
  activeIndex.value = index
}

function getFirstEnabledIndex() {
  return selectableOptions.value.findIndex((option) => !option.disabled)
}

function getLastEnabledIndex() {
  const options = selectableOptions.value

  for (let index = options.length - 1; index >= 0; index -= 1) {
    if (!options[index]?.disabled) return index
  }
  return -1
}

function getNextEnabledIndex(currentIndex: number, direction: 1 | -1) {
  const options = selectableOptions.value

  if (options.length === 0) return -1

  let index = currentIndex
  for (let attempt = 0; attempt < options.length; attempt += 1) {
    index += direction
    if (index < 0) index = options.length - 1
    if (index >= options.length) index = 0
    if (!options[index]?.disabled) return index
  }

  return -1
}

function getSelectedIndex() {
  return selectableOptions.value.findIndex((option) => option.option.value === props.modelValue)
}

function syncActiveOption() {
  if (props.loading) {
    activeIndex.value = -1
    return
  }

  const selectedIndex = getSelectedIndex()
  if (selectedIndex >= 0 && !selectableOptions.value[selectedIndex]?.disabled) {
    activeIndex.value = selectedIndex
    return
  }

  activeIndex.value = getFirstEnabledIndex()
}

function moveActiveOption(direction: 1 | -1) {
  activeIndex.value = getNextEnabledIndex(activeIndex.value, direction)
}

function selectActiveOption() {
  const option = selectableOptions.value[activeIndex.value]
  if (!option || option.disabled) return
  handleOptionSelect(option.option)
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
    activeIndex.value = getFirstEnabledIndex()
    return
  }

  if (e.key === 'End') {
    if (!isOpen.value) return
    e.preventDefault()
    activeIndex.value = getLastEnabledIndex()
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
    if (isOpen.value) syncActiveOption()
  },
)

watch(
  () => props.options,
  () => {
    if (isOpen.value) syncActiveOption()
  },
  { deep: true },
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
    'max-h-60 overflow-auto rounded-[var(--round-default)] bg-[var(--bg-color-container)] text-[var(--text-color-primary)] shadow-popper outline-none',
    panelSizeMap[props.size],
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
