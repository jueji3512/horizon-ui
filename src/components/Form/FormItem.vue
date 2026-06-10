<template>
  <div v-bind="itemAttrs" :class="itemClasses" :style="itemStyle">
    <div :class="labelCellClasses">
      <FormItemLabel
        :control-id="controlId"
        :label="label"
        :required="required"
        :tip="resolvedTip"
        :disabled="mergedDisabled"
      >
        <template v-if="$slots.label" #label>
          <slot name="label" />
        </template>
        <template v-if="$slots.tip" #tip>
          <slot name="tip" />
        </template>
      </FormItemLabel>
    </div>

    <div :class="controlCellClasses">
      <div :class="controlFieldClasses">
        <slot />
      </div>

      <FormItemMessage
        :id="messageId"
        :status="mergedStatus"
        :message="displayMessage"
        :help="help"
        :validate-message="validateMessage"
      >
        <template #default="slotProps">
          <slot name="message" v-bind="slotProps">
            {{ displayMessage }}
          </slot>
        </template>
      </FormItemMessage>
    </div>

    <div v-if="hasActionArea" :class="actionCellClasses">
      <Icon v-if="showStatusIcon && statusIcon" :name="statusIcon" :class="statusIconClasses" />
      <slot name="action" :status="mergedStatus" :message="displayMessage" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, provide, ref, useAttrs, useId, useSlots } from 'vue'
import Icon from '../Icon/Icon.vue'
import { cn } from '../../utils'
import { formItemContextKey, useFormContext } from './context'
import FormItemLabel from './FormItemLabel.vue'
import FormItemMessage from './FormItemMessage.vue'
import type {
  FormLabelAlign,
  FormNamePath,
  FormRule,
  FormStatus,
  FormValidateTrigger,
} from './types'
import {
  cloneFormValue,
  getNameKey,
  getValueByNamePath,
  normalizeRules,
  setValueByNamePath,
  validateRules,
} from './validator'

defineOptions({ inheritAttrs: false })

const props = withDefaults(
  defineProps<{
    name?: FormNamePath
    label?: string
    required?: boolean
    rules?: FormRule | FormRule[]
    help?: string
    message?: string
    status?: FormStatus
    tip?: string
    labelAlign?: FormLabelAlign
    labelWidth?: number | string
    showStatusIcon?: boolean
  }>(),
  {
    name: undefined,
    label: '',
    required: false,
    rules: undefined,
    help: '',
    message: '',
    status: undefined,
    tip: '',
    labelAlign: undefined,
    labelWidth: undefined,
    showStatusIcon: undefined,
  },
)

const attrs = useAttrs()
const slots = useSlots()
const form = useFormContext()
const rawId = useId()
const validateStatus = ref<FormStatus | undefined>()
const validateMessage = ref('')
let initialValue: unknown

const controlId = computed(() => `${rawId}-control`)
const messageId = computed(() => `${rawId}-message`)
const mergedLabelAlign = computed(() => props.labelAlign ?? form?.labelAlign.value ?? 'right')
const mergedLabelWidth = computed(() => props.labelWidth ?? form?.labelWidth.value ?? 120)
const mergedSize = computed(() => form?.size.value ?? 'md')
const mergedDisabled = computed(() => form?.disabled.value ?? false)
const mergedReadonly = computed(() => form?.readonly.value ?? false)
const showStatusIcon = computed(() => props.showStatusIcon ?? form?.showStatusIcon.value ?? true)
const mergedStatus = computed(() => props.status ?? validateStatus.value)
const displayMessage = computed(() => props.message || validateMessage.value)
const resolvedTip = computed(() => props.tip || props.help)
const hasActionArea = computed(() => showStatusIcon.value || Boolean(slots.action))
let validationSeq = 0

const itemAttrs = computed(() => {
  const { class: _class, style: _style, ...rest } = attrs
  return rest
})

function toCssLength(value: number | string) {
  return typeof value === 'number' ? `${value}px` : value
}

const actionColumnWidth = '20px'

