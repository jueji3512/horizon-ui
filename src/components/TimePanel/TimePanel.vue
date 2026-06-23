<template>
  <div
    ref="rootRef"
    class="h-time-panel font-body-md inline-flex w-max min-w-[260px] flex-col rounded-[var(--round-default)] bg-[var(--bg-color-container)] p-2 text-[var(--text-color-primary)] shadow-popper outline-none"
    role="group"
    :aria-label="ariaLabel"
    tabindex="0"
    @keydown="handleKeydown"
  >
    <div class="flex gap-2">
      <div
        v-for="column in visibleColumns"
        :key="column.unit"
        class="h-time-panel-column min-w-16 flex-1"
      >
        <ScrollArea
          :ref="(instance) => setScrollAreaRef(column.unit, instance)"
          :max-height="timePanelViewportHeight"
          class="h-time-panel-scroll rounded-[var(--round-default)]"
          scrollbar-visibility="hidden"
          :aria-label="`${column.label} list`"
        >
          <div
            class="flex flex-col gap-1"
            role="listbox"
            :aria-label="column.label"
            :aria-activedescendant="getActiveDescendant(column)"
            :style="optionListStyle"
          >
            <button
              v-for="option in column.options"
              :id="getOptionId(column.unit, option.value)"
              :key="getOptionKey(column.unit, option.value)"
              type="button"
              role="option"
              :aria-selected="option.selected"
              :disabled="option.disabled"
              :tabindex="-1"
              :data-time-panel-option="getOptionKey(column.unit, option.value)"
              :class="getOptionClasses(option)"
              @click="selectOption(column.unit, option.value)"
              @mouseenter="activeUnit = column.unit"
            >
              {{ option.label }}
            </button>
          </div>
        </ScrollArea>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, ref, watch, type ComponentPublicInstance } from 'vue'
import type { ClassValue } from 'clsx'
import ScrollArea from '../ScrollArea/ScrollArea.vue'
import { cn } from '../../utils'
import type { ScrollAreaExpose } from '../ScrollArea'
import type {
  TimePanelDisabledTime,
  TimePanelExpose,
  TimePanelFormat,
  TimePanelMeridiem,
  TimePanelScrollBehavior,
  TimePanelSteps,
  TimePanelUnit,
  TimePanelValueParts,
} from './types'

interface TimePanelFormatConfig {
  use12Hour: boolean
  showSecond: boolean
  showMillisecond: boolean
}

interface TimePanelColumn {
  unit: TimePanelUnit
  label: string
  options: TimePanelOption[]
}

interface TimePanelOption {
  value: number | TimePanelMeridiem
  label: string
  selected: boolean
  disabled: boolean
}

const timePanelFormatConfigs: Record<TimePanelFormat, TimePanelFormatConfig> = {
  'HH:mm': {
    use12Hour: false,
    showSecond: false,
    showMillisecond: false,
  },
  'HH:mm:ss': {
    use12Hour: false,
    showSecond: true,
    showMillisecond: false,
  },
  'HH:mm:ss:SSS': {
    use12Hour: false,
    showSecond: true,
    showMillisecond: true,
  },
  'hh:mm A': {
    use12Hour: true,
    showSecond: false,
    showMillisecond: false,
  },
  'hh:mm:ss A': {
    use12Hour: true,
    showSecond: true,
    showMillisecond: false,
  },
  'hh:mm:ss:SSS A': {
    use12Hour: true,
    showSecond: true,
    showMillisecond: true,
  },
}

const timePanelOptionHeight = 32
const timePanelOptionGap = 4
const timePanelVisibleOptionCount = 7
const timePanelViewportHeight =
  timePanelOptionHeight * timePanelVisibleOptionCount +
  timePanelOptionGap * (timePanelVisibleOptionCount - 1)
const timePanelOptionCenterPadding = (timePanelViewportHeight - timePanelOptionHeight) / 2
const optionListStyle = {
  paddingBlock: `${timePanelOptionCenterPadding}px`,
}

const props = withDefaults(
  defineProps<{
    modelValue?: string | null
    format?: TimePanelFormat
    steps?: TimePanelSteps
    disabledTime?: TimePanelDisabledTime
    ariaLabel?: string
  }>(),
  {
    modelValue: null,
    format: 'HH:mm',
    steps: () => [1, 1, 1, 1],
    disabledTime: undefined,
    ariaLabel: 'Time panel',
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: string | null]
  change: [value: string | null]
}>()

