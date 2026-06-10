import { computed, getCurrentInstance, inject, type ComputedRef, type InjectionKey } from 'vue'
import type {
  FormItemRegistration,
  FormLabelAlign,
  FormModel,
  FormNamePath,
  FormRules,
  FormSize,
  FormStatus,
  FormValidateTrigger,
} from './types'

export interface FormContext {
  model: ComputedRef<FormModel | undefined>
  rules: ComputedRef<FormRules>
  labelAlign: ComputedRef<FormLabelAlign>
  labelWidth: ComputedRef<number | string>
  size: ComputedRef<FormSize>
  disabled: ComputedRef<boolean>
  readonly: ComputedRef<boolean>
  showStatusIcon: ComputedRef<boolean>
  registerItem: (item: FormItemRegistration) => void
  unregisterItem: (item: FormItemRegistration) => void
}

export interface FormItemContext {
  name: ComputedRef<FormNamePath | undefined>
  controlId: ComputedRef<string>
  messageId: ComputedRef<string>
  size: ComputedRef<FormSize>
  status: ComputedRef<FormStatus | undefined>
  disabled: ComputedRef<boolean>
  readonly: ComputedRef<boolean>
  validate: (trigger?: FormValidateTrigger) => Promise<boolean>
  clearValidate: () => void
}

export interface FormControlProps {
  size?: FormSize
  status?: FormStatus
  disabled?: boolean
  readonly?: boolean
}

export const formContextKey: InjectionKey<FormContext> = Symbol('formContext')
export const formItemContextKey: InjectionKey<FormItemContext> = Symbol('formItemContext')

export function useFormContext(): FormContext | null {
  return inject(formContextKey, null)
}

export function useFormItemContext(): FormItemContext | null {
  return inject(formItemContextKey, null)
}

function toKebabCase(value: string) {
  return value.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`)
}

export function useFormControl(props: FormControlProps) {
  const formItem = useFormItemContext()
  const instance = getCurrentInstance()

  function hasProp(name: keyof FormControlProps) {
    const rawProps = instance?.vnode.props ?? {}
    const kebabName = toKebabCase(String(name))
    return Object.prototype.hasOwnProperty.call(rawProps, name) || kebabName in rawProps
  }

  const effectiveSize = computed<FormSize>(() => {
    if (hasProp('size') && props.size) return props.size
    return formItem?.size.value ?? props.size ?? 'md'
  })

  const effectiveStatus = computed<FormStatus | undefined>(() => {
    if (hasProp('status')) return props.status
    return formItem?.status.value ?? props.status
  })

  const effectiveDisabled = computed(() => {
    if (hasProp('disabled')) return Boolean(props.disabled)
    return formItem?.disabled.value ?? Boolean(props.disabled)
  })

  const effectiveReadonly = computed(() => {
    if (hasProp('readonly')) return Boolean(props.readonly)
    return formItem?.readonly.value ?? Boolean(props.readonly)
  })

  const controlAttrs = computed(() => {
    if (!formItem) return {}

    return {
      id: formItem.controlId.value,
      'aria-invalid': effectiveStatus.value === 'error' || undefined,
      'aria-describedby': formItem.messageId.value,
    }
  })

  function notifyControlChange() {
    void formItem?.validate('change')
  }

  function notifyControlBlur() {
    void formItem?.validate('blur')
  }

  return {
    formItem,
    controlAttrs,
    effectiveSize,
    effectiveStatus,
    effectiveDisabled,
    effectiveReadonly,
    notifyControlChange,
    notifyControlBlur,
  }
}
