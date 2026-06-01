<template>
  <div :class="wrapperClasses">
    <button
      type="button"
      :class="decreaseBtnClasses"
      :disabled="isMinReached || disabled || undefined"
      @mousedown.prevent="startStep(-1)"
      @mouseup="stopStep"
      @mouseleave="stopStep"
    >
      <Icon name="minus" />
    </button>

    <input
      ref="inputRef"
      :type="inputType"
      :inputmode="inputType === 'text' ? 'decimal' : undefined"
      :value="displayValue"
      :disabled="disabled"
      :readonly="readonly"
      :placeholder="placeholder || undefined"
      :name="name || undefined"
      :class="inputClasses"
      @input="handleInput"
      @blur="handleBlur"
      @focus="handleFocus"
      @keydown="handleKeydown"
    />

    <button
      type="button"
      :class="increaseBtnClasses"
      :disabled="isMaxReached || disabled || undefined"
      @mousedown.prevent="startStep(1)"
      @mouseup="stopStep"
      @mouseleave="stopStep"
    >
      <Icon name="plus" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import Icon from '../Icon/Icon.vue'
import { cn } from '../../utils'

type InputNumberSize = 'sm' | 'md' | 'lg'
type InputNumberAlign = 'left' | 'center' | 'right'

const props = withDefaults(
  defineProps<{
    modelValue?: number
    min?: number
    max?: number
    step?: number
    stepStrictly?: boolean
    precision?: number
    disabled?: boolean
    readonly?: boolean
    size?: InputNumberSize
    align?: InputNumberAlign
    format?: (value: number) => string
    placeholder?: string
    name?: string
  }>(),
  {
    modelValue: 0,
    min: -Infinity,
    max: Infinity,
    step: 1,
    stepStrictly: false,
    precision: 0,
    disabled: false,
    readonly: false,
    size: 'md',
    align: 'center',
    format: undefined,
    placeholder: '',
    name: '',
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: number]
  change: [value: number]
  focus: [e: FocusEvent]
  blur: [e: FocusEvent]
}>()

const inputRef = ref<HTMLInputElement | null>(null)
const displayValue = ref(getDisplayValue(props.modelValue))
const isFocused = ref(false)

function formatValue(val: number): string {
  if (!isFinite(val)) return '0'
  return Number(val.toFixed(props.precision)).toString()
}

function getDisplayValue(val: number): string {
  if (props.format) return props.format(val)
  return formatValue(val)
}

const inputType = computed(() => (props.format ? 'text' : 'number'))

watch(
  () => props.modelValue,
  val => {
    if (!isFocused.value) {
      displayValue.value = getDisplayValue(val)
    }
  },
)

function roundToPrecision(val: number): number {
  return Number(val.toFixed(props.precision))
}

function applyStepStrictly(val: number): number {
  if (!props.stepStrictly) return val
  return Math.round(val / props.step) * props.step
}

function clampAndRound(val: number): number {
  let result = val
  if (result < props.min) result = props.min
  if (result > props.max) result = props.max
  result = applyStepStrictly(result)
  result = roundToPrecision(result)
  return result
}

const stepTimer = ref<ReturnType<typeof setInterval> | null>(null)

function doStep(direction: number) {
  const delta = props.step * direction
  const next = roundToPrecision(props.modelValue + delta)
  const clamped = clampAndRound(next)
  emit('update:modelValue', clamped)
}

function startStep(direction: number) {
  if (props.disabled) return
  doStep(direction)
  stepTimer.value = setInterval(() => doStep(direction), 120)
}

function stopStep() {
  if (stepTimer.value !== null) {
    clearInterval(stepTimer.value)
    stepTimer.value = null
  }
}

function handleKeydown(e: KeyboardEvent) {
  if (props.disabled || props.readonly) return
  if (e.key === 'ArrowUp') {
    e.preventDefault()
    const delta = e.shiftKey ? props.step * 10 : props.step
    const next = roundToPrecision(props.modelValue + delta)
    emit('update:modelValue', clampAndRound(next))
  } else if (e.key === 'ArrowDown') {
    e.preventDefault()
    const delta = e.shiftKey ? props.step * 10 : props.step
    const next = roundToPrecision(props.modelValue - delta)
    emit('update:modelValue', clampAndRound(next))
  }
}