const rootRef = ref<HTMLElement | null>(null)
const selectedParts = ref<TimePanelValueParts>(createDefaultParts())
const hasSelection = ref(false)
const activeUnit = ref<TimePanelUnit>('hour')
const scrollAreaRefs = new Map<TimePanelUnit, ScrollAreaExpose>()

const resolvedFormat = computed<TimePanelFormat>(() =>
  props.format in timePanelFormatConfigs ? props.format : 'HH:mm',
)

const formatConfig = computed(() => timePanelFormatConfigs[resolvedFormat.value])
const normalizedSteps = computed(() => normalizeSteps(props.steps))

const visibleUnits = computed<TimePanelUnit[]>(() => {
  const units: TimePanelUnit[] = ['hour', 'minute']

  if (formatConfig.value.showSecond) units.push('second')
  if (formatConfig.value.showMillisecond) units.push('millisecond')
  if (formatConfig.value.use12Hour) units.push('meridiem')

  return units
})

const visibleColumns = computed<TimePanelColumn[]>(() =>
  visibleUnits.value.map((unit) => ({
    unit,
    label: getUnitLabel(unit),
    options: getOptionsForUnit(unit),
  })),
)

watch(
  () => [props.modelValue, resolvedFormat.value] as const,
  () => {
    syncSelectedFromModel()
  },
  { immediate: true },
)

watch(
  visibleUnits,
  (units) => {
    if (!units.includes(activeUnit.value)) {
      activeUnit.value = units[0] ?? 'hour'
    }
  },
  { immediate: true },
)

watch(
  () => [selectedParts.value, hasSelection.value, activeUnit.value, visibleUnits.value] as const,
  () => {
    queueScrollActiveOption()
  },
  { deep: true },
)

function padNumber(value: number, length: number) {
  return String(value).padStart(length, '0')
}

function createDefaultParts(): TimePanelValueParts {
  return {
    hour: 0,
    minute: 0,
    second: 0,
    millisecond: 0,
  }
}

function cloneParts(parts: TimePanelValueParts): TimePanelValueParts {
  return {
    hour: parts.hour,
    minute: parts.minute,
    second: parts.second,
    millisecond: parts.millisecond,
  }
}

function clampInteger(value: number, min: number, max: number) {
  if (!Number.isFinite(value)) return min
  return Math.min(max, Math.max(min, Math.trunc(value)))
}

function normalizeSteps(steps: TimePanelSteps = [1, 1, 1, 1]): TimePanelSteps {
  return [
    clampInteger(steps[0] ?? 1, 1, 24),
    clampInteger(steps[1] ?? 1, 1, 60),
    clampInteger(steps[2] ?? 1, 1, 60),
    clampInteger(steps[3] ?? 1, 1, 1000),
  ]
}

function parseTimeValue(value: string | null | undefined, format: TimePanelFormat) {
  if (!value) return null

  let match: RegExpMatchArray | null

  if (format === 'HH:mm') {
    match = value.match(/^([01]\d|2[0-3]):([0-5]\d)$/)
    if (!match) return null
    return createParts(Number(match[1]), Number(match[2]), 0, 0)
  }

  if (format === 'HH:mm:ss') {
    match = value.match(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/)
    if (!match) return null
    return createParts(Number(match[1]), Number(match[2]), Number(match[3]), 0)
  }

  if (format === 'HH:mm:ss:SSS') {
    match = value.match(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d):(\d{3})$/)
    if (!match) return null
    return createParts(Number(match[1]), Number(match[2]), Number(match[3]), Number(match[4]))
  }

  if (format === 'hh:mm A') {
    match = value.match(/^(0[1-9]|1[0-2]):([0-5]\d) (AM|PM)$/)
    if (!match) return null
    return createParts(
      to24Hour(Number(match[1]), match[3] as TimePanelMeridiem),
      Number(match[2]),
      0,
      0,
    )
  }

  if (format === 'hh:mm:ss A') {
    match = value.match(/^(0[1-9]|1[0-2]):([0-5]\d):([0-5]\d) (AM|PM)$/)
    if (!match) return null
    return createParts(
      to24Hour(Number(match[1]), match[4] as TimePanelMeridiem),
      Number(match[2]),
      Number(match[3]),
      0,
    )
  }

  match = value.match(/^(0[1-9]|1[0-2]):([0-5]\d):([0-5]\d):(\d{3}) (AM|PM)$/)
  if (!match) return null
  return createParts(
    to24Hour(Number(match[1]), match[5] as TimePanelMeridiem),
    Number(match[2]),
    Number(match[3]),
    Number(match[4]),
  )
}

