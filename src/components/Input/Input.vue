<template>
  <div v-bind="rootAttrs" class="w-full">
    <div :class="wrapperClasses">
      <span :class="inputWrapperClasses">
        <!-- prefix icon -->
        <Icon v-if="prefixIcon" :name="prefixIcon" class="ml-[var(--padding-x-2)] shrink-0" />

        <!-- prefix slot -->
        <span v-if="$slots.prefix" class="ml-[var(--padding-x-2)] shrink-0">
          <slot name="prefix" />
        </span>

        <!-- core input -->
        <input
          ref="inputRef"
          v-bind="inputAttrs"
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
          :class="[
            'input-core h-full w-full min-w-0 border-none bg-transparent px-[var(--padding-x-3)] outline-none',
            showWordLimit && maxlength ? 'pr-14' : '',
          ]"
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
          class="input-clear mr-[var(--padding-x-2)] shrink-0 cursor-pointer text-[var(--text-color-secondary)] transition-colors duration-100 hover:text-[var(--text-color-primary)]"
          :class="showClear ? '' : 'invisible'"
          :aria-label="showClear ? '清空' : undefined"
          :disabled="!showClear"
          @click="handleClear"
        >
          <Icon name="close" />
        </button>

        <!-- password toggle -->
        <button
          v-if="type === 'password' && showPassword"
          type="button"
          class="input-password-toggle mr-[var(--padding-x-2)] shrink-0 cursor-pointer text-[var(--text-color-secondary)] transition-colors duration-100 hover:text-[var(--text-color-primary)]"
          :aria-label="passwordVisible ? '隐藏密码' : '显示密码'"
          @click="togglePassword"
        >
          <Icon :name="passwordVisible ? 'eye' : 'eye-off'" />
        </button>

        <!-- suffix icon -->
        <Icon v-if="suffixIcon" :name="suffixIcon" class="mr-[var(--padding-x-2)] shrink-0" />

        <!-- suffix slot -->
        <span v-if="$slots.suffix" class="mr-[var(--padding-x-2)] shrink-0">
          <slot name="suffix" />
        </span>

        <!-- word count: absolute positioned, outside flex layout -->
        <span
          v-if="showWordLimit && maxlength"
          class="font-body-sm pointer-events-none absolute top-1/2 right-[var(--padding-x-2)] -translate-y-1/2 text-[var(--text-color-secondary)] tabular-nums select-none"
        >
          {{ String(modelValue).length }} / {{ maxlength }}
        </span>
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, useAttrs } from 'vue'
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
const attrs = useAttrs()

const rootAttrs = computed(() => {
  const { class: className, style } = attrs
  return { class: className, style }
})

const inputAttrs = computed(() => {
  const { class: _class, style: _style, ...inputOnlyAttrs } = attrs
  return inputOnlyAttrs
})

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

const sizeMap: Record<InputSize, string> = {
  sm: 'h-[var(--comp-size-sm)] font-body-sm',
  md: 'h-[var(--comp-size-md)] font-body-md',
  lg: 'h-[var(--comp-size-lg)] font-body-lg',
}

// ---- classes ----

const wrapperClasses = computed(() =>
  cn(
    'inline-flex w-full items-stretch rounded-[var(--round-default)] align-middle',
    props.disabled && 'cursor-not-allowed',
  ),
)

const statusBorderMap: Record<InputStatus, string> = {
  error: 'border-error',
  warning: 'border-warning',
  success: 'border-success',
}

const statusShadowMap: Record<InputStatus, string> = {
  error: 'shadow-[0_0_0_2px_var(--color-error-focus)]',
  warning: 'shadow-[0_0_0_2px_var(--color-warning-focus)]',
  success: 'shadow-[0_0_0_2px_var(--color-success-focus)]',
}

const inputWrapperClasses = computed(() =>
  cn(
    'relative flex w-full flex-1 items-center rounded-[var(--round-default)] border bg-[var(--bg-color-container)] text-[var(--text-color-primary)] transition-colors duration-150',
    sizeMap[props.size],
    props.disabled &&
      'cursor-not-allowed border-[var(--border-color-component)] bg-[var(--bg-color-component-disabled)] text-[var(--text-color-disabled)]',
    props.readonly && 'cursor-pointer',
    props.status &&
      !props.disabled &&
      !props.readonly &&
      cn(statusBorderMap[props.status], isFocused.value && statusShadowMap[props.status]),
    !props.status &&
      !props.disabled &&
      isFocused.value &&
      'border-brand shadow-[0_0_0_2px_var(--color-brand-focus)]',
    !props.status &&
      !props.disabled &&
      !isFocused.value &&
      'border-[var(--border-color-component)] hover:border-brand',
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
  color: var(--text-color-placeholder);
}

.input-core:disabled {
  cursor: not-allowed;
  color: var(--text-color-disabled);
  -webkit-text-fill-color: var(--text-color-disabled);
  opacity: 1;
}

.input-clear,
.input-password-toggle {
  background: none;
  border: none;
  padding: 0;
  line-height: 0;
}
</style>
