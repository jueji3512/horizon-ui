<template>
  <div :id="listboxId" role="listbox" :aria-busy="loading || undefined" :class="listClasses">
    <div v-if="loading" role="status" :class="messageClasses">
      <Icon name="loading" class="select-option-list-loading" />
      <span>加载中</span>
    </div>

    <div v-else-if="!hasOptions" :class="messageClasses">
      {{ emptyText }}
    </div>

    <template v-else>
      <template v-for="item in items" :key="item.key">
        <div
          v-if="item.type === 'group'"
          role="group"
          :aria-label="item.title"
          :aria-disabled="item.disabled || undefined"
          :data-disabled="item.disabled || undefined"
          :class="groupClasses"
        >
          <div :class="getGroupTitleClasses(item)">
            {{ item.title }}
          </div>

          <div
            v-for="option in item.children"
            :id="getOptionId(option.optionIndex)"
            :key="option.key"
            :ref="(el) => setOptionRef(el, option.optionIndex)"
            role="option"
            :aria-selected="isSelected(option)"
            :aria-disabled="option.disabled || undefined"
            :data-active="option.optionIndex === activeIndex || undefined"
            :data-selected="isSelected(option) || undefined"
            :data-disabled="option.disabled || undefined"
            :class="getOptionClasses(option, true)"
            @mouseenter="handleMouseEnter(option)"
            @mousedown.prevent
            @click="handleSelect(option)"
          >
            <span
              v-if="!option.disabled && isSelected(option)"
              aria-hidden="true"
              class="pointer-events-none absolute inset-y-0 left-0 w-[3px] bg-brand"
            />
            <span class="min-w-0 flex-1 truncate">{{ option.option.label }}</span>
          </div>
        </div>

        <div
          v-else
          :id="getOptionId(item.optionIndex)"
          :ref="(el) => setOptionRef(el, item.optionIndex)"
          role="option"
          :aria-selected="isSelected(item)"
          :aria-disabled="item.disabled || undefined"
          :data-active="item.optionIndex === activeIndex || undefined"
          :data-selected="isSelected(item) || undefined"
          :data-disabled="item.disabled || undefined"
          :class="getOptionClasses(item)"
          @mouseenter="handleMouseEnter(item)"
          @mousedown.prevent
          @click="handleSelect(item)"
        >
          <span
            v-if="!item.disabled && isSelected(item)"
            aria-hidden="true"
            class="pointer-events-none absolute inset-y-0 left-0 w-[3px] bg-brand"
          />
          <span class="min-w-0 flex-1 truncate">{{ item.option.label }}</span>
        </div>
      </template>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onBeforeUpdate, watch, type ComponentPublicInstance } from 'vue'
import Icon from '../Icon/Icon.vue'
import { useScrollAreaContext } from '../ScrollArea'
import { cn } from '../../utils'
import type { SelectOptionItem, SelectSize, SelectValue } from './types'

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

const props = defineProps<{
  items: SelectOptionListItem[]
  selectedValue: SelectValue | null
  activeIndex: number
  activeScrollKey: number
  size: SelectSize
  loading: boolean
  emptyText: string
  listboxId: string
  optionIdPrefix: string
}>()

const emit = defineEmits<{
  select: [option: SelectOptionItem, index: number]
  active: [index: number]
}>()

let optionRefs: HTMLElement[] = []
const scrollArea = useScrollAreaContext()

const hasOptions = computed(() =>
  props.items.some((item) => item.type === 'option' || item.children.length > 0),
)

onBeforeUpdate(() => {
  optionRefs = []
})

watch(
  () => props.activeScrollKey,
  () => {
    const index = props.activeIndex
    if (index < 0) return
    nextTick(() => {
      const option = optionRefs[index]
      if (!option) return
      scrollArea?.scrollToElement(option, { block: 'nearest' })
    })
  },
  { immediate: true },
)

function setOptionRef(el: Element | ComponentPublicInstance | null, index: number) {
  if (el instanceof HTMLElement) {
    optionRefs[index] = el
  }
}

function getOptionId(index: number) {
  return `${props.optionIdPrefix}-${index}`
}

function isSelected(option: SelectOptionListOptionItem) {
  return props.selectedValue !== null && option.option.value === props.selectedValue
}

function handleMouseEnter(option: SelectOptionListOptionItem) {
  if (option.disabled) return
  emit('active', option.optionIndex)
}

function handleSelect(option: SelectOptionListOptionItem) {
  if (option.disabled) return
  emit('select', option.option, option.optionIndex)
}

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

const groupClasses = computed(() => cn('min-w-0'))

const groupTitleSizeMap: Record<SelectSize, string> = {
  sm: 'font-body-sm px-2 pt-2 pb-1',
  md: 'font-body-sm px-3 pt-2 pb-1',
  lg: 'font-body-md px-3 pt-2.5 pb-1',
}

function getGroupTitleClasses(group: SelectOptionListGroupItem) {
  return cn(
    'min-w-0 truncate text-[var(--text-color-secondary)] select-none',
    groupTitleSizeMap[props.size],
    group.disabled && 'text-[var(--text-color-disabled)]',
  )
}

const optionSizeMap: Record<SelectSize, string> = {
  sm: 'font-body-sm min-h-7 px-2 py-1',
  md: 'font-body-md min-h-8 px-3 py-1.5',
  lg: 'font-body-lg min-h-9 px-3 py-2',
}

const nestedOptionInsetMap: Record<SelectSize, string> = {
  sm: 'pl-4 pr-2',
  md: 'pl-5 pr-3',
  lg: 'pl-5 pr-3',
}

function getOptionClasses(option: SelectOptionListOptionItem, isNested = false) {
  return cn(
    'relative flex min-w-0 items-center gap-2 transition-colors duration-100 select-none',
    optionSizeMap[props.size],
    isNested && nestedOptionInsetMap[props.size],
    option.disabled
      ? 'cursor-not-allowed text-[var(--text-color-disabled)]'
      : 'cursor-pointer text-[var(--text-color-primary)]',
    !option.disabled &&
      !isSelected(option) &&
      option.optionIndex === props.activeIndex &&
      'bg-[var(--bg-color-container-hover)] text-[var(--text-color-primary)]',
    !option.disabled &&
      !isSelected(option) &&
      option.optionIndex !== props.activeIndex &&
      'hover:bg-[var(--bg-color-container-hover)]',
    !option.disabled && isSelected(option) && 'bg-brand-light font-medium text-brand',
  )
}
</script>

<style scoped>
.select-option-list-loading {
  animation: select-option-list-spin 1s linear infinite;
}

@keyframes select-option-list-spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
