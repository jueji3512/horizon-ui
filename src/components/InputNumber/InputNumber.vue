<template>
  <FieldGroup :class="wrapperClasses" :disabled="disabled">
    <Button
      variant="outline"
      shape="square"
      :size="size"
      icon="minus"
      aria-label="减少"
      class="shrink-0"
      :disabled="isMinReached || disabled || readonly || undefined"
      @mousedown.prevent="startStep(-1)"
      @mouseup="stopStep"
      @mouseleave="stopStep"
    />

    <FieldRoot
      :size="size"
      :disabled="disabled"
      :readonly="readonly"
      :focused="isFocused"
      :class="inputFieldClasses"
    >
      <FieldNativeInput
        :type="inputType"
        :inputmode="inputType === 'text' ? 'decimal' : undefined"
        :model-value="displayValue"
        :disabled="disabled"
        :readonly="readonly"
        :placeholder="placeholder || undefined"
        :name="name || undefined"
        :class="inputClasses"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
        @keydown="handleKeydown"
      />
    </FieldRoot>

    <Button
      variant="outline"
      shape="square"
      :size="size"
      icon="plus"
      aria-label="增加"
      class="shrink-0"
      :disabled="isMaxReached || disabled || readonly || undefined"
      @mousedown.prevent="startStep(1)"
      @mouseup="stopStep"
      @mouseleave="stopStep"
    />
  </FieldGroup>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import Button from '../Button/Button.vue'
import FieldGroup from '../Field/FieldGroup.vue'
import FieldNativeInput from '../Field/FieldNativeInput.vue'
import FieldRoot from '../Field/FieldRoot.vue'
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

const displayValue = ref(getDisplayValue(props.modelValue))
const isFocused = ref(false)
const focusStartValue = ref(props.modelValue)

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
  (val) => {
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
  syncValue(clamped)
}

function startStep(direction: number) {
  if (props.disabled || props.readonly) return
  doStep(direction)
  stepTimer.value = setInterval(() => doStep(direction), 120)
}

function stopStep() {
  if (stepTimer.value !== null) {
    clearInterval(stepTimer.value)
    stepTimer.value = null
  }
}

onBeforeUnmount(stopStep)

function handleKeydown(e: KeyboardEvent) {
  if (props.disabled || props.readonly) return
  if (e.key === 'ArrowUp') {
    e.preventDefault()
    const delta = e.shiftKey ? props.step * 10 : props.step
    const next = roundToPrecision(props.modelValue + delta)
    syncValue(clampAndRound(next))
  } else if (e.key === 'ArrowDown') {
    e.preventDefault()
    const delta = e.shiftKey ? props.step * 10 : props.step
    const next = roundToPrecision(props.modelValue - delta)
    syncValue(clampAndRound(next))
  }
}

function syncValue(value: number) {
  emit('update:modelValue', value)
  if (isFocused.value) displayValue.value = String(value)
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
  const nextTarget = e.relatedTarget as Node | null
  if (nextTarget && (e.currentTarget as HTMLElement).contains(nextTarget)) return
  isFocused.value = false
  let value = props.modelValue
  if (displayValue.value.trim() === '' || isNaN(parseFloat(displayValue.value))) {
    value = isFinite(props.min) ? props.min : 0
  }
  const corrected = clampAndRound(value)
  displayValue.value = getDisplayValue(corrected)
  emit('update:modelValue', corrected)
  if (corrected !== focusStartValue.value) {
    emit('change', corrected)
  }
  emit('blur', e)
}

function handleFocus(e: FocusEvent) {
  if (isFocused.value) return
  isFocused.value = true
  focusStartValue.value = props.modelValue
  displayValue.value = String(props.modelValue)
  emit('focus', e)
}

const isMinReached = computed(() => props.modelValue <= props.min)
const isMaxReached = computed(() => props.modelValue >= props.max)

type InputNumberGeometry = {
  field: string
  input: string
}

const inputNumberGeometryMap: Record<InputNumberSize, InputNumberGeometry> = {
  sm: {
    field: 'w-[72px] shrink-0',
    input: 'px-2',
  },
  md: {
    field: 'w-[88px] shrink-0',
    input: 'px-3',
  },
  lg: {
    field: 'w-[104px] shrink-0',
    input: 'px-3',
  },
}

const geometry = computed(() => inputNumberGeometryMap[props.size])

const wrapperClasses = computed(() =>
  cn('items-center gap-1', props.disabled && 'cursor-not-allowed'),
)

const alignMap: Record<InputNumberAlign, string> = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
}

const inputFieldClasses = computed(() => geometry.value.field)

const inputClasses = computed(() => cn(geometry.value.input, alignMap[props.align]))
</script>

<style scoped>
:deep(input[type='number']::-webkit-outer-spin-button),
:deep(input[type='number']::-webkit-inner-spin-button) {
  -webkit-appearance: none;
  margin: 0;
}

:deep(input[type='number']) {
  -moz-appearance: textfield;
}
</style>
