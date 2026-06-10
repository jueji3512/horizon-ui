<template>
  <form v-bind="formAttrs" :class="formClasses" @submit="handleSubmit">
    <slot />
  </form>
</template>

<script setup lang="ts">
import { computed, provide, useAttrs } from 'vue'
import { cn } from '../../utils'
import { formContextKey } from './context'
import type {
  FormItemRegistration,
  FormLabelAlign,
  FormModel,
  FormNamePath,
  FormRules,
  FormSize,
} from './types'

defineOptions({ inheritAttrs: false })

const props = withDefaults(
  defineProps<{
    model?: FormModel
    rules?: FormRules
    labelAlign?: FormLabelAlign
    labelWidth?: number | string
    size?: FormSize
    disabled?: boolean
    readonly?: boolean
    showStatusIcon?: boolean
  }>(),
  {
    model: undefined,
    rules: () => ({}),
    labelAlign: 'right',
    labelWidth: 120,
    size: 'md',
    disabled: false,
    readonly: false,
    showStatusIcon: true,
  },
)

const emit = defineEmits<{
  submit: [e: SubmitEvent]
}>()

const attrs = useAttrs()
const items = new Set<FormItemRegistration>()

const formAttrs = computed(() => {
  const { class: _class, ...rest } = attrs
  return rest
})

const formClasses = computed(() =>
  cn('horizon-form flex flex-col gap-0', attrs.class as Parameters<typeof cn>[number]),
)

function registerItem(item: FormItemRegistration) {
  items.add(item)
}

function unregisterItem(item: FormItemRegistration) {
  items.delete(item)
}

function getTargetItemsByName(name: FormNamePath) {
  return [...items].filter((item) => item.matchesName(name))
}

function getTargetItemsByNames(names?: FormNamePath[]) {
  if (names === undefined) return [...items]
  return [...items].filter((item) => names.some((name) => item.matchesName(name)))
}

async function validate() {
  const results = await Promise.all([...items].map((item) => item.validate()))
  return results.every(Boolean)
}

async function validateField(name: FormNamePath) {
  const targets = getTargetItemsByName(name)
  const results = await Promise.all(targets.map((item) => item.validate()))
  return results.every(Boolean)
}

async function validateFields(names?: FormNamePath[]) {
  const targets = getTargetItemsByNames(names)
  const results = await Promise.all(targets.map((item) => item.validate()))
  return results.every(Boolean)
}

function resetField(name: FormNamePath) {
  getTargetItemsByName(name).forEach((item) => item.resetField())
}

function resetFields(names?: FormNamePath[]) {
  getTargetItemsByNames(names).forEach((item) => item.resetField())
}

function clearValidateField(name: FormNamePath) {
  getTargetItemsByName(name).forEach((item) => item.clearValidate())
}

function clearValidate(names?: FormNamePath[]) {
  getTargetItemsByNames(names).forEach((item) => item.clearValidate())
}

function handleSubmit(e: SubmitEvent) {
  emit('submit', e)
}

provide(formContextKey, {
  model: computed(() => props.model),
  rules: computed(() => props.rules),
  labelAlign: computed(() => props.labelAlign),
  labelWidth: computed(() => props.labelWidth),
  size: computed(() => props.size),
  disabled: computed(() => props.disabled),
  readonly: computed(() => props.readonly),
  showStatusIcon: computed(() => props.showStatusIcon),
  registerItem,
  unregisterItem,
})

defineExpose({
  validate,
  validateField,
  validateFields,
  resetField,
  resetFields,
  clearValidateField,
  clearValidate,
})
</script>
