<template>
  <input
    ref="inputRef"
    v-bind="$attrs"
    :type="type"
    :value="modelValue"
    :placeholder="placeholder || undefined"
    :disabled="effectiveDisabled || undefined"
    :readonly="effectiveReadonly || undefined"
    :maxlength="maxlength"
    :name="name || undefined"
    :autofocus="autofocus || undefined"
    :autocomplete="autocomplete || undefined"
    :aria-label="ariaLabel || undefined"
    :class="inputClasses"
    @input="handleInput"
    @change="handleChange"
    @focus="handleFocus"
    @blur="handleBlur"
    @keydown="handleKeydown"
  />
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { cn } from '../../utils'
import { useFieldContext } from './context'

defineOptions({ inheritAttrs: false })

const props = withDefaults(
  defineProps<{
    modelValue?: string | number
    type?: string
    placeholder?: string
    disabled?: boolean
    readonly?: boolean
    maxlength?: number
    name?: string
    autofocus?: boolean
    autocomplete?: string
    ariaLabel?: string
  }>(),
  {
    modelValue: '',
    type: 'text',
    placeholder: '',
    disabled: false,
    readonly: false,
    maxlength: undefined,
    name: '',
    autofocus: false,
    autocomplete: '',
    ariaLabel: '',
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: string]
  input: [e: Event]
  change: [e: Event]
  focus: [e: FocusEvent]
  blur: [e: FocusEvent]
  keydown: [e: KeyboardEvent]
  enter: [e: KeyboardEvent]
}>()

const field = useFieldContext()
const inputRef = ref<HTMLInputElement | null>(null)

const effectiveDisabled = computed(() => props.disabled || Boolean(field?.disabled.value))
const effectiveReadonly = computed(() => props.readonly || Boolean(field?.readonly.value))

const inputClasses = computed(() =>
  cn('field-native-input h-full w-full min-w-0 border-none bg-transparent px-3 outline-none'),
)

function handleInput(e: Event) {
  const target = e.target as HTMLInputElement
  emit('update:modelValue', target.value)
  emit('input', e)
}

function handleChange(e: Event) {
  emit('change', e)
}

function handleFocus(e: FocusEvent) {
  emit('focus', e)
}

function handleBlur(e: FocusEvent) {
  emit('blur', e)
}

function handleKeydown(e: KeyboardEvent) {
  emit('keydown', e)
  if (e.key === 'Enter') emit('enter', e)
}

function focus() {
  inputRef.value?.focus()
}

function blur() {
  inputRef.value?.blur()
}

function select() {
  inputRef.value?.select()
}

defineExpose({ inputRef, focus, blur, select })
</script>

<style scoped>
.field-native-input {
  color: inherit;
  font-size: inherit;
  line-height: inherit;
}

.field-native-input::placeholder {
  color: var(--text-color-placeholder);
}

.field-native-input:disabled {
  cursor: not-allowed;
  color: var(--text-color-disabled);
  -webkit-text-fill-color: var(--text-color-disabled);
  opacity: 1;
}
</style>