function createParts(
  hour: number,
  minute: number,
  second: number,
  millisecond: number,
): TimePanelValueParts {
  return {
    hour: clampInteger(hour, 0, 23),
    minute: clampInteger(minute, 0, 59),
    second: clampInteger(second, 0, 59),
    millisecond: clampInteger(millisecond, 0, 999),
  }
}

function formatTimeParts(parts: TimePanelValueParts, format: TimePanelFormat) {
  const config = timePanelFormatConfigs[format]
  const hourText = config.use12Hour
    ? padNumber(getDisplayHour(parts.hour), 2)
    : padNumber(parts.hour, 2)
  const minuteText = padNumber(parts.minute, 2)
  const secondText = padNumber(parts.second, 2)
  const millisecondText = padNumber(parts.millisecond, 3)
  const meridiemText = getMeridiem(parts.hour)

  if (format === 'HH:mm' || format === 'hh:mm A') {
    const value = `${hourText}:${minuteText}`
    return config.use12Hour ? `${value} ${meridiemText}` : value
  }

  if (format === 'HH:mm:ss' || format === 'hh:mm:ss A') {
    const value = `${hourText}:${minuteText}:${secondText}`
    return config.use12Hour ? `${value} ${meridiemText}` : value
  }

  const value = `${hourText}:${minuteText}:${secondText}:${millisecondText}`
  return config.use12Hour ? `${value} ${meridiemText}` : value
}

function to24Hour(hour: number, meridiem: TimePanelMeridiem) {
  const normalizedHour = hour === 12 ? 0 : hour
  return meridiem === 'PM' ? normalizedHour + 12 : normalizedHour
}

function getDisplayHour(hour: number) {
  const displayHour = hour % 12
  return displayHour === 0 ? 12 : displayHour
}

function getMeridiem(hour: number): TimePanelMeridiem {
  return hour >= 12 ? 'PM' : 'AM'
}

function getUnitLabel(unit: TimePanelUnit) {
  const labelMap: Record<TimePanelUnit, string> = {
    hour: 'Hour',
    minute: 'Minute',
    second: 'Second',
    millisecond: 'MS',
    meridiem: 'AM/PM',
  }

  return labelMap[unit]
}

function createNumberRange(start: number, end: number, step: number) {
  const values: number[] = []

  for (let value = start; value <= end; value += step) {
    values.push(value)
  }

  return values
}

function getOptionsForUnit(unit: TimePanelUnit): TimePanelOption[] {
  if (unit === 'meridiem') {
    return (['AM', 'PM'] as TimePanelMeridiem[]).map((value) => createOption(unit, value, value))
  }

  const [hourStep, minuteStep, secondStep, millisecondStep] = normalizedSteps.value
  const ranges: Record<Exclude<TimePanelUnit, 'meridiem'>, number[]> = {
    hour: formatConfig.value.use12Hour
      ? createNumberRange(1, 12, hourStep)
      : createNumberRange(0, 23, hourStep),
    minute: createNumberRange(0, 59, minuteStep),
    second: createNumberRange(0, 59, secondStep),
    millisecond: createNumberRange(0, 999, millisecondStep),
  }

  const padding = unit === 'millisecond' ? 3 : 2
  return ranges[unit].map((value) => createOption(unit, value, padNumber(value, padding)))
}

function createOption(
  unit: TimePanelUnit,
  value: number | TimePanelMeridiem,
  label: string,
): TimePanelOption {
  return {
    value,
    label,
    selected: isOptionSelected(unit, value),
    disabled: isOptionDisabled(unit, value),
  }
}

function isOptionSelected(unit: TimePanelUnit, value: number | TimePanelMeridiem) {
  if (!hasSelection.value) return false

  if (unit === 'hour') {
    return formatConfig.value.use12Hour
      ? value === getDisplayHour(selectedParts.value.hour)
      : value === selectedParts.value.hour
  }

  if (unit === 'minute') return value === selectedParts.value.minute
  if (unit === 'second') return value === selectedParts.value.second
  if (unit === 'millisecond') return value === selectedParts.value.millisecond
  return value === getMeridiem(selectedParts.value.hour)
}

function isOptionDisabled(unit: TimePanelUnit, value: number | TimePanelMeridiem) {
  const candidate = getCandidateParts(unit, value)
  const context = {
    ...candidate,
    format: resolvedFormat.value,
    meridiem: getMeridiem(candidate.hour),
    value: formatTimeParts(candidate, resolvedFormat.value),
  }

  return props.disabledTime?.(unit, value, context) ?? false
}