const itemStyle = computed(() => {
  const style = attrs.style
  const actionColumn = hasActionArea.value ? ` ${actionColumnWidth}` : ''
  const base = {
    gridTemplateColumns:
      mergedLabelAlign.value === 'top'
        ? `minmax(0, 1fr)${actionColumn}`
        : `${toCssLength(mergedLabelWidth.value)} minmax(0, 1fr)${actionColumn}`,
  }

  if (typeof style === 'object' && style !== null) return { ...base, ...style }
  if (typeof style === 'string') return [base, style]
  return base
})

const itemClasses = computed(() =>
  cn(
    'horizon-form-item mb-6 grid w-full items-start gap-x-3',
    mergedLabelAlign.value === 'top' && 'gap-y-1',
    attrs.class as Parameters<typeof cn>[number],
  ),
)

const itemHeightMap = {
  sm: 'min-h-[var(--comp-size-sm)]',
  md: 'min-h-[var(--comp-size-md)]',
  lg: 'min-h-[var(--comp-size-lg)]',
} as const

const labelCellClasses = computed(() =>
  cn(
    'flex min-w-0 items-center',
    itemHeightMap[mergedSize.value],
    mergedLabelAlign.value === 'top' && 'col-span-full',
    mergedLabelAlign.value === 'right' && 'justify-end text-right',
    (mergedLabelAlign.value === 'left' || mergedLabelAlign.value === 'top') &&
      'justify-start text-left',
  ),
)

const controlCellClasses = computed(() => cn('form-item-control relative min-w-0'))

const controlFieldClasses = computed(() =>
  cn('form-item-control-field flex min-w-0 items-center', itemHeightMap[mergedSize.value]),
)

const actionCellClasses = computed(() =>
  cn(
    'form-item-action flex w-5 min-w-5 items-center gap-2 overflow-visible whitespace-nowrap',
    itemHeightMap[mergedSize.value],
  ),
)

const statusIcon = computed(() => {
  if (mergedStatus.value === 'success') return 'circle-check'
  if (mergedStatus.value === 'warning') return 'circle-alert'
  if (mergedStatus.value === 'error') return 'circle-close'
  return ''
})

const statusIconClasses = computed(() =>
  cn(
    'h-5 w-5 shrink-0 text-xl',
    mergedStatus.value === 'success' && 'text-success',
    mergedStatus.value === 'warning' && 'text-warning',
    mergedStatus.value === 'error' && 'text-error',
  ),
)

const mergedRules = computed(() => {
  const rules: FormRule[] = []

  if (props.required) {
    rules.push({
      required: true,
      message: props.message || `${props.label || 'This field'} is required.`,
    })
  }

  if (props.name && form?.rules.value) {
    rules.push(...normalizeRules(form.rules.value[getNameKey(props.name)]))
  }

  rules.push(...normalizeRules(props.rules))
  return rules
})

async function validate(trigger?: FormValidateTrigger) {
  const seq = ++validationSeq

  if (mergedRules.value.length === 0) {
    validateStatus.value = undefined
    validateMessage.value = ''
    return true
  }

  const result = await validateRules({
    value: getValueByNamePath(form?.model.value, props.name),
    model: form?.model.value ?? {},
    rules: mergedRules.value,
    label: props.label,
    trigger,
  })

  if (seq !== validationSeq) return result.valid

  validateStatus.value = result.valid ? undefined : 'error'
  validateMessage.value = result.message
  return result.valid
}

function clearValidate() {
  validationSeq += 1
  validateStatus.value = undefined
  validateMessage.value = ''
}

function resetField() {
  setValueByNamePath(form?.model.value, props.name, cloneFormValue(initialValue))
  clearValidate()
}

function matchesName(name: FormNamePath) {
  return Boolean(props.name && getNameKey(props.name) === getNameKey(name))
}

const registration = {
  validate,
  resetField,
  clearValidate,
  matchesName,
}

onMounted(() => {
  initialValue = cloneFormValue(getValueByNamePath(form?.model.value, props.name))
  form?.registerItem(registration)
})

onBeforeUnmount(() => {
  form?.unregisterItem(registration)
})

provide(formItemContextKey, {
  name: computed(() => props.name),
  controlId,
  messageId,
  size: mergedSize,
  status: mergedStatus,
  disabled: mergedDisabled,
  readonly: mergedReadonly,
  validate,
  clearValidate,
})

defineExpose({
  validate,
  resetField,
  clearValidate,
})
</script>
