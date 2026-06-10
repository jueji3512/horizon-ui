export type FormSize = 'sm' | 'md' | 'lg'
export type FormStatus = 'error' | 'warning' | 'success'
export type FormLabelAlign = 'left' | 'right' | 'top'
export type FormNamePath = string | Array<string | number>
export type FormValidateTrigger = 'change' | 'blur'
export type FormRuleTrigger = FormValidateTrigger | FormValidateTrigger[]
export type FormModel = Record<string, unknown>

export type FormValidatorResult =
  | void
  | boolean
  | string
  | Error
  | Promise<void | boolean | string | Error>

export interface FormRule {
  required?: boolean
  message?: string
  trigger?: FormRuleTrigger
  validator?: (value: unknown, model: FormModel) => FormValidatorResult
}

export type FormRules = Record<string, FormRule | FormRule[]>

export interface FormValidateError {
  name: FormNamePath
  message: string
}

export interface FormItemRegistration {
  validate: (trigger?: FormValidateTrigger) => Promise<boolean>
  resetField: () => void
  clearValidate: () => void
  matchesName: (name: FormNamePath) => boolean
}
