<template>
  <div :id="listboxId" role="listbox" :aria-busy="loading || undefined" :class="listClasses">
    <div v-if="loading" role="status" :class="messageClasses">
      <Icon name="loading" class="select-option-list-loading" />
      <span>加载中</span>
    </div>

    <div v-else-if="options.length === 0" :class="messageClasses">
      {{ emptyText }}
    </div>

    <div
      v-for="(option, index) in options"
      v-else
      :id="getOptionId(index)"
      :key="option.value"
      :ref="(el) => setOptionRef(el, index)"
      role="option"
      :aria-selected="isSelected(option)"
      :aria-disabled="option.disabled || undefined"
      :data-active="index === activeIndex || undefined"
      :data-selected="isSelected(option) || undefined"
      :data-disabled="option.disabled || undefined"
      :class="getOptionClasses(option, index)"
      @mouseenter="handleMouseEnter(option, index)"
      @mousedown.prevent
      @click="handleSelect(option, index)"
    >
      <span class="min-w-0 flex-1 truncate">{{ option.label }}</span>
      <Icon v-if="isSelected(option)" name="check" class="ml-auto shrink-0 text-brand" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onBeforeUpdate, ref, watch, type ComponentPublicInstance } from 'vue'
import Icon from '../Icon/Icon.vue'
import { cn } from '../../utils'
import type { SelectOption, SelectSize, SelectValue } from './types'

const props = defineProps<{
  options: SelectOption[]
  selectedValue: SelectValue | null
  activeIndex: number
  size: SelectSize
  loading: boolean
  emptyText: string
  listboxId: string
  optionIdPrefix: string
}>()

const emit = defineEmits<{
  select: [option: SelectOption, index: number]
  active: [index: number]
}>()

const optionRefs = ref<HTMLElement[]>([])

onBeforeUpdate(() => {
  optionRefs.value = []
})

watch(
  () => props.activeIndex,
  (index) => {
    if (index < 0) return
    nextTick(() => {
      optionRefs.value[index]?.scrollIntoView({ block: 'nearest' })
    })
  },
)

function setOptionRef(el: Element | ComponentPublicInstance | null, index: number) {
  if (el instanceof HTMLElement) {
    optionRefs.value[index] = el
  }
}

function getOptionId(index: number) {
  return `${props.optionIdPrefix}-${index}`
}

function isSelected(option: SelectOption) {
  return props.selectedValue !== null && option.value === props.selectedValue
}

function handleMouseEnter(option: SelectOption, index: number) {
  if (option.disabled) return
  emit('active', index)
}

function handleSelect(option: SelectOption, index: number) {
  if (option.disabled) return
  emit('select', option, index)
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

const optionSizeMap: Record<SelectSize, string> = {
  sm: 'font-body-sm min-h-7 px-2 py-1',
  md: 'font-body-md min-h-8 px-3 py-1.5',
  lg: 'font-body-lg min-h-9 px-3 py-2',
}

function getOptionClasses(option: SelectOption, index: number) {
  return cn(
    'flex min-w-0 items-center gap-2 transition-colors duration-100 select-none',
    optionSizeMap[props.size],
    option.disabled
      ? 'cursor-not-allowed text-[var(--text-color-disabled)]'
      : 'cursor-pointer text-[var(--text-color-primary)] hover:bg-[var(--bg-color-container-hover)]',
    !option.disabled &&
      index === props.activeIndex &&
      'bg-[var(--bg-color-container-hover)] text-[var(--text-color-primary)]',
    !option.disabled && isSelected(option) && 'font-medium text-brand',
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