function handleInput(e: Event) {
  const target = e.target as HTMLInputElement
  const raw = target.value
  displayValue.value = raw
  const parsed = parseFloat(raw)
  if (!isNaN(parsed)) {
    emit('update:modelValue', parsed)
  }
}

function handleBlur(e: FocusEvent) {
  isFocused.value = false
  let value = props.modelValue
  if (displayValue.value.trim() === '' || isNaN(parseFloat(displayValue.value))) {
    value = isFinite(props.min) ? props.min : 0
  }
  const corrected = clampAndRound(value)
  displayValue.value = getDisplayValue(corrected)
  emit('update:modelValue', corrected)
  emit('change', corrected)
  emit('blur', e)
}

function handleFocus(e: FocusEvent) {
  isFocused.value = true
  displayValue.value = String(props.modelValue)
  emit('focus', e)
}

const isMinReached = computed(() => props.modelValue <= props.min)
const isMaxReached = computed(() => props.modelValue >= props.max)

type SizeConfig = { wrapper: string; btn: string; input: string }

const sizeMap: Record<InputNumberSize, SizeConfig> = {
  sm: {
    wrapper: 'h-[var(--comp-size-sm)] font-body-sm',
    btn: 'h-[var(--comp-size-sm)] w-[var(--comp-size-sm)] rounded-[var(--round-default)]',
    input: 'w-[72px] h-[var(--comp-size-sm)] px-2 rounded-[var(--round-default)]',
  },
  md: {
    wrapper: 'h-[var(--comp-size-md)] font-body-md',
    btn: 'h-[var(--comp-size-md)] w-[var(--comp-size-md)] rounded-[var(--round-default)]',
    input: 'w-[88px] h-[var(--comp-size-md)] px-3 rounded-[var(--round-default)]',
  },
  lg: {
    wrapper: 'h-[var(--comp-size-lg)] font-body-lg',
    btn: 'h-[var(--comp-size-lg)] w-[var(--comp-size-lg)] rounded-[var(--round-default)]',
    input: 'w-[104px] h-[var(--comp-size-lg)] px-3 rounded-[var(--round-default)]',
  },
}

const sizeCfg = computed(() => sizeMap[props.size])

const wrapperClasses = computed(() =>
  cn('inline-flex items-center gap-1', props.disabled && 'cursor-not-allowed'),
)

const baseBorder = 'border border-[var(--border-color-component)] bg-[var(--bg-color-container)]'

const btnBaseClasses = computed(() =>
  cn(
    sizeCfg.value.btn,
    baseBorder,
    'inline-flex items-center justify-center shrink-0',
    'text-[var(--text-color-primary)] hover:bg-[var(--bg-color-container-hover)] active:bg-[var(--bg-color-container-active)]',
    'transition-colors duration-150',
    'cursor-pointer',
    'outline-none',
  ),
)

const btnDisabledClasses =
  'bg-[var(--bg-color-component-disabled)] text-[var(--text-color-disabled)] border-[var(--border-color-component)] cursor-not-allowed hover:bg-[var(--bg-color-component-disabled)] active:bg-[var(--bg-color-component-disabled)]'

const decreaseBtnClasses = computed(() =>
  cn(btnBaseClasses.value, (isMinReached.value || props.disabled) && btnDisabledClasses),
)

const increaseBtnClasses = computed(() =>
  cn(btnBaseClasses.value, (isMaxReached.value || props.disabled) && btnDisabledClasses),
)

const alignMap: Record<InputNumberAlign, string> = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
}

const inputClasses = computed(() =>
  cn(
    sizeCfg.value.input,
    baseBorder,
    'text-[var(--text-color-primary)] outline-none',
    'transition-colors duration-150',
    'focus:border-brand',
    alignMap[props.align],
    props.disabled &&
      'bg-[var(--bg-color-component-disabled)] text-[var(--text-color-disabled)] border-[var(--border-color-component)] cursor-not-allowed',
  ),
)
</script>

<style scoped>
input[type='number']::-webkit-outer-spin-button,
input[type='number']::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type='number'] {
  -moz-appearance: textfield;
}

input:disabled {
  cursor: not-allowed;
  color: var(--text-color-disabled);
  -webkit-text-fill-color: var(--text-color-disabled);
  opacity: 1;
}
</style>
