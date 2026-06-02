<template>
  <input
    ref="inputRef"
    v-bind="inputAttrs"
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
    @keydown="handleKeydown"
  />
</template>

<script setup lang="ts">
import { computed, ref, useAttrs } from 'vue'
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
  enter: [e: KeyboardEvent]
}>()

const field = useFieldContext()
const attrs = useAttrs()
const inputRef = ref<HTMLInputElement | null>(null)

const effectiveDisabled = computed(() => props.disabled || Boolean(field?.disabled.value))
const effectiveReadonly = computed(() => props.readonly || Boolean(field?.readonly.value))

const inputAttrs = computed(() => {
  const { class: _class, ...rest } = attrs
  return rest
})

const inputClasses = computed(() =>
  cn(
    'field-native-input h-full w-full min-w-0 border-none bg-transparent px-3 outline-none',
    attrs.class as Parameters<typeof cn>[number],
  ),
)

function handleInput(e: Event) {
  const target = e.target as HTMLInputElement
  emit('update:modelValue', target.value)
}

function handleKeydown(e: KeyboardEvent) {
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