function getCandidateParts(unit: TimePanelUnit, value: number | TimePanelMeridiem) {
  const nextParts = cloneParts(selectedParts.value)

  if (unit === 'hour' && typeof value === 'number') {
    if (formatConfig.value.use12Hour) {
      nextParts.hour = to24Hour(value, getMeridiem(nextParts.hour))
    } else {
      nextParts.hour = value
    }
  }

  if (unit === 'minute' && typeof value === 'number') nextParts.minute = value
  if (unit === 'second' && typeof value === 'number') nextParts.second = value
  if (unit === 'millisecond' && typeof value === 'number') nextParts.millisecond = value

  if (unit === 'meridiem' && typeof value === 'string') {
    nextParts.hour = to24Hour(getDisplayHour(nextParts.hour), value)
  }

  return nextParts
}

function selectOption(unit: TimePanelUnit, value: number | TimePanelMeridiem) {
  activeUnit.value = unit
  if (isOptionDisabled(unit, value)) return

  const nextParts = getCandidateParts(unit, value)
  commitValue(nextParts)
}

function commitValue(parts: TimePanelValueParts | null) {
  const value = parts ? formatTimeParts(parts, resolvedFormat.value) : null
  selectedParts.value = parts ? cloneParts(parts) : createDefaultParts()
  hasSelection.value = Boolean(parts)
  emit('update:modelValue', value)
  emit('change', value)
  return value
}

function focusPanel() {
  rootRef.value?.focus()
}

function getValue() {
  return hasSelection.value ? formatTimeParts(selectedParts.value, resolvedFormat.value) : null
}

function getParts() {
  return hasSelection.value ? cloneParts(selectedParts.value) : null
}

function setValue(value: string | null) {
  return commitValue(value ? parseTimeValue(value, resolvedFormat.value) : null)
}

function setNow() {
  const now = new globalThis.Date()
  const nextParts = snapPartsToSteps(
    createParts(now.getHours(), now.getMinutes(), now.getSeconds(), now.getMilliseconds()),
  )
  return commitValue(nextParts) ?? formatTimeParts(nextParts, resolvedFormat.value)
}

function clearValue() {
  commitValue(null)
  return null
}

function handleKeydown(event: KeyboardEvent) {
  if (event.defaultPrevented) return

  if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
    event.preventDefault()
    moveActiveUnit(event.key === 'ArrowRight' ? 1 : -1)
    return
  }

  if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
    event.preventDefault()
    moveActiveOption(event.key === 'ArrowDown' ? 1 : -1)
    return
  }

  if (event.key === 'Home' || event.key === 'End') {
    event.preventDefault()
    selectEdgeOption(event.key === 'End')
    return
  }

  if (event.key === 'Enter') {
    event.preventDefault()
    selectCurrentOption()
    return
  }
}

function moveActiveUnit(offset: number) {
  const units = visibleUnits.value
  const currentIndex = Math.max(0, units.indexOf(activeUnit.value))
  const nextIndex = (currentIndex + offset + units.length) % units.length
  activeUnit.value = units[nextIndex] ?? 'hour'
  queueScrollActiveOption()
}

function getEnabledOptions(unit = activeUnit.value) {
  return getOptionsForUnit(unit).filter((option) => !option.disabled)
}

function getSelectedOptionIndex(unit = activeUnit.value) {
  const options = getOptionsForUnit(unit)
  const selectedIndex = options.findIndex((option) => option.selected && !option.disabled)
  if (selectedIndex >= 0) return selectedIndex

  return options.findIndex((option) => !option.disabled)
}

function moveActiveOption(offset: number) {
  const options = getOptionsForUnit(activeUnit.value)
  const enabledOptions = getEnabledOptions()
  if (enabledOptions.length === 0) return

  const selectedIndex = getSelectedOptionIndex()
  const selectedOption = options[selectedIndex] ?? enabledOptions[0]
  const enabledIndex = enabledOptions.findIndex((option) => option.value === selectedOption.value)
  const nextIndex = (enabledIndex + offset + enabledOptions.length) % enabledOptions.length
  const nextOption = enabledOptions[nextIndex]

  if (nextOption) selectOption(activeUnit.value, nextOption.value)
}

