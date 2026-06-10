import type {
  FormModel,
  FormNamePath,
  FormRule,
  FormValidateTrigger,
  FormValidatorResult,
} from './types'

export interface ValidateRulesOptions {
  value: unknown
  model: FormModel
  rules: FormRule[]
  label?: string
  trigger?: FormValidateTrigger
}

export interface ValidateRulesResult {
  valid: boolean
  message: string
}

export function normalizeNamePath(name: FormNamePath) {
  return Array.isArray(name) ? name : name.split('.').filter(Boolean)
}

export function getNameKey(name: FormNamePath) {
  return normalizeNamePath(name).join('.')
}

export function getValueByNamePath(model: FormModel | undefined, name: FormNamePath | undefined) {
  if (!name || !model) return undefined

  return normalizeNamePath(name).reduce<unknown>((target, key) => {
    if (target === null || typeof target !== 'object') return undefined
    return (target as Record<string, unknown>)[key]
  }, model)
}

export function setValueByNamePath(
  model: FormModel | undefined,
  name: FormNamePath | undefined,
  value: unknown,
) {
  if (!name || !model) return
  const path = normalizeNamePath(name)
  let target: Record<string, unknown> = model

  path.slice(0, -1).forEach((key) => {
    const current = target[key]
    if (current === null || typeof current !== 'object') {
      target[key] = {}
    }
    target = target[key] as Record<string, unknown>
  })

  target[path[path.length - 1]] = value
}

export function cloneFormValue(value: unknown): unknown {
  if (Array.isArray(value)) return value.map((item) => cloneFormValue(item))
  if (value instanceof Date) return new Date(value)

  if (value && Object.prototype.toString.call(value) === '[object Object]') {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>).map(([key, nestedValue]) => [
        key,
        cloneFormValue(nestedValue),
      ]),
    )
  }

  return value
}

export function normalizeRules(rules?: FormRule | FormRule[]) {
  if (!rules) return []
  return Array.isArray(rules) ? rules : [rules]
}

function getRuleTriggers(rule: FormRule): FormValidateTrigger[] {
  if (!rule.trigger) return ['change', 'blur']
  return Array.isArray(rule.trigger) ? rule.trigger : [rule.trigger]
}

function isEmptyValue(value: unknown) {
  return (
    value === undefined ||
    value === null ||
    value === '' ||
    (Array.isArray(value) && value.length === 0)
  )
}

function getDefaultMessage(label?: string) {
  return `${label || 'This field'} is required.`
}

function getValidatorMessage(
  result: Exclude<FormValidatorResult, Promise<unknown>>,
  rule: FormRule,
) {
  if (typeof result === 'string') return result
  if (result instanceof Error) return result.message
  return rule.message
}

export async function validateRules({
  value,
  model,
  rules,
  label,
  trigger,
}: ValidateRulesOptions): Promise<ValidateRulesResult> {
  const activeRules = trigger
    ? rules.filter((rule) => getRuleTriggers(rule).includes(trigger))
    : rules

  for (const rule of activeRules) {
    if (rule.required && isEmptyValue(value)) {
      return {
        valid: false,
        message: rule.message || getDefaultMessage(label),
      }
    }

    if (!rule.validator) continue

    try {
      const result = await rule.validator(value, model)

      if (result === false || typeof result === 'string' || result instanceof Error) {
        return {
          valid: false,
          message: getValidatorMessage(result, rule) || `${label || 'This field'} is invalid.`,
        }
      }
    } catch (error) {
      return {
        valid: false,
        message: error instanceof Error ? error.message : rule.message || String(error),
      }
    }
  }

  return {
    valid: true,
    message: '',
  }
}
