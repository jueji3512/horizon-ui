<template>
  <div v-bind="rootAttrs" class="w-full">
    <div :class="wrapperClasses">
      <FieldRoot
        :size="size"
        :status="status"
        :disabled="disabled"
        :readonly="readonly"
        :focused="isFocused"
      >
        <FieldPrefix v-if="prefixIcon || $slots.prefix" class="gap-1">
          <Icon v-if="prefixIcon" :name="prefixIcon" />
          <slot v-if="$slots.prefix" name="prefix" />
        </FieldPrefix>

        <FieldNativeInput
          ref="inputRef"
          v-bind="inputAttrs"
          :type="inputType"
          :model-value="modelValue"
          :placeholder="placeholder || undefined"
          :disabled="disabled"
          :readonly="readonly"
          :maxlength="maxlength"
          :name="name || undefined"
          :autofocus="autofocus"
          :autocomplete="autocomplete || undefined"
          :aria-label="ariaLabel || undefined"
          :class="showWordLimit && maxlength ? 'pr-14' : ''"
          @input="handleInput"
          @change="handleChange"
          @focus="handleFocus"
          @blur="handleBlur"
          @enter="handleEnter"
        />

        <FieldSuffix
          v-if="clearable || (type === 'password' && showPassword) || suffixIcon || $slots.suffix"
          class="gap-1"
        >
          <!-- clear trigger: always rendered when clearable to prevent layout shift -->
          <FieldAction
            v-if="clearable"
            :class="showClear ? '' : 'invisible'"
            :aria-label="showClear ? '清空' : undefined"
            :disabled="!showClear"
            @click="handleClear"
          >
            <Icon name="close" />
          </FieldAction>

          <FieldAction
            v-if="type === 'password' && showPassword"
            :aria-label="passwordVisible ? '隐藏密码' : '显示密码'"
            @click="togglePassword"
          >
            <Icon :name="passwordVisible ? 'eye' : 'eye-off'" />
          </FieldAction>

          <Icon v-if="suffixIcon" :name="suffixIcon" />
          <slot v-if="$slots.suffix" name="suffix" />
        </FieldSuffix>

        <!-- word count: absolute positioned, outside flex layout -->
        <span
          v-if="showWordLimit && maxlength"
          class="font-body-sm pointer-events-none absolute top-1/2 right-2 -translate-y-1/2 text-[var(--text-color-secondary)] tabular-nums select-none"
        >
          {{ String(modelValue).length }} / {{ maxlength }}
        </span>
      </FieldRoot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, useAttrs } from 'vue'
import FieldAction from '../Field/FieldAction.vue'
import FieldNativeInput from '../Field/FieldNativeInput.vue'
import FieldPrefix from '../Field/FieldPrefix.vue'
import FieldRoot from '../Field/FieldRoot.vue'
import FieldSuffix from '../Field/FieldSuffix.vue'
import Icon from '../Icon/Icon.vue'
import { cn } from '../../utils'

type InputSize = 'sm' | 'md' | 'lg'
type InputType = 'text' | 'password' | 'number'
type InputStatus = 'error' | 'warning' | 'success'
type FieldNativeInputExpose = { focus: () => void }

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

const inputRef = ref<FieldNativeInputExpose | null>(null)
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

// ---- classes ----

const wrapperClasses = computed(() =>
  cn(
    'inline-flex w-full items-stretch rounded-[var(--round-default)] align-middle',
    props.disabled && 'cursor-not-allowed',
  ),
)
</script>