function selectEdgeOption(last: boolean) {
  const enabledOptions = getEnabledOptions()
  const option = last ? enabledOptions[enabledOptions.length - 1] : enabledOptions[0]
  if (option) selectOption(activeUnit.value, option.value)
}

function selectCurrentOption() {
  const options = getOptionsForUnit(activeUnit.value)
  const option = options[getSelectedOptionIndex()] ?? getEnabledOptions()[0]
  if (option) selectOption(activeUnit.value, option.value)
}

function snapToStep(value: number, min: number, max: number, step: number) {
  const snappedValue = min + Math.floor((value - min) / step) * step
  return clampInteger(snappedValue, min, max)
}

function snapPartsToSteps(parts: TimePanelValueParts) {
  const [hourStep, minuteStep, secondStep, millisecondStep] = normalizedSteps.value
  const nextParts = cloneParts(parts)

  if (formatConfig.value.use12Hour) {
    nextParts.hour = to24Hour(
      snapToStep(getDisplayHour(nextParts.hour), 1, 12, hourStep),
      getMeridiem(nextParts.hour),
    )
  } else {
    nextParts.hour = snapToStep(nextParts.hour, 0, 23, hourStep)
  }

  nextParts.minute = snapToStep(nextParts.minute, 0, 59, minuteStep)
  nextParts.second = snapToStep(nextParts.second, 0, 59, secondStep)
  nextParts.millisecond = snapToStep(nextParts.millisecond, 0, 999, millisecondStep)

  return nextParts
}

function syncSelectedFromModel() {
  const parsedParts = parseTimeValue(props.modelValue, resolvedFormat.value)

  if (parsedParts) {
    selectedParts.value = parsedParts
    hasSelection.value = true
  } else {
    selectedParts.value = createDefaultParts()
    hasSelection.value = false
  }

  queueScrollActiveOption()
}

function setScrollAreaRef(unit: TimePanelUnit, instance: Element | ComponentPublicInstance | null) {
  if (!instance || instance instanceof Element) {
    scrollAreaRefs.delete(unit)
    return
  }

  const scrollArea = instance as ComponentPublicInstance & Partial<ScrollAreaExpose>
  if (typeof scrollArea.scrollToElement === 'function') {
    scrollAreaRefs.set(unit, scrollArea as ScrollAreaExpose)
  }
  queueScrollActiveOption()
}

function getOptionKey(unit: TimePanelUnit, value: number | TimePanelMeridiem) {
  return `${unit}-${value}`
}

function getOptionId(unit: TimePanelUnit, value: number | TimePanelMeridiem) {
  return `time-panel-option-${getOptionKey(unit, value)}`
}

function getActiveDescendant(column: TimePanelColumn) {
  const selectedOption = column.options.find((option) => option.selected && !option.disabled)
  return selectedOption ? getOptionId(column.unit, selectedOption.value) : undefined
}

function queueScrollActiveOption() {
  nextTick(() => {
    scrollActiveOptions()
  })
}

function scrollToActive(behavior: TimePanelScrollBehavior = 'smooth') {
  scrollActiveOptions(behavior)
}

function scrollActiveOptions(behavior: TimePanelScrollBehavior = 'smooth') {
  for (const column of visibleColumns.value) {
    const selectedOption = column.options.find((option) => option.selected && !option.disabled)
    if (!selectedOption) continue

    const element = rootRef.value?.querySelector<HTMLElement>(
      `[data-time-panel-option="${getOptionKey(column.unit, selectedOption.value)}"]`,
    )
    if (!element) continue

    scrollAreaRefs.get(column.unit)?.scrollToElement(element, {
      block: 'center',
      behavior,
    })
  }
}

defineExpose<TimePanelExpose>({
  focus: focusPanel,
  scrollToActive,
  getValue,
  getParts,
  setValue,
  setNow,
  clear: clearValue,
})

function getOptionClasses(option: TimePanelOption) {
  const classes: ClassValue[] = [
    'h-time-panel-option flex h-8 w-full cursor-pointer items-center justify-center rounded-[var(--round-default)] border-0 px-2 font-body-md tabular-nums transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-brand-focus focus-visible:outline-none',
  ]

  if (option.disabled) {
    classes.push('cursor-not-allowed bg-transparent text-[var(--text-color-disabled)]')
  } else if (option.selected) {
    classes.push('bg-brand text-[var(--text-color-inverse)] shadow-sm')
  } else {
    classes.push(
      'bg-transparent text-[var(--text-color-primary)] hover:bg-brand-light hover:text-brand',
    )
  }

  return cn(classes)
}
</script>
