<template>
  <div>
    <div :class="wrapperClasses">
      <span :class="inputWrapperClasses">
      <!-- prefix icon -->
      <Icon v-if="prefixIcon" :name="prefixIcon" :size="iconSizeValue" class="ml-2 shrink-0" />

      <!-- prefix slot -->
      <span v-if="$slots.prefix" class="ml-2 shrink-0">
        <slot name="prefix" />
      </span>

      <!-- core input -->
      <input
        ref="inputRef"
        v-bind="$attrs"
        :type="inputType"
        :value="modelValue"
        :placeholder="placeholder || undefined"
        :disabled="disabled"
        :readonly="readonly"
        :maxlength="maxlength"
        :name="name || undefined"
        :autofocus="autofocus"
        :autocomplete="autocomplete || undefined"
        :aria-label="ariaLabel || undefined"
        :class="['input-core w-full h-full bg-transparent border-none outline-none px-3 min-w-0', showWordLimit && maxlength ? 'pr-14' : '']"
        @input="handleInput"
        @change="handleChange"
        @focus="handleFocus"
        @blur="handleBlur"
        @keydown.enter="handleEnter"
      />

      <!-- clear trigger: always rendered when clearable to prevent layout shift -->
      <button
        v-if="clearable"
        type="button"
        class="input-clear mr-2 shrink-0 cursor-pointer text-neutral-muted hover:text-neutral-text transition-colors duration-100"
        :class="showClear ? '' : 'invisible'"
        :aria-label="showClear ? '清空' : undefined"
        :disabled="!showClear"
        @click="handleClear"
      >
        <Icon name="close" :size="iconSizeValue" />
      </button>

      <!-- password toggle -->
      <button
        v-if="type === 'password' && showPassword"
        type="button"
        class="input-password-toggle mr-2 shrink-0 cursor-pointer text-neutral-muted hover:text-neutral-text transition-colors duration-100"
        :aria-label="passwordVisible ? '隐藏密码' : '显示密码'"
        @click="togglePassword"
      >
        <Icon :name="passwordVisible ? 'eye' : 'eye-off'" :size="iconSizeValue" />
      </button>

      <!-- suffix icon -->
      <Icon v-if="suffixIcon" :name="suffixIcon" :size="iconSizeValue" class="mr-2 shrink-0" />

      <!-- suffix slot -->
      <span v-if="$slots.suffix" class="mr-2 shrink-0">
        <slot name="suffix" />
      </span>

      <!-- word count: absolute positioned, outside flex layout -->
      <span v-if="showWordLimit && maxlength" class="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-neutral-muted tabular-nums select-none pointer-events-none">
        {{ String(modelValue).length }} / {{ maxlength }}
      </span>
    </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import Icon from '../Icon/Icon.vue'
import { cn } from '../../utils'

type InputSize = 'sm' | 'md' | 'lg'
type InputType = 'text' | 'password' | 'number'
type InputStatus = 'error' | 'warning' | 'success'

defineOptions({ inheritAttrs: false })

const props = withDefaults(
  defineProps<{
    modelValue?: string | number
    type?: InputType
    size?: InputSize
    placeholder?: string
    disabled?: boolean
    readonly?: boolean
    status?: InputStatus
    clearable?: boolean
    showPassword?: boolean
    prefixIcon?: string
    suffixIcon?: string
    maxlength?: number
    showWordLimit?: boolean
    name?: string
    autofocus?: boolean
    autocomplete?: string
    ariaLabel?: string
  }>(),
  {
    modelValue: '',
    type: 'text',
    size: 'md',
    placeholder: '',
    disabled: false,
    readonly: false,
    status: undefined,
    clearable: false,
    showPassword: false,
    prefixIcon: '',
    suffixIcon: '',
    maxlength: undefined,
    showWordLimit: false,
    name: '',
    autofocus: false,
    autocomplete: '',
    ariaLabel: '',
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
  input: [value: string | number, e: Event]
  change: [value: string | number, e: Event]
  focus: [e: FocusEvent]
  blur: [e: FocusEvent]
  clear: []
  enter: [e: KeyboardEvent]
}>()

const inputRef = ref<HTMLInputElement | null>(null)
const passwordVisible = ref(false)
const isFocused = ref(false)

const showClear = computed(() => {
  if (!props.clearable || props.disabled || props.readonly) return false
  return String(props.modelValue).length > 0
})

const inputType = computed(() => {
  if (props.type === 'password' && props.showPassword && passwordVisible.value) return 'text'
  return props.type
})

function handleInput(e: Event) {
  const target = e.target as HTMLInputElement
  emit('update:modelValue', target.value)
  emit('input', target.value, e)
}

function handleChange(e: Event) {
  const target = e.target as HTMLInputElement
  emit('change', target.value, e)
}

function handleFocus(e: FocusEvent) {
  isFocused.value = true
  emit('focus', e)
}

function handleBlur(e: FocusEvent) {
  isFocused.value = false
  emit('blur', e)
}

function handleEnter(e: KeyboardEvent) {
  emit('enter', e)
}

function handleClear() {
  emit('update:modelValue', '')
  emit('input', '', new Event('input'))
  emit('clear')
  inputRef.value?.focus()
}

function togglePassword() {
  passwordVisible.value = !passwordVisible.value
  inputRef.value?.focus()
}

// ---- sizes ----

const sizeMap: Record<InputSize, { wrapper: string; iconSize: number }> = {
  sm: { wrapper: 'h-6 text-xs', iconSize: 12 },
  md: { wrapper: 'h-8 text-sm', iconSize: 14 },
  lg: { wrapper: 'h-10 text-base', iconSize: 16 },
}

const iconSizeValue = computed(() => sizeMap[props.size].iconSize)

// ---- classes ----

const wrapperClasses = computed(() =>
  cn(
    'inline-flex items-stretch rounded align-middle',
    props.disabled && 'cursor-not-allowed',
  ),
)

const statusBorderMap: Record<InputStatus, string> = {
  error: 'border-danger',
  warning: 'border-warning',
  success: 'border-success',
}

const inputWrapperClasses = computed(() =>
  cn(
    'relative flex items-center flex-1 rounded border transition-colors duration-150 bg-white w-full max-w-full',
    sizeMap[props.size].wrapper,
    props.disabled && 'bg-neutral-subtle border-neutral-border cursor-not-allowed opacity-60',
    props.readonly && 'cursor-pointer',
    props.status && !props.disabled && !props.readonly && statusBorderMap[props.status],
    !props.status && !props.disabled && isFocused.value && 'border-primary',
    !props.status && !props.disabled && !isFocused.value && 'border-neutral-border hover:border-neutral-muted',
  ),
)
</script>

<style scoped>
/* Only what Tailwind can't express */

.input-core {
  color: inherit;
  font-size: inherit;
  line-height: inherit;
}

.input-core::placeholder {
  color: var(--color-neutral-muted);
}

.input-core:disabled {
  cursor: not-allowed;
}

.input-clear,
.input-password-toggle {
  background: none;
  border: none;
  padding: 0;
  line-height: 0;
}
</style>
