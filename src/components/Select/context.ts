import { inject, type ComputedRef, type InjectionKey, type Ref } from 'vue'
import type { SelectOptionRegistration, SelectSize, SelectValue } from './types'

export interface SelectContext {
  selectedValue: ComputedRef<SelectValue | null>
  activeValue: Ref<SelectValue | null>
  size: ComputedRef<SelectSize>
  registerOption: (option: SelectOptionRegistration) => void
  unregisterOption: (value: SelectValue) => void
  setActiveValue: (value: SelectValue) => void
  selectOption: (value: SelectValue) => void
  getOptionId: (value: SelectValue) => string
  isOptionSelected: (value: SelectValue) => boolean
  isOptionActive: (value: SelectValue) => boolean
}

export interface SelectOptionGroupContext {
  disabled: ComputedRef<boolean>
}

export const selectContextKey: InjectionKey<SelectContext> = Symbol('selectContext')
export const selectOptionGroupContextKey: InjectionKey<SelectOptionGroupContext> = Symbol(
  'selectOptionGroupContext',
)

export function useSelectContext() {
  return inject(selectContextKey, null)
}

export function useSelectOptionGroupContext() {
  return inject(selectOptionGroupContextKey, null)
}
